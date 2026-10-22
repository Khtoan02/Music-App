#!/bin/bash
# scripts/start_public_tunnel.sh
# Tạo đường link truy cập công khai an toàn (Public HTTPS URL) cho Aura Cloud
# Cho phép mở và gửi file từ bất kỳ đâu trên thế giới (4G, cơ quan, quán cafe)

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
CLOUDFLARED="$DIR/bin/cloudflared"

if [ ! -f "$CLOUDFLARED" ]; then
  echo "Đang tải công cụ Cloudflared cho Mac..."
  mkdir -p "$DIR/bin"
  curl -L -s https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-darwin-arm64.tgz | tar -xz -C /tmp
  cp /tmp/cloudflared "$CLOUDFLARED"
  chmod +x "$CLOUDFLARED"
fi

echo "=========================================================="
echo "  🚀 KHỞI ĐỘNG ĐƯỜNG LINK TRUY CẬP INTERNET CHO AURA CLOUD"
echo "  (Dùng được trên 4G, điện thoại, máy tính cơ quan)"
echo "=========================================================="
echo ""
echo "Máy chủ nội bộ (Cùng mạng Wi-Fi):"
echo "  👉 http://192.168.100.163/music/cloud.html"
echo ""
echo "Đang tạo đường link Internet toàn cầu (Cloudflare Tunnel)..."
echo "Hãy sao chép link dạng https://xxxx.trycloudflare.com bên dưới:"
echo "----------------------------------------------------------"

"$CLOUDFLARED" tunnel --url http://localhost:80 --no-autoupdate
