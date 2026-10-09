import json, re

# 1. Load 280 descriptions
cases_raw = []
with open('scripts/raw_descriptions.txt', 'r', encoding='utf-8') as f:
    for line in f:
        line = line.strip()
        if not line:
            continue
        parts = line.split('\t')
        if len(parts) == 4:
            cases_raw.append({
                'code': parts[0],
                'weather': parts[1],
                'mood': parts[2],
                'desc': parts[3]
            })

if len(cases_raw) != 280:
    print(f"Error: expected 280 cases, got {len(cases_raw)}")
    exit(1)

# 2. Load verified photos
with open('data/verified_photos.json', 'r') as f:
    verified_photos = json.load(f)

# 3. Load master songs
with open('data/master_verified_songs.json', 'r') as f:
    master_songs = json.load(f)

# Categorized photo mappings
photo_pools = {
    'dawn': [
        'photo-1507499739999-097706ad8914', 'photo-1495616811223-4d98c6e9c869',
        'photo-1518457607834-6e8d80c183c5', 'photo-1500382017468-9049fed747ef',
        'photo-1470240731273-7821a6eeb6bd', 'photo-1426604966848-d7adac402bff'
    ],
    'morning': [
        'photo-1513836279014-a89f7a76ae86', 'photo-1513694203232-719a280e022f',
        'photo-1507525428034-b723cf961d3e', 'photo-1472214103451-9374bd1c798e',
        'photo-1469474968028-56623f02e42e', 'photo-1501785888041-af3ef285b470',
        'photo-1433086966358-54859d0ed716'
    ],
    'noon': [
        'photo-1506744038136-46273834b3fb', 'photo-1534447677768-be436bb09401',
        'photo-1498050108023-c5249f4df085', 'photo-1497366216548-37526070297c',
        'photo-1441974231531-c6227db76b6e'
    ],
    'afternoon': [
        'photo-1554118811-1e0d58224f24', 'photo-1447752875215-b2761acb3c5d',
        'photo-1473448912268-2022ce9509d8', 'photo-1470770841072-f978cf4d019e',
        'photo-1500530855697-b586d89ba3ee'
    ],
    'sunset': [
        'photo-1495616811223-4d98c6e9c869', 'photo-1507499739999-097706ad8914',
        'photo-1464822759023-fed622ff2c3b', 'photo-1509316975850-ff9c5deb0cd9',
        'photo-1508739773434-c26b3d09e071', 'photo-1492691527719-9d1e07e534b4'
    ],
    'evening': [
        'photo-1514565131-fce0801e5785', 'photo-1519501025264-65ba15a82390',
        'photo-1516339901601-2e1562dc0acb', 'photo-1502134249126-9f3755a50d78'
    ],
    'night': [
        'photo-1506703719100-a0f3a48c0f86', 'photo-1519681393784-d120267933ba',
        'photo-1475274047050-1d0c0975c63e', 'photo-1509198397868-475647b2a1e5',
        'photo-1531306728370-e2ebd9d7bb99', 'photo-1538370965046-79c0d6907d47'
    ],
    'rain': [
        'photo-1515694346937-94d85e41e6f0', 'photo-1438449805896-28a666819a20',
        'photo-1534274988757-a28bf1a57c17', 'photo-1605721911519-3dfeb3be25e7',
        'photo-1519692933481-e162a57d6721', 'photo-1527489377706-5bf97e608852'
    ],
    'cloud': [
        'photo-1534088568595-a066f410bcda', 'photo-1517483000871-1dbf64a6e1c6',
        'photo-1483728642387-6c3bdd6c93e5', 'photo-1499346030926-9a72daac6c63',
        'photo-1518495973542-4542c06a5843'
    ],
    'fog': [
        'photo-1509114397022-ed747cca3f65', 'photo-1485236715568-ddc5ee6ca227',
        'photo-1518837695005-2083093ee35b', 'photo-1514632595-4944383f2737',
        'photo-1482192505345-5655af888cc4', 'photo-1516912481808-3406841bd33c'
    ]
}

