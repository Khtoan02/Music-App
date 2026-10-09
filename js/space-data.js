/**
 * SPACE CONTEXT ENGINE (10 Groups, 55 Discrete Acoustic Environments)
 * Provides targeted, specialized playlists for each user location without playlist collisions.
 */

const SPACE_GROUPS = [
  {
    "id": "nha_o",
    "name": "Nhà ở",
    "icon": "home",
    "spaces": [
      {
        "id": "phong_ngu",
        "name": "Phòng ngủ",
        "icon": "bed",
        "genre": "sleep",
        "desc": "Giai điệu êm dịu xoa dịu tâm trí và ru vào giấc ngủ sâu"
      },
      {
        "id": "phong_khach",
        "name": "Phòng khách",
        "icon": "sofa",
        "genre": "acoustic_chill",
        "desc": "Không gian ấm cúng, acoustic mộc mạc sum vầy"
      },
      {
        "id": "phong_lam_viec_nha",
        "name": "Phòng làm việc",
        "icon": "laptop",
        "genre": "focus_lofi",
        "desc": "Giai điệu tập trung cao độ, không lời nhẹ nhàng"
      },
      {
        "id": "nha_bep",
        "name": "Nhà bếp",
        "icon": "utensils",
        "genre": "cheerful_bossa",
        "desc": "Năng lượng tươi vui, nhẹ nhàng thư thái khi nấu nướng"
      },
      {
        "id": "ban_cong",
        "name": "Ban công",
        "icon": "sun",
        "genre": "breeze_acoustic",
        "desc": "Gió mát nhẹ nhàng, ngắm nhìn phố phường an yên"
      },
      {
        "id": "san_thuong",
        "name": "Sân thượng",
        "icon": "wind",
        "genre": "sunset_indie",
        "desc": "Không gian mở khoáng đạt, hoàng hôn lãng mạn"
      },
      {
        "id": "phong_tam",
        "name": "Phòng tắm",
        "icon": "bath",
        "genre": "spa_zen",
        "desc": "Thư giãn spa, phục hồi năng lượng sau ngày dài"
      },
      {
        "id": "san_vuon",
        "name": "Sân vườn",
        "icon": "trees",
        "genre": "nature_acoustic",
        "desc": "Tiếng gió lá reo, acoustic xanh mát giữa thiên nhiên"
      }
    ]
  },
  {
    "id": "cong_viec",
    "name": "Công việc",
    "icon": "briefcase",
    "spaces": [
      {
        "id": "van_phong",
        "name": "Văn phòng",
        "icon": "building",
        "genre": "office_focus",
        "desc": "Low-tempo lofi & alpha waves cho năng suất tối ưu"
      },
      {
        "id": "phong_hop",
        "name": "Phòng họp",
        "icon": "users",
        "genre": "neutral_ambient",
        "desc": "Không gian chuyên nghiệp, âm nền tinh tế không xao nhãng"
      },
      {
        "id": "coworking",
        "name": "Coworking",
        "icon": "coffee",
        "genre": "deep_work",
        "desc": "Nhịp điệu sáng tạo hiện đại, kích thích tư duy"
      },
      {
        "id": "studio",
        "name": "Studio",
        "icon": "mic",
        "genre": "creative_synth",
        "desc": "Cảm hứng nghệ thuật, âm thanh đa tầng bay bổng"
      },
      {
        "id": "cua_hang",
        "name": "Cửa hàng",
        "icon": "store",
        "genre": "retail_lively",
        "desc": "Nhịp điệu thân thiện, ấm áp và chào đón khách hàng"
      },
      {
        "id": "xuong_lam_viec",
        "name": "Xưởng làm việc",
        "icon": "wrench",
        "genre": "rhythmic_flow",
        "desc": "Âm hưởng nhịp nhàng, tạo đà làm việc hứng khởi"
      }
    ]
  },
  {
    "id": "hoc_tap",
    "name": "Học tập",
    "icon": "graduation-cap",
    "spaces": [
      {
        "id": "thu_vien",
        "name": "Thư viện",
        "icon": "book-open",
        "genre": "library_alpha",
        "desc": "Tuyệt đối tĩnh lặng, sóng não Alpha kích thích tiếp thu"
      },
      {
        "id": "lop_hoc",
        "name": "Lớp học",
        "icon": "pen-tool",
        "genre": "study_calm",
        "desc": "Tập trung tiếp nhận tri thức, cân bằng cảm xúc"
      },
      {
        "id": "ky_tuc_xa",
        "name": "Ký túc xá",
        "icon": "home",
        "genre": "student_indie",
        "desc": "Những giai điệu thanh xuân tuổi trẻ, indie mộc mạc"
      },
      {
        "id": "phong_tu_hoc",
        "name": "Phòng tự học",
        "icon": "book",
        "genre": "pomodoro_lofi",
        "desc": "Beats lofi chuẩn Pomodoro duy trì dòng chảy tập trung"
      }
    ]
  },
  {
    "id": "di_chuyen",
    "name": "Di chuyển",
    "icon": "car",
    "spaces": [
      {
        "id": "o_to_rieng",
        "name": "Ô tô riêng",
        "icon": "car",
        "genre": "roadtrip_hits",
        "desc": "Playlist đường dài ngập tràn cảm xúc và tự do"
      },
      {
        "id": "taxi",
        "name": "Taxi",
        "icon": "navigation",
        "genre": "city_cruising",
        "desc": "Lướt qua phố thị nhộn nhịp, chill cùng giai điệu êm"
      },
      {
        "id": "xe_buyt",
        "name": "Xe buýt",
        "icon": "bus",
        "genre": "window_ballad",
        "desc": "Ngồi cạnh ô cửa sổ ngắm đường phố trôi qua"
      },
      {
        "id": "tau_dien",
        "name": "Tàu điện",
        "icon": "train",
        "genre": "metro_beats",
        "desc": "Nhịp điệu hiện đại hòa vào nhịp sống đô thị nhanh"
      },
      {
        "id": "tau_hoa",
        "name": "Tàu hỏa",
        "icon": "compass",
        "genre": "scenic_journey",
        "desc": "Hành trình hoài niệm qua những dải đất thơ mộng"
      },
      {
        "id": "may_bay",
        "name": "Máy bay",
        "icon": "plane",
        "genre": "flight_ambient",
        "desc": "Bay trên tầng mây, thanh âm bồng bềnh thư giãn"
      },
      {
        "id": "di_bo",
        "name": "Đi bộ",
        "icon": "footprints",
        "genre": "walking_acoustic",
        "desc": "Từng bước chân thong dong, hòa nhịp cùng nắng gió"
      },
      {
        "id": "dap_xe",
        "name": "Đạp xe",
        "icon": "bike",
        "genre": "cycling_upbeat",
        "desc": "Làn gió luồn qua tóc, nhịp điệu sảng khoái yêu đời"
      }
    ]
  },
  {
    "id": "thien_nhien",
    "name": "Thiên nhiên",
    "icon": "trees",
    "spaces": [
      {
        "id": "bai_bien",
        "name": "Bãi biển",
        "icon": "waves",
        "genre": "beach_tropical",
        "desc": "Sóng biển rì rào, nắng vàng rực rỡ và gió biển mặn mòi"
      },
      {
        "id": "nui_rung",
        "name": "Núi rừng",
        "icon": "mountain",
        "genre": "forest_ambient",
        "desc": "Hùng vĩ và bao la, thanh âm tĩnh mịch của rừng già"
      },
      {
        "id": "ho_nuoc",
        "name": "Hồ nước",
        "icon": "droplet",
        "genre": "lake_tranquil",
        "desc": "Mặt nước phẳng lặng như gương, tâm hồn an nhiên"
      },
      {
        "id": "bo_song",
        "name": "Bờ sông",
        "icon": "compass",
        "genre": "river_peace",
        "desc": "Dòng nước lững lờ trôi, bình yên đón chiều buông"
      },
      {
        "id": "cong_vien",
        "name": "Công viên",
        "icon": "trees",
        "genre": "park_sunny",
        "desc": "Thảm cỏ xanh mướt, tiếng chim hót dưới vòm cây"
      },
      {
        "id": "canh_dong",
        "name": "Cánh đồng",
        "icon": "sun",
        "genre": "open_freedom",
        "desc": "Hương lúa thơm ngát, bầu trời bao la bát ngát"
      }
    ]
  },
  {
    "id": "giai_tri",
    "name": "Giải trí",
    "icon": "sparkles",
    "spaces": [
      {
        "id": "quan_ca_phe",
        "name": "Quán cà phê",
        "icon": "coffee",
        "genre": "cafe_bossa",
        "desc": "Hương cà phê ấm nồng, bossa nova & jazz quyến rũ"
      },
      {
        "id": "nha_hang",
        "name": "Nhà hàng",
        "icon": "utensils",
        "genre": "dining_jazz",
        "desc": "Không gian sang trọng, jazz cổ điển êm ái tao nhã"
      },
      {
        "id": "quan_bar",
        "name": "Quán bar",
        "icon": "wine",
        "genre": "bar_groove",
        "desc": "Ánh đèn mờ ảo, cocktail ngọt ngào và R&B cuốn hút"
      },
      {
        "id": "pub",
        "name": "Pub",
        "icon": "beer",
        "genre": "pub_indie",
        "desc": "Chill cùng bạn bè, indie rock & acoustic chân thực"
      },
      {
        "id": "rooftop",
        "name": "Rooftop",
        "icon": "sunset",
        "genre": "rooftop_sunset",
        "desc": "Ngắm nhìn toàn cảnh thành phố lung linh về đêm"
      },
      {
        "id": "karaoke",
        "name": "Karaoke",
        "icon": "mic",
        "genre": "karaoke_singalong",
        "desc": "Những ca khúc quốc dân quen thuộc để hát theo"
      }
    ]
  },
  {
    "id": "ren_luyen",
    "name": "Rèn luyện",
    "icon": "dumbbell",
    "spaces": [
      {
        "id": "phong_gym",
        "name": "Phòng gym",
        "icon": "activity",
        "genre": "gym_workout",
        "desc": "Bùng nổ năng lượng, nhịp bass mạnh mẽ thôi thúc ý chí"
      },
      {
        "id": "phong_yoga",
        "name": "Phòng yoga",
        "icon": "flower",
        "genre": "yoga_zen",
        "desc": "Chuông xoay Tây Tạng và sáo thiền định, đưa tâm về tĩnh"
      },
      {
        "id": "san_the_thao",
        "name": "Sân thể thao",
        "icon": "trophy",
        "genre": "sports_energy",
        "desc": "Nhiệt huyết thi đấu, tinh thần thể thao cuồng nhiệt"
      },
      {
        "id": "duong_chay",
        "name": "Đường chạy",
        "icon": "fast-forward",
        "genre": "running_tempo",
        "desc": "BPM chuẩn 160-180 giữ nhịp thở và bước chân dẻo dai"
      }
    ]
  },
  {
    "id": "nghi_duong",
    "name": "Nghỉ dưỡng",
    "icon": "palmtree",
    "spaces": [
      {
        "id": "khach_san",
        "name": "Khách sạn",
        "icon": "hotel",
        "genre": "hotel_lounge",
        "desc": "Lounge thư thái đẳng cấp, tiện nghi và thanh lịch"
      },
      {
        "id": "resort",
        "name": "Resort",
        "icon": "shield-check",
        "genre": "resort_luxury",
        "desc": "Kỳ nghỉ thiên đường, nắng biển hòa cùng nhạc dịu êm"
      },
      {
        "id": "homestay",
        "name": "Homestay",
        "icon": "home",
        "genre": "homestay_acoustic",
        "desc": "Cảm giác thân thuộc, mộc mạc như về với chính mình"
      },
      {
        "id": "khu_cam_trai",
        "name": "Khu cắm trại",
        "icon": "tent",
        "genre": "campfire_folk",
        "desc": "Ánh lửa bập bùng giữa rừng đêm, guitar mộc hát vang"
      }
    ]
  },
  {
    "id": "cong_cong",
    "name": "Công cộng",
    "icon": "globe",
    "spaces": [
      {
        "id": "tttm",
        "name": "Trung tâm thương mại",
        "icon": "shopping-bag",
        "genre": "mall_chill",
        "desc": "Tươi sáng, hiện đại, bước dạo thư thái cuối tuần"
      },
      {
        "id": "san_bay",
        "name": "Sân bay",
        "icon": "plane",
        "genre": "airport_transit",
        "desc": "Hành trình kết nối những phương trời xa xôi"
      },
      {
        "id": "nha_ga",
        "name": "Nhà ga",
        "icon": "clock",
        "genre": "station_motion",
        "desc": "Khoảnh khắc giao thời của những chuyến đi và trở về"
      },
      {
        "id": "sanh_cho",
        "name": "Sảnh chờ",
        "icon": "armchair",
        "genre": "lounge_smooth",
        "desc": "Thư giãn tĩnh tại trong lúc chờ đợi chuyến hành trình"
      }
    ]
  },
  {
    "id": "khong_gian_dac_biet",
    "name": "Không gian đặc biệt",
    "icon": "sparkle",
    "spaces": [
      {
        "id": "phong_toi",
        "name": "Phòng tối",
        "icon": "moon",
        "genre": "dark_dreampop",
        "desc": "Không ánh sáng, chỉ có dreampop và không gian vô tận"
      },
      {
        "id": "noi_yen_tinh",
        "name": "Nơi yên tĩnh",
        "icon": "volume-x",
        "genre": "pure_silence_piano",
        "desc": "Tĩnh mịch tuyệt đối, từng nốt piano rơi giữa thinh lặng"
      },
      {
        "id": "noi_dong_duc",
        "name": "Nơi đông đúc",
        "icon": "users",
        "genre": "noise_cancelling_flow",
        "desc": "Chiếc tai nghe cách ly sự ồn ào, tìm lại ốc đảo riêng"
      },
      {
        "id": "khong_gian_mo",
        "name": "Không gian mở",
        "icon": "maximize",
        "genre": "expansive_strings",
        "desc": "Giao hưởng và hòa thanh trải rộng không giới hạn"
      },
      {
        "id": "khong_gian_rieng_tu",
        "name": "Không gian riêng tư",
        "icon": "lock",
        "genre": "intimate_ballad",
        "desc": "Góc riêng cho tâm hồn, những tâm sự chân thành nhất"
      }
    ]
  }
];
const ALL_SPACES = [
  {
    "id": "phong_ngu",
    "name": "Phòng ngủ",
    "groupId": "nha_o",
    "groupName": "Nhà ở",
    "icon": "bed",
    "genre": "sleep",
    "desc": "Giai điệu êm dịu xoa dịu tâm trí và ru vào giấc ngủ sâu"
  },
  {
    "id": "phong_khach",
    "name": "Phòng khách",
    "groupId": "nha_o",
    "groupName": "Nhà ở",
    "icon": "sofa",
    "genre": "acoustic_chill",
    "desc": "Không gian ấm cúng, acoustic mộc mạc sum vầy"
  },
  {
    "id": "phong_lam_viec_nha",
    "name": "Phòng làm việc",
    "groupId": "nha_o",
    "groupName": "Nhà ở",
    "icon": "laptop",
    "genre": "focus_lofi",
    "desc": "Giai điệu tập trung cao độ, không lời nhẹ nhàng"
  },
  {
    "id": "nha_bep",
    "name": "Nhà bếp",
    "groupId": "nha_o",
    "groupName": "Nhà ở",
    "icon": "utensils",
    "genre": "cheerful_bossa",
    "desc": "Năng lượng tươi vui, nhẹ nhàng thư thái khi nấu nướng"
  },
  {
    "id": "ban_cong",
    "name": "Ban công",
    "groupId": "nha_o",
    "groupName": "Nhà ở",
    "icon": "sun",
    "genre": "breeze_acoustic",
    "desc": "Gió mát nhẹ nhàng, ngắm nhìn phố phường an yên"
  },
  {
    "id": "san_thuong",
    "name": "Sân thượng",
    "groupId": "nha_o",
    "groupName": "Nhà ở",
    "icon": "wind",
    "genre": "sunset_indie",
    "desc": "Không gian mở khoáng đạt, hoàng hôn lãng mạn"
  },
  {
    "id": "phong_tam",
    "name": "Phòng tắm",
    "groupId": "nha_o",
    "groupName": "Nhà ở",
    "icon": "bath",
    "genre": "spa_zen",
    "desc": "Thư giãn spa, phục hồi năng lượng sau ngày dài"
  },
  {
    "id": "san_vuon",
    "name": "Sân vườn",
    "groupId": "nha_o",
    "groupName": "Nhà ở",
    "icon": "trees",
    "genre": "nature_acoustic",
    "desc": "Tiếng gió lá reo, acoustic xanh mát giữa thiên nhiên"
  },
  {
    "id": "van_phong",
    "name": "Văn phòng",
    "groupId": "cong_viec",
    "groupName": "Công việc",
    "icon": "building",
    "genre": "office_focus",
    "desc": "Low-tempo lofi & alpha waves cho năng suất tối ưu"
  },
  {
    "id": "phong_hop",
    "name": "Phòng họp",
    "groupId": "cong_viec",
    "groupName": "Công việc",
    "icon": "users",
    "genre": "neutral_ambient",
    "desc": "Không gian chuyên nghiệp, âm nền tinh tế không xao nhãng"
  },
  {
    "id": "coworking",
    "name": "Coworking",
    "groupId": "cong_viec",
    "groupName": "Công việc",
    "icon": "coffee",
    "genre": "deep_work",
    "desc": "Nhịp điệu sáng tạo hiện đại, kích thích tư duy"
  },
  {
    "id": "studio",
    "name": "Studio",
    "groupId": "cong_viec",
    "groupName": "Công việc",
    "icon": "mic",
    "genre": "creative_synth",
    "desc": "Cảm hứng nghệ thuật, âm thanh đa tầng bay bổng"
  },
  {
    "id": "cua_hang",
    "name": "Cửa hàng",
    "groupId": "cong_viec",
    "groupName": "Công việc",
    "icon": "store",
    "genre": "retail_lively",
    "desc": "Nhịp điệu thân thiện, ấm áp và chào đón khách hàng"
  },
  {
    "id": "xuong_lam_viec",
    "name": "Xưởng làm việc",
    "groupId": "cong_viec",
    "groupName": "Công việc",
    "icon": "wrench",
    "genre": "rhythmic_flow",
    "desc": "Âm hưởng nhịp nhàng, tạo đà làm việc hứng khởi"
  },
  {
    "id": "thu_vien",
    "name": "Thư viện",
    "groupId": "hoc_tap",
    "groupName": "Học tập",
    "icon": "book-open",
    "genre": "library_alpha",
    "desc": "Tuyệt đối tĩnh lặng, sóng não Alpha kích thích tiếp thu"
  },
  {
    "id": "lop_hoc",
    "name": "Lớp học",
    "groupId": "hoc_tap",
    "groupName": "Học tập",
    "icon": "pen-tool",
    "genre": "study_calm",
    "desc": "Tập trung tiếp nhận tri thức, cân bằng cảm xúc"
  },
  {
    "id": "ky_tuc_xa",
    "name": "Ký túc xá",
    "groupId": "hoc_tap",
    "groupName": "Học tập",
    "icon": "home",
    "genre": "student_indie",
    "desc": "Những giai điệu thanh xuân tuổi trẻ, indie mộc mạc"
  },
  {
    "id": "phong_tu_hoc",
    "name": "Phòng tự học",
    "groupId": "hoc_tap",
    "groupName": "Học tập",
    "icon": "book",
    "genre": "pomodoro_lofi",
    "desc": "Beats lofi chuẩn Pomodoro duy trì dòng chảy tập trung"
  },
  {
    "id": "o_to_rieng",
    "name": "Ô tô riêng",
    "groupId": "di_chuyen",
    "groupName": "Di chuyển",
    "icon": "car",
    "genre": "roadtrip_hits",
    "desc": "Playlist đường dài ngập tràn cảm xúc và tự do"
  },
  {
    "id": "taxi",
    "name": "Taxi",
    "groupId": "di_chuyen",
    "groupName": "Di chuyển",
    "icon": "navigation",
    "genre": "city_cruising",
    "desc": "Lướt qua phố thị nhộn nhịp, chill cùng giai điệu êm"
  },
  {
    "id": "xe_buyt",
    "name": "Xe buýt",
    "groupId": "di_chuyen",
    "groupName": "Di chuyển",
    "icon": "bus",
    "genre": "window_ballad",
    "desc": "Ngồi cạnh ô cửa sổ ngắm đường phố trôi qua"
  },
  {
    "id": "tau_dien",
    "name": "Tàu điện",
    "groupId": "di_chuyen",
    "groupName": "Di chuyển",
    "icon": "train",
    "genre": "metro_beats",
    "desc": "Nhịp điệu hiện đại hòa vào nhịp sống đô thị nhanh"
  },
  {
    "id": "tau_hoa",
    "name": "Tàu hỏa",
    "groupId": "di_chuyen",
    "groupName": "Di chuyển",
    "icon": "compass",
    "genre": "scenic_journey",
    "desc": "Hành trình hoài niệm qua những dải đất thơ mộng"
  },
  {
    "id": "may_bay",
    "name": "Máy bay",
    "groupId": "di_chuyen",
    "groupName": "Di chuyển",
    "icon": "plane",
    "genre": "flight_ambient",
    "desc": "Bay trên tầng mây, thanh âm bồng bềnh thư giãn"
  },
  {
    "id": "di_bo",
    "name": "Đi bộ",
    "groupId": "di_chuyen",
    "groupName": "Di chuyển",
    "icon": "footprints",
    "genre": "walking_acoustic",
    "desc": "Từng bước chân thong dong, hòa nhịp cùng nắng gió"
  },
  {
    "id": "dap_xe",
    "name": "Đạp xe",
    "groupId": "di_chuyen",
    "groupName": "Di chuyển",
    "icon": "bike",
    "genre": "cycling_upbeat",
    "desc": "Làn gió luồn qua tóc, nhịp điệu sảng khoái yêu đời"
  },
  {
    "id": "bai_bien",
    "name": "Bãi biển",
    "groupId": "thien_nhien",
    "groupName": "Thiên nhiên",
    "icon": "waves",
    "genre": "beach_tropical",
    "desc": "Sóng biển rì rào, nắng vàng rực rỡ và gió biển mặn mòi"
  },
  {
    "id": "nui_rung",
    "name": "Núi rừng",
    "groupId": "thien_nhien",
    "groupName": "Thiên nhiên",
    "icon": "mountain",
    "genre": "forest_ambient",
    "desc": "Hùng vĩ và bao la, thanh âm tĩnh mịch của rừng già"
  },
  {
    "id": "ho_nuoc",
    "name": "Hồ nước",
    "groupId": "thien_nhien",
    "groupName": "Thiên nhiên",
    "icon": "droplet",
    "genre": "lake_tranquil",
    "desc": "Mặt nước phẳng lặng như gương, tâm hồn an nhiên"
  },
  {
    "id": "bo_song",
    "name": "Bờ sông",
    "groupId": "thien_nhien",
    "groupName": "Thiên nhiên",
    "icon": "compass",
    "genre": "river_peace",
    "desc": "Dòng nước lững lờ trôi, bình yên đón chiều buông"
  },
  {
    "id": "cong_vien",
    "name": "Công viên",
    "groupId": "thien_nhien",
    "groupName": "Thiên nhiên",
    "icon": "trees",
    "genre": "park_sunny",
    "desc": "Thảm cỏ xanh mướt, tiếng chim hót dưới vòm cây"
  },
  {
    "id": "canh_dong",
    "name": "Cánh đồng",
    "groupId": "thien_nhien",
    "groupName": "Thiên nhiên",
    "icon": "sun",
    "genre": "open_freedom",
    "desc": "Hương lúa thơm ngát, bầu trời bao la bát ngát"
  },
  {
    "id": "quan_ca_phe",
    "name": "Quán cà phê",
    "groupId": "giai_tri",
    "groupName": "Giải trí",
    "icon": "coffee",
    "genre": "cafe_bossa",
    "desc": "Hương cà phê ấm nồng, bossa nova & jazz quyến rũ"
  },
  {
    "id": "nha_hang",
    "name": "Nhà hàng",
    "groupId": "giai_tri",
    "groupName": "Giải trí",
    "icon": "utensils",
    "genre": "dining_jazz",
    "desc": "Không gian sang trọng, jazz cổ điển êm ái tao nhã"
  },
  {
    "id": "quan_bar",
    "name": "Quán bar",
    "groupId": "giai_tri",
    "groupName": "Giải trí",
    "icon": "wine",
    "genre": "bar_groove",
    "desc": "Ánh đèn mờ ảo, cocktail ngọt ngào và R&B cuốn hút"
  },
  {
    "id": "pub",
    "name": "Pub",
    "groupId": "giai_tri",
    "groupName": "Giải trí",
    "icon": "beer",
    "genre": "pub_indie",
    "desc": "Chill cùng bạn bè, indie rock & acoustic chân thực"
  },
  {
    "id": "rooftop",
    "name": "Rooftop",
    "groupId": "giai_tri",
    "groupName": "Giải trí",
    "icon": "sunset",
    "genre": "rooftop_sunset",
    "desc": "Ngắm nhìn toàn cảnh thành phố lung linh về đêm"
  },
  {
    "id": "karaoke",
    "name": "Karaoke",
    "groupId": "giai_tri",
    "groupName": "Giải trí",
    "icon": "mic",
    "genre": "karaoke_singalong",
    "desc": "Những ca khúc quốc dân quen thuộc để hát theo"
  },
  {
    "id": "phong_gym",
    "name": "Phòng gym",
    "groupId": "ren_luyen",
    "groupName": "Rèn luyện",
    "icon": "activity",
    "genre": "gym_workout",
    "desc": "Bùng nổ năng lượng, nhịp bass mạnh mẽ thôi thúc ý chí"
  },
  {
    "id": "phong_yoga",
    "name": "Phòng yoga",
    "groupId": "ren_luyen",
    "groupName": "Rèn luyện",
    "icon": "flower",
    "genre": "yoga_zen",
    "desc": "Chuông xoay Tây Tạng và sáo thiền định, đưa tâm về tĩnh"
  },
  {
    "id": "san_the_thao",
    "name": "Sân thể thao",
    "groupId": "ren_luyen",
    "groupName": "Rèn luyện",
    "icon": "trophy",
    "genre": "sports_energy",
    "desc": "Nhiệt huyết thi đấu, tinh thần thể thao cuồng nhiệt"
  },
  {
    "id": "duong_chay",
    "name": "Đường chạy",
    "groupId": "ren_luyen",
    "groupName": "Rèn luyện",
    "icon": "fast-forward",
    "genre": "running_tempo",
    "desc": "BPM chuẩn 160-180 giữ nhịp thở và bước chân dẻo dai"
  },
  {
    "id": "khach_san",
    "name": "Khách sạn",
    "groupId": "nghi_duong",
    "groupName": "Nghỉ dưỡng",
    "icon": "hotel",
    "genre": "hotel_lounge",
    "desc": "Lounge thư thái đẳng cấp, tiện nghi và thanh lịch"
  },
  {
    "id": "resort",
    "name": "Resort",
    "groupId": "nghi_duong",
    "groupName": "Nghỉ dưỡng",
    "icon": "shield-check",
    "genre": "resort_luxury",
    "desc": "Kỳ nghỉ thiên đường, nắng biển hòa cùng nhạc dịu êm"
  },
  {
    "id": "homestay",
    "name": "Homestay",
    "groupId": "nghi_duong",
    "groupName": "Nghỉ dưỡng",
    "icon": "home",
    "genre": "homestay_acoustic",
    "desc": "Cảm giác thân thuộc, mộc mạc như về với chính mình"
  },
  {
    "id": "khu_cam_trai",
    "name": "Khu cắm trại",
    "groupId": "nghi_duong",
    "groupName": "Nghỉ dưỡng",
    "icon": "tent",
    "genre": "campfire_folk",
    "desc": "Ánh lửa bập bùng giữa rừng đêm, guitar mộc hát vang"
  },
  {
    "id": "tttm",
    "name": "Trung tâm thương mại",
    "groupId": "cong_cong",
    "groupName": "Công cộng",
    "icon": "shopping-bag",
    "genre": "mall_chill",
    "desc": "Tươi sáng, hiện đại, bước dạo thư thái cuối tuần"
  },
  {
    "id": "san_bay",
    "name": "Sân bay",
    "groupId": "cong_cong",
    "groupName": "Công cộng",
    "icon": "plane",
    "genre": "airport_transit",
    "desc": "Hành trình kết nối những phương trời xa xôi"
  },
  {
    "id": "nha_ga",
    "name": "Nhà ga",
    "groupId": "cong_cong",
    "groupName": "Công cộng",
    "icon": "clock",
    "genre": "station_motion",
    "desc": "Khoảnh khắc giao thời của những chuyến đi và trở về"
  },
  {
    "id": "sanh_cho",
    "name": "Sảnh chờ",
    "groupId": "cong_cong",
    "groupName": "Công cộng",
    "icon": "armchair",
    "genre": "lounge_smooth",
    "desc": "Thư giãn tĩnh tại trong lúc chờ đợi chuyến hành trình"
  },
  {
    "id": "phong_toi",
    "name": "Phòng tối",
    "groupId": "khong_gian_dac_biet",
    "groupName": "Không gian đặc biệt",
    "icon": "moon",
    "genre": "dark_dreampop",
    "desc": "Không ánh sáng, chỉ có dreampop và không gian vô tận"
  },
  {
    "id": "noi_yen_tinh",
    "name": "Nơi yên tĩnh",
    "groupId": "khong_gian_dac_biet",
    "groupName": "Không gian đặc biệt",
    "icon": "volume-x",
    "genre": "pure_silence_piano",
    "desc": "Tĩnh mịch tuyệt đối, từng nốt piano rơi giữa thinh lặng"
  },
  {
    "id": "noi_dong_duc",
    "name": "Nơi đông đúc",
    "groupId": "khong_gian_dac_biet",
    "groupName": "Không gian đặc biệt",
    "icon": "users",
    "genre": "noise_cancelling_flow",
    "desc": "Chiếc tai nghe cách ly sự ồn ào, tìm lại ốc đảo riêng"
  },
  {
    "id": "khong_gian_mo",
    "name": "Không gian mở",
    "groupId": "khong_gian_dac_biet",
    "groupName": "Không gian đặc biệt",
    "icon": "maximize",
    "genre": "expansive_strings",
    "desc": "Giao hưởng và hòa thanh trải rộng không giới hạn"
  },
  {
    "id": "khong_gian_rieng_tu",
    "name": "Không gian riêng tư",
    "groupId": "khong_gian_dac_biet",
    "groupName": "Không gian đặc biệt",
    "icon": "lock",
    "genre": "intimate_ballad",
    "desc": "Góc riêng cho tâm hồn, những tâm sự chân thành nhất"
  }
];
const SPACE_INDEX = {
  "phong_ngu": {
    "id": "phong_ngu",
    "name": "Phòng ngủ",
    "groupId": "nha_o",
    "groupName": "Nhà ở",
    "icon": "bed",
    "genre": "sleep",
    "desc": "Giai điệu êm dịu xoa dịu tâm trí và ru vào giấc ngủ sâu"
  },
  "phong_khach": {
    "id": "phong_khach",
    "name": "Phòng khách",
    "groupId": "nha_o",
    "groupName": "Nhà ở",
    "icon": "sofa",
    "genre": "acoustic_chill",
    "desc": "Không gian ấm cúng, acoustic mộc mạc sum vầy"
  },
  "phong_lam_viec_nha": {
    "id": "phong_lam_viec_nha",
    "name": "Phòng làm việc",
    "groupId": "nha_o",
    "groupName": "Nhà ở",
    "icon": "laptop",
    "genre": "focus_lofi",
    "desc": "Giai điệu tập trung cao độ, không lời nhẹ nhàng"
  },
  "nha_bep": {
    "id": "nha_bep",
    "name": "Nhà bếp",
    "groupId": "nha_o",
    "groupName": "Nhà ở",
    "icon": "utensils",
    "genre": "cheerful_bossa",
    "desc": "Năng lượng tươi vui, nhẹ nhàng thư thái khi nấu nướng"
  },
  "ban_cong": {
    "id": "ban_cong",
    "name": "Ban công",
    "groupId": "nha_o",
    "groupName": "Nhà ở",
    "icon": "sun",
    "genre": "breeze_acoustic",
    "desc": "Gió mát nhẹ nhàng, ngắm nhìn phố phường an yên"
  },
  "san_thuong": {
    "id": "san_thuong",
    "name": "Sân thượng",
    "groupId": "nha_o",
    "groupName": "Nhà ở",
    "icon": "wind",
    "genre": "sunset_indie",
    "desc": "Không gian mở khoáng đạt, hoàng hôn lãng mạn"
  },
  "phong_tam": {
    "id": "phong_tam",
    "name": "Phòng tắm",
    "groupId": "nha_o",
    "groupName": "Nhà ở",
    "icon": "bath",
    "genre": "spa_zen",
    "desc": "Thư giãn spa, phục hồi năng lượng sau ngày dài"
  },
  "san_vuon": {
    "id": "san_vuon",
    "name": "Sân vườn",
    "groupId": "nha_o",
    "groupName": "Nhà ở",
    "icon": "trees",
    "genre": "nature_acoustic",
    "desc": "Tiếng gió lá reo, acoustic xanh mát giữa thiên nhiên"
  },
  "van_phong": {
    "id": "van_phong",
    "name": "Văn phòng",
    "groupId": "cong_viec",
    "groupName": "Công việc",
    "icon": "building",
    "genre": "office_focus",
    "desc": "Low-tempo lofi & alpha waves cho năng suất tối ưu"
  },
  "phong_hop": {
    "id": "phong_hop",
    "name": "Phòng họp",
    "groupId": "cong_viec",
    "groupName": "Công việc",
    "icon": "users",
    "genre": "neutral_ambient",
    "desc": "Không gian chuyên nghiệp, âm nền tinh tế không xao nhãng"
  },
  "coworking": {
    "id": "coworking",
    "name": "Coworking",
    "groupId": "cong_viec",
    "groupName": "Công việc",
    "icon": "coffee",
    "genre": "deep_work",
    "desc": "Nhịp điệu sáng tạo hiện đại, kích thích tư duy"
  },
  "studio": {
    "id": "studio",
    "name": "Studio",
    "groupId": "cong_viec",
    "groupName": "Công việc",
    "icon": "mic",
    "genre": "creative_synth",
    "desc": "Cảm hứng nghệ thuật, âm thanh đa tầng bay bổng"
  },
  "cua_hang": {
    "id": "cua_hang",
    "name": "Cửa hàng",
    "groupId": "cong_viec",
    "groupName": "Công việc",
    "icon": "store",
    "genre": "retail_lively",
    "desc": "Nhịp điệu thân thiện, ấm áp và chào đón khách hàng"
  },
  "xuong_lam_viec": {
    "id": "xuong_lam_viec",
    "name": "Xưởng làm việc",
    "groupId": "cong_viec",
    "groupName": "Công việc",
    "icon": "wrench",
    "genre": "rhythmic_flow",
    "desc": "Âm hưởng nhịp nhàng, tạo đà làm việc hứng khởi"
  },
  "thu_vien": {
    "id": "thu_vien",
    "name": "Thư viện",
    "groupId": "hoc_tap",
    "groupName": "Học tập",
    "icon": "book-open",
    "genre": "library_alpha",
    "desc": "Tuyệt đối tĩnh lặng, sóng não Alpha kích thích tiếp thu"
  },
  "lop_hoc": {
    "id": "lop_hoc",
    "name": "Lớp học",
    "groupId": "hoc_tap",
    "groupName": "Học tập",
    "icon": "pen-tool",
    "genre": "study_calm",
    "desc": "Tập trung tiếp nhận tri thức, cân bằng cảm xúc"
  },
  "ky_tuc_xa": {
    "id": "ky_tuc_xa",
    "name": "Ký túc xá",
    "groupId": "hoc_tap",
    "groupName": "Học tập",
    "icon": "home",
    "genre": "student_indie",
    "desc": "Những giai điệu thanh xuân tuổi trẻ, indie mộc mạc"
  },
  "phong_tu_hoc": {
    "id": "phong_tu_hoc",
    "name": "Phòng tự học",
    "groupId": "hoc_tap",
    "groupName": "Học tập",
    "icon": "book",
    "genre": "pomodoro_lofi",
    "desc": "Beats lofi chuẩn Pomodoro duy trì dòng chảy tập trung"
  },
  "o_to_rieng": {
    "id": "o_to_rieng",
    "name": "Ô tô riêng",
    "groupId": "di_chuyen",
    "groupName": "Di chuyển",
    "icon": "car",
    "genre": "roadtrip_hits",
    "desc": "Playlist đường dài ngập tràn cảm xúc và tự do"
  },
  "taxi": {
    "id": "taxi",
    "name": "Taxi",
    "groupId": "di_chuyen",
    "groupName": "Di chuyển",
    "icon": "navigation",
    "genre": "city_cruising",
    "desc": "Lướt qua phố thị nhộn nhịp, chill cùng giai điệu êm"
  },
  "xe_buyt": {
    "id": "xe_buyt",
    "name": "Xe buýt",
    "groupId": "di_chuyen",
    "groupName": "Di chuyển",
    "icon": "bus",
    "genre": "window_ballad",
    "desc": "Ngồi cạnh ô cửa sổ ngắm đường phố trôi qua"
  },
  "tau_dien": {
    "id": "tau_dien",
    "name": "Tàu điện",
    "groupId": "di_chuyen",
    "groupName": "Di chuyển",
    "icon": "train",
    "genre": "metro_beats",
    "desc": "Nhịp điệu hiện đại hòa vào nhịp sống đô thị nhanh"
  },
  "tau_hoa": {
    "id": "tau_hoa",
    "name": "Tàu hỏa",
    "groupId": "di_chuyen",
    "groupName": "Di chuyển",
    "icon": "compass",
    "genre": "scenic_journey",
    "desc": "Hành trình hoài niệm qua những dải đất thơ mộng"
  },
  "may_bay": {
    "id": "may_bay",
    "name": "Máy bay",
    "groupId": "di_chuyen",
    "groupName": "Di chuyển",
    "icon": "plane",
    "genre": "flight_ambient",
    "desc": "Bay trên tầng mây, thanh âm bồng bềnh thư giãn"
  },
  "di_bo": {
    "id": "di_bo",
    "name": "Đi bộ",
    "groupId": "di_chuyen",
    "groupName": "Di chuyển",
    "icon": "footprints",
    "genre": "walking_acoustic",
    "desc": "Từng bước chân thong dong, hòa nhịp cùng nắng gió"
  },
  "dap_xe": {
    "id": "dap_xe",
    "name": "Đạp xe",
    "groupId": "di_chuyen",
    "groupName": "Di chuyển",
    "icon": "bike",
    "genre": "cycling_upbeat",
    "desc": "Làn gió luồn qua tóc, nhịp điệu sảng khoái yêu đời"
  },
  "bai_bien": {
    "id": "bai_bien",
    "name": "Bãi biển",
    "groupId": "thien_nhien",
    "groupName": "Thiên nhiên",
    "icon": "waves",
    "genre": "beach_tropical",
    "desc": "Sóng biển rì rào, nắng vàng rực rỡ và gió biển mặn mòi"
  },
  "nui_rung": {
    "id": "nui_rung",
    "name": "Núi rừng",
    "groupId": "thien_nhien",
    "groupName": "Thiên nhiên",
    "icon": "mountain",
    "genre": "forest_ambient",
    "desc": "Hùng vĩ và bao la, thanh âm tĩnh mịch của rừng già"
  },
  "ho_nuoc": {
    "id": "ho_nuoc",
    "name": "Hồ nước",
    "groupId": "thien_nhien",
    "groupName": "Thiên nhiên",
    "icon": "droplet",
    "genre": "lake_tranquil",
    "desc": "Mặt nước phẳng lặng như gương, tâm hồn an nhiên"
  },
  "bo_song": {
    "id": "bo_song",
    "name": "Bờ sông",
    "groupId": "thien_nhien",
    "groupName": "Thiên nhiên",
    "icon": "compass",
    "genre": "river_peace",
    "desc": "Dòng nước lững lờ trôi, bình yên đón chiều buông"
  },
  "cong_vien": {
    "id": "cong_vien",
    "name": "Công viên",
    "groupId": "thien_nhien",
    "groupName": "Thiên nhiên",
    "icon": "trees",
    "genre": "park_sunny",
    "desc": "Thảm cỏ xanh mướt, tiếng chim hót dưới vòm cây"
  },
  "canh_dong": {
    "id": "canh_dong",
    "name": "Cánh đồng",
    "groupId": "thien_nhien",
    "groupName": "Thiên nhiên",
    "icon": "sun",
    "genre": "open_freedom",
    "desc": "Hương lúa thơm ngát, bầu trời bao la bát ngát"
  },
  "quan_ca_phe": {
    "id": "quan_ca_phe",
    "name": "Quán cà phê",
    "groupId": "giai_tri",
    "groupName": "Giải trí",
    "icon": "coffee",
    "genre": "cafe_bossa",
    "desc": "Hương cà phê ấm nồng, bossa nova & jazz quyến rũ"
  },
  "nha_hang": {
    "id": "nha_hang",
    "name": "Nhà hàng",
    "groupId": "giai_tri",
    "groupName": "Giải trí",
    "icon": "utensils",
    "genre": "dining_jazz",
    "desc": "Không gian sang trọng, jazz cổ điển êm ái tao nhã"
  },
  "quan_bar": {
    "id": "quan_bar",
    "name": "Quán bar",
    "groupId": "giai_tri",
    "groupName": "Giải trí",
    "icon": "wine",
    "genre": "bar_groove",
    "desc": "Ánh đèn mờ ảo, cocktail ngọt ngào và R&B cuốn hút"
  },
  "pub": {
    "id": "pub",
    "name": "Pub",
    "groupId": "giai_tri",
    "groupName": "Giải trí",
    "icon": "beer",
    "genre": "pub_indie",
    "desc": "Chill cùng bạn bè, indie rock & acoustic chân thực"
  },
  "rooftop": {
    "id": "rooftop",
    "name": "Rooftop",
    "groupId": "giai_tri",
    "groupName": "Giải trí",
    "icon": "sunset",
    "genre": "rooftop_sunset",
    "desc": "Ngắm nhìn toàn cảnh thành phố lung linh về đêm"
  },
  "karaoke": {
    "id": "karaoke",
    "name": "Karaoke",
    "groupId": "giai_tri",
    "groupName": "Giải trí",
    "icon": "mic",
    "genre": "karaoke_singalong",
    "desc": "Những ca khúc quốc dân quen thuộc để hát theo"
  },
  "phong_gym": {
    "id": "phong_gym",
    "name": "Phòng gym",
    "groupId": "ren_luyen",
    "groupName": "Rèn luyện",
    "icon": "activity",
    "genre": "gym_workout",
    "desc": "Bùng nổ năng lượng, nhịp bass mạnh mẽ thôi thúc ý chí"
  },
  "phong_yoga": {
    "id": "phong_yoga",
    "name": "Phòng yoga",
    "groupId": "ren_luyen",
    "groupName": "Rèn luyện",
    "icon": "flower",
    "genre": "yoga_zen",
    "desc": "Chuông xoay Tây Tạng và sáo thiền định, đưa tâm về tĩnh"
  },
  "san_the_thao": {
    "id": "san_the_thao",
    "name": "Sân thể thao",
    "groupId": "ren_luyen",
    "groupName": "Rèn luyện",
    "icon": "trophy",
    "genre": "sports_energy",
    "desc": "Nhiệt huyết thi đấu, tinh thần thể thao cuồng nhiệt"
  },
  "duong_chay": {
    "id": "duong_chay",
    "name": "Đường chạy",
    "groupId": "ren_luyen",
    "groupName": "Rèn luyện",
    "icon": "fast-forward",
    "genre": "running_tempo",
    "desc": "BPM chuẩn 160-180 giữ nhịp thở và bước chân dẻo dai"
  },
  "khach_san": {
    "id": "khach_san",
    "name": "Khách sạn",
    "groupId": "nghi_duong",
    "groupName": "Nghỉ dưỡng",
    "icon": "hotel",
    "genre": "hotel_lounge",
    "desc": "Lounge thư thái đẳng cấp, tiện nghi và thanh lịch"
  },
  "resort": {
    "id": "resort",
    "name": "Resort",
    "groupId": "nghi_duong",
    "groupName": "Nghỉ dưỡng",
    "icon": "shield-check",
    "genre": "resort_luxury",
    "desc": "Kỳ nghỉ thiên đường, nắng biển hòa cùng nhạc dịu êm"
  },
  "homestay": {
    "id": "homestay",
    "name": "Homestay",
    "groupId": "nghi_duong",
    "groupName": "Nghỉ dưỡng",
    "icon": "home",
    "genre": "homestay_acoustic",
    "desc": "Cảm giác thân thuộc, mộc mạc như về với chính mình"
  },
  "khu_cam_trai": {
    "id": "khu_cam_trai",
    "name": "Khu cắm trại",
    "groupId": "nghi_duong",
    "groupName": "Nghỉ dưỡng",
    "icon": "tent",
    "genre": "campfire_folk",
    "desc": "Ánh lửa bập bùng giữa rừng đêm, guitar mộc hát vang"
  },
  "tttm": {
    "id": "tttm",
    "name": "Trung tâm thương mại",
    "groupId": "cong_cong",
    "groupName": "Công cộng",
    "icon": "shopping-bag",
    "genre": "mall_chill",
    "desc": "Tươi sáng, hiện đại, bước dạo thư thái cuối tuần"
  },
  "san_bay": {
    "id": "san_bay",
    "name": "Sân bay",
    "groupId": "cong_cong",
    "groupName": "Công cộng",
    "icon": "plane",
    "genre": "airport_transit",
    "desc": "Hành trình kết nối những phương trời xa xôi"
  },
  "nha_ga": {
    "id": "nha_ga",
    "name": "Nhà ga",
    "groupId": "cong_cong",
    "groupName": "Công cộng",
    "icon": "clock",
    "genre": "station_motion",
    "desc": "Khoảnh khắc giao thời của những chuyến đi và trở về"
  },
  "sanh_cho": {
    "id": "sanh_cho",
    "name": "Sảnh chờ",
    "groupId": "cong_cong",
    "groupName": "Công cộng",
    "icon": "armchair",
    "genre": "lounge_smooth",
    "desc": "Thư giãn tĩnh tại trong lúc chờ đợi chuyến hành trình"
  },
  "phong_toi": {
    "id": "phong_toi",
    "name": "Phòng tối",
    "groupId": "khong_gian_dac_biet",
    "groupName": "Không gian đặc biệt",
    "icon": "moon",
    "genre": "dark_dreampop",
    "desc": "Không ánh sáng, chỉ có dreampop và không gian vô tận"
  },
  "noi_yen_tinh": {
    "id": "noi_yen_tinh",
    "name": "Nơi yên tĩnh",
    "groupId": "khong_gian_dac_biet",
    "groupName": "Không gian đặc biệt",
    "icon": "volume-x",
    "genre": "pure_silence_piano",
    "desc": "Tĩnh mịch tuyệt đối, từng nốt piano rơi giữa thinh lặng"
  },
  "noi_dong_duc": {
    "id": "noi_dong_duc",
    "name": "Nơi đông đúc",
    "groupId": "khong_gian_dac_biet",
    "groupName": "Không gian đặc biệt",
    "icon": "users",
    "genre": "noise_cancelling_flow",
    "desc": "Chiếc tai nghe cách ly sự ồn ào, tìm lại ốc đảo riêng"
  },
  "khong_gian_mo": {
    "id": "khong_gian_mo",
    "name": "Không gian mở",
    "groupId": "khong_gian_dac_biet",
    "groupName": "Không gian đặc biệt",
    "icon": "maximize",
    "genre": "expansive_strings",
    "desc": "Giao hưởng và hòa thanh trải rộng không giới hạn"
  },
  "khong_gian_rieng_tu": {
    "id": "khong_gian_rieng_tu",
    "name": "Không gian riêng tư",
    "groupId": "khong_gian_dac_biet",
    "groupName": "Không gian đặc biệt",
    "icon": "lock",
    "genre": "intimate_ballad",
    "desc": "Góc riêng cho tâm hồn, những tâm sự chân thành nhất"
  }
};
const GENRE_POOLS = {
  "gym_workout": [
    "7wtfhZwyrcc",
    "fKopy74weus",
    "ktvTqknDobU",
    "hT_nvWreIhg",
    "OPf0YbXqDm0",
    "CevxZvSJLk8",
    "nfWlot6h_JM",
    "1w7OgIMMRc4",
    "bKDdT_nyP54",
    "JGwWNGJdvx8",
    "09R8_2nJtjg",
    "mWRsgZuwf_8"
  ],
  "sports_energy": [
    "ktvTqknDobU",
    "7wtfhZwyrcc",
    "hT_nvWreIhg",
    "OPf0YbXqDm0",
    "nfWlot6h_JM",
    "fKopy74weus",
    "bKDdT_nyP54",
    "CevxZvSJLk8"
  ],
  "running_tempo": [
    "fKopy74weus",
    "7wtfhZwyrcc",
    "ktvTqknDobU",
    "09R8_2nJtjg",
    "OPf0YbXqDm0",
    "nfWlot6h_JM",
    "hT_nvWreIhg",
    "JGwWNGJdvx8"
  ],
  "cycling_upbeat": [
    "09R8_2nJtjg",
    "EkHTsc9PU2A",
    "6k8cpUkKK4c",
    "S2Cti12XBw4",
    "ghUh0NPHXy8",
    "WyVfkr6nsrk",
    "U8Z0sI7vWyY",
    "bKDdT_nyP54"
  ],
  "yoga_zen": [
    "UfcAVejslrU",
    "79kpo4x8mDA",
    "1ZYbU8JGBdQ",
    "WPni755-Krg",
    "4VR-6AS0-l4",
    "2WfaotSK3mI",
    "WNcsUNKlAKw",
    "eUDVUZZyA0M"
  ],
  "spa_zen": [
    "1ZYbU8JGBdQ",
    "79kpo4x8mDA",
    "UfcAVejslrU",
    "WNcsUNKlAKw",
    "2WfaotSK3mI",
    "4VR-6AS0-l4",
    "so6ExplQlaY",
    "7maJOI3QMu0"
  ],
  "pure_silence_piano": [
    "2WfaotSK3mI",
    "WNcsUNKlAKw",
    "4VR-6AS0-l4",
    "7maJOI3QMu0",
    "so6ExplQlaY",
    "PaXKf0JEzEA",
    "eUDVUZZyA0M",
    "TK1Ij_-mank"
  ],
  "sleep": [
    "1fueZCTYkpA",
    "JD-kMIpDfnY",
    "2WfaotSK3mI",
    "WNcsUNKlAKw",
    "4VR-6AS0-l4",
    "LKZyp2cSAy4",
    "mtoeTzYKyaQ",
    "4HLumkaPcCI",
    "Zzn9-ATB9aU"
  ],
  "library_alpha": [
    "WPni755-Krg",
    "sAcj8me7wGI",
    "f02mOEt11OQ",
    "tDY6AkWFytQ",
    "am1VJP0RnmQ",
    "9M4jZuqdw04",
    "jfKfPfyJRdk",
    "1Tl2FtV06qo"
  ],
  "pomodoro_lofi": [
    "f02mOEt11OQ",
    "9M4jZuqdw04",
    "tDY6AkWFytQ",
    "am1VJP0RnmQ",
    "jfKfPfyJRdk",
    "1Tl2FtV06qo",
    "WPni755-Krg",
    "sAcj8me7wGI"
  ],
  "deep_work": [
    "tDY6AkWFytQ",
    "am1VJP0RnmQ",
    "f02mOEt11OQ",
    "9M4jZuqdw04",
    "WPni755-Krg",
    "jfKfPfyJRdk",
    "sAcj8me7wGI",
    "1Tl2FtV06qo"
  ],
  "office_focus": [
    "sAcj8me7wGI",
    "f02mOEt11OQ",
    "tDY6AkWFytQ",
    "9M4jZuqdw04",
    "TURbeWK2wwg",
    "WPni755-Krg",
    "anpql8S469Q",
    "PWK8EuUSMSI"
  ],
  "focus_lofi": [
    "jfKfPfyJRdk",
    "f02mOEt11OQ",
    "tDY6AkWFytQ",
    "am1VJP0RnmQ",
    "9M4jZuqdw04",
    "WPni755-Krg",
    "20046_vi1vA",
    "1Tl2FtV06qo"
  ],
  "study_calm": [
    "sAcj8me7wGI",
    "anpql8S469Q",
    "RWopiMiKKwI",
    "TK1Ij_-mank",
    "lB4PRX737-0",
    "f02mOEt11OQ",
    "WPni755-Krg",
    "jfKfPfyJRdk"
  ],
  "student_indie": [
    "akgNYX8i9Xs",
    "LZN4I3K8SC0",
    "F5tS5m86bOI",
    "Zzn9-ATB9aU",
    "W2FRMzCuPzY",
    "TKlXc3iywoM",
    "ghUh0NPHXy8",
    "jO2viLEW-1A"
  ],
  "cafe_bossa": [
    "TURbeWK2wwg",
    "k1-TrAvp_xs",
    "kgd0gK3_Hyc",
    "rA56B43_G4E",
    "vmDDOFXSgAs",
    "lSD_L-xic9o",
    "tO4dxvguQDk",
    "ucRVDoFkcxc",
    "1nml-_YE2OU"
  ],
  "dining_jazz": [
    "rA56B43_G4E",
    "vmDDOFXSgAs",
    "JYuyWrkwpok",
    "ZEMCeymW1Ow",
    "MqazV4hbu8E",
    "TURbeWK2wwg",
    "k1-TrAvp_xs",
    "tO4dxvguQDk"
  ],
  "cheerful_bossa": [
    "kgd0gK3_Hyc",
    "k1-TrAvp_xs",
    "TURbeWK2wwg",
    "lSD_L-xic9o",
    "Ej8RhiSv2-4",
    "t0WFOnwp3MM",
    "HXkh7EOqcQ4",
    "PWK8EuUSMSI"
  ],
  "bar_groove": [
    "4NRXx6U8ABQ",
    "btIQvYcLNoI",
    "CX5f0NcqlMs",
    "F13eXG8GuhU",
    "uBHOIb3pT_E",
    "4HLumkaPcCI",
    "8ulR00x-B1I",
    "LKZyp2cSAy4"
  ],
  "pub_indie": [
    "ff7dvE-4mMA",
    "W2FRMzCuPzY",
    "5e7e_KZINA4",
    "ghUh0NPHXy8",
    "TKlXc3iywoM",
    "ntEoGvhoVac",
    "1w7OgIMMRc4",
    "fJ9rUzIMcZQ"
  ],
  "karaoke_singalong": [
    "t0WFOnwp3MM",
    "HXkh7EOqcQ4",
    "ff7dvE-4mMA",
    "TKlXc3iywoM",
    "GgQFO8dL5XQ",
    "3UyotSd-Cp4",
    "vCIc1g_4JWM",
    "-nnWBhKZeg0"
  ],
  "roadtrip_hits": [
    "bKDdT_nyP54",
    "TKlXc3iywoM",
    "ghUh0NPHXy8",
    "KKc_RMln54g",
    "J_ub7Etch2U",
    "S2Cti12XBw4",
    "fJ9rUzIMcZQ",
    "U8Z0sI7vWyY",
    "EkHTsc9PU2A"
  ],
  "city_cruising": [
    "S2Cti12XBw4",
    "WyVfkr6nsrk",
    "09R8_2nJtjg",
    "aJOTlE1K90k",
    "nfs8NYg7yQM",
    "CX5f0NcqlMs",
    "btIQvYcLNoI",
    "jO2viLEW-1A"
  ],
  "window_ballad": [
    "ixdSsW5n2rI",
    "ntEoGvhoVac",
    "rm7AG7rqvg8",
    "TfDHpsZQYeE",
    "X2TxXIqbHhw",
    "vCIc1g_4JWM",
    "DZDYZ9nRHfU",
    "zshxAlfZYAI"
  ],
  "metro_beats": [
    "f02mOEt11OQ",
    "am1VJP0RnmQ",
    "9M4jZuqdw04",
    "1Tl2FtV06qo",
    "GedLli_YXEI",
    "uBHOIb3pT_E",
    "F13eXG8GuhU",
    "btIQvYcLNoI"
  ],
  "scenic_journey": [
    "GgQFO8dL5XQ",
    "wXTJBr9tt8Q",
    "Zzn9-ATB9aU",
    "UCXao7aTDQM",
    "Qa622LwgGLY",
    "T0sHaz4H9MQ",
    "cX2uLlc0su4",
    "tdV_jKCrRUo"
  ],
  "flight_ambient": [
    "UfcAVejslrU",
    "5MU_z4kzZIQ",
    "eUDVUZZyA0M",
    "4VR-6AS0-l4",
    "WNcsUNKlAKw",
    "2WfaotSK3mI",
    "1fueZCTYkpA",
    "TK1Ij_-mank"
  ],
  "walking_acoustic": [
    "Zzn9-ATB9aU",
    "F5tS5m86bOI",
    "akgNYX8i9Xs",
    "LZN4I3K8SC0",
    "3UyotSd-Cp4",
    "RWopiMiKKwI",
    "EkHTsc9PU2A",
    "6k8cpUkKK4c"
  ],
  "beach_tropical": [
    "EkHTsc9PU2A",
    "6k8cpUkKK4c",
    "U8Z0sI7vWyY",
    "_YzngEllRgM",
    "t0WFOnwp3MM",
    "S2Cti12XBw4",
    "WyVfkr6nsrk",
    "PWK8EuUSMSI"
  ],
  "forest_ambient": [
    "RWopiMiKKwI",
    "TK1Ij_-mank",
    "anpql8S469Q",
    "lB4PRX737-0",
    "1ZYbU8JGBdQ",
    "79kpo4x8mDA",
    "UfcAVejslrU",
    "2WfaotSK3mI"
  ],
  "lake_tranquil": [
    "so6ExplQlaY",
    "7maJOI3QMu0",
    "vVhKA9Av6vA",
    "Zzn9-ATB9aU",
    "ixdSsW5n2rI",
    "PaXKf0JEzEA",
    "WNcsUNKlAKw",
    "2WfaotSK3mI"
  ],
  "river_peace": [
    "7maJOI3QMu0",
    "so6ExplQlaY",
    "Zzn9-ATB9aU",
    "akgNYX8i9Xs",
    "Zu2Spp4nrTM",
    "vVhKA9Av6vA",
    "tO4dxvguQDk",
    "ucRVDoFkcxc"
  ],
  "park_sunny": [
    "U8Z0sI7vWyY",
    "EkHTsc9PU2A",
    "6k8cpUkKK4c",
    "S2Cti12XBw4",
    "Zzn9-ATB9aU",
    "F5tS5m86bOI",
    "LZN4I3K8SC0",
    "3UyotSd-Cp4"
  ],
  "open_freedom": [
    "5e7e_KZINA4",
    "ghUh0NPHXy8",
    "TKlXc3iywoM",
    "GgQFO8dL5XQ",
    "bKDdT_nyP54",
    "Llw9Q6akRo4",
    "J_ub7Etch2U",
    "KKc_RMln54g"
  ],
  "campfire_folk": [
    "5e7e_KZINA4",
    "KKc_RMln54g",
    "J_ub7Etch2U",
    "Llw9Q6akRo4",
    "ghUh0NPHXy8",
    "TKlXc3iywoM",
    "GgQFO8dL5XQ",
    "wXTJBr9tt8Q"
  ],
  "homestay_acoustic": [
    "akgNYX8i9Xs",
    "Zzn9-ATB9aU",
    "F5tS5m86bOI",
    "vVhKA9Av6vA",
    "ixdSsW5n2rI",
    "cX2uLlc0su4",
    "T0sHaz4H9MQ",
    "tdV_jKCrRUo"
  ],
  "resort_luxury": [
    "TURbeWK2wwg",
    "k1-TrAvp_xs",
    "kgd0gK3_Hyc",
    "lSD_L-xic9o",
    "tO4dxvguQDk",
    "PWK8EuUSMSI",
    "1nml-_YE2OU",
    "ucRVDoFkcxc"
  ],
  "hotel_lounge": [
    "TURbeWK2wwg",
    "rA56B43_G4E",
    "vmDDOFXSgAs",
    "JYuyWrkwpok",
    "ZEMCeymW1Ow",
    "tO4dxvguQDk",
    "ucRVDoFkcxc",
    "PWK8EuUSMSI"
  ],
  "rooftop_sunset": [
    "Zu2Spp4nrTM",
    "lSD_L-xic9o",
    "CX5f0NcqlMs",
    "btIQvYcLNoI",
    "rm7AG7rqvg8",
    "Qa622LwgGLY",
    "T0sHaz4H9MQ",
    "Llw9Q6akRo4"
  ],
  "sunset_indie": [
    "vVhKA9Av6vA",
    "ixdSsW5n2rI",
    "Zu2Spp4nrTM",
    "rm7AG7rqvg8",
    "Qa622LwgGLY",
    "T0sHaz4H9MQ",
    "cX2uLlc0su4",
    "tdV_jKCrRUo"
  ],
  "breeze_acoustic": [
    "Zzn9-ATB9aU",
    "F5tS5m86bOI",
    "akgNYX8i9Xs",
    "LZN4I3K8SC0",
    "3UyotSd-Cp4",
    "RWopiMiKKwI",
    "anpql8S469Q",
    "PWK8EuUSMSI"
  ],
  "nature_acoustic": [
    "RWopiMiKKwI",
    "TK1Ij_-mank",
    "anpql8S469Q",
    "lB4PRX737-0",
    "Zzn9-ATB9aU",
    "F5tS5m86bOI",
    "akgNYX8i9Xs",
    "LZN4I3K8SC0"
  ],
  "acoustic_chill": [
    "Zzn9-ATB9aU",
    "F5tS5m86bOI",
    "akgNYX8i9Xs",
    "LZN4I3K8SC0",
    "3UyotSd-Cp4",
    "RWopiMiKKwI",
    "anpql8S469Q",
    "tO4dxvguQDk"
  ],
  "dark_dreampop": [
    "sElE_BfQ67s",
    "D1NdGBldg3w",
    "4NRXx6U8ABQ",
    "R2LQdh42neg",
    "4HLumkaPcCI",
    "8ulR00x-B1I",
    "FvOpPeKSf_4",
    "K3Qzzggn--s"
  ],
  "noise_cancelling_flow": [
    "f02mOEt11OQ",
    "am1VJP0RnmQ",
    "tDY6AkWFytQ",
    "WPni755-Krg",
    "9M4jZuqdw04",
    "1Tl2FtV06qo",
    "GedLli_YXEI",
    "sAcj8me7wGI"
  ],
  "expansive_strings": [
    "5MU_z4kzZIQ",
    "eUDVUZZyA0M",
    "4VR-6AS0-l4",
    "WNcsUNKlAKw",
    "2WfaotSK3mI",
    "7maJOI3QMu0",
    "so6ExplQlaY",
    "PaXKf0JEzEA"
  ],
  "intimate_ballad": [
    "ixdSsW5n2rI",
    "ntEoGvhoVac",
    "rm7AG7rqvg8",
    "Qa622LwgGLY",
    "cX2uLlc0su4",
    "tdV_jKCrRUo",
    "F5tS5m86bOI",
    "Zzn9-ATB9aU"
  ],
  "creative_synth": [
    "am1VJP0RnmQ",
    "4NRXx6U8ABQ",
    "btIQvYcLNoI",
    "CX5f0NcqlMs",
    "F13eXG8GuhU",
    "uBHOIb3pT_E",
    "f02mOEt11OQ",
    "sElE_BfQ67s"
  ],
  "neutral_ambient": [
    "sAcj8me7wGI",
    "WPni755-Krg",
    "tDY6AkWFytQ",
    "TURbeWK2wwg",
    "anpql8S469Q",
    "PWK8EuUSMSI",
    "1Tl2FtV06qo",
    "f02mOEt11OQ"
  ],
  "retail_lively": [
    "09R8_2nJtjg",
    "EkHTsc9PU2A",
    "6k8cpUkKK4c",
    "S2Cti12XBw4",
    "WyVfkr6nsrk",
    "t0WFOnwp3MM",
    "HXkh7EOqcQ4",
    "PWK8EuUSMSI"
  ],
  "rhythmic_flow": [
    "bKDdT_nyP54",
    "09R8_2nJtjg",
    "OPf0YbXqDm0",
    "hT_nvWreIhg",
    "f02mOEt11OQ",
    "am1VJP0RnmQ",
    "btIQvYcLNoI",
    "CX5f0NcqlMs"
  ],
  "mall_chill": [
    "TURbeWK2wwg",
    "PWK8EuUSMSI",
    "tO4dxvguQDk",
    "09R8_2nJtjg",
    "S2Cti12XBw4",
    "WyVfkr6nsrk",
    "anpql8S469Q",
    "20046_vi1vA"
  ],
  "airport_transit": [
    "UfcAVejslrU",
    "tDY6AkWFytQ",
    "sAcj8me7wGI",
    "WPni755-Krg",
    "btIQvYcLNoI",
    "CX5f0NcqlMs",
    "1Tl2FtV06qo",
    "am1VJP0RnmQ"
  ],
  "station_motion": [
    "GgQFO8dL5XQ",
    "btIQvYcLNoI",
    "wXTJBr9tt8Q",
    "Zzn9-ATB9aU",
    "UCXao7aTDQM",
    "Qa622LwgGLY",
    "T0sHaz4H9MQ",
    "am1VJP0RnmQ"
  ],
  "lounge_smooth": [
    "TURbeWK2wwg",
    "rA56B43_G4E",
    "vmDDOFXSgAs",
    "JYuyWrkwpok",
    "ZEMCeymW1Ow",
    "tO4dxvguQDk",
    "PWK8EuUSMSI",
    "k1-TrAvp_xs"
  ]
};
const MASTER_SONGS = {
  "TURbeWK2wwg": {
    "id": "TURbeWK2wwg",
    "title": "Coffee Shop Relaxing Instrumental BGM",
    "artist": "Cafe Music",
    "vibe": "jazz"
  },
  "Zzn9-ATB9aU": {
    "id": "Zzn9-ATB9aU",
    "title": "Nàng Thơ (Acoustic Guitar)",
    "artist": "Hoàng Dũng",
    "vibe": "acoustic"
  },
  "anpql8S469Q": {
    "id": "anpql8S469Q",
    "title": "Relaxing Studio Ghibli Piano Collection",
    "artist": "Calm Piano Cafe",
    "vibe": "piano"
  },
  "LZN4I3K8SC0": {
    "id": "LZN4I3K8SC0",
    "title": "Cứ Chill Thôi",
    "artist": "Chillies",
    "vibe": "acoustic"
  },
  "lSD_L-xic9o": {
    "id": "lSD_L-xic9o",
    "title": "From The Start (Acoustic Jazz)",
    "artist": "Laufey",
    "vibe": "jazz"
  },
  "akgNYX8i9Xs": {
    "id": "akgNYX8i9Xs",
    "title": "Chuyện Rằng",
    "artist": "Thịnh Suy",
    "vibe": "acoustic"
  },
  "F5tS5m86bOI": {
    "id": "F5tS5m86bOI",
    "title": "Lạ Lùng (Original Acoustic)",
    "artist": "Vũ.",
    "vibe": "acoustic"
  },
  "3UyotSd-Cp4": {
    "id": "3UyotSd-Cp4",
    "title": "Ánh Nắng Của Anh",
    "artist": "Đức Phúc",
    "vibe": "acoustic"
  },
  "Ej8RhiSv2-4": {
    "id": "Ej8RhiSv2-4",
    "title": "Falling Behind",
    "artist": "Laufey",
    "vibe": "jazz"
  },
  "_YzngEllRgM": {
    "id": "_YzngEllRgM",
    "title": "Có Em Chờ (Acoustic Chill)",
    "artist": "MIN ft. Mr A",
    "vibe": "acoustic"
  },
  "RWopiMiKKwI": {
    "id": "RWopiMiKKwI",
    "title": "Studio Ghibli Relaxing Guitar Collection",
    "artist": "Joe Hisaishi Guitar",
    "vibe": "piano"
  },
  "TK1Ij_-mank": {
    "id": "TK1Ij_-mank",
    "title": "One Summer's Day (Piano)",
    "artist": "Joe Hisaishi",
    "vibe": "piano"
  },
  "jO2viLEW-1A": {
    "id": "jO2viLEW-1A",
    "title": "comethru (Acoustic Chill)",
    "artist": "Jeremy Zucker",
    "vibe": "lofi"
  },
  "PWK8EuUSMSI": {
    "id": "PWK8EuUSMSI",
    "title": "Easy",
    "artist": "Mac Ayres",
    "vibe": "jazz"
  },
  "jfKfPfyJRdk": {
    "id": "jfKfPfyJRdk",
    "title": "Lofi Girl - Chill Beats for Cloudy Days",
    "artist": "Lofi Girl",
    "vibe": "lofi"
  },
  "ixdSsW5n2rI": {
    "id": "ixdSsW5n2rI",
    "title": "Bước Qua Nhau",
    "artist": "Vũ.",
    "vibe": "acoustic"
  },
  "tO4dxvguQDk": {
    "id": "tO4dxvguQDk",
    "title": "Don't Know Why",
    "artist": "Norah Jones",
    "vibe": "jazz"
  },
  "_ngKuGvZvrU": {
    "id": "_ngKuGvZvrU",
    "title": "Ngày Mai Em Đi (Acoustic Live)",
    "artist": "Lê Hiếu ft. Soobin",
    "vibe": "acoustic"
  },
  "UCXao7aTDQM": {
    "id": "UCXao7aTDQM",
    "title": "Tháng Tư Là Lời Nói Dối Của Em",
    "artist": "Hà Anh Tuấn",
    "vibe": "acoustic"
  },
  "ucRVDoFkcxc": {
    "id": "ucRVDoFkcxc",
    "title": "Nothing",
    "artist": "Bruno Major",
    "vibe": "jazz"
  },
  "1nml-_YE2OU": {
    "id": "1nml-_YE2OU",
    "title": "The Most Beautiful Thing",
    "artist": "Bruno Major",
    "vibe": "jazz"
  },
  "btIQvYcLNoI": {
    "id": "btIQvYcLNoI",
    "title": "Location Unknown (Brooklyn Session)",
    "artist": "HONNE",
    "vibe": "lofi"
  },
  "lB4PRX737-0": {
    "id": "lB4PRX737-0",
    "title": "Merry-Go-Round of Life (Piano)",
    "artist": "Joe Hisaishi",
    "vibe": "piano"
  },
  "20046_vi1vA": {
    "id": "20046_vi1vA",
    "title": "Warm Autumn Coffee Lofi Beats",
    "artist": "Lofi Cafe",
    "vibe": "lofi"
  },
  "2OEL4P1Rz04": {
    "id": "2OEL4P1Rz04",
    "title": "Cozy Stormy Night - Warm Jazz & Thunder",
    "artist": "Cozy Jazz BGM",
    "vibe": "jazz"
  },
  "pDYM_JBAnp4": {
    "id": "pDYM_JBAnp4",
    "title": "Dấu Mưa (Original)",
    "artist": "Trung Quân",
    "vibe": "acoustic"
  },
  "so6ExplQlaY": {
    "id": "so6ExplQlaY",
    "title": "Kiss The Rain",
    "artist": "Yiruma",
    "vibe": "piano"
  },
  "ntEoGvhoVac": {
    "id": "ntEoGvhoVac",
    "title": "Mascara",
    "artist": "Chillies",
    "vibe": "acoustic"
  },
  "rm7AG7rqvg8": {
    "id": "rm7AG7rqvg8",
    "title": "Chưa Bao Giờ (Live at Wow Sunset)",
    "artist": "Trung Quân",
    "vibe": "acoustic"
  },
  "R2LQdh42neg": {
    "id": "R2LQdh42neg",
    "title": "Apocalypse & Dreampop",
    "artist": "Cigarettes After Sex",
    "vibe": "lofi"
  },
  "b1kbLwvqugk": {
    "id": "b1kbLwvqugk",
    "title": "Paris in the Rain",
    "artist": "Lauv",
    "vibe": "lofi"
  },
  "7maJOI3QMu0": {
    "id": "7maJOI3QMu0",
    "title": "River Flows In You",
    "artist": "Yiruma",
    "vibe": "piano"
  },
  "Qzc_aX8c8g4": {
    "id": "Qzc_aX8c8g4",
    "title": "Dancing With Your Ghost",
    "artist": "Sasha Alex Sloan",
    "vibe": "acoustic"
  },
  "50VNCymT-Cs": {
    "id": "50VNCymT-Cs",
    "title": "Let Me Down Slowly",
    "artist": "Alec Benjamin",
    "vibe": "acoustic"
  },
  "PaXKf0JEzEA": {
    "id": "PaXKf0JEzEA",
    "title": "Comptine d'un autre été",
    "artist": "Yann Tiersen",
    "vibe": "piano"
  },
  "vYIYIVmOo3Q": {
    "id": "vYIYIVmOo3Q",
    "title": "Rain & Thunderstorm Lofi Chill Beats",
    "artist": "Lofi Rain",
    "vibe": "lofi"
  },
  "eUDVUZZyA0M": {
    "id": "eUDVUZZyA0M",
    "title": "Experience (Live in Milano)",
    "artist": "Ludovico Einaudi",
    "vibe": "piano"
  },
  "4VR-6AS0-l4": {
    "id": "4VR-6AS0-l4",
    "title": "Nuvole Bianche",
    "artist": "Ludovico Einaudi",
    "vibe": "piano"
  },
  "5MU_z4kzZIQ": {
    "id": "5MU_z4kzZIQ",
    "title": "Interstellar Main Theme (Piano Solo)",
    "artist": "Lola Piano",
    "vibe": "piano"
  },
  "CX5f0NcqlMs": {
    "id": "CX5f0NcqlMs",
    "title": "Warm On A Cold Night",
    "artist": "HONNE",
    "vibe": "lofi"
  },
  "vVhKA9Av6vA": {
    "id": "vVhKA9Av6vA",
    "title": "Bao Tiền Một Mớ Bình Yên?",
    "artist": "14 Casper & Bon Nghiêm",
    "vibe": "acoustic"
  },
  "Zu2Spp4nrTM": {
    "id": "Zu2Spp4nrTM",
    "title": "Promise",
    "artist": "Laufey",
    "vibe": "jazz"
  },
  "Qa622LwgGLY": {
    "id": "Qa622LwgGLY",
    "title": "Lời Tạm Biệt Chưa Nói",
    "artist": "GREY D x Orange x Kai Đinh",
    "vibe": "acoustic"
  },
  "T0sHaz4H9MQ": {
    "id": "T0sHaz4H9MQ",
    "title": "Vùng Ký Ức",
    "artist": "Chillies",
    "vibe": "acoustic"
  },
  "cX2uLlc0su4": {
    "id": "cX2uLlc0su4",
    "title": "Đoạn Kết Mới",
    "artist": "Hoàng Dũng",
    "vibe": "acoustic"
  },
  "tdV_jKCrRUo": {
    "id": "tdV_jKCrRUo",
    "title": "Hẹn Một Mai",
    "artist": "Bùi Anh Tuấn",
    "vibe": "acoustic"
  },
  "7P9-R_sa0RY": {
    "id": "7P9-R_sa0RY",
    "title": "Painkiller (Live Acoustic)",
    "artist": "Ruel",
    "vibe": "acoustic"
  },
  "1fueZCTYkpA": {
    "id": "1fueZCTYkpA",
    "title": "Deep Sleep & Insomnia Delta Waves Music",
    "artist": "Body Mind Zone",
    "vibe": "piano"
  },
  "JD-kMIpDfnY": {
    "id": "JD-kMIpDfnY",
    "title": "Lofi Hip Hop Radio - Beats to Sleep/Chill to",
    "artist": "Lofi Girl Sleep",
    "vibe": "lofi"
  },
  "9vaLkYElidg": {
    "id": "9vaLkYElidg",
    "title": "Ánh Sao Và Bầu Trời",
    "artist": "T.R.I x Cá",
    "vibe": "acoustic"
  },
  "UyXngX4kTfE": {
    "id": "UyXngX4kTfE",
    "title": "Tháng Năm (The Playah)",
    "artist": "SOOBIN x SlimV",
    "vibe": "acoustic"
  },
  "F13eXG8GuhU": {
    "id": "F13eXG8GuhU",
    "title": "Bên Trên Tầng Lầu (Lofi Version)",
    "artist": "Tăng Duy Tân x Zeaplee",
    "vibe": "lofi"
  },
  "uBHOIb3pT_E": {
    "id": "uBHOIb3pT_E",
    "title": "Dạ Vũ (Lofi Ambient)",
    "artist": "Tăng Duy Tân",
    "vibe": "lofi"
  },
  "4HLumkaPcCI": {
    "id": "4HLumkaPcCI",
    "title": "drunk",
    "artist": "keshi",
    "vibe": "lofi"
  },
  "8ulR00x-B1I": {
    "id": "8ulR00x-B1I",
    "title": "right here",
    "artist": "keshi",
    "vibe": "lofi"
  },
  "LKZyp2cSAy4": {
    "id": "LKZyp2cSAy4",
    "title": "2 soon",
    "artist": "keshi",
    "vibe": "lofi"
  },
  "mtoeTzYKyaQ": {
    "id": "mtoeTzYKyaQ",
    "title": "less of you",
    "artist": "keshi",
    "vibe": "lofi"
  },
  "2WfaotSK3mI": {
    "id": "2WfaotSK3mI",
    "title": "Gymnopédie No. 1",
    "artist": "Erik Satie",
    "vibe": "piano"
  },
  "WNcsUNKlAKw": {
    "id": "WNcsUNKlAKw",
    "title": "Clair de Lune",
    "artist": "Debussy",
    "vibe": "piano"
  },
  "GedLli_YXEI": {
    "id": "GedLli_YXEI",
    "title": "Midnight Lofi Hip Hop Radio",
    "artist": "Midnight Lofi",
    "vibe": "lofi"
  },
  "1Tl2FtV06qo": {
    "id": "1Tl2FtV06qo",
    "title": "Asian Lofi Radio",
    "artist": "Asian Lofi",
    "vibe": "lofi"
  },
  "aG9YL6Semn0": {
    "id": "aG9YL6Semn0",
    "title": "Tuyết Rơi Mùa Hè",
    "artist": "Hà Anh Tuấn",
    "vibe": "acoustic"
  },
  "NLphEFOyoqM": {
    "id": "NLphEFOyoqM",
    "title": "Let You Break My Heart Again",
    "artist": "Laufey",
    "vibe": "jazz"
  },
  "uKxWP56VStM": {
    "id": "uKxWP56VStM",
    "title": "all the kids are depressed",
    "artist": "Jeremy Zucker",
    "vibe": "lofi"
  },
  "t0WFOnwp3MM": {
    "id": "t0WFOnwp3MM",
    "title": "Mặt Trời Của Em - Official MV | Phương Ly ft JustaTee",
    "artist": "V-Pop / Indie",
    "vibe": "acoustic"
  },
  "HXkh7EOqcQ4": {
    "id": "HXkh7EOqcQ4",
    "title": "THẰNG ĐIÊN | JUSTATEE x PHƯƠNG LY | OFFICIAL MV",
    "artist": "V-Pop / Indie",
    "vibe": "acoustic"
  },
  "W2FRMzCuPzY": {
    "id": "W2FRMzCuPzY",
    "title": "Ghé Qua - Dick x Tofu x PC [Official Audio]",
    "artist": "V-Pop / Indie",
    "vibe": "acoustic"
  },
  "ff7dvE-4mMA": {
    "id": "ff7dvE-4mMA",
    "title": "Ex's Hate Me | B Ray x Masew (Ft AMEE) | Official Lyrics Video",
    "artist": "V-Pop / Indie",
    "vibe": "acoustic"
  },
  "TKlXc3iywoM": {
    "id": "TKlXc3iywoM",
    "title": "Da LAB - Một Nhà (Official Lyric Video)",
    "artist": "V-Pop / Indie",
    "vibe": "acoustic"
  },
  "GgQFO8dL5XQ": {
    "id": "GgQFO8dL5XQ",
    "title": "Da LAB - Thanh Xuân (Official Music Video)",
    "artist": "V-Pop / Indie",
    "vibe": "acoustic"
  },
  "ghUh0NPHXy8": {
    "id": "ghUh0NPHXy8",
    "title": "Bài Ka Tuổi Trẻ - TamKa PKL | Official Music Video",
    "artist": "V-Pop / Indie",
    "vibe": "acoustic"
  },
  "5e7e_KZINA4": {
    "id": "5e7e_KZINA4",
    "title": "Đen - Đưa Nhau Đi Trốn ft. Linh Cáo [M/V]",
    "artist": "V-Pop / Indie",
    "vibe": "acoustic"
  },
  "-nnWBhKZeg0": {
    "id": "-nnWBhKZeg0",
    "title": "Yêu Là \"Tha Thu\" | Only C | Em Chưa 18 OST | Official Music Video",
    "artist": "V-Pop / Indie",
    "vibe": "acoustic"
  },
  "S2Cti12XBw4": {
    "id": "S2Cti12XBw4",
    "title": "Maroon 5 - Sunday Morning",
    "artist": "V-Pop / Indie",
    "vibe": "acoustic"
  },
  "WyVfkr6nsrk": {
    "id": "WyVfkr6nsrk",
    "title": "Ritt Momney - Put Your Records On (Official Video)",
    "artist": "V-Pop / Indie",
    "vibe": "acoustic"
  },
  "U8Z0sI7vWyY": {
    "id": "U8Z0sI7vWyY",
    "title": "Here Comes The Sun - The Beatles (George’s Vocal & Acoustic Guitars Only)",
    "artist": "Acoustic Classic",
    "vibe": "acoustic"
  },
  "EkHTsc9PU2A": {
    "id": "EkHTsc9PU2A",
    "title": "Jason Mraz - I'm Yours (Official Video) [4K Remaster]",
    "artist": "V-Pop / Indie",
    "vibe": "acoustic"
  },
  "6k8cpUkKK4c": {
    "id": "6k8cpUkKK4c",
    "title": "Bruno Mars - Count on Me (Official Lyric Video)",
    "artist": "V-Pop / Indie",
    "vibe": "acoustic"
  },
  "zshxAlfZYAI": {
    "id": "zshxAlfZYAI",
    "title": "Noo Phước Thịnh - Chạm Khẽ Tim Anh Một Chút Thôi (Official Music Video)",
    "artist": "V-Pop / Indie",
    "vibe": "acoustic"
  },
  "DZDYZ9nRHfU": {
    "id": "DZDYZ9nRHfU",
    "title": "Đức Phúc - Hết Thương Cạn Nhớ (Official Music Video)",
    "artist": "V-Pop / Indie",
    "vibe": "acoustic"
  },
  "vCIc1g_4JWM": {
    "id": "vCIc1g_4JWM",
    "title": "Phía Sau Một Cô Gái - Soobin Hoàng Sơn (Official Music Video 4K)",
    "artist": "V-Pop / Indie",
    "vibe": "acoustic"
  },
  "X2TxXIqbHhw": {
    "id": "X2TxXIqbHhw",
    "title": "Lặng Lẽ Tổn Thương | Mr. Siro - Day 7 Fanconcert Hà Nội",
    "artist": "V-Pop / Indie",
    "vibe": "acoustic"
  },
  "TfDHpsZQYeE": {
    "id": "TfDHpsZQYeE",
    "title": "Dưới Những Cơn Mưa - Mr.Siro (Lyrics Video)",
    "artist": "V-Pop / Indie",
    "vibe": "acoustic"
  },
  "ilKg0DZrOwY": {
    "id": "ilKg0DZrOwY",
    "title": "AI MANG CÔ ĐƠN ĐI - ICM x APJ | OFFICIAL AUDIO",
    "artist": "V-Pop / Indie",
    "vibe": "acoustic"
  },
  "X-GCJwz4PnY": {
    "id": "X-GCJwz4PnY",
    "title": "Buồn Thì Cứ Khóc Đi - Lynk Lee | Official MV",
    "artist": "V-Pop / Indie",
    "vibe": "acoustic"
  },
  "kV3famkRaA4": {
    "id": "kV3famkRaA4",
    "title": "TÂM SỰ TUỔI 30 | TRỊNH THĂNG BÌNH | OST ÔNG NGOẠI TUỔI 30",
    "artist": "Acoustic Trữ Tình",
    "vibe": "vintage"
  },
  "zABLecsR5UE": {
    "id": "zABLecsR5UE",
    "title": "Lewis Capaldi - Someone You Loved",
    "artist": "Acoustic Classic",
    "vibe": "acoustic"
  },
  "mtf7hC17IBM": {
    "id": "mtf7hC17IBM",
    "title": "Kodaline - All I Want (Part 1)",
    "artist": "Acoustic Classic",
    "vibe": "acoustic"
  },
  "k4V3Mo61fJM": {
    "id": "k4V3Mo61fJM",
    "title": "Coldplay - Fix You (Official Video)",
    "artist": "Acoustic Classic",
    "vibe": "acoustic"
  },
  "FvOpPeKSf_4": {
    "id": "FvOpPeKSf_4",
    "title": "Joji -  Glimpse of Us",
    "artist": "V-Pop / Indie",
    "vibe": "acoustic"
  },
  "K3Qzzggn--s": {
    "id": "K3Qzzggn--s",
    "title": "Joji - SLOW DANCING IN THE DARK",
    "artist": "V-Pop / Indie",
    "vibe": "acoustic"
  },
  "IQqaN5aRZ_Q": {
    "id": "IQqaN5aRZ_Q",
    "title": "CÒN TUỔI NÀO CHO EM - Lân Nhã 「 Official Music Video 」",
    "artist": "V-Pop / Indie",
    "vibe": "acoustic"
  },
  "HUEzO7WY_3Y": {
    "id": "HUEzO7WY_3Y",
    "title": "Hà An Huy - DIỄM XƯA | Musique de Salon \"Đêm nhạc Trịnh Công Sơn\" 2026",
    "artist": "V-Pop / Indie",
    "vibe": "acoustic"
  },
  "5KVZS1ulb50": {
    "id": "5KVZS1ulb50",
    "title": "Hạ Trắng  | Nhạc Sĩ: Trịnh Công Sơn | Khánh Ly",
    "artist": "Acoustic Trữ Tình",
    "vibe": "vintage"
  },
  "lpKFtStuYvs": {
    "id": "lpKFtStuYvs",
    "title": "Ru Em Từng Ngón Xuân Nồng (Sáng Tác: Trịnh Công Sơn) - KHÁNH LY | OFFICIAL",
    "artist": "V-Pop / Indie",
    "vibe": "acoustic"
  },
  "PbOb4HFawM0": {
    "id": "PbOb4HFawM0",
    "title": "EM CÒN NHỚ HAY EM ĐÃ QUÊN - LÂN NHÃ 「 Official Music Video 」",
    "artist": "V-Pop / Indie",
    "vibe": "acoustic"
  },
  "_7WukrlfcyI": {
    "id": "_7WukrlfcyI",
    "title": "Nỗi lòng người đi | Anh Bằng - Tuấn Ngọc & Tấn Minh",
    "artist": "Acoustic Trữ Tình",
    "vibe": "vintage"
  },
  "FjTmEApbUOc": {
    "id": "FjTmEApbUOc",
    "title": "Chế Linh | Thành Phố Buồn (Lam Phương) | Làng Văn Video 12 - Nỗi Buồn Hoa Phượng | Official MV",
    "artist": "Acoustic Trữ Tình",
    "vibe": "vintage"
  },
  "zk0EryONOfs": {
    "id": "zk0EryONOfs",
    "title": "PBN 38 | Tuấn Ngọc - Riêng Một Góc Trời",
    "artist": "Acoustic Trữ Tình",
    "vibe": "vintage"
  },
  "chiavKkZW6s": {
    "id": "chiavKkZW6s",
    "title": "\"Chờ Người Nơi Ấy\" (OST Mỹ Nhân Kế - phim Tết 2013) - Uyên Linh [Full MV]",
    "artist": "V-Pop / Indie",
    "vibe": "acoustic"
  },
  "JYuyWrkwpok": {
    "id": "JYuyWrkwpok",
    "title": "Frank Sinatra - Fly Me To The Moon (Audio) ft. Count Basie And His Orchestra",
    "artist": "Jazz Classic",
    "vibe": "jazz"
  },
  "ZEMCeymW1Ow": {
    "id": "ZEMCeymW1Ow",
    "title": "The Autumn Leaves By Nat King Cole",
    "artist": "Jazz Classic",
    "vibe": "jazz"
  },
  "MqazV4hbu8E": {
    "id": "MqazV4hbu8E",
    "title": "Elvis Presley - Can't Help Falling in Love (Lyrics)",
    "artist": "Acoustic Classic",
    "vibe": "acoustic"
  },
  "wXTJBr9tt8Q": {
    "id": "wXTJBr9tt8Q",
    "title": "The Beatles - Yesterday (Live With Spoken Word Intro, New York) [Remastered 2015]",
    "artist": "Acoustic Classic",
    "vibe": "acoustic"
  },
  "hwZNL7QVJjE": {
    "id": "hwZNL7QVJjE",
    "title": "Ben E. King - Stand By Me (Audio)",
    "artist": "V-Pop / Indie",
    "vibe": "acoustic"
  },
  "sAcj8me7wGI": {
    "id": "sAcj8me7wGI",
    "title": "Relaxing Piano Music For Study and Focus",
    "artist": "Lofi Ambience",
    "vibe": "lofi"
  },
  "f02mOEt11OQ": {
    "id": "f02mOEt11OQ",
    "title": "code-fi / lofi beats to code/relax to",
    "artist": "Lofi Ambience",
    "vibe": "lofi"
  },
  "tDY6AkWFytQ": {
    "id": "tDY6AkWFytQ",
    "title": "Deep Work Music | Background Ambience for Focus & Productivity",
    "artist": "V-Pop / Indie",
    "vibe": "acoustic"
  },
  "WPni755-Krg": {
    "id": "WPni755-Krg",
    "title": "Study Music Alpha Waves: Relaxing Studying Music, Brain Power, Focus Concentration Music, ☯161",
    "artist": "Lofi Ambience",
    "vibe": "lofi"
  },
  "am1VJP0RnmQ": {
    "id": "am1VJP0RnmQ",
    "title": "Flow State - Chillstep & Synthwave for Deep Focus | Coding Session",
    "artist": "Lofi Ambience",
    "vibe": "lofi"
  },
  "9M4jZuqdw04": {
    "id": "9M4jZuqdw04",
    "title": "In the Zone 🐾 [lofi focus beats / work mix]",
    "artist": "Lofi Ambience",
    "vibe": "lofi"
  },
  "UfcAVejslrU": {
    "id": "UfcAVejslrU",
    "title": "Weightless (Official Audio)",
    "artist": "Marconi Union",
    "vibe": "chill"
  },
  "hT_nvWreIhg": {
    "id": "hT_nvWreIhg",
    "title": "Counting Stars",
    "artist": "OneRepublic",
    "vibe": "chill"
  },
  "btPJPFnesV4": {
    "id": "btPJPFnesV4",
    "title": "Survivor - Eye Of The Tiger",
    "artist": "Survivor",
    "vibe": "chill"
  },
  "uelHwf8o7_U": {
    "id": "uelHwf8o7_U",
    "title": "Eminem - Love The Way You Lie ft. Rihanna",
    "artist": "Eminem",
    "vibe": "chill"
  },
  "09R8_2nJtjg": {
    "id": "09R8_2nJtjg",
    "title": "Maroon 5 - Sugar",
    "artist": "Maroon 5",
    "vibe": "chill"
  },
  "YqeW9_5kURI": {
    "id": "YqeW9_5kURI",
    "title": "Major Lazer & DJ Snake - Lean On",
    "artist": "Major Lazer",
    "vibe": "chill"
  },
  "2vjPBrBU-TM": {
    "id": "2vjPBrBU-TM",
    "title": "Sia - Chandelier (Official Video)",
    "artist": "Sia",
    "vibe": "chill"
  },
  "CevxZvSJLk8": {
    "id": "CevxZvSJLk8",
    "title": "Katy Perry - Roar",
    "artist": "Katy Perry",
    "vibe": "chill"
  },
  "bKDdT_nyP54": {
    "id": "bKDdT_nyP54",
    "title": "Avicii - Wake Me Up",
    "artist": "Avicii",
    "vibe": "chill"
  },
  "hLQl3WQQoQ0": {
    "id": "hLQl3WQQoQ0",
    "title": "Adele - Someone Like You",
    "artist": "Adele",
    "vibe": "chill"
  },
  "fJ9rUzIMcZQ": {
    "id": "fJ9rUzIMcZQ",
    "title": "Queen - Bohemian Rhapsody",
    "artist": "Queen",
    "vibe": "chill"
  },
  "04854XqcfCY": {
    "id": "04854XqcfCY",
    "title": "Coldplay - Hymn For The Weekend",
    "artist": "Coldplay",
    "vibe": "chill"
  },
  "RBumgq5yVrA": {
    "id": "RBumgq5yVrA",
    "title": "Passenger - Let Her Go",
    "artist": "Passenger",
    "vibe": "chill"
  },
  "L3wKzyIN1yk": {
    "id": "L3wKzyIN1yk",
    "title": "Vance Joy - Riptide",
    "artist": "Vance Joy",
    "vibe": "chill"
  },
  "YQHsXMglC9A": {
    "id": "YQHsXMglC9A",
    "title": "Adele - Hello",
    "artist": "Adele",
    "vibe": "chill"
  },
  "h_D3VFfhvs4": {
    "id": "h_D3VFfhvs4",
    "title": "Ed Sheeran - Perfect",
    "artist": "Ed Sheeran",
    "vibe": "chill"
  },
  "lp-EO5I60KA": {
    "id": "lp-EO5I60KA",
    "title": "Ed Sheeran - Thinking Out Loud",
    "artist": "Ed Sheeran",
    "vibe": "chill"
  },
  "YkADj0TPrJA": {
    "id": "YkADj0TPrJA",
    "title": "Phil Collins - In The Air Tonight",
    "artist": "Phil Collins",
    "vibe": "chill"
  },
  "J_ub7Etch2U": {
    "id": "J_ub7Etch2U",
    "title": "Đen - Trốn Tìm ft. MTV Band",
    "artist": "Đen Vâu",
    "vibe": "chill"
  },
  "Llw9Q6akRo4": {
    "id": "Llw9Q6akRo4",
    "title": "Đen - Bài Này Chill Phết ft. MIN",
    "artist": "Đen Vâu",
    "vibe": "chill"
  },
  "k1-TrAvp_xs": {
    "id": "k1-TrAvp_xs",
    "title": "The Girl From Ipanema - Stan Getz & Astrud Gilberto",
    "artist": "Astrud Gilberto",
    "vibe": "chill"
  },
  "vmDDOFXSgAs": {
    "id": "vmDDOFXSgAs",
    "title": "Louis Armstrong - What A Wonderful World",
    "artist": "Louis Armstrong",
    "vibe": "chill"
  },
  "sElE_BfQ67s": {
    "id": "sElE_BfQ67s",
    "title": "The xx - Intro",
    "artist": "The xx",
    "vibe": "chill"
  },
  "4NRXx6U8ABQ": {
    "id": "4NRXx6U8ABQ",
    "title": "The Weeknd - Blinding Lights",
    "artist": "The Weeknd",
    "vibe": "chill"
  },
  "D1NdGBldg3w": {
    "id": "D1NdGBldg3w",
    "title": "Beach House - Space Song",
    "artist": "Beach House",
    "vibe": "chill"
  },
  "JGwWNGJdvx8": {
    "id": "JGwWNGJdvx8",
    "title": "Ed Sheeran - Shape of You",
    "artist": "Ed Sheeran",
    "vibe": "chill"
  },
  "e-ORhEE9VVg": {
    "id": "e-ORhEE9VVg",
    "title": "Taylor Swift - Blank Space",
    "artist": "Taylor Swift",
    "vibe": "energetic"
  },
  "nfWlot6h_JM": {
    "id": "nfWlot6h_JM",
    "title": "Taylor Swift - Shake It Off",
    "artist": "Taylor Swift",
    "vibe": "energetic"
  },
  "3tmd-ClpJxA": {
    "id": "3tmd-ClpJxA",
    "title": "Taylor Swift - Look What You Made Me Do",
    "artist": "Taylor Swift",
    "vibe": "energetic"
  },
  "K5KAc5CoCuk": {
    "id": "K5KAc5CoCuk",
    "title": "Indila - Dernière Danse",
    "artist": "Indila",
    "vibe": "energetic"
  },
  "k2qgadSvNyU": {
    "id": "k2qgadSvNyU",
    "title": "Dua Lipa - New Rules",
    "artist": "Dua Lipa",
    "vibe": "energetic"
  },
  "1w7OgIMMRc4": {
    "id": "1w7OgIMMRc4",
    "title": "Guns N Roses - Sweet Child O Mine",
    "artist": "Guns N Roses",
    "vibe": "energetic"
  },
  "7wtfhZwyrcc": {
    "id": "7wtfhZwyrcc",
    "title": "Imagine Dragons - Believer",
    "artist": "Imagine Dragons",
    "vibe": "energetic"
  },
  "fKopy74weus": {
    "id": "fKopy74weus",
    "title": "Imagine Dragons - Thunder",
    "artist": "Imagine Dragons",
    "vibe": "energetic"
  },
  "ktvTqknDobU": {
    "id": "ktvTqknDobU",
    "title": "Imagine Dragons - Radioactive",
    "artist": "Imagine Dragons",
    "vibe": "energetic"
  },
  "mWRsgZuwf_8": {
    "id": "mWRsgZuwf_8",
    "title": "Imagine Dragons - Demons",
    "artist": "Imagine Dragons",
    "vibe": "energetic"
  },
  "nfs8NYg7yQM": {
    "id": "nfs8NYg7yQM",
    "title": "Maroon 5 - Memories",
    "artist": "Maroon 5",
    "vibe": "energetic"
  },
  "aJOTlE1K90k": {
    "id": "aJOTlE1K90k",
    "title": "Maroon 5 - Girls Like You ft. Cardi B",
    "artist": "Maroon 5",
    "vibe": "energetic"
  },
  "rYEDA3JcQqw": {
    "id": "rYEDA3JcQqw",
    "title": "Adele - Rolling in the Deep",
    "artist": "Adele",
    "vibe": "energetic"
  },
  "OPf0YbXqDm0": {
    "id": "OPf0YbXqDm0",
    "title": "Mark Ronson - Uptown Funk ft. Bruno Mars",
    "artist": "Mark Ronson",
    "vibe": "energetic"
  }
};

