const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ECHO_TOKEN = 'YNcvxXhi9kxD5Q8mWuXr';
const KVDB_BUCKET = 'E6EeocTaJ2VHWvkGnE1dma';

async function migrate() {
  console.log('Loading SQLite messages...');
  // Dump messages from sqlite using php
  const phpScript = "file_put_contents('/tmp/sqlite_dump.json', json_encode((new PDO('sqlite:storage/cloud.db'))->query('SELECT * FROM messages ORDER BY id ASC')->fetchAll(PDO::FETCH_ASSOC), JSON_UNESCAPED_UNICODE));";
  fs.writeFileSync('/tmp/dump.php', `<?php ${phpScript}`);
  execSync('php /tmp/dump.php');
  const dbMessages = JSON.parse(fs.readFileSync('/tmp/sqlite_dump.json', 'utf8'));

  // Fetch current cloud state
  let cloudState = { settings: {}, sessions: {}, messages: [], files: {} };
  try {
    const res = await fetch('https://api.echovalue.dev/kv/default/aura_state_v1', {
      headers: { 'x-token': ECHO_TOKEN }
    });
    if (res.ok) {
      cloudState = await res.json();
    }
  } catch (e) {
    console.error('Fetch cloud state error:', e);
  }

  if (!cloudState.settings) cloudState.settings = {};
  if (!cloudState.sessions) cloudState.sessions = {};
  if (!cloudState.messages) cloudState.messages = [];
  if (!cloudState.files) cloudState.files = {};

  console.log('Current cloud messages:', cloudState.messages.length);
  console.log('SQLite messages to import:', dbMessages.length);

  const uploadsDir = path.join(__dirname, '../storage/uploads');

  for (const m of dbMessages) {
    let fileId = null;
    if (m.file_path) {
      const fullPath = path.join(uploadsDir, m.file_path);
      if (fs.existsSync(fullPath)) {
        const fileBuffer = fs.readFileSync(fullPath);
        const base64Data = fileBuffer.toString('base64');
        fileId = 'f_migrated_' + m.id;
        cloudState.files[fileId] = {
          name: m.file_name,
          ext: m.file_ext,
          data: base64Data,
          size: Number(m.file_size),
          created_at: m.created_at
        };
        console.log('Imported file:', m.file_name, '(' + m.file_size + ' bytes)');
      }
    }

    const exists = cloudState.messages.some(cm => cm.id === Number(m.id) || (cm.content && cm.content === m.content && cm.created_at === m.created_at));
    if (!exists) {
      cloudState.messages.push({
        id: Number(m.id),
        type: m.type,
        category: m.type,
        content: m.content || '',
        file_id: fileId,
        file_name: m.file_name,
        file_size: Number(m.file_size),
        file_size_human: (m.file_size ? (Math.round(m.file_size / 1024) + ' KB') : '0 B'),
        file_ext: m.file_ext,
        is_pinned: Boolean(Number(m.is_pinned)),
        device_info: m.device_info || 'Thiết bị',
        created_at: m.created_at,
        formatted_time: m.created_at
      });
      console.log('Imported message ID:', m.id);
    }
  }

  cloudState.messages.sort((a, b) => b.id - a.id);
  console.log('Total synchronized messages:', cloudState.messages.length);

  const stateStr = JSON.stringify(cloudState);
  await fetch('https://api.echovalue.dev/kv/default/aura_state_v1', {
    method: 'POST',
    headers: { 'x-token': ECHO_TOKEN, 'Content-Type': 'application/json' },
    body: stateStr
  });

  await fetch('https://kvdb.io/' + KVDB_BUCKET + '/aura_state_v1', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: stateStr
  });

  console.log('SUCCESS: All messages and files synchronized to cloud!');
}

migrate();
