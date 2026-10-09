# 🎵 AuraBeat - 4K Ultra HD Living Weather & Ambient Music App

Ứng dụng web nghe nhạc và thưởng thức hình nền sống động 4K theo thời gian thực, tự động thích ứng với **280 bối cảnh môi trường đa chiều** (`[8 Khung Giờ] × [7 Kiểu Thời Tiết] × [5 Trạng Thái Cảm Xúc]`).

---

## 🌟 Trải Nghiệm & Tính Năng Đột Phá

1. **Thiết Kế Tối Giản Ultra-Zen (Zen Minimalist Layout):**
   - **Màn hình trung tâm:** Dành trọn vẹn cho đồng hồ số điện tử siêu nét (Digital Clock), ngày tháng tiếng Việt chuẩn xác và một câu danh ngôn / thơ ngữ cảnh tinh tế (Contextual Quote).
   - **Thanh điều khiển đáy đồng nhất (Unified Bottom Dock):** Gom toàn bộ định vị GPS, thời tiết theo thời gian thực, huy hiệu mã bối cảnh (Matrix Badge), nút chuyển cảnh 4K, bộ chọn cảm xúc (Mood Pills), và trình phát nhạc vào một thanh dock kính mờ sang trọng.
   - **Hình ảnh 4K nguyên bản (Pure 4K Original Clarity):** Giữ nguyên độ sắc nét và màu sắc gốc của ảnh chất lượng cao 4K/3K, không dùng lớp phủ tối màu (overlay/tint) để bạn ngắm nhìn cảnh sắc chân thực nhất.

2. **Ma Trận 280 Bối Cảnh Toàn Diện (Matrix 280 Grid):**
   - Công thức: $8 \text{ Khung giờ } (T_1..T_8) \times 7 \text{ Thời tiết } (W_1..W_7) \times 5 \text{ Cảm xúc } (M_1..M_5) = 280 \text{ trường hợp}$.
   - **8 Khung giờ:**
     - `T1`: Rạng sáng (04:00–06:00)
     - `T2`: Sáng sớm (06:00–08:00)
     - `T3`: Buổi sáng (08:00–11:00)
     - `T4`: Buổi trưa (11:00–13:00)
     - `T5`: Buổi chiều (13:00–16:00)
     - `T6`: Chiều tà / Hoàng hôn (16:00–18:00)
     - `T7`: Buổi tối (18:00–21:00)
     - `T8`: Đêm khuya (21:00–04:00)
   - **7 Kiểu thời tiết:**
     - `W1`: Trời trong
     - `W2`: Nắng gắt
     - `W3`: Mây thưa
     - `W4`: Âm u
     - `W5`: Mưa nhẹ
     - `W6`: Mưa lớn
     - `W7`: Sương mù
   - **5 Trạng thái cảm xúc:**
     - `M1`: Bình yên
     - `M2`: Tươi vui
     - `M3`: Buồn
     - `M4`: Hoài niệm
     - `M5`: Tập trung

3. **Kho Hình Ảnh 4K & Âm Nhạc Tuyển Chọn 100% Khả Dụng:**
   - Mỗi bối cảnh trong 280 trường hợp sở hữu **2–3 hình nền 4K chuẩn sắc nét** đúng với mô tả chi tiết của từng khoảnh khắc.
   - Sở hữu **5–8 bản nhạc tuyển chọn** cho từng bối cảnh, 100% đã được kiểm định khả dụng nhúng (oEmbed 200 OK) trên YouTube Player, loại bỏ hoàn toàn lỗi bản quyền 101/150/404.

4. **Chuyển Đổi Trạng Thái Hoàn Toàn Tự Động (Autonomous Transition):**
   - Hệ thống tự nhận diện sự chuyển giao của thời gian (ví dụ: từ chiều tà sang hoàng hôn lúc 18:00, sang đêm khuya lúc 21:00) và cập nhật thời tiết mỗi 3 phút từ Open-Meteo API.
   - **Tự động chuyển đổi hình nền, quote thơ và hàng đợi bài hát mượt mà không cần load lại trang!**
   - Khi gập mở laptop hoặc quay lại tab trình duyệt, hệ thống tự động đồng bộ tức thì.

5. **Hiệu Ứng Thiên Văn & Thời Tiết Thực Tế (Realistic Atmosphere & Celestial Bodies):**
   - **☀️ Mặt trời góc trái (Top-Left Sun):** Tỏa sáng rực rỡ vào ban ngày trời nắng với quầng hào quang ấm áp (solar corona) và tia nắng lan tỏa nhẹ nhàng.
   - **🌙 Mặt trăng góc phải (Top-Right Moon):** Xuất hiện thanh khiết vào buổi tối và đêm khuya với ánh trăng bạc huyền ảo, vầng hào quang êm dịu và các vì sao lấp lánh xung quanh.
   - **🌧️ Hạt mưa rơi & Giọt nước đọng trên kính (Window Droplets FX):** Khi trời mưa, màn mưa rơi nghiêng theo chiều gió kết hợp các giọt nước mưa trong suốt ngưng đọng và trượt chậm trên mặt kính như đang nhìn qua khung cửa sổ.

6. **Trình Tạo Âm Thanh Môi Trường (Procedural Web Audio Rain):**
   - Tạo tiếng mưa rơi tự nhiên bằng thuật toán Web Audio API, hòa quyện cùng bản nhạc đang phát để tăng cảm giác thư giãn sâu.

---

## 🚀 Cách Chạy Ứng Dụng

- **Địa chỉ ServBay trực tiếp:** 👉 [https://servbay.host/music/](https://servbay.host/music/)
- **Hoặc mở file trực tiếp:** `/Applications/ServBay/www/music/index.html`

---

## 📁 Cấu Trúc Dự Án

```
/Applications/ServBay/www/music/
├── index.html                  # Giao diện chính Ultra-Zen
├── css/
│   └── styles.css              # Kiểu dáng giao diện kính mờ & typography
├── data/
│   ├── matrix_280.json         # Cơ sở dữ liệu 280 bối cảnh hoàn chỉnh
│   ├── master_verified_songs.json # Danh mục 110+ bài hát YouTube đã xác thực
│   └── verified_photos.json    # Danh mục ảnh 4K Unsplash đã kiểm định
├── js/
│   ├── matrix-data.js          # MatrixEngine & dữ liệu ma trận 280 bối cảnh
│   ├── space-data.js           # SpaceEngine quản lý 10 nhóm & 55 không gian
│   ├── atmosphere-fx.js        # Hiệu ứng mặt trời góc trái, mặt trăng góc phải & hạt mưa trên kính
│   ├── time.js                 # Bộ đếm thời gian thực & phân loại khung giờ T1..T8
│   ├── weather.js              # Định vị GPS & Open-Meteo API
│   ├── player.js               # Trình phát YouTube IFrame API với cơ chế tự phục hồi
│   ├── ambient-audio.js        # Bộ tổng hợp âm thanh mưa Web Audio API
│   └── app.js                  # Bộ não điều phối chuyển đổi bối cảnh tự động
├── scripts/
│   ├── raw_descriptions.txt   # 280 bản mô tả bối cảnh chi tiết gốc
│   └── build_280_matrix.py     # Script tự động xây dựng & kiểm định ma trận
└── README.md
```