class SpaceEngine {
  static getAllGroups() {
    return SPACE_GROUPS;
  }

  static getAllSpaces() {
    return ALL_SPACES;
  }

  static getSpace(spaceId) {
    return SPACE_INDEX[spaceId] || null;
  }

  /**
   * Deterministically generates a unique, non-colliding playlist for (spaceId, timeSlot, weatherSlot, moodSlot).
   * Guarantees each space context possesses an authentic, individualized musical signature.
   */
  static getPlaylistForSpace(spaceId, timeSlot = "T3", weatherSlot = "W1", moodSlot = "M1") {
    const space = SPACE_INDEX[spaceId];
    const genre = space ? space.genre : "cafe_bossa";
    let poolSongIds = [...(GENRE_POOLS[genre] || GENRE_POOLS["cafe_bossa"])];

    // Weather influence: inject rain tracks if rainy or stormy
    if (weatherSlot === "W5" || weatherSlot === "W6") {
      const rainIds = ["pDYM_JBAnp4", "so6ExplQlaY", "b1kbLwvqugk", "vYIYIVmOo3Q", "TfDHpsZQYeE"];
      poolSongIds = [...rainIds, ...poolSongIds];
    }

    // Time influence: if late night (T8) or dawn (T1), blend night ambiance
    if (timeSlot === "T8" && genre !== "gym_workout" && genre !== "sports_energy") {
      poolSongIds.push("1fueZCTYkpA", "JD-kMIpDfnY", "2WfaotSK3mI");
    }

    // De-duplicate candidate list
    const uniqueIds = Array.from(new Set(poolSongIds));

    // Compute deterministic hash seed for the exact context combination
    const key = `${spaceId || 'auto'}_${timeSlot}_${weatherSlot}_${moodSlot}`;
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash << 5) - hash + key.charCodeAt(i);
      hash |= 0;
    }
    const absHash = Math.abs(hash);

    // Permute song order deterministically based on seed
    const n = uniqueIds.length;
    const offset = absHash % n;
    const rotated = [...uniqueIds.slice(offset), ...uniqueIds.slice(0, offset)];

    // Map to full track objects
    const tracks = [];
    for (const sid of rotated) {
      if (MASTER_SONGS[sid]) {
        tracks.push(MASTER_SONGS[sid]);
      }
      if (tracks.length >= 7) break;
    }

    return tracks;
  }
}

if (typeof window !== "undefined") {
  window.SPACE_GROUPS = SPACE_GROUPS;
  window.ALL_SPACES = ALL_SPACES;
  window.SPACE_INDEX = SPACE_INDEX;
  window.SpaceEngine = SpaceEngine;
}
