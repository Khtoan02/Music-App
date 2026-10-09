import json

SPACES = {
    "nha_o": {
        "name": "Nhà ở",
        "icon": "home",
        "items": [
            {"id": "phong_ngu", "name": "Phòng ngủ", "icon": "bed", "vibe": "sleep"},
            {"id": "phong_khach", "name": "Phòng khách", "icon": "sofa", "vibe": "cozy_acoustic"},
            {"id": "phong_lam_viec_nha", "name": "Phòng làm việc", "icon": "laptop", "vibe": "focus_lofi"},
            {"id": "nha_bep", "name": "Nhà bếp", "icon": "utensils", "vibe": "cheerful_pop"},
            {"id": "ban_cong", "name": "Ban công", "icon": "sun", "vibe": "breeze_chill"},
            {"id": "san_thuong", "name": "Sân thượng", "icon": "wind", "vibe": "sunset_chill"},
            {"id": "phong_tam", "name": "Phòng tắm", "icon": "bath", "vibe": "spa_relax"},
            {"id": "san_vuon", "name": "Sân vườn", "icon": "flower", "vibe": "nature_acoustic"}
        ]
    },
    "cong_viec": {
        "name": "Công việc",
        "icon": "briefcase",
        "items": [
            {"id": "van_phong", "name": "Văn phòng", "icon": "building", "vibe": "office_focus"},
            {"id": "phong_hop", "name": "Phòng họp", "icon": "users", "vibe": "neutral_ambient"},
            {"id": "coworking", "name": "Coworking", "icon": "coffee", "vibe": "deep_work"},
            {"id": "studio", "name": "Studio", "icon": "mic", "vibe": "creative_synth"},
            {"id": "cua_hang", "name": "Cửa hàng", "icon": "store", "vibe": "retail_lively"},
            {"id": "xuong_lam_viec", "name": "Xưởng làm việc", "icon": "wrench", "vibe": "rhythmic_flow"}
        ]
    },
    "hoc_tap": {
        "name": "Học tập",
        "icon": "graduation-cap",
        "items": [
            {"id": "thu_vien", "name": "Thư viện", "icon": "book-open", "vibe": "library_alpha"},
            {"id": "lop_hoc", "name": "Lớp học", "icon": "pen-tool", "vibe": "study_calm"},
            {"id": "ky_tuc_xa", "name": "Ký túc xá", "icon": "home", "vibe": "student_indie"},
            {"id": "phong_tu_hoc", "name": "Phòng tự học", "icon": "book", "vibe": "pomodoro_lofi"}
        ]
    },
    "di_chuyen": {
        "name": "Di chuyển",
        "icon": "car",
        "items": [
            {"id": "o_to_rieng", "name": "Ô tô riêng", "icon": "car", "vibe": "roadtrip_hits"},
            {"id": "taxi", "name": "Taxi", "icon": "navigation", "vibe": "city_cruising"},
            {"id": "xe_buyt", "name": "Xe buýt", "icon": "bus", "vibe": "window_ballad"},
            {"id": "tau_dien", "name": "Tàu điện", "icon": "train", "vibe": "metro_beats"},
            {"id": "tau_hoa", "name": "Tàu hỏa", "icon": "train-track", "vibe": "scenic_journey"},
            {"id": "may_bay", "name": "Máy bay", "icon": "plane", "vibe": "flight_ambient"},
            {"id": "di_bo", "name": "Đi bộ", "icon": "footprints", "vibe": "walking_acoustic"},
            {"id": "dap_xe", "name": "Đạp xe", "icon": "bike", "vibe": "cycling_upbeat"}
        ]
    },
    "thien_nhien": {
        "name": "Thiên nhiên",
        "icon": "trees",
        "items": [
            {"id": "bai_bien", "name": "Bãi biển", "icon": "waves", "vibe": "beach_tropical"},
            {"id": "nui_rung", "name": "Núi rừng", "icon": "mountain", "vibe": "forest_ambient"},
            {"id": "ho_nuoc", "name": "Hồ nước", "icon": "droplet", "vibe": "lake_tranquil"},
            {"id": "bo_song", "name": "Bờ sông", "icon": "fish", "vibe": "river_peace"},
            {"id": "cong_vien", "name": "Công viên", "icon": "trees", "vibe": "park_sunny"},
            {"id": "canh_dong", "name": "Cánh đồng", "icon": "sun", "vibe": "open_freedom"}
        ]
    },
    "giai_tri": {
        "name": "Giải trí",
        "icon": "sparkles",
        "items": [
            {"id": "quan_ca_phe", "name": "Quán cà phê", "icon": "coffee", "vibe": "cafe_bossa"},
            {"id": "nha_hang", "name": "Nhà hàng", "icon": "utensils", "vibe": "dining_jazz"},
            {"id": "quan_bar", "name": "Quán bar", "icon": "wine", "vibe": "bar_groove"},
            {"id": "pub", "name": "Pub", "icon": "beer", "vibe": "pub_indie"},
            {"id": "rooftop", "name": "Rooftop", "icon": "compass", "vibe": "rooftop_sunset"},
            {"id": "karaoke", "name": "Karaoke", "icon": "mic-2", "vibe": "karaoke_singalong"}
        ]
    },
    "ren_luyen": {
        "name": "Rèn luyện",
        "icon": "dumbbell",
        "items": [
            {"id": "phong_gym", "name": "Phòng gym", "icon": "activity", "vibe": "gym_workout"},
            {"id": "phong_yoga", "name": "Phòng yoga", "icon": "flower-2", "vibe": "yoga_zen"},
            {"id": "san_the_thao", "name": "Sân thể thao", "icon": "trophy", "vibe": "sports_energy"},
            {"id": "duong_chay", "name": "Đường chạy", "icon": "fast-forward", "vibe": "running_tempo"}
        ]
    },
    "nghi_duong": {
        "name": "Nghỉ dưỡng",
        "icon": "palmtree",
        "items": [
            {"id": "khach_san", "name": "Khách sạn", "icon": "hotel", "vibe": "hotel_lounge"},
            {"id": "resort", "name": "Resort", "icon": "shield-check", "vibe": "resort_luxury"},
            {"id": "homestay", "name": "Homestay", "icon": "home", "vibe": "homestay_acoustic"},
            {"id": "khu_cam_trai", "name": "Khu cắm trại", "icon": "tent", "vibe": "campfire_folk"}
        ]
    },
    "cong_cong": {
        "name": "Công cộng",
        "icon": "globe",
        "items": [
            {"id": "tttm", "name": "Trung tâm thương mại", "icon": "shopping-bag", "vibe": "mall_chill"},
            {"id": "san_bay", "name": "Sân bay", "icon": "plane-takeoff", "vibe": "airport_transit"},
            {"id": "nha_ga", "name": "Nhà ga", "icon": "clock", "vibe": "station_motion"},
            {"id": "sanh_cho", "name": "Sảnh chờ", "icon": "armchair", "vibe": "lounge_smooth"}
        ]
    },
    "khong_gian_dac_biet": {
        "name": "Không gian đặc biệt",
        "icon": "moon",
        "items": [
            {"id": "phong_toi", "name": "Phòng tối", "icon": "moon", "vibe": "dark_dreampop"},
            {"id": "noi_yen_tinh", "name": "Nơi yên tĩnh", "icon": "volume-1", "vibe": "pure_silence_piano"},
            {"id": "noi_dong_duc", "name": "Nơi đông đúc", "icon": "users", "vibe": "noise_cancelling_flow"},
            {"id": "khong_gian_mo", "name": "Không gian mở", "icon": "maximize", "vibe": "expansive_strings"},
            {"id": "khong_gian_rieng_tu", "name": "Không gian riêng tư", "icon": "lock", "vibe": "intimate_ballad"}
        ]
    }
}

total_items = sum(len(g['items']) for g in SPACES.values())
print(f"Total Space Groups: {len(SPACES)}, Total Unique Contexts: {total_items}")
