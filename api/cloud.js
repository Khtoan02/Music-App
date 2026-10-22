/**
 * Vercel Serverless Function: /api/cloud
 * Chạy 24/7 trên Vercel cho Aura Cloud đa thiết bị (5G, Wi-Fi khác mạng)
 */

const crypto = require('crypto');

// Cloud storage config (kvdb.io persistent global store)
const KVDB_BUCKET = process.env.AURA_KVDB_BUCKET || 'E6EeocTaJ2VHWvkGnE1dma';

// In-memory cache for fast Lambda warmth
let memoryStore = {
  settings: { pin_hash: hashPin('1234') },
  sessions: {},
  messages: []
};

function getVietnamDate() {
  const d = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }));
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function getVietnamDateTime() {
  const d = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }));
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const h = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  const s = String(d.getSeconds()).padStart(2, '0');
  return `${y}-${m}-${day} ${h}:${min}:${s}`;
}

function hashPin(pin) {
  return crypto.pbkdf2Sync(pin, 'aura_salt_2026_vn', 1000, 32, 'sha256').toString('hex');
}

// Persistent Storage Helpers
async function loadCloudState() {
  try {
    const res = await fetch(`https://kvdb.io/${KVDB_BUCKET}/aura_state_v1`, {
      signal: AbortSignal.timeout(4500)
    });
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data === 'object') {
        memoryStore = { ...memoryStore, ...data };
        return memoryStore;
      }
    }
  } catch (e) {}

  return memoryStore;
}

async function saveCloudState(state) {
  memoryStore = state;
  const jsonStr = JSON.stringify(state);

  try {
    await fetch(`https://kvdb.io/${KVDB_BUCKET}/aura_state_v1`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: jsonStr,
      signal: AbortSignal.timeout(4500)
    });
  } catch (e) {}
}

function detectDevice(ua = '') {
  if (/iPhone/i.test(ua)) return 'iPhone';
  if (/iPad/i.test(ua)) return 'iPad';
  if (/Android/i.test(ua)) return 'Android';
  if (/Macintosh|Mac OS X/i.test(ua)) return 'Mac';
  if (/Windows NT/i.test(ua)) return 'Windows PC';
  if (/Linux/i.test(ua)) return 'Linux';
  return 'Thiết bị khác';
}

