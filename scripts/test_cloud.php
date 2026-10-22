<?php
// scripts/test_cloud.php - Integration test for Aura Cloud API

declare(strict_types=1);

$baseUrl = 'http://127.0.0.1:80/music/cloud-api.php';
// Use servbay.host or curl local
$baseUrl = 'https://servbay.host/music/cloud-api.php';

function request($url, $method = 'GET', $data = [], $headers = [], $files = []) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    
    if ($method === 'POST') {
        curl_setopt($ch, CURLOPT_POST, true);
        if (!empty($files)) {
            $postFields = $data;
            foreach ($files as $k => $path) {
                $postFields[$k] = new CURLFile($path);
            }
            curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);
        } else {
            curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
        }
    }
    
    $hdr = [];
    foreach ($headers as $k => $v) {
        $hdr[] = "$k: $v";
    }
    if (!empty($hdr)) {
        curl_setopt($ch, CURLOPT_HTTPHEADER, $hdr);
    }
    
    $res = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    return [$httpCode, json_decode($res, true) ?: $res];
}

echo "=== STARTING AURA CLOUD INTEGRATION TEST ===\n";

// 1. Test Wrong PIN
list($code, $res) = request($baseUrl . '?action=login', 'POST', ['pin' => '9999']);
assert($code === 401, "Expected 401 for wrong pin, got $code");
assert($res['code'] === 'WRONG_PIN', "Expected WRONG_PIN code");
echo "✓ Test 1: Wrong PIN correctly rejected (401)\n";

// 2. Test Correct PIN (1234)
list($code, $res) = request($baseUrl . '?action=login', 'POST', ['pin' => '1234']);
assert($code === 200, "Expected 200 for correct pin, got $code");
assert(!empty($res['token']), "Expected token in response");
$token = $res['token'];
echo "✓ Test 2: Correct PIN accepted, token obtained\n";

// 3. Test Check Auth
list($code, $res) = request($baseUrl . '?action=check_auth', 'GET', [], ['X-Cloud-Token' => $token]);
assert($code === 200, "Expected 200 for check_auth, got $code");
assert($res['ok'] === true, "Expected ok=true");
echo "✓ Test 3: Check Auth verified session is active\n";

// 4. Test Send Text Message
list($code, $res) = request($baseUrl . '?action=send_message', 'POST', ['content' => 'Ghi chú công việc hôm nay: Họp lúc 14h'], ['X-Cloud-Token' => $token]);
assert($code === 201, "Expected 201 for send_message, got $code");
assert($res['type'] === 'text', "Expected type text");
$msgId1 = $res['id'];
echo "✓ Test 4: Sent text message (id=$msgId1)\n";

// 5. Test Send Link (Auto detection)
list($code, $res) = request($baseUrl . '?action=send_message', 'POST', ['content' => 'https://github.com/Khtoan02/Music-App'], ['X-Cloud-Token' => $token]);
assert($code === 201, "Expected 201 for send_message link, got $code");
assert($res['type'] === 'link', "Expected auto-detected type 'link'");
$msgId2 = $res['id'];
echo "✓ Test 5: Sent URL, auto-detected type='link' (id=$msgId2)\n";

// 6. Test File Upload
$tmpFile = tempnam(sys_get_temp_dir(), 'cloud_test_') . '.txt';
file_put_contents($tmpFile, "Test file content for Aura Cloud sync.\nLine 2.");
list($code, $res) = request($baseUrl . '?action=upload_file', 'POST', ['caption' => 'Tài liệu hướng dẫn'], ['X-Cloud-Token' => $token], ['file' => $tmpFile]);
unlink($tmpFile);
assert($code === 201, "Expected 201 for upload_file, got $code");
assert($res['ok'] === true, "Expected upload ok");
$msgId3 = $res['id'];
echo "✓ Test 6: Uploaded file successfully (id=$msgId3)\n";

// 7. Test Toggle Pin
list($code, $res) = request($baseUrl . '?action=toggle_pin', 'POST', ['id' => $msgId1], ['X-Cloud-Token' => $token]);
assert($code === 200, "Expected 200 for toggle_pin, got $code");
assert($res['is_pinned'] === true, "Expected is_pinned=true");
echo "✓ Test 7: Pinned message #$msgId1\n";

// 8. Test Get Messages & Filters
list($code, $res) = request($baseUrl . '?action=get_messages', 'GET', [], ['X-Cloud-Token' => $token]);
assert($code === 200, "Expected 200 for get_messages, got $code");
assert($res['total'] >= 3, "Expected at least 3 messages");
echo "✓ Test 8: Retrieved all messages (total: {$res['total']})\n";

// Filter link
list($code, $res) = request($baseUrl . '?action=get_messages&filter=link', 'GET', [], ['X-Cloud-Token' => $token]);
assert($res['total'] >= 1, "Expected at least 1 link");
echo "✓ Test 9: Filter 'link' works\n";

// Filter pinned
list($code, $res) = request($baseUrl . '?action=get_messages&filter=pinned', 'GET', [], ['X-Cloud-Token' => $token]);
assert($res['total'] >= 1, "Expected at least 1 pinned item");
echo "✓ Test 10: Filter 'pinned' works\n";

// 9. Test Change PIN & Revert
list($code, $res) = request($baseUrl . '?action=change_pin', 'POST', ['old_pin' => '1234', 'new_pin' => '5678'], ['X-Cloud-Token' => $token]);
assert($code === 200, "Expected 200 for change_pin, got $code");
// Revert back to 1234
list($code, $res) = request($baseUrl . '?action=change_pin', 'POST', ['old_pin' => '5678', 'new_pin' => '1234'], ['X-Cloud-Token' => $token]);
assert($code === 200, "Expected 200 for revert change_pin, got $code");
echo "✓ Test 11: Change PIN and revert back to 1234 passed\n";

echo "\n>>> ALL 11 INTEGRATION TESTS PASSED SUCCESSFULLY! <<<\n";