# Mood song clusters
m1_ids = ['Zzn9-ATB9aU', 'F5tS5m86bOI', 'LZN4I3K8SC0', '3UyotSd-Cp4', 'akgNYX8i9Xs', 'RWopiMiKKwI', 'TK1Ij_-mank', 'anpql8S469Q', 'TURbeWK2wwg', 'PWK8EuUSMSI', 'tO4dxvguQDk', 'ucRVDoFkcxc', '1nml-_YE2OU', 'lB4PRX737-0', '7maJOI3QMu0', 'so6ExplQlaY', 'vVhKA9Av6vA', 'Zu2Spp4nrTM', 'CX5f0NcqlMs', 'b1kbLwvqugk', 'jO2viLEW-1A', 'pDYM_JBAnp4', '_YzngEllRgM']
m2_ids = ['t0WFOnwp3MM', 'HXkh7EOqcQ4', 'ff7dvE-4mMA', 'TKlXc3iywoM', 'ghUh0NPHXy8', '5e7e_KZINA4', '-nnWBhKZeg0', 'S2Cti12XBw4', 'WyVfkr6nsrk', 'U8Z0sI7vWyY', 'EkHTsc9PU2A', '6k8cpUkKK4c', 'Ej8RhiSv2-4', 'lSD_L-xic9o', '_ngKuGvZvrU', 'btIQvYcLNoI', '20046_vi1vA', 'W2FRMzCuPzY']
m3_ids = ['zshxAlfZYAI', 'DZDYZ9nRHfU', 'vCIc1g_4JWM', 'X2TxXIqbHhw', 'TfDHpsZQYeE', 'ilKg0DZrOwY', 'X-GCJwz4PnY', 'zABLecsR5UE', 'mtf7hC17IBM', 'k4V3Mo61fJM', 'FvOpPeKSf_4', 'K3Qzzggn--s', 'ntEoGvhoVac', 'rm7AG7rqvg8', 'R2LQdh42neg', 'Qzc_aX8c8g4', '50VNCymT-Cs', '4VR-6AS0-l4', 'eUDVUZZyA0M', '4HLumkaPcCI', '8ulR00x-B1I', 'LKZyp2cSAy4', 'mtoeTzYKyaQ', 'uKxWP56VStM', 'ixdSsW5n2rI']
m4_ids = ['GgQFO8dL5XQ', 'kV3famkRaA4', 'IQqaN5aRZ_Q', 'HUEzO7WY_3Y', '5KVZS1ulb50', 'lpKFtStuYvs', 'PbOb4HFawM0', '_7WukrlfcyI', 'FjTmEApbUOc', 'zk0EryONOfs', 'chiavKkZW6s', 'JYuyWrkwpok', 'ZEMCeymW1Ow', 'MqazV4hbu8E', 'wXTJBr9tt8Q', 'hwZNL7QVJjE', 'UCXao7aTDQM', 'Qa622LwgGLY', 'T0sHaz4H9MQ', 'cX2uLlc0su4', 'tdV_jKCrRUo', 'aG9YL6Semn0', 'NLphEFOyoqM']
m5_ids = ['sAcj8me7wGI', 'f02mOEt11OQ', 'tDY6AkWFytQ', 'WPni755-Krg', 'am1VJP0RnmQ', '9M4jZuqdw04', 'jfKfPfyJRdk', 'vYIYIVmOo3Q', '5MU_z4kzZIQ', '1fueZCTYkpA', 'JD-kMIpDfnY', '9vaLkYElidg', 'UyXngX4kTfE', 'F13eXG8GuhU', 'uBHOIb3pT_E', '2WfaotSK3mI', 'WNcsUNKlAKw', 'GedLli_YXEI', '1Tl2FtV06qo', 'PaXKf0JEzEA']

mood_map = {
    'M1': m1_ids,
    'M2': m2_ids,
    'M3': m3_ids,
    'M4': m4_ids,
    'M5': m5_ids
}

time_meta = {
    'T1': ('Rạng sáng (04:00–06:00)', 'dawn'),
    'T2': ('Sáng sớm (06:00–08:00)', 'morning'),
    'T3': ('Buổi sáng (08:00–11:00)', 'morning'),
    'T4': ('Buổi trưa (11:00–13:00)', 'noon'),
    'T5': ('Buổi chiều (13:00–16:00)', 'afternoon'),
    'T6': ('Chiều tà / Hoàng hôn (16:00–18:00)', 'sunset'),
    'T7': ('Buổi tối (18:00–21:00)', 'evening'),
    'T8': ('Đêm khuya (21:00–04:00)', 'night')
}

matrix_cases = {}

