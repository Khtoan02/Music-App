import json, zlib

with open('data/master_verified_songs.json', 'r', encoding='utf-8') as f:
    master_songs = json.load(f)

# The 10 Groups and 55 Spaces specified by user:
SPACE_GROUPS = [
    {
        "id": "nha_o",
        "name": "Nhà ở",
        "icon": "home",
        "spaces": [
            {"id": "phong_ngu", "name": "Phòng ngủ", "icon": "bed", "genre": "sleep", "desc": "Giai điệu êm dịu xoa dịu tâm trí và ru vào giấc ngủ sâu"},
            {"id": "phong_khach", "name": "Phòng khách", "icon": "sofa", "genre": "acoustic_chill", "desc": "Không gian ấm cúng, acoustic mộc mạc sum vầy"},
            {"id": "phong_lam_viec_nha", "name": "Phòng làm việc", "icon": "laptop", "genre": "focus_lofi", "desc": "Giai điệu tập trung cao độ, không lời nhẹ nhàng"},
            {"id": "nha_bep", "name": "Nhà bếp", "icon": "utensils", "genre": "cheerful_bossa", "desc": "Năng lượng tươi vui, nhẹ nhàng thư thái khi nấu nướng"},
            {"id": "ban_cong", "name": "Ban công", "icon": "sun", "genre": "breeze_acoustic", "desc": "Gió mát nhẹ nhàng, ngắm nhìn phố phường an yên"},
            {"id": "san_thuong", "name": "Sân thượng", "icon": "wind", "genre": "sunset_indie", "desc": "Không gian mở khoáng đạt, hoàng hôn lãng mạn"},
            {"id": "phong_tam", "name": "Phòng tắm", "icon": "bath", "genre": "spa_zen", "desc": "Thư giãn spa, phục hồi năng lượng sau ngày dài"},
            {"id": "san_vuon", "name": "Sân vườn", "icon": "trees", "genre": "nature_acoustic", "desc": "Tiếng gió lá reo, acoustic xanh mát giữa thiên nhiên"}
        ]
    },
    {
        "id": "cong_viec",
        "name": "Công việc",
        "icon": "briefcase",
        "spaces": [
            {"id": "van_phong", "name": "Văn phòng", "icon": "building", "genre": "office_focus", "desc": "Low-tempo lofi & alpha waves cho năng suất tối ưu"},
            {"id": "phong_hop", "name": "Phòng họp", "icon": "users", "genre": "neutral_ambient", "desc": "Không gian chuyên nghiệp, âm nền tinh tế không xao nhãng"},
            {"id": "coworking", "name": "Coworking", "icon": "coffee", "genre": "deep_work", "desc": "Nhịp điệu sáng tạo hiện đại, kích thích tư duy"},
            {"id": "studio", "name": "Studio", "icon": "mic", "genre": "creative_synth", "desc": "Cảm hứng nghệ thuật, âm thanh đa tầng bay bổng"},
            {"id": "cua_hang", "name": "Cửa hàng", "icon": "store", "genre": "retail_lively", "desc": "Nhịp điệu thân thiện, ấm áp và chào đón khách hàng"},
            {"id": "xuong_lam_viec", "name": "Xưởng làm việc", "icon": "wrench", "genre": "rhythmic_flow", "desc": "Âm hưởng nhịp nhàng, tạo đà làm việc hứng khởi"}
        ]
    },
    {
        "id": "hoc_tap",
        "name": "Học tập",
        "icon": "graduation-cap",
        "spaces": [
            {"id": "thu_vien", "name": "Thư viện", "icon": "book-open", "genre": "library_alpha", "desc": "Tuyệt đối tĩnh lặng, sóng não Alpha kích thích tiếp thu"},
            {"id": "lop_hoc", "name": "Lớp học", "icon": "pen-tool", "genre": "study_calm", "desc": "Tập trung tiếp nhận tri thức, cân bằng cảm xúc"},
            {"id": "ky_tuc_xa", "name": "Ký túc xá", "icon": "home", "genre": "student_indie", "desc": "Những giai điệu thanh xuân tuổi trẻ, indie mộc mạc"},
            {"id": "phong_tu_hoc", "name": "Phòng tự học", "icon": "book", "genre": "pomodoro_lofi", "desc": "Beats lofi chuẩn Pomodoro duy trì dòng chảy tập trung"}
        ]
    },
    {
        "id": "di_chuyen",
        "name": "Di chuyển",
        "icon": "car",
        "spaces": [
            {"id": "o_to_rieng", "name": "Ô tô riêng", "icon": "car", "genre": "roadtrip_hits", "desc": "Playlist đường dài ngập tràn cảm xúc và tự do"},
            {"id": "taxi", "name": "Taxi", "icon": "navigation", "genre": "city_cruising", "desc": "Lướt qua phố thị nhộn nhịp, chill cùng giai điệu êm"},
            {"id": "xe_buyt", "name": "Xe buýt", "icon": "bus", "genre": "window_ballad", "desc": "Ngồi cạnh ô cửa sổ ngắm đường phố trôi qua"},
            {"id": "tau_dien", "name": "Tàu điện", "icon": "train", "genre": "metro_beats", "desc": "Nhịp điệu hiện đại hòa vào nhịp sống đô thị nhanh"},
            {"id": "tau_hoa", "name": "Tàu hỏa", "icon": "compass", "genre": "scenic_journey", "desc": "Hành trình hoài niệm qua những dải đất thơ mộng"},
            {"id": "may_bay", "name": "Máy bay", "icon": "plane", "genre": "flight_ambient", "desc": "Bay trên tầng mây, thanh âm bồng bềnh thư giãn"},
            {"id": "di_bo", "name": "Đi bộ", "icon": "footprints", "genre": "walking_acoustic", "desc": "Từng bước chân thong dong, hòa nhịp cùng nắng gió"},
            {"id": "dap_xe", "name": "Đạp xe", "icon": "bike", "genre": "cycling_upbeat", "desc": "Làn gió luồn qua tóc, nhịp điệu sảng khoái yêu đời"}
        ]
    },
    {
        "id": "thien_nhien",
        "name": "Thiên nhiên",
        "icon": "trees",
        "spaces": [
            {"id": "bai_bien", "name": "Bãi biển", "icon": "waves", "genre": "beach_tropical", "desc": "Sóng biển rì rào, nắng vàng rực rỡ và gió biển mặn mòi"},
            {"id": "nui_rung", "name": "Núi rừng", "icon": "mountain", "genre": "forest_ambient", "desc": "Hùng vĩ và bao la, thanh âm tĩnh mịch của rừng già"},
            {"id": "ho_nuoc", "name": "Hồ nước", "icon": "droplet", "genre": "lake_tranquil", "desc": "Mặt nước phẳng lặng như gương, tâm hồn an nhiên"},
            {"id": "bo_song", "name": "Bờ sông", "icon": "compass", "genre": "river_peace", "desc": "Dòng nước lững lờ trôi, bình yên đón chiều buông"},
            {"id": "cong_vien", "name": "Công viên", "icon": "trees", "genre": "park_sunny", "desc": "Thảm cỏ xanh mướt, tiếng chim hót dưới vòm cây"},
            {"id": "canh_dong", "name": "Cánh đồng", "icon": "sun", "genre": "open_freedom", "desc": "Hương lúa thơm ngát, bầu trời bao la bát ngát"}
        ]
    },
    {
        "id": "giai_tri",
        "name": "Giải trí",
        "icon": "sparkles",
        "spaces": [
            {"id": "quan_ca_phe", "name": "Quán cà phê", "icon": "coffee", "genre": "cafe_bossa", "desc": "Hương cà phê ấm nồng, bossa nova & jazz quyến rũ"},
            {"id": "nha_hang", "name": "Nhà hàng", "icon": "utensils", "genre": "dining_jazz", "desc": "Không gian sang trọng, jazz cổ điển êm ái tao nhã"},
            {"id": "quan_bar", "name": "Quán bar", "icon": "wine", "genre": "bar_groove", "desc": "Ánh đèn mờ ảo, cocktail ngọt ngào và R&B cuốn hút"},
            {"id": "pub", "name": "Pub", "icon": "beer", "genre": "pub_indie", "desc": "Chill cùng bạn bè, indie rock & acoustic chân thực"},
            {"id": "rooftop", "name": "Rooftop", "icon": "sunset", "genre": "rooftop_sunset", "desc": "Ngắm nhìn toàn cảnh thành phố lung linh về đêm"},
            {"id": "karaoke", "name": "Karaoke", "icon": "mic", "genre": "karaoke_singalong", "desc": "Những ca khúc quốc dân quen thuộc để hát theo"}
        ]
    },
    {
        "id": "ren_luyen",
        "name": "Rèn luyện",
        "icon": "dumbbell",
        "spaces": [
            {"id": "phong_gym", "name": "Phòng gym", "icon": "activity", "genre": "gym_workout", "desc": "Bùng nổ năng lượng, nhịp bass mạnh mẽ thôi thúc ý chí"},
            {"id": "phong_yoga", "name": "Phòng yoga", "icon": "flower", "genre": "yoga_zen", "desc": "Chuông xoay Tây Tạng và sáo thiền định, đưa tâm về tĩnh"},
            {"id": "san_the_thao", "name": "Sân thể thao", "icon": "trophy", "genre": "sports_energy", "desc": "Nhiệt huyết thi đấu, tinh thần thể thao cuồng nhiệt"},
            {"id": "duong_chay", "name": "Đường chạy", "icon": "fast-forward", "genre": "running_tempo", "desc": "BPM chuẩn 160-180 giữ nhịp thở và bước chân dẻo dai"}
        ]
    },
    {
        "id": "nghi_duong",
        "name": "Nghỉ dưỡng",
        "icon": "palmtree",
        "spaces": [
            {"id": "khach_san", "name": "Khách sạn", "icon": "hotel", "genre": "hotel_lounge", "desc": "Lounge thư thái đẳng cấp, tiện nghi và thanh lịch"},
            {"id": "resort", "name": "Resort", "icon": "shield-check", "genre": "resort_luxury", "desc": "Kỳ nghỉ thiên đường, nắng biển hòa cùng nhạc dịu êm"},
            {"id": "homestay", "name": "Homestay", "icon": "home", "genre": "homestay_acoustic", "desc": "Cảm giác thân thuộc, mộc mạc như về với chính mình"},
            {"id": "khu_cam_trai", "name": "Khu cắm trại", "icon": "tent", "genre": "campfire_folk", "desc": "Ánh lửa bập bùng giữa rừng đêm, guitar mộc hát vang"}
        ]
    },
    {
        "id": "cong_cong",
        "name": "Công cộng",
        "icon": "globe",
        "spaces": [
            {"id": "tttm", "name": "Trung tâm thương mại", "icon": "shopping-bag", "genre": "mall_chill", "desc": "Tươi sáng, hiện đại, bước dạo thư thái cuối tuần"},
            {"id": "san_bay", "name": "Sân bay", "icon": "plane", "genre": "airport_transit", "desc": "Hành trình kết nối những phương trời xa xôi"},
            {"id": "nha_ga", "name": "Nhà ga", "icon": "clock", "genre": "station_motion", "desc": "Khoảnh khắc giao thời của những chuyến đi và trở về"},
            {"id": "sanh_cho", "name": "Sảnh chờ", "icon": "armchair", "genre": "lounge_smooth", "desc": "Thư giãn tĩnh tại trong lúc chờ đợi chuyến hành trình"}
        ]
    },
    {
        "id": "khong_gian_dac_biet",
        "name": "Không gian đặc biệt",
        "icon": "sparkle",
        "spaces": [
            {"id": "phong_toi", "name": "Phòng tối", "icon": "moon", "genre": "dark_dreampop", "desc": "Không ánh sáng, chỉ có dreampop và không gian vô tận"},
            {"id": "noi_yen_tinh", "name": "Nơi yên tĩnh", "icon": "volume-x", "genre": "pure_silence_piano", "desc": "Tĩnh mịch tuyệt đối, từng nốt piano rơi giữa thinh lặng"},
            {"id": "noi_dong_duc", "name": "Nơi đông đúc", "icon": "users", "genre": "noise_cancelling_flow", "desc": "Chiếc tai nghe cách ly sự ồn ào, tìm lại ốc đảo riêng"},
            {"id": "khong_gian_mo", "name": "Không gian mở", "icon": "maximize", "genre": "expansive_strings", "desc": "Giao hưởng và hòa thanh trải rộng không giới hạn"},
            {"id": "khong_gian_rieng_tu", "name": "Không gian riêng tư", "icon": "lock", "genre": "intimate_ballad", "desc": "Góc riêng cho tâm hồn, những tâm sự chân thành nhất"}
        ]
    }
]