function formatBytes(bytes) {
  if (!bytes || bytes <= 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Cloud-Token');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Parse Body & Query
  let body = req.body || {};
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (e) {
      // URL encoded fallback
      const params = new URLSearchParams(body);
      body = Object.fromEntries(params);
    }
  }

  const query = req.query || {};
  const action = query.action || body.action || '';
  const token = req.headers['x-cloud-token'] || query.token || body.token || '';
  const today = getVietnamDate();
  const ua = req.headers['user-agent'] || '';
  const device = detectDevice(ua);

  const state = await loadCloudState();
  if (!state.settings) state.settings = {};
  if (!state.settings.pin_hash) state.settings.pin_hash = hashPin('1234');
  if (!state.sessions) state.sessions = {};
  if (!state.messages) state.messages = [];
  if (!state.files) state.files = {};

  // Auth helper
  function checkAuth() {
    if (!token || !state.sessions[token]) {
      return { ok: false, status: 401, code: 'UNAUTHORIZED', error: 'Chưa đăng nhập. Vui lòng nhập mã PIN.' };
    }
    const sess = state.sessions[token];
    if (sess.date_valid !== today) {
      delete state.sessions[token];
      saveCloudState(state);
      return { ok: false, status: 401, code: 'NEW_DAY_EXPIRED', error: 'Chào ngày mới! Phiên làm việc đã kết thúc. Vui lòng nhập lại mã PIN.' };
    }
    return { ok: true, session: sess };
  }

  // 1. ACTION: LOGIN
  if (action === 'login') {
    const pin = String(body.pin || query.pin || '').trim();
    if (!/^[0-9]{4}$/.test(pin)) {
      return res.status(400).json({ ok: false, error: 'Mã PIN phải bao gồm đúng 4 chữ số (0-9).' });
    }

    const testHash = hashPin(pin);
    if (testHash !== state.settings.pin_hash) {
      return res.status(401).json({ ok: false, code: 'WRONG_PIN', error: 'Mã PIN không chính xác.' });
    }

    const newToken = crypto.randomBytes(24).toString('hex');
    state.sessions[newToken] = {
      date_valid: today,
      device: device,
      created_at: getVietnamDateTime()
    };
    await saveCloudState(state);

    return res.status(200).json({
      ok: true,
      token: newToken,
      date_valid: today,
      device: device,
      message: 'Đăng nhập thành công!'
    });
  }

  // 2. ACTION: CHECK_AUTH
  if (action === 'check_auth') {
    const auth = checkAuth();
    if (!auth.ok) return res.status(auth.status).json(auth);
    return res.status(200).json({
      ok: true,
      date_valid: auth.session.date_valid,
      server_date: today,
      device: auth.session.device
    });
  }

  // 3. ACTION: LOGOUT
  if (action === 'logout') {
    if (token && state.sessions[token]) {
      delete state.sessions[token];
      await saveCloudState(state);
    }
    return res.status(200).json({ ok: true, message: 'Đã khóa phiên làm việc.' });
  }

  // 4. ACTION: GET_MESSAGES
  if (action === 'get_messages') {
    const auth = checkAuth();
    if (!auth.ok) return res.status(auth.status).json(auth);

    const filter = query.filter || 'all';
    const search = (query.search || '').trim().toLowerCase();

    let items = state.messages.map(m => {
      let downloadUrl = null;
      let previewUrl = null;
      if (m.file_id) {
        const tokenQuery = token ? `&token=${encodeURIComponent(token)}` : '';
        downloadUrl = `/api/cloud?action=download&id=${m.file_id}${tokenQuery}`;
        previewUrl = `/api/cloud?action=download&id=${m.file_id}&inline=1${tokenQuery}`;
      }
      return {
        ...m,
        download_url: downloadUrl,
        preview_url: previewUrl
      };
    });

    if (filter === 'pinned') items = items.filter(m => m.is_pinned);
    if (filter === 'link') items = items.filter(m => m.type === 'link');
    if (filter === 'file') items = items.filter(m => m.type === 'file' || m.type === 'image');
    if (filter === 'text') items = items.filter(m => m.type === 'text');

    if (search) {
      items = items.filter(m => 
        (m.content && m.content.toLowerCase().includes(search)) ||
        (m.file_name && m.file_name.toLowerCase().includes(search))
      );
    }

    // Sort: pinned first, newest first
    items.sort((a, b) => {
      if (a.is_pinned !== b.is_pinned) return b.is_pinned ? 1 : -1;
      return b.id - a.id;
    });

    return res.status(200).json({
      ok: true,
      items: items.slice(0, 150),
      total: items.length,
      server_date: today
    });
  }

  // 5. ACTION: SEND_MESSAGE
  if (action === 'send_message') {
    const auth = checkAuth();
    if (!auth.ok) return res.status(auth.status).json(auth);

    const content = String(body.content || query.content || '').trim();
    if (!content) return res.status(400).json({ ok: false, error: 'Nội dung tin nhắn không được để trống.' });

    let type = 'text';
    if (/^(https?:\/\/|www\.)[^\s]+$/i.test(content)) {
      type = 'link';
    }

    const newId = Date.now();
    const newMsg = {
      id: newId,
      type: type,
      category: type,
      content: content,
      file_id: null,
      file_name: null,
      file_size: 0,
      file_size_human: '0 B',
      file_ext: null,
      is_pinned: false,
      device_info: device,
      created_at: getVietnamDateTime(),
      formatted_time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ', ' + today.split('-').reverse().join('/')
    };

    state.messages.unshift(newMsg);
    await saveCloudState(state);

    return res.status(201).json({ ok: true, id: newId, type: type, message: 'Đã gửi thành công!' });
  }

  // 6. ACTION: UPLOAD_FILE
  if (action === 'upload_file') {
    const auth = checkAuth();
    if (!auth.ok) return res.status(auth.status).json(auth);

    const fileName = body.file_name || 'file';
    const fileData = body.file_data || ''; // base64 or data URL
    const fileSize = body.file_size || 0;
    const caption = (body.caption || '').trim();

    if (!fileData) {
      return res.status(400).json({ ok: false, error: 'Không nhận được dữ liệu tệp tin.' });
    }

    const ext = fileName.split('.').pop().toLowerCase();
    const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext);
    const type = isImage ? 'image' : 'file';

    const fileId = 'f_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    const fileObj = {
      name: fileName,
      ext: ext,
      data: fileData, // Data URI or base64
      size: fileSize,
      created_at: getVietnamDateTime()
    };

    // Save file data separately to kvdb
    try {
      await fetch(`https://kvdb.io/${KVDB_BUCKET}/file_${fileId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fileObj),
        signal: AbortSignal.timeout(8000)
      });
    } catch (e) {}

    const newId = Date.now();
    const newMsg = {
      id: newId,
      type: type,
      category: isImage ? 'image' : 'file',
      content: caption,
      file_id: fileId,
      file_name: fileName,
      file_size: fileSize,
      file_size_human: formatBytes(fileSize),
      file_ext: ext,
      is_pinned: false,
      device_info: device,
      created_at: getVietnamDateTime(),
      formatted_time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ', ' + today.split('-').reverse().join('/')
    };

    state.messages.unshift(newMsg);
    await saveCloudState(state);

    return res.status(201).json({
      ok: true,
      id: newId,
      type: type,
      file_name: fileName,
      file_size_human: formatBytes(fileSize),
      message: 'Tải tệp lên thành công!'
    });
  }

  // 7. ACTION: DOWNLOAD / PREVIEW
  if (action === 'download') {
    const auth = checkAuth();
    if (!auth.ok) return res.status(auth.status).json(auth);

    const fileId = query.id || body.id || '';
    let file = null;

    try {
      const fRes = await fetch(`https://kvdb.io/${KVDB_BUCKET}/file_${fileId}`, {
        signal: AbortSignal.timeout(6000)
      });
      if (fRes.ok) {
        file = await fRes.json();
      }
    } catch (e) {}

    if (!file || !file.data) {
      return res.status(404).json({ ok: false, error: 'Tệp không tồn tại hoặc đã bị xóa.' });
    }

    const isInline = query.inline === '1';
    let base64 = file.data;
    let mimeType = 'application/octet-stream';

    if (base64.startsWith('data:')) {
      const match = base64.match(/^data:([^;]+);base64,(.*)$/);
      if (match) {
        mimeType = match[1];
        base64 = match[2];
      }
    } else {
      const mimeMap = {
        png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg',
        webp: 'image/webp', gif: 'image/gif', svg: 'image/svg+xml',
        pdf: 'application/pdf', mp3: 'audio/mpeg', mp4: 'video/mp4'
      };
      mimeType = mimeMap[file.ext] || 'application/octet-stream';
    }

    const buffer = Buffer.from(base64, 'base64');
    res.setHeader('Content-Type', mimeType);
    res.setHeader('Content-Length', buffer.length);
    res.setHeader('Cache-Control', 'private, max-age=86400');
    const disposition = isInline ? 'inline' : 'attachment';
    res.setHeader('Content-Disposition', `${disposition}; filename="${encodeURIComponent(file.name)}"`);

    return res.send(buffer);
  }

  // 8. ACTION: TOGGLE_PIN
  if (action === 'toggle_pin') {
    const auth = checkAuth();
    if (!auth.ok) return res.status(auth.status).json(auth);

    const id = Number(body.id || query.id);
    const msg = state.messages.find(m => m.id === id);
    if (!msg) return res.status(404).json({ ok: false, error: 'Tin nhắn không tồn tại.' });

    msg.is_pinned = !msg.is_pinned;
    await saveCloudState(state);

    return res.status(200).json({
      ok: true,
      is_pinned: msg.is_pinned,
      message: msg.is_pinned ? 'Đã ghim tin nhắn lên đầu.' : 'Đã bỏ ghim tin nhắn.'
    });
  }

  // 9. ACTION: DELETE_MESSAGE
  if (action === 'delete_message') {
    const auth = checkAuth();
    if (!auth.ok) return res.status(auth.status).json(auth);

    const id = Number(body.id || query.id);
    const idx = state.messages.findIndex(m => m.id === id);
    if (idx !== -1) {
      const msg = state.messages[idx];
      if (msg.file_id && state.files[msg.file_id]) {
        delete state.files[msg.file_id];
      }
      state.messages.splice(idx, 1);
      await saveCloudState(state);
    }
    return res.status(200).json({ ok: true, message: 'Đã xóa tin nhắn.' });
  }

  // 10. ACTION: CHANGE_PIN
  if (action === 'change_pin') {
    const auth = checkAuth();
    if (!auth.ok) return res.status(auth.status).json(auth);

    const oldPin = String(body.old_pin || '').trim();
    const newPin = String(body.new_pin || '').trim();

    if (!/^[0-9]{4}$/.test(oldPin) || !/^[0-9]{4}$/.test(newPin)) {
      return res.status(400).json({ ok: false, error: 'Mã PIN cũ và mới phải là 4 chữ số.' });
    }

    if (hashPin(oldPin) !== state.settings.pin_hash) {
      return res.status(401).json({ ok: false, error: 'Mã PIN hiện tại không đúng.' });
    }

    state.settings.pin_hash = hashPin(newPin);
    await saveCloudState(state);

    return res.status(200).json({ ok: true, message: 'Đã đổi mã PIN thành công!' });
  }

  // 11. ACTION: CLEAR_ALL
  if (action === 'clear_all') {
    const auth = checkAuth();
    if (!auth.ok) return res.status(auth.status).json(auth);

    const pin = String(body.pin || '').trim();
    if (hashPin(pin) !== state.settings.pin_hash) {
      return res.status(401).json({ ok: false, error: 'Mã PIN xác nhận không đúng.' });
    }

    state.messages = [];
    state.files = {};
    await saveCloudState(state);

    return res.status(200).json({ ok: true, message: 'Đã dọn sạch toàn bộ dữ liệu!' });
  }

  return res.status(400).json({ ok: false, error: 'Hành động không hợp lệ: ' + action });
};