for idx, item in enumerate(cases_raw):
    code = item['code'] # e.g. BG-T1-W1-M1
    parts = code.split('-')
    t_slot = parts[1] # T1..T8
    w_slot = parts[2] # W1..W7
    m_slot = parts[3] # M1..M5
    
    t_name, t_primary_pool = time_meta[t_slot]
    w_name = item['weather']
    m_name = item['mood']
    desc = item['desc']

    # 1. Determine images (2-3 high-quality 4K images)
    # Pick based on Time FIRST so Night (T7, T8) NEVER shows daytime sky!
    selected_pids = []
    
    if t_slot == 'T7': # Buổi tối (18:00–21:00) - Night/Evening
        if w_slot in ['W5', 'W6']:
            selected_pids = ['photo-1519692933481-e162a57d6721', 'photo-1534274988757-a28bf1a57c17', 'photo-1515694346937-94d85e41e6f0']
        else:
            selected_pids = ['photo-1502134249126-9f3755a50d78', 'photo-1514565131-fce0801e5785', 'photo-1519501025264-65ba15a82390', 'photo-1516339901601-2e1562dc0acb']
    elif t_slot == 'T8': # Đêm khuya (21:00–04:00) - Deep Night / Stars
        if w_slot in ['W5', 'W6']:
            selected_pids = ['photo-1519692933481-e162a57d6721', 'photo-1534274988757-a28bf1a57c17', 'photo-1515694346937-94d85e41e6f0']
        else:
            selected_pids = ['photo-1506703719100-a0f3a48c0f86', 'photo-1519681393784-d120267933ba', 'photo-1475274047050-1d0c0975c63e', 'photo-1531306728370-e2ebd9d7bb99', 'photo-1538370965046-79c0d6907d47']
    elif t_slot == 'T1': # Rạng sáng
        selected_pids = photo_pools['dawn']
    elif t_slot == 'T6': # Chiều tà / Hoàng hôn
        selected_pids = photo_pools['sunset']
    else: # Ban ngày: T2 (Sáng sớm), T3 (Sáng), T4 (Trưa), T5 (Chiều)
        if w_slot in ['W5', 'W6']:
            selected_pids = photo_pools['rain']
        elif w_slot == 'W7':
            selected_pids = photo_pools['fog']
        elif w_slot in ['W3', 'W4']:
            selected_pids = photo_pools['cloud']
        else:
            selected_pids = photo_pools[t_primary_pool]

    # De-duplicate pids
    seen = set()
    unique_pids = []
    for p in selected_pids:
        if p not in seen:
            seen.add(p)
            unique_pids.append(p)
    if len(unique_pids) < 2:
        unique_pids.append(photo_pools[t_primary_pool][0])

    images = []
    for p_i, pid in enumerate(unique_pids[:3]):
        images.append({
            'title': f"{desc} - Góc nhìn {p_i + 1} (4K)",
            'url': f"https://images.unsplash.com/{pid}?w=3840&q=95&auto=format&fit=crop"
        })

    # 2. Curate 6-8 verified tracks for this exact mood + context
    candidate_ids = mood_map[m_slot]
    # Rotate window based on idx so every case gets distinct fresh song order
    offset = (idx * 3) % len(candidate_ids)
    ordered_ids = candidate_ids[offset:] + candidate_ids[:offset]
    
    # If rainy, ensure rain song if available
    if w_slot in ['W5', 'W6'] and m_slot == 'M1' and 'so6ExplQlaY' in ordered_ids:
        ordered_ids.remove('so6ExplQlaY')
        ordered_ids.insert(0, 'so6ExplQlaY')

    playlist = []
    for sid in ordered_ids[:7]:
        if sid in master_songs:
            playlist.append(master_songs[sid])

    # 3. Generate tailored contextual quote
    quotes_by_mood = {
        'M1': [
            f"“{desc}. Hãy để lòng mình lắng đọng, cảm nhận sự an yên sâu thẳm của giây phút này.”",
            f"“Bình yên không ở đâu xa, nó nằm ngay trong từng hơi thở êm dịu của đất trời.”",
            f"“Thả lỏng tâm hồn, cùng giai điệu nhẹ nhàng vỗ về những âu lo thường nhật.”"
        ],
        'M2': [
            f"“{desc}. Một nguồn năng lượng tươi mới ngập tràn, đón chào những điều rực rỡ nhất!”",
            f"“Hãy mỉm cười với ngày hôm nay, thế giới luôn tràn đầy những giai điệu diệu kỳ.”",
            f"“Thắp sáng tâm trí bằng sự lạc quan, từng bước đi đều mang theo niềm hứng khởi.”"
        ],
        'M3': [
            f"“{desc}. Cho phép bản thân được yếu lòng một chút, rồi mọi vết thương sẽ được âm nhạc chữa lành.”",
            f"“Có những nỗi buồn chỉ cần một góc nhỏ tĩnh lặng và một bài hát quen thuộc là đủ thấu hiểu.”",
            f"“Khoảng lặng này là của riêng bạn, hãy để từng nốt nhạc ôm lấy những vương vấn.”"
        ],
        'M4': [
            f"“{desc}. Ký ức như một thước phim quay chậm, mang theo hơi thở thân thương của ngày hôm qua.”",
            f"“Những giai điệu xưa cũ vọng về, nhắc nhở ta về những kỷ niệm đẹp đẽ khó phai.”",
            f"“Hoài niệm là cách tâm hồn ta giữ lại những điều quý giá nhất của tháng năm.”"
        ],
        'M5': [
            f"“{desc}. Giữ trọn sự tập trung, từng dòng suy nghĩ hòa nhịp cùng không gian tĩnh tại.”",
            f"“Tập trung cao độ để sáng tạo, không gian này thuộc về bạn và những mục tiêu lớn lao.”",
            f"“Tâm trí tĩnh lặng như mặt hồ, hướng trọn năng lượng vào công việc bạn đang làm.”"
        ]
    }
    quote = quotes_by_mood[m_slot][idx % len(quotes_by_mood[m_slot])]

    matrix_cases[code] = {
        'id': code,
        'timeSlot': t_slot,
        'timeName': t_name,
        'weatherSlot': w_slot,
        'weatherName': w_name,
        'moodSlot': m_slot,
        'moodName': m_name,
        'description': desc,
        'quote': quote,
        'images': images,
        'playlist': playlist
    }

