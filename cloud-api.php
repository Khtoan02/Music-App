<?php
/**
 * Aura Cloud - Backend API
 * Cross-device Personal Transfer Box (Tin nhắn, Link, File, Content đa thiết bị)
 * Bảo mật mã PIN 4 số - Phiên làm việc tự động làm mới theo ngày mới
 */

declare(strict_types=1);
error_reporting(E_ALL);
ini_set('display_errors', '0');

// Set timezone to Vietnam (Asia/Ho_Chi_Minh)
date_default_timezone_set('Asia/Ho_Chi_Minh');

// CORS and JSON Headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Cloud-Token');
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$storageDir = __DIR__ . '/storage';
$uploadDir = $storageDir . '/uploads';
$dbPath = $storageDir . '/cloud.db';

// Ensure storage and upload directories exist
if (!is_dir($storageDir)) {
    mkdir($storageDir, 0755, true);
}
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// Ensure .htaccess in storage to prevent direct PHP execution
$htaccess = $storageDir . '/.htaccess';
if (!file_exists($htaccess)) {
    @file_put_contents($htaccess, "<FilesMatch \"\\.(php|phtml|php3|php4|php5|php7|phps)\$\">\nOrder Deny,Allow\nDeny from all\n</FilesMatch>\n");
}

function json_out(int $status, array $data): void {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

// Database Connection & Initialization
function get_db(): PDO {
    global $dbPath;
    $db = new PDO('sqlite:' . $dbPath);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    // Create tables
    $db->exec("
        CREATE TABLE IF NOT EXISTS settings (
            key TEXT PRIMARY KEY,
            value TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS sessions (
            token TEXT PRIMARY KEY,
            date_valid TEXT NOT NULL,
            device TEXT NOT NULL,
            created_at TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS login_attempts (
            ip TEXT PRIMARY KEY,
            attempts INTEGER NOT NULL DEFAULT 0,
            last_attempt INTEGER NOT NULL
        );

        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT NOT NULL,
            content TEXT,
            file_path TEXT,
            file_name TEXT,
            file_size INTEGER DEFAULT 0,
            file_ext TEXT,
            is_pinned INTEGER DEFAULT 0,
            device_info TEXT,
            created_at TEXT NOT NULL
        );

        CREATE INDEX IF NOT EXISTS idx_messages_pinned ON messages(is_pinned);
        CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(created_at);
        CREATE INDEX IF NOT EXISTS idx_sessions_date ON sessions(date_valid);
    ");

    // Initialize default PIN (1234) if not set
    $stmt = $db->prepare("SELECT value FROM settings WHERE key = 'pin_hash'");
    $stmt->execute();
    if (!$stmt->fetch()) {
        $defaultPinHash = password_hash('1234', PASSWORD_BCRYPT);
        $ins = $db->prepare("INSERT INTO settings (key, value) VALUES ('pin_hash', ?)");
        $ins->execute([$defaultPinHash]);
    }

    return $db;
}

// Detect Client Device Name
function get_client_device(): string {
    $ua = $_SERVER['HTTP_USER_AGENT'] ?? '';
    if (preg_match('/iPhone/i', $ua)) return 'iPhone';
    if (preg_match('/iPad/i', $ua)) return 'iPad';
    if (preg_match('/Android/i', $ua)) return 'Android';
    if (preg_match('/Macintosh|Mac OS X/i', $ua)) return 'Mac';
    if (preg_match('/Windows NT/i', $ua)) return 'Windows PC';
    if (preg_match('/Linux/i', $ua)) return 'Linux';
    return 'Thiết bị khác';
}

// Get Auth Token from Header, Cookie or Query
function get_token(): ?string {
    $token = $_SERVER['HTTP_X_CLOUD_TOKEN'] ?? null;
    if (!$token && isset($_COOKIE['cloud_token'])) {
        $token = $_COOKIE['cloud_token'];
    }
    if (!$token && isset($_GET['token'])) {
        $token = $_GET['token'];
    }
    return $token ? trim($token) : null;
}

// Authentication Middleware with Daily Expiry
function authenticate(PDO $db): array {
    $token = get_token();
    if (!$token) {
        json_out(401, [
            'ok' => false,
            'code' => 'UNAUTHORIZED',
            'error' => 'Chưa đăng nhập. Vui lòng nhập mã PIN.'
        ]);
    }

    $stmt = $db->prepare("SELECT token, date_valid, device, created_at FROM sessions WHERE token = ?");
    $stmt->execute([$token]);
    $session = $stmt->fetch();

    if (!$session) {
        json_out(401, [
            'ok' => false,
            'code' => 'INVALID_SESSION',
            'error' => 'Phiên làm việc không hợp lệ hoặc đã bị khóa.'
        ]);
    }

    // Check if session belongs to TODAY
    $today = date('Y-m-d');
    if ($session['date_valid'] !== $today) {
        // Expired because a new day has arrived
        $del = $db->prepare("DELETE FROM sessions WHERE token = ?");
        $del->execute([$token]);

        json_out(401, [
            'ok' => false,
            'code' => 'NEW_DAY_EXPIRED',
            'error' => 'Chào ngày mới! Phiên làm việc hôm trước đã kết thúc. Vui lòng nhập lại mã PIN 4 số.',
            'server_date' => $today
        ]);
    }

    return $session;
}

// Rate Limiting for PIN Attempts
function check_rate_limit(PDO $db, string $ip): void {
    $stmt = $db->prepare("SELECT attempts, last_attempt FROM login_attempts WHERE ip = ?");
    $stmt->execute([$ip]);
    $row = $stmt->fetch();

    $now = time();
    if ($row) {
        // Block for 5 minutes if 5 failed attempts
        if ($row['attempts'] >= 5 && ($now - $row['last_attempt']) < 300) {
            $remaining = 300 - ($now - $row['last_attempt']);
            json_out(429, [
                'ok' => false,
                'code' => 'RATE_LIMITED',
                'error' => "Bạn đã nhập sai quá 5 lần. Vui lòng thử lại sau {$remaining} giây."
            ]);
        }
        if (($now - $row['last_attempt']) >= 300) {
            // Reset attempts after timeout
            $res = $db->prepare("UPDATE login_attempts SET attempts = 0 WHERE ip = ?");
            $res->execute([$ip]);
        }
    }
}

function record_failed_attempt(PDO $db, string $ip): void {
    $stmt = $db->prepare("
        INSERT INTO login_attempts (ip, attempts, last_attempt) 
        VALUES (?, 1, ?)
        ON CONFLICT(ip) DO UPDATE SET attempts = attempts + 1, last_attempt = ?
    ");
    $stmt->execute([$ip, time(), time()]);
}

function clear_failed_attempts(PDO $db, string $ip): void {
    $stmt = $db->prepare("DELETE FROM login_attempts WHERE ip = ?");
    $stmt->execute([$ip]);
}

// Clean up old sessions (> 7 days)
function cleanup_old_sessions(PDO $db): void {
    $oldDate = date('Y-m-d', strtotime('-7 days'));
    $stmt = $db->prepare("DELETE FROM sessions WHERE date_valid < ?");
    $stmt->execute([$oldDate]);
}

// Human-readable File Size
function format_bytes(int $bytes, int $precision = 1): string {
    $units = ['B', 'KB', 'MB', 'GB'];
    $bytes = max($bytes, 0);
    $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
    $pow = min($pow, count($units) - 1);
    $bytes /= pow(1024, $pow);
    return round($bytes, $precision) . ' ' . $units[$pow];
}

// File Category Detection
function get_file_category(string $ext): string {
    $ext = strtolower($ext);
    $images = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'heic'];
    $docs = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'csv', 'md'];
    $audio = ['mp3', 'wav', 'ogg', 'm4a', 'flac', 'aac'];
    $video = ['mp4', 'mov', 'avi', 'mkv', 'webm'];
    $archive = ['zip', 'rar', '7z', 'tar', 'gz'];
    $code = ['js', 'html', 'css', 'json', 'php', 'py', 'ts', 'sql', 'sh', 'xml'];

    if (in_array($ext, $images, true)) return 'image';
    if (in_array($ext, $docs, true)) return 'document';
    if (in_array($ext, $audio, true)) return 'audio';
    if (in_array($ext, $video, true)) return 'video';
    if (in_array($ext, $archive, true)) return 'archive';
    if (in_array($ext, $code, true)) return 'code';
    return 'file';
}

// MAIN REQUEST ROUTING
try {
    $db = get_db();
    cleanup_old_sessions($db);

    $rawInput = file_get_contents('php://input');
    $jsonBody = !empty($rawInput) ? json_decode($rawInput, true) : [];
    if (!is_array($jsonBody)) $jsonBody = [];

    $action = $_GET['action'] ?? $_POST['action'] ?? $jsonBody['action'] ?? '';
    $clientIp = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';

    // 1. ACTION: LOGIN WITH 4-DIGIT PIN
    if ($action === 'login') {
        check_rate_limit($db, $clientIp);

        $pin = trim((string)($_POST['pin'] ?? $jsonBody['pin'] ?? $_GET['pin'] ?? ''));
        if (!preg_match('/^[0-9]{4}$/', $pin)) {
            json_out(400, [
                'ok' => false,
                'error' => 'Mã PIN phải bao gồm đúng 4 chữ số (0-9).'
            ]);
        }

        $stmt = $db->prepare("SELECT value FROM settings WHERE key = 'pin_hash'");
        $stmt->execute();
        $row = $stmt->fetch();
        $pinHash = $row['value'] ?? '';

        if (!password_verify($pin, $pinHash)) {
            record_failed_attempt($db, $clientIp);
            json_out(401, [
                'ok' => false,
                'code' => 'WRONG_PIN',
                'error' => 'Mã PIN không chính xác. Vui lòng thử lại.'
            ]);
        }

        // Login success: Clear rate limit
        clear_failed_attempts($db, $clientIp);

        // Generate token valid for TODAY only
        $token = bin2hex(random_bytes(32));
        $today = date('Y-m-d');
        $device = get_client_device();

        $ins = $db->prepare("INSERT INTO sessions (token, date_valid, device, created_at) VALUES (?, ?, ?, datetime('now', 'localtime'))");
        $ins->execute([$token, $today, $device]);

        // Set secure cookie for image/file requests without custom headers
        @setcookie('cloud_token', $token, [
            'expires' => strtotime('tomorrow'),
            'path' => '/',
            'samesite' => 'Lax'
        ]);

        // Check if using default PIN (1234)
        $isDefaultPin = password_verify('1234', $pinHash);

        json_out(200, [
            'ok' => true,
            'token' => $token,
            'date_valid' => $today,
            'device' => $device,
            'default_pin' => $isDefaultPin,
            'message' => 'Đăng nhập thành công! Phiên có hiệu lực trong ngày hôm nay.'
        ]);
    }

    // 2. ACTION: CHECK AUTH STATUS
    if ($action === 'check_auth') {
        $session = authenticate($db);
        $today = date('Y-m-d');

        // Check default PIN status
        $stmt = $db->prepare("SELECT value FROM settings WHERE key = 'pin_hash'");
        $stmt->execute();
        $row = $stmt->fetch();
        $isDefaultPin = password_verify('1234', $row['value'] ?? '');

        json_out(200, [
            'ok' => true,
            'date_valid' => $session['date_valid'],
            'server_date' => $today,
            'device' => $session['device'],
            'default_pin' => $isDefaultPin
        ]);
    }

    // 3. ACTION: LOGOUT
    if ($action === 'logout') {
        $token = get_token();
        if ($token) {
            $del = $db->prepare("DELETE FROM sessions WHERE token = ?");
            $del->execute([$token]);
        }
        json_out(200, ['ok' => true, 'message' => 'Đã khóa phiên làm việc.']);
    }

    // 4. ACTION: CHANGE PIN
    if ($action === 'change_pin') {
        authenticate($db);

        $oldPin = trim($_POST['old_pin'] ?? '');
        $newPin = trim($_POST['new_pin'] ?? '');

        if (!preg_match('/^[0-9]{4}$/', $oldPin) || !preg_match('/^[0-9]{4}$/', $newPin)) {
            json_out(400, ['ok' => false, 'error' => 'Mã PIN cũ và mới đều phải là 4 chữ số.']);
        }

        $stmt = $db->prepare("SELECT value FROM settings WHERE key = 'pin_hash'");
        $stmt->execute();
        $row = $stmt->fetch();
        $pinHash = $row['value'] ?? '';

        if (!password_verify($oldPin, $pinHash)) {
            json_out(401, ['ok' => false, 'error' => 'Mã PIN hiện tại không đúng.']);
        }

        $newHash = password_hash($newPin, PASSWORD_BCRYPT);
        $up = $db->prepare("UPDATE settings SET value = ? WHERE key = 'pin_hash'");
        $up->execute([$newHash]);

        json_out(200, ['ok' => true, 'message' => 'Đã đổi mã PIN 4 số thành công!']);
    }

    // 5. ACTION: GET MESSAGES (Feed & Search)
    if ($action === 'get_messages') {
        authenticate($db);

        $filter = $_GET['filter'] ?? 'all';
        $search = trim($_GET['search'] ?? '');
        $sinceId = isset($_GET['since_id']) ? (int)$_GET['since_id'] : 0;

        $where = [];
        $params = [];

        if ($sinceId > 0) {
            $where[] = "id > ?";
            $params[] = $sinceId;
        }

        if ($filter === 'pinned') {
            $where[] = "is_pinned = 1";
        } elseif ($filter === 'link') {
            $where[] = "type = 'link'";
        } elseif ($filter === 'file') {
            $where[] = "(type = 'file' OR type = 'image')";
        } elseif ($filter === 'text') {
            $where[] = "type = 'text'";
        }

        if ($search !== '') {
            $where[] = "(content LIKE ? OR file_name LIKE ?)";
            $params[] = '%' . $search . '%';
            $params[] = '%' . $search . '%';
        }

        $sql = "SELECT * FROM messages";
        if (!empty($where)) {
            $sql .= " WHERE " . implode(" AND ", $where);
        }
        $sql .= " ORDER BY is_pinned DESC, id DESC LIMIT 150";

        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        $rows = $stmt->fetchAll();
        $authToken = get_token();
        $tokenQuery = $authToken ? '&token=' . rawurlencode($authToken) : '';

        // Process rows with friendly formatting
        $items = [];
        foreach ($rows as $r) {
            $category = $r['file_ext'] ? get_file_category($r['file_ext']) : 'text';
            $downloadUrl = null;
            $previewUrl = null;

            if ($r['file_path']) {
                $downloadUrl = 'cloud-api.php?action=download&id=' . $r['id'] . $tokenQuery;
                $previewUrl = 'cloud-api.php?action=download&id=' . $r['id'] . '&inline=1' . $tokenQuery;
            }

            $items[] = [
                'id' => (int)$r['id'],
                'type' => $r['type'],
                'category' => $category,
                'content' => $r['content'],
                'file_name' => $r['file_name'],
                'file_size' => (int)$r['file_size'],
                'file_size_human' => format_bytes((int)$r['file_size']),
                'file_ext' => $r['file_ext'],
                'download_url' => $downloadUrl,
                'preview_url' => $previewUrl,
                'is_pinned' => (bool)$r['is_pinned'],
                'device_info' => $r['device_info'] ?: 'Thiết bị',
                'created_at' => $r['created_at'],
                'formatted_time' => date('H:i, d/m/Y', strtotime($r['created_at']))
            ];
        }

        json_out(200, [
            'ok' => true,
            'items' => $items,
            'total' => count($items),
            'server_date' => date('Y-m-d'),
            'server_time' => date('H:i:s')
        ]);
    }

    // 6. ACTION: SEND MESSAGE / LINK / CONTENT
    if ($action === 'send_message') {
        authenticate($db);

        $content = trim($_POST['content'] ?? '');
        if ($content === '') {
            json_out(400, ['ok' => false, 'error' => 'Nội dung tin nhắn không được để trống.']);
        }

        // Automatic Link Detection
        $type = 'text';
        $isUrl = preg_match('/^(https?:\/\/|www\.)[^\s]+$/i', $content);
        if ($isUrl) {
            $type = 'link';
        }

        $device = get_client_device();
        $now = date('Y-m-d H:i:s');

        $stmt = $db->prepare("
            INSERT INTO messages (type, content, device_info, created_at)
            VALUES (?, ?, ?, ?)
        ");
        $stmt->execute([$type, $content, $device, $now]);
        $newId = (int)$db->lastInsertId();

        json_out(201, [
            'ok' => true,
            'id' => $newId,
            'type' => $type,
            'message' => 'Đã gửi thành công!'
        ]);
    }

    // 7. ACTION: UPLOAD FILE (Images, Videos, Docs, Zips)
    if ($action === 'upload_file') {
        authenticate($db);

        if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
            $errCode = $_FILES['file']['error'] ?? -1;
            $msg = 'Không nhận được tệp hoặc tệp bị lỗi khi tải lên.';
            if ($errCode === UPLOAD_ERR_INI_SIZE || $errCode === UPLOAD_ERR_FORM_SIZE) {
                $msg = 'Tệp vượt quá kích thước cho phép của máy chủ (tối đa 128MB).';
            }
            json_out(400, ['ok' => false, 'error' => $msg]);
        }

        $file = $_FILES['file'];
        $originalName = basename($file['name']);
        $fileSize = (int)$file['size'];
        $fileExt = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));

        // Ban dangerous direct executable extensions
        $banned = ['php', 'phtml', 'php3', 'php4', 'php5', 'php7', 'phps', 'cgi', 'pl', 'exe'];
        if (in_array($fileExt, $banned, true)) {
            json_out(400, ['ok' => false, 'error' => 'Vì lý do an toàn, không được tải lên tệp thực thi mã nguồn.']);
        }

        // Safe filename storage
        $safePrefix = date('Ymd_His') . '_' . bin2hex(random_bytes(4));
        $storedFilename = $safePrefix . ($fileExt ? '.' . $fileExt : '');
        $targetPath = $uploadDir . '/' . $storedFilename;

        if (!move_uploaded_file($file['tmp_name'], $targetPath)) {
            json_out(500, ['ok' => false, 'error' => 'Lỗi lưu trữ tệp lên máy chủ.']);
        }

        $category = get_file_category($fileExt);
        $type = ($category === 'image') ? 'image' : 'file';
        $caption = trim($_POST['caption'] ?? '');
        $device = get_client_device();
        $now = date('Y-m-d H:i:s');

        $stmt = $db->prepare("
            INSERT INTO messages (type, content, file_path, file_name, file_size, file_ext, device_info, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ");
        $stmt->execute([$type, $caption, $storedFilename, $originalName, $fileSize, $fileExt, $device, $now]);
        $newId = (int)$db->lastInsertId();

        json_out(201, [
            'ok' => true,
            'id' => $newId,
            'type' => $type,
            'file_name' => $originalName,
            'file_size_human' => format_bytes($fileSize),
            'message' => 'Tải tệp lên thành công!'
        ]);
    }

    // 8. ACTION: DOWNLOAD / PREVIEW FILE
    if ($action === 'download') {
        authenticate($db);

        $id = (int)($_GET['id'] ?? 0);
        $stmt = $db->prepare("SELECT file_path, file_name, file_size, file_ext FROM messages WHERE id = ?");
        $stmt->execute([$id]);
        $msg = $stmt->fetch();

        if (!$msg || !$msg['file_path']) {
            json_out(404, ['ok' => false, 'error' => 'Tệp không tồn tại hoặc đã bị xóa.']);
        }

        $fullPath = $uploadDir . '/' . $msg['file_path'];
        if (!file_exists($fullPath)) {
            json_out(404, ['ok' => false, 'error' => 'Tệp không tìm thấy trên ổ đĩa máy chủ.']);
        }

        $ext = strtolower($msg['file_ext']);
        $isInline = isset($_GET['inline']) && $_GET['inline'] === '1';

        // Mime-type mapping
        $mimeTypes = [
            'jpg' => 'image/jpeg', 'jpeg' => 'image/jpeg', 'png' => 'image/png',
            'gif' => 'image/gif', 'webp' => 'image/webp', 'svg' => 'image/svg+xml',
            'pdf' => 'application/pdf', 'mp3' => 'audio/mpeg', 'wav' => 'audio/wav',
            'mp4' => 'video/mp4', 'mov' => 'video/quicktime', 'webm' => 'video/webm',
            'txt' => 'text/plain; charset=utf-8', 'json' => 'application/json',
            'zip' => 'application/zip'
        ];
        $contentType = $mimeTypes[$ext] ?? 'application/octet-stream';

        // Output raw file
        header_remove('Content-Type');
        header('Content-Type: ' . $contentType);
        header('Content-Length: ' . filesize($fullPath));
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, X-Cloud-Token');
        header('Cache-Control: private, max-age=86400');

        $disposition = $isInline ? 'inline' : 'attachment';
        $encodedName = rawurlencode($msg['file_name']);
        header("Content-Disposition: {$disposition}; filename=\"{$encodedName}\"; filename*=UTF-8''{$encodedName}");

        readfile($fullPath);
        exit;
    }

    // 9. ACTION: TOGGLE PIN
    if ($action === 'toggle_pin') {
        authenticate($db);

        $id = (int)($_POST['id'] ?? 0);
        $stmt = $db->prepare("SELECT is_pinned FROM messages WHERE id = ?");
        $stmt->execute([$id]);
        $row = $stmt->fetch();

        if (!$row) {
            json_out(404, ['ok' => false, 'error' => 'Tin nhắn không tồn tại.']);
        }

        $newPin = $row['is_pinned'] ? 0 : 1;
        $up = $db->prepare("UPDATE messages SET is_pinned = ? WHERE id = ?");
        $up->execute([$newPin, $id]);

        json_out(200, [
            'ok' => true,
            'is_pinned' => (bool)$newPin,
            'message' => $newPin ? 'Đã ghim tin nhắn lên đầu.' : 'Đã bỏ ghim tin nhắn.'
        ]);
    }

    // 10. ACTION: DELETE MESSAGE / FILE
    if ($action === 'delete_message') {
        authenticate($db);

        $id = (int)($_POST['id'] ?? 0);
        $stmt = $db->prepare("SELECT file_path FROM messages WHERE id = ?");
        $stmt->execute([$id]);
        $row = $stmt->fetch();

        if (!$row) {
            json_out(404, ['ok' => false, 'error' => 'Tin nhắn không tồn tại.']);
        }

        // Delete physical file if attached
        if (!empty($row['file_path'])) {
            $fPath = $uploadDir . '/' . $row['file_path'];
            if (file_exists($fPath)) {
                @unlink($fPath);
            }
        }

        $del = $db->prepare("DELETE FROM messages WHERE id = ?");
        $del->execute([$id]);

        json_out(200, ['ok' => true, 'message' => 'Đã xóa tin nhắn.']);
    }

    // 11. ACTION: CLEAR ALL MESSAGES
    if ($action === 'clear_all') {
        authenticate($db);

        $pin = trim($_POST['pin'] ?? '');
        $stmt = $db->prepare("SELECT value FROM settings WHERE key = 'pin_hash'");
        $stmt->execute();
        $row = $stmt->fetch();
        if (!password_verify($pin, $row['value'] ?? '')) {
            json_out(401, ['ok' => false, 'error' => 'Mã PIN xác nhận không chính xác.']);
        }

        // Delete all files in upload dir
        $files = glob($uploadDir . '/*');
        foreach ($files as $f) {
            if (is_file($f)) @unlink($f);
        }

        $db->exec("DELETE FROM messages");
        json_out(200, ['ok' => true, 'message' => 'Đã xóa toàn bộ lịch sử trò chuyện và tệp tin.']);
    }

    json_out(400, ['ok' => false, 'error' => 'Hành động không hợp lệ: ' . htmlspecialchars($action)]);

} catch (Throwable $e) {
    json_out(500, [
        'ok' => false,
        'error' => 'Máy chủ xảy ra lỗi: ' . $e->getMessage()
    ]);
}