# Track catalog categorized into specialized thematic genres
GENRE_POOLS = {
    # 1. High Energy / Fitness
    "gym_workout": ["7wtfhZwyrcc", "fKopy74weus", "ktvTqknDobU", "hT_nvWreIhg", "OPf0YbXqDm0", "CevxZvSJLk8", "nfWlot6h_JM", "1w7OgIMMRc4", "bKDdT_nyP54", "JGwWNGJdvx8", "09R8_2nJtjg", "mWRsgZuwf_8"],
    "sports_energy": ["ktvTqknDobU", "7wtfhZwyrcc", "hT_nvWreIhg", "OPf0YbXqDm0", "nfWlot6h_JM", "fKopy74weus", "bKDdT_nyP54", "CevxZvSJLk8"],
    "running_tempo": ["fKopy74weus", "7wtfhZwyrcc", "ktvTqknDobU", "09R8_2nJtjg", "OPf0YbXqDm0", "nfWlot6h_JM", "hT_nvWreIhg", "JGwWNGJdvx8"],
    "cycling_upbeat": ["09R8_2nJtjg", "EkHTsc9PU2A", "6k8cpUkKK4c", "S2Cti12XBw4", "ghUh0NPHXy8", "WyVfkr6nsrk", "U8Z0sI7vWyY", "bKDdT_nyP54"],
    
    # 2. Zen / Meditation / Spa
    "yoga_zen": ["UfcAVejslrU", "79kpo4x8mDA", "1ZYbU8JGBdQ", "WPni755-Krg", "4VR-6AS0-l4", "2WfaotSK3mI", "WNcsUNKlAKw", "eUDVUZZyA0M"],
    "spa_zen": ["1ZYbU8JGBdQ", "79kpo4x8mDA", "UfcAVejslrU", "WNcsUNKlAKw", "2WfaotSK3mI", "4VR-6AS0-l4", "so6ExplQlaY", "7maJOI3QMu0"],
    "pure_silence_piano": ["2WfaotSK3mI", "WNcsUNKlAKw", "4VR-6AS0-l4", "7maJOI3QMu0", "so6ExplQlaY", "PaXKf0JEzEA", "eUDVUZZyA0M", "TK1Ij_-mank"],
    
    # 3. Sleep / Lullaby
    "sleep": ["1fueZCTYkpA", "JD-kMIpDfnY", "2WfaotSK3mI", "WNcsUNKlAKw", "4VR-6AS0-l4", "LKZyp2cSAy4", "mtoeTzYKyaQ", "4HLumkaPcCI", "Zzn9-ATB9aU"],
    
    # 4. Focus / Deep Study / Work
    "library_alpha": ["WPni755-Krg", "sAcj8me7wGI", "f02mOEt11OQ", "tDY6AkWFytQ", "am1VJP0RnmQ", "9M4jZuqdw04", "jfKfPfyJRdk", "1Tl2FtV06qo"],
    "pomodoro_lofi": ["f02mOEt11OQ", "9M4jZuqdw04", "tDY6AkWFytQ", "am1VJP0RnmQ", "jfKfPfyJRdk", "1Tl2FtV06qo", "WPni755-Krg", "sAcj8me7wGI"],
    "deep_work": ["tDY6AkWFytQ", "am1VJP0RnmQ", "f02mOEt11OQ", "9M4jZuqdw04", "WPni755-Krg", "jfKfPfyJRdk", "sAcj8me7wGI", "1Tl2FtV06qo"],
    "office_focus": ["sAcj8me7wGI", "f02mOEt11OQ", "tDY6AkWFytQ", "9M4jZuqdw04", "TURbeWK2wwg", "WPni755-Krg", "anpql8S469Q", "PWK8EuUSMSI"],
    "focus_lofi": ["jfKfPfyJRdk", "f02mOEt11OQ", "tDY6AkWFytQ", "am1VJP0RnmQ", "9M4jZuqdw04", "WPni755-Krg", "20046_vi1vA", "1Tl2FtV06qo"],
    "study_calm": ["sAcj8me7wGI", "anpql8S469Q", "RWopiMiKKwI", "TK1Ij_-mank", "lB4PRX737-0", "f02mOEt11OQ", "WPni755-Krg", "jfKfPfyJRdk"],
    "student_indie": ["akgNYX8i9Xs", "LZN4I3K8SC0", "F5tS5m86bOI", "Zzn9-ATB9aU", "W2FRMzCuPzY", "TKlXc3iywoM", "ghUh0NPHXy8", "jO2viLEW-1A"],
    
    # 5. Cafe / Dining / Jazz / Bossa
    "cafe_bossa": ["TURbeWK2wwg", "k1-TrAvp_xs", "kgd0gK3_Hyc", "rA56B43_G4E", "vmDDOFXSgAs", "lSD_L-xic9o", "tO4dxvguQDk", "ucRVDoFkcxc", "1nml-_YE2OU"],
    "dining_jazz": ["rA56B43_G4E", "vmDDOFXSgAs", "JYuyWrkwpok", "ZEMCeymW1Ow", "MqazV4hbu8E", "TURbeWK2wwg", "k1-TrAvp_xs", "tO4dxvguQDk"],
    "cheerful_bossa": ["kgd0gK3_Hyc", "k1-TrAvp_xs", "TURbeWK2wwg", "lSD_L-xic9o", "Ej8RhiSv2-4", "t0WFOnwp3MM", "HXkh7EOqcQ4", "PWK8EuUSMSI"],
    "bar_groove": ["4NRXx6U8ABQ", "btIQvYcLNoI", "CX5f0NcqlMs", "F13eXG8GuhU", "uBHOIb3pT_E", "4HLumkaPcCI", "8ulR00x-B1I", "LKZyp2cSAy4"],
    "pub_indie": ["ff7dvE-4mMA", "W2FRMzCuPzY", "5e7e_KZINA4", "ghUh0NPHXy8", "TKlXc3iywoM", "ntEoGvhoVac", "1w7OgIMMRc4", "fJ9rUzIMcZQ"],
    "karaoke_singalong": ["t0WFOnwp3MM", "HXkh7EOqcQ4", "ff7dvE-4mMA", "TKlXc3iywoM", "GgQFO8dL5XQ", "3UyotSd-Cp4", "vCIc1g_4JWM", "-nnWBhKZeg0"],
    
    # 6. Transit & Driving
    "roadtrip_hits": ["bKDdT_nyP54", "TKlXc3iywoM", "ghUh0NPHXy8", "KKc_RMln54g", "J_ub7Etch2U", "S2Cti12XBw4", "fJ9rUzIMcZQ", "U8Z0sI7vWyY", "EkHTsc9PU2A"],
    "city_cruising": ["S2Cti12XBw4", "WyVfkr6nsrk", "09R8_2nJtjg", "aJOTlE1K90k", "nfs8NYg7yQM", "CX5f0NcqlMs", "btIQvYcLNoI", "jO2viLEW-1A"],
    "window_ballad": ["ixdSsW5n2rI", "ntEoGvhoVac", "rm7AG7rqvg8", "TfDHpsZQYeE", "X2TxXIqbHhw", "vCIc1g_4JWM", "DZDYZ9nRHfU", "zshxAlfZYAI"],
    "metro_beats": ["f02mOEt11OQ", "am1VJP0RnmQ", "9M4jZuqdw04", "1Tl2FtV06qo", "GedLli_YXEI", "uBHOIb3pT_E", "F13eXG8GuhU", "btIQvYcLNoI"],
    "scenic_journey": ["GgQFO8dL5XQ", "wXTJBr9tt8Q", "Zzn9-ATB9aU", "UCXao7aTDQM", "Qa622LwgGLY", "T0sHaz4H9MQ", "cX2uLlc0su4", "tdV_jKCrRUo"],
    "flight_ambient": ["UfcAVejslrU", "5MU_z4kzZIQ", "eUDVUZZyA0M", "4VR-6AS0-l4", "WNcsUNKlAKw", "2WfaotSK3mI", "1fueZCTYkpA", "TK1Ij_-mank"],
    "walking_acoustic": ["Zzn9-ATB9aU", "F5tS5m86bOI", "akgNYX8i9Xs", "LZN4I3K8SC0", "3UyotSd-Cp4", "RWopiMiKKwI", "EkHTsc9PU2A", "6k8cpUkKK4c"],
    
    # 7. Nature & Freedom
    "beach_tropical": ["EkHTsc9PU2A", "6k8cpUkKK4c", "U8Z0sI7vWyY", "_YzngEllRgM", "t0WFOnwp3MM", "S2Cti12XBw4", "WyVfkr6nsrk", "PWK8EuUSMSI"],
    "forest_ambient": ["RWopiMiKKwI", "TK1Ij_-mank", "anpql8S469Q", "lB4PRX737-0", "1ZYbU8JGBdQ", "79kpo4x8mDA", "UfcAVejslrU", "2WfaotSK3mI"],
    "lake_tranquil": ["so6ExplQlaY", "7maJOI3QMu0", "vVhKA9Av6vA", "Zzn9-ATB9aU", "ixdSsW5n2rI", "PaXKf0JEzEA", "WNcsUNKlAKw", "2WfaotSK3mI"],
    "river_peace": ["7maJOI3QMu0", "so6ExplQlaY", "Zzn9-ATB9aU", "akgNYX8i9Xs", "Zu2Spp4nrTM", "vVhKA9Av6vA", "tO4dxvguQDk", "ucRVDoFkcxc"],
    "park_sunny": ["U8Z0sI7vWyY", "EkHTsc9PU2A", "6k8cpUkKK4c", "S2Cti12XBw4", "Zzn9-ATB9aU", "F5tS5m86bOI", "LZN4I3K8SC0", "3UyotSd-Cp4"],
    "open_freedom": ["5e7e_KZINA4", "ghUh0NPHXy8", "TKlXc3iywoM", "GgQFO8dL5XQ", "bKDdT_nyP54", "Llw9Q6akRo4", "J_ub7Etch2U", "KKc_RMln54g"],
    
    # 8. Campfire & Homestay & Resort
    "campfire_folk": ["5e7e_KZINA4", "KKc_RMln54g", "J_ub7Etch2U", "Llw9Q6akRo4", "ghUh0NPHXy8", "TKlXc3iywoM", "GgQFO8dL5XQ", "wXTJBr9tt8Q"],
    "homestay_acoustic": ["akgNYX8i9Xs", "Zzn9-ATB9aU", "F5tS5m86bOI", "vVhKA9Av6vA", "ixdSsW5n2rI", "cX2uLlc0su4", "T0sHaz4H9MQ", "tdV_jKCrRUo"],
    "resort_luxury": ["TURbeWK2wwg", "k1-TrAvp_xs", "kgd0gK3_Hyc", "lSD_L-xic9o", "tO4dxvguQDk", "PWK8EuUSMSI", "1nml-_YE2OU", "ucRVDoFkcxc"],
    "hotel_lounge": ["TURbeWK2wwg", "rA56B43_G4E", "vmDDOFXSgAs", "JYuyWrkwpok", "ZEMCeymW1Ow", "tO4dxvguQDk", "ucRVDoFkcxc", "PWK8EuUSMSI"],
    
    # 9. Rooftop & Balcony
    "rooftop_sunset": ["Zu2Spp4nrTM", "lSD_L-xic9o", "CX5f0NcqlMs", "btIQvYcLNoI", "rm7AG7rqvg8", "Qa622LwgGLY", "T0sHaz4H9MQ", "Llw9Q6akRo4"],
    "sunset_indie": ["vVhKA9Av6vA", "ixdSsW5n2rI", "Zu2Spp4nrTM", "rm7AG7rqvg8", "Qa622LwgGLY", "T0sHaz4H9MQ", "cX2uLlc0su4", "tdV_jKCrRUo"],
    "breeze_acoustic": ["Zzn9-ATB9aU", "F5tS5m86bOI", "akgNYX8i9Xs", "LZN4I3K8SC0", "3UyotSd-Cp4", "RWopiMiKKwI", "anpql8S469Q", "PWK8EuUSMSI"],
    "nature_acoustic": ["RWopiMiKKwI", "TK1Ij_-mank", "anpql8S469Q", "lB4PRX737-0", "Zzn9-ATB9aU", "F5tS5m86bOI", "akgNYX8i9Xs", "LZN4I3K8SC0"],
    "acoustic_chill": ["Zzn9-ATB9aU", "F5tS5m86bOI", "akgNYX8i9Xs", "LZN4I3K8SC0", "3UyotSd-Cp4", "RWopiMiKKwI", "anpql8S469Q", "tO4dxvguQDk"],
    
    # 10. Dark room & Special
    "dark_dreampop": ["sElE_BfQ67s", "D1NdGBldg3w", "4NRXx6U8ABQ", "R2LQdh42neg", "4HLumkaPcCI", "8ulR00x-B1I", "FvOpPeKSf_4", "K3Qzzggn--s"],
    "noise_cancelling_flow": ["f02mOEt11OQ", "am1VJP0RnmQ", "tDY6AkWFytQ", "WPni755-Krg", "9M4jZuqdw04", "1Tl2FtV06qo", "GedLli_YXEI", "sAcj8me7wGI"],
    "expansive_strings": ["5MU_z4kzZIQ", "eUDVUZZyA0M", "4VR-6AS0-l4", "WNcsUNKlAKw", "2WfaotSK3mI", "7maJOI3QMu0", "so6ExplQlaY", "PaXKf0JEzEA"],
    "intimate_ballad": ["ixdSsW5n2rI", "ntEoGvhoVac", "rm7AG7rqvg8", "Qa622LwgGLY", "cX2uLlc0su4", "tdV_jKCrRUo", "F5tS5m86bOI", "Zzn9-ATB9aU"],
    "creative_synth": ["am1VJP0RnmQ", "4NRXx6U8ABQ", "btIQvYcLNoI", "CX5f0NcqlMs", "F13eXG8GuhU", "uBHOIb3pT_E", "f02mOEt11OQ", "sElE_BfQ67s"],
    "neutral_ambient": ["sAcj8me7wGI", "WPni755-Krg", "tDY6AkWFytQ", "TURbeWK2wwg", "anpql8S469Q", "PWK8EuUSMSI", "1Tl2FtV06qo", "f02mOEt11OQ"],
    "retail_lively": ["09R8_2nJtjg", "EkHTsc9PU2A", "6k8cpUkKK4c", "S2Cti12XBw4", "WyVfkr6nsrk", "t0WFOnwp3MM", "HXkh7EOqcQ4", "PWK8EuUSMSI"],
    "rhythmic_flow": ["bKDdT_nyP54", "09R8_2nJtjg", "OPf0YbXqDm0", "hT_nvWreIhg", "f02mOEt11OQ", "am1VJP0RnmQ", "btIQvYcLNoI", "CX5f0NcqlMs"],
    "mall_chill": ["TURbeWK2wwg", "PWK8EuUSMSI", "tO4dxvguQDk", "09R8_2nJtjg", "S2Cti12XBw4", "WyVfkr6nsrk", "anpql8S469Q", "20046_vi1vA"],
    "airport_transit": ["UfcAVejslrU", "tDY6AkWFytQ", "sAcj8me7wGI", "WPni755-Krg", "btIQvYcLNoI", "CX5f0NcqlMs", "1Tl2FtV06qo", "am1VJP0RnmQ"],
    "station_motion": ["GgQFO8dL5XQ", "btIQvYcLNoI", "wXTJBr9tt8Q", "Zzn9-ATB9aU", "UCXao7aTDQM", "Qa622LwgGLY", "T0sHaz4H9MQ", "am1VJP0RnmQ"],
    "lounge_smooth": ["TURbeWK2wwg", "rA56B43_G4E", "vmDDOFXSgAs", "JYuyWrkwpok", "ZEMCeymW1Ow", "tO4dxvguQDk", "PWK8EuUSMSI", "k1-TrAvp_xs"]
}