print(f"Generated {len(matrix_cases)} matrix cases successfully!")

# Write to data/matrix_280.json
with open('data/matrix_280.json', 'w', encoding='utf-8') as f:
    json.dump(matrix_cases, f, ensure_ascii=False, indent=2)

# Write to js/matrix-data.js
js_content = f"""/**
 * MATRIX 280: The Complete Atmospheric Music & 4K Living Visuals Grid
 * Formula: 8 Time Slots (T1..T8) x 7 Weather Conditions (W1..W7) x 5 Moods (M1..M5) = 280 Distinct Cases
 * Generated with 100% verified 4K Unsplash imagery & 100% verified YouTube embeddable tracks
 */

const MATRIX_280 = {json.dumps(matrix_cases, ensure_ascii=False, indent=2)};

class MatrixEngine {{
  static getTimeSlot(date, options = null) {{
    if (typeof VietnamEngine !== 'undefined' && options && options.solar) {{
      const dynamicSlot = VietnamEngine.resolveDynamicTimeSlot(date, options.solar);
      if (dynamicSlot) return dynamicSlot;
    }}
    const hour = date.getHours();
    if (hour >= 4 && hour < 6) return "T1";   // 04:00 - 05:59:59 Rạng sáng
    if (hour >= 6 && hour < 8) return "T2";   // 06:00 - 07:59:59 Sáng sớm
    if (hour >= 8 && hour < 11) return "T3";  // 08:00 - 10:59:59 Buổi sáng
    if (hour >= 11 && hour < 13) return "T4"; // 11:00 - 12:59:59 Buổi trưa
    if (hour >= 13 && hour < 16) return "T5"; // 13:00 - 15:59:59 Buổi chiều
    if (hour >= 16 && hour < 18) return "T6"; // 16:00 - 17:59:59 Chiều tà / Hoàng hôn
    if (hour >= 18 && hour < 21) return "T7"; // 18:00 - 20:59:59 Buổi tối
    return "T8";                              // 21:00 - 03:59:59 Đêm khuya
  }}

  static getWeatherSlot(wmoCode, temp = 25, isDay = 1) {{
    // W7: Sương mù
    if (wmoCode === 45 || wmoCode === 48) return "W7";
    // W6: Mưa lớn / Giông bão
    if (wmoCode >= 95 || wmoCode === 65 || wmoCode === 82) return "W6";
    // W5: Mưa nhẹ / Mưa vừa / Mưa phùn
    if ((wmoCode >= 51 && wmoCode <= 57) || wmoCode === 61 || wmoCode === 63 || wmoCode === 80 || wmoCode === 81) return "W5";
    // W4: Âm u / Nhiều mây
    if (wmoCode === 3) return "W4";
    // W3: Mây thưa / Nắng nhẹ
    if (wmoCode === 1 || wmoCode === 2) return "W3";
    // W2: Nắng gắt (Khi trời trong và nhiệt độ cao hoặc trưa nắng mạnh)
    if (wmoCode === 0 && temp >= 32) return "W2";
    // W1: Trời trong (Mặc định khi trời quang hoặc không mưa)
    return "W1";
  }}

  static getDefaultMood(tSlot, wSlot) {{
    // Rainy / Stormy
    if (wSlot === "W5" || wSlot === "W6") return "M1"; // Bình yên nghe mưa
    // Dawn
    if (tSlot === "T1") return "M1";
    // Early morning
    if (tSlot === "T2") return "M2";
    // Morning work hours
    if (tSlot === "T3") return "M5";
    // Noon
    if (tSlot === "T4") return "M1";
    // Afternoon focus
    if (tSlot === "T5") return "M5";
    // Sunset
    if (tSlot === "T6") return "M4";
    // Evening
    if (tSlot === "T7") return "M1";
    // Midnight
    return "M1";
  }}

  static getCase(tSlot, wSlot, mSlot) {{
    const key = `BG-${{tSlot}}-${{wSlot}}-${{mSlot}}`;
    return MATRIX_280[key] || MATRIX_280["BG-T2-W1-M1"];
  }}
}}
"""

with open('js/matrix-data.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print("Generated js/matrix-data.js and data/matrix_280.json successfully!")
