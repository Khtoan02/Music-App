# 🎵 AuraBeat - App Nghe Nhạc Theo Thời Tiết, Cảm Xúc & Thời Gian

Ứng dụng web nghe nhạc thông minh cá nhân chạy trên môi trường ServBay, tự động định vị tọa độ, xác định thời tiết và khung giờ trong ngày theo thời gian thực để gợi ý danh sách nhạc phù hợp nhất từ YouTube.

---

## 🌟 Tính Năng Nổi Bật

1. **Định vị & Thời tiết chính xác (High Accuracy Weather & Geolocation):**
   - Sử dụng HTML5 Geolocation API kết hợp Open-Meteo API (cập nhật theo phút, chuẩn mã WMO quốc tế).
   - Tự động nhận diện tình trạng thời tiết: Nắng rực rỡ, Trời mây râm mát, Mưa phùn, Mưa rào, Dông bão sét, Gió buốt.
   - Nhận diện địa danh, nhiệt độ, độ ẩm và tốc độ gió tại vị trí của bạn.

2. **Cảm biến Thời Gian Thực (Temporal Rhythm):**
   - Đồng hồ số và phân loại 7 khung thời gian trong ngày:
     - *Bình minh (05:00 - 07:00)*: Nhẹ nhàng, khởi đầu ngày mới
     - *Buổi sáng (07:00 - 11:30)*: Năng lượng, tỉnh táo làm việc
     - *Buổi trưa (11:30 - 14:00)*: Thư thái, nghỉ ngơi
     - *Buổi chiều (14:00 - 18:00)*: Cà phê chiều, tập trung hoàn tất việc
     - *Hoàng hôn (18:00 - 19:00)*: Lãng mạn, êm đềm
     - *Buổi tối (19:00 - 23:00)*: Thư giãn, chill
     - *Đêm khuya (23:00 - 05:00)*: Tĩnh mịch, suy tư, lofi & ru ngủ

3. **Thuật toán Gợi ý Đa Chiều (Recommendation Matrix):**
   - Kết hợp 3 yếu tố: `[Thời tiết] × [Thời gian] × [Tâm trạng]` để tính điểm tương thích (Match Score) cho từng bản nhạc.
   - 7 trạng thái cảm xúc: *Tự động cảm biến, Chill / Thư giãn, Tập trung làm việc, Trầm lắng / Tâm trạng, Năng động / Vui vẻ, Lãng mạn, Ngủ ngon / Bình yên*.
   - Hỗ trợ lọc theo thể loại: *Tất cả, Nhạc Việt (V-Pop / Indie / Acoustic), Quốc Tế (US-UK / Lofi Girl), Không Lời (Piano / Study Jazz)*.

4. **Trình phát YouTube Player Cao Cấp:**
   - Điều khiển đầy đủ: Play/Pause, Next, Previous, Tua thanh tiến trình (Seek), Âm lượng, Trộn bài (Shuffle), Lặp lại (Repeat).
   - Đĩa than quay hoạt họa (Vinyl Record) & Equalizer sóng nhạc động theo nhịp phát.
   - Nút bật/tắt khung xem Video MV YouTube tùy thích.
   - Hỗ trợ dán bất kỳ link YouTube hoặc ID bài hát yêu thích để phát ngay lập tức.

5. **Bộ Trộn Âm Thanh Môi Trường Tự Nhiên (Ambient Nature Mixer):**
   - Sinh âm thanh mượt mà trực tiếp bằng Web Audio API (không tốn băng thông, không giật lag):
     - 🌧️ Tiếng Mưa rơi (Rain)
     - 🍃 Gió mát (Wind)
     - ⚡ Sấm chớp rền vang (Thunder)
     - 🔥 Lửa trại bập bùng (Campfire)
     - 🌊 Sóng biển dạt dào (Ocean Waves)
   - Có thể bật chạy đồng thời cùng nhạc YouTube để tạo không gian chill sâu nhất.

6. **Hiệu Ứng Thị Giác Đổi Theo Thời Tiết (Dynamic Atmosphere Canvas):**
   - Hạt mưa rơi trên màn hình khi trời mưa / bão.
   - Đom đóm / ánh sao lấp lánh khi về đêm.
   - Vệt sáng ấm áp lơ lửng khi trời nắng.
   - Tone màu nền chuyển biến mượt mà theo từng trạng thái thời tiết.

7. **Bộ Thử Nghiệm Mô Phỏng (Simulation Sandbox):**
   - Cho phép bạn thử nghe nhạc ngày mưa rào hoặc đêm khuya bất kỳ lúc nào dù ngoài trời đang là buổi trưa nắng gắt.

---

## 🚀 Cách Mở Ứng Dụng Trên ServBay

Bạn có thể truy cập ứng dụng ngay trên trình duyệt bằng một trong các cách sau:

1. **Địa chỉ ServBay trực tiếp:**
   👉 [https://servbay.host/music/](https://servbay.host/music/)

2. **Hoặc mở trực tiếp file HTML:**
   👉 Nhấp đúp chuột vào file `index.html` trong thư mục:
   `/Applications/ServBay/www/music/index.html`

*(Lưu ý: Khi trình duyệt hỏi xin quyền truy cập vị trí Geolocation, hãy chọn **Allow / Cho phép** để app định vị chính xác vị trí và thời tiết của bạn).*

---

## 📁 Cấu Trúc Thư Mục

```
/Applications/ServBay/www/music/
├── index.html             # Giao diện chính (Tailwind CSS + Glassmorphism)
├── css/
│   └── styles.css         # Hiệu ứng visualizer, chuyển màu theme, animations
├── js/
│   ├── weather.js         # Module định vị GPS & Open-Meteo Weather API
│   ├── time.js            # Module đồng hồ số & chu kỳ thời gian trong ngày
│   ├── ambient-audio.js   # Bộ tổng hợp âm thanh thiên nhiên (Web Audio API)
│   ├── playlist-data.js   # Kho bài hát tuyển chọn & thuật toán chấm điểm Match Score
│   ├── player.js          # Bộ điều khiển YouTube IFrame API
│   └── app.js             # Điều phối kết nối toàn bộ hệ thống & hiệu ứng Canvas
└── README.md              # Tài liệu hướng dẫn sử dụng
```

---

## ➕ Cách Thêm Bài Hát Yêu Thích Của Bạn

Để thêm bài hát mới vào kho gợi ý tự động, bạn chỉ cần mở file [`js/playlist-data.js`](file:///Applications/ServBay/www/music/js/playlist-data.js) và bổ sung một object vào mảng `PLAYLIST_DATA`:

```javascript
{
  id: "ID_VIDEO_YOUTUBE",       // Ví dụ: "g6fnFALEseI" từ youtube.com/watch?v=g6fnFALEseI
  title: "Tên Bài Hát",
  artist: "Tên Ca Sĩ",
  duration: "4:15",
  category: "vietnam",           // "vietnam" | "international" | "instrumental"
  weathers: ["rainy", "cloudy"], // ["sunny", "cloudy", "rainy", "drizzle", "thunder", "cold"]
  times: ["sunset", "evening"],  // ["dawn", "morning", "noon", "afternoon", "sunset", "evening", "midnight"]
  moods: ["chill", "romantic"]   // ["chill", "focus", "melancholy", "energetic", "romantic", "sleep"]
}
```
