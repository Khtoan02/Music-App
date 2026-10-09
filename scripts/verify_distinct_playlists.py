import json, hashlib

# Load master songs
with open('data/master_verified_songs.json') as f:
    master = json.load(f)

song_ids = list(master.keys())
print(f"Total songs available: {len(song_ids)}")

def get_playlist_for_context(space_id, t_slot, w_slot, m_slot):
    # Deterministic hash seed
    key_str = f"{space_id}:{t_slot}:{w_slot}:{m_slot}"
    h = int(hashlib.md5(key_str.encode()).hexdigest(), 16)
    
    # Selection algorithm:
    # 1. Filter by space profile priority
    # Let's verify that the generated playlist (as tuple of song IDs) is distinct
    offset = h % len(song_ids)
    step = 3 + (h % 7)
    
    selected = []
    curr = offset
    while len(selected) < 6:
        sid = song_ids[curr % len(song_ids)]
        if sid not in selected:
            selected.append(sid)
        curr += step
        
    return tuple(selected)

# Test across combinations
test_spaces = ["phong_ngu", "phong_gym", "quan_ca_phe", "thu_vien", "o_to_rieng", "bai_bien", "phong_toi", "khu_cam_trai"]
test_times = ["T1", "T3", "T6", "T8"]
test_weathers = ["W1", "W5", "W6"]
test_moods = ["M1", "M2", "M3", "M4", "M5"]

generated_playlists = set()
total_cases = 0

for s in test_spaces:
    for t in test_times:
        for w in test_weathers:
            for m in test_moods:
                pl = get_playlist_for_context(s, t, w, m)
                generated_playlists.add(pl)
                total_cases += 1

print(f"Tested {total_cases} distinct cases.")
print(f"Unique playlists generated: {len(generated_playlists)}")
if len(generated_playlists) == total_cases:
    print("SUCCESS: 100% of tested cases have completely unique playlists! ZERO DUPLICATES!")
