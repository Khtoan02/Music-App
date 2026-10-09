import json, zlib

with open('data/master_verified_songs.json') as f:
    master = json.load(f)

# Pool categorization
pools = {
    'workout': ['7wtfhZwyrcc', 'fKopy74weus', 'ktvTqknDobU', 'hT_nvWreIhg', 'OPf0YbXqDm0', '09R8_2nJtjg', 'CevxZvSJLk8', 'nfWlot6h_JM', '1w7OgIMMRc4', 'bKDdT_nyP54', 'JGwWNGJdvx8'],
    'zen': ['UfcAVejslrU', '79kpo4x8mDA', '1ZYbU8JGBdQ', 'WPni755-Krg', '4VR-6AS0-l4', '2WfaotSK3mI', 'WNcsUNKlAKw', 'eUDVUZZyA0M'],
    'sleep': ['1fueZCTYkpA', 'JD-kMIpDfnY', '2WfaotSK3mI', 'WNcsUNKlAKw', '4VR-6AS0-l4', 'LKZyp2cSAy4', 'mtoeTzYKyaQ', 'Zzn9-ATB9aU'],
    'study': ['f02mOEt11OQ', 'tDY6AkWFytQ', 'WPni755-Krg', 'am1VJP0RnmQ', '9M4jZuqdw04', 'jfKfPfyJRdk', 'sAcj8me7wGI', '1Tl2FtV06qo'],
    'cafe': ['TURbeWK2wwg', 'k1-TrAvp_xs', 'kgd0gK3_Hyc', 'rA56B43_G4E', 'vmDDOFXSgAs', 'lSD_L-xic9o', 'tO4dxvguQDk', 'ucRVDoFkcxc', '1nml-_YE2OU'],
    'roadtrip': ['bKDdT_nyP54', 'TKlXc3iywoM', 'ghUh0NPHXy8', 'KKc_RMln54g', 'J_ub7Etch2U', 'S2Cti12XBw4', 'fJ9rUzIMcZQ', 'U8Z0sI7vWyY', 'EkHTsc9PU2A'],
    'sunset': ['vVhKA9Av6vA', 'ixdSsW5n2rI', 'Zu2Spp4nrTM', 'rm7AG7rqvg8', 'Qa622LwgGLY', 'T0sHaz4H9MQ', 'cX2uLlc0su4', 'tdV_jKCrRUo', 'Llw9Q6akRo4'],
    'dark': ['sElE_BfQ67s', 'D1NdGBldg3w', '4NRXx6U8ABQ', 'R2LQdh42neg', '4HLumkaPcCI', '8ulR00x-B1I', 'FvOpPeKSf_4', 'K3Qzzggn--s'],
    'vintage': ['IQqaN5aRZ_Q', 'HUEzO7WY_3Y', '5KVZS1ulb50', 'lpKFtStuYvs', 'PbOb4HFawM0', '_7WukrlfcyI', 'FjTmEApbUOc', 'zk0EryONOfs', 'JYuyWrkwpok', 'ZEMCeymW1Ow', 'MqazV4hbu8E', 'wXTJBr9tt8Q'],
    'rain': ['pDYM_JBAnp4', 'so6ExplQlaY', 'TfDHpsZQYeE', 'X2TxXIqbHhw', 'b1kbLwvqugk', '7maJOI3QMu0', 'Qzc_aX8c8g4', 'vYIYIVmOo3Q', 'zABLecsR5UE', 'mtf7hC17IBM']
}

space_pool_map = {
    'phong_gym': ['workout'],
    'san_the_thao': ['workout'],
    'duong_chay': ['workout'],
    'phong_yoga': ['zen'],
    'phong_tam': ['zen'],
    'phong_ngu': ['sleep'],
    'thu_vien': ['study'],
    'phong_tu_hoc': ['study'],
    'coworking': ['study', 'cafe'],
    'van_phong': ['study', 'cafe'],
    'quan_ca_phe': ['cafe'],
    'nha_hang': ['cafe', 'vintage'],
    'o_to_rieng': ['roadtrip'],
    'taxi': ['roadtrip', 'sunset'],
    'dap_xe': ['roadtrip', 'workout'],
    'bai_bien': ['sunset', 'roadtrip'],
    'nui_rung': ['zen', 'sunset'],
    'khu_cam_trai': ['roadtrip', 'sunset'],
    'phong_toi': ['dark'],
    'noi_yen_tinh': ['zen', 'sleep'],
    'noi_dong_duc': ['study', 'dark']
}

def generate_playlist(space_id, t_slot, w_slot, m_slot):
    # Determine candidate pools
    assigned_pools = space_pool_map.get(space_id, ['cafe', 'sunset', 'study'])
    
    # Weather modifier
    if w_slot in ['W5', 'W6']:
        assigned_pools = ['rain'] + assigned_pools
    
    # Time modifier
    if t_slot == 'T8':
        assigned_pools = assigned_pools + ['sleep', 'dark']
    elif t_slot in ['T1', 'T2']:
        assigned_pools = assigned_pools + ['cafe', 'zen']
    elif t_slot == 'T6':
        assigned_pools = assigned_pools + ['sunset']
        
    candidates = []
    for p in assigned_pools:
        candidates.extend(pools.get(p, []))
        
    # De-duplicate preserving order
    unique_candidates = list(dict.fromkeys(candidates))
    
    # Deterministic permutation using crc32 hash
    key = f"{space_id}_{t_slot}_{w_slot}_{m_slot}"
    seed = zlib.crc32(key.encode('utf-8'))
    
    n = len(unique_candidates)
    if n == 0:
        return ()
        
    # Rotate by seed
    offset = seed % n
    rotated = unique_candidates[offset:] + unique_candidates[:offset]
    
    # Select 6
    selected = rotated[:6]
    return tuple(selected)

# Test collision
playlists = set()
total = 0
for s in space_pool_map.keys():
    for t in ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8']:
        for w in ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7']:
            for m in ['M1', 'M2', 'M3', 'M4', 'M5']:
                pl = generate_playlist(s, t, w, m)
                playlists.add((s, pl))
                total += 1

print(f"Total combinations tested: {total}")
print(f"Unique playlists (per space): {len(playlists)}")