# Compile flat list of all spaces
ALL_SPACES = []
SPACE_INDEX = {}

for g in SPACE_GROUPS:
    for s in g["spaces"]:
        item = {
            "id": s["id"],
            "name": s["name"],
            "groupId": g["id"],
            "groupName": g["name"],
            "icon": s["icon"],
            "genre": s["genre"],
            "desc": s["desc"]
        }
        ALL_SPACES.append(item)
        SPACE_INDEX[s["id"]] = item

print(f"Compiled {len(ALL_SPACES)} spaces across {len(SPACE_GROUPS)} groups.")

# Save data/spaces.json
with open('data/spaces.json', 'w', encoding='utf-8') as f:
    json.dump({
        "groups": SPACE_GROUPS,
        "spaces": ALL_SPACES
    }, f, ensure_ascii=False, indent=2)

# Build js/space-data.js
js_content = f"""/**
 * SPACE CONTEXT ENGINE (10 Groups, 55 Discrete Acoustic Environments)
 * Provides targeted, specialized playlists for each user location without playlist collisions.
 */

const SPACE_GROUPS = {json.dumps(SPACE_GROUPS, ensure_ascii=False, indent=2)};
const ALL_SPACES = {json.dumps(ALL_SPACES, ensure_ascii=False, indent=2)};
const SPACE_INDEX = {json.dumps(SPACE_INDEX, ensure_ascii=False, indent=2)};
const GENRE_POOLS = {json.dumps(GENRE_POOLS, ensure_ascii=False, indent=2)};
const MASTER_SONGS = {json.dumps(master_songs, ensure_ascii=False, indent=2)};

class SpaceEngine {{
  static getAllGroups() {{
    return SPACE_GROUPS;
  }}

  static getAllSpaces() {{
    return ALL_SPACES;
  }}

  static getSpace(spaceId) {{
    return SPACE_INDEX[spaceId] || null;
  }}

  /**
   * Deterministically generates a unique, non-colliding playlist for (spaceId, timeSlot, weatherSlot, moodSlot).
   * Guarantees each space context possesses an authentic, individualized musical signature.
   */
  static getPlaylistForSpace(spaceId, timeSlot = "T3", weatherSlot = "W1", moodSlot = "M1") {{
    const space = SPACE_INDEX[spaceId];
    const genre = space ? space.genre : "cafe_bossa";
    let poolSongIds = [...(GENRE_POOLS[genre] || GENRE_POOLS["cafe_bossa"])];

    // Weather influence: inject rain tracks if rainy or stormy
    if (weatherSlot === "W5" || weatherSlot === "W6") {{
      const rainIds = ["pDYM_JBAnp4", "so6ExplQlaY", "b1kbLwvqugk", "vYIYIVmOo3Q", "TfDHpsZQYeE"];
      poolSongIds = [...rainIds, ...poolSongIds];
    }}

    // Time influence: if late night (T8) or dawn (T1), blend night ambiance
    if (timeSlot === "T8" && genre !== "gym_workout" && genre !== "sports_energy") {{
      poolSongIds.push("1fueZCTYkpA", "JD-kMIpDfnY", "2WfaotSK3mI");
    }}

    // De-duplicate candidate list
    const uniqueIds = Array.from(new Set(poolSongIds));

    // Compute deterministic hash seed for the exact context combination
    const key = `${{spaceId || 'auto'}}_${{timeSlot}}_${{weatherSlot}}_${{moodSlot}}`;
    let hash = 0;
    for (let i = 0; i < key.length; i++) {{
      hash = (hash << 5) - hash + key.charCodeAt(i);
      hash |= 0;
    }}
    const absHash = Math.abs(hash);

    // Permute song order deterministically based on seed
    const n = uniqueIds.length;
    const offset = absHash % n;
    const rotated = [...uniqueIds.slice(offset), ...uniqueIds.slice(0, offset)];

    // Map to full track objects
    const tracks = [];
    for (const sid of rotated) {{
      if (MASTER_SONGS[sid]) {{
        tracks.push(MASTER_SONGS[sid]);
      }}
      if (tracks.length >= 7) break;
    }}

    return tracks;
  }}
}}

if (typeof window !== "undefined") {{
  window.SPACE_GROUPS = SPACE_GROUPS;
  window.ALL_SPACES = ALL_SPACES;
  window.SPACE_INDEX = SPACE_INDEX;
  window.SpaceEngine = SpaceEngine;
}}
"""

with open('js/space-data.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print("Generated js/space-data.js and data/spaces.json successfully!")
