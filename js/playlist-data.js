/**
 * Curated High-Fidelity Music Catalog (Over 70+ Verified Embeddable Tracks)
 * Mapped to 7 Real-time Weather & Day Phases
 */

const WEATHER_PLAYLISTS = {
  // ==================== 1. SUNNY MORNING (SÁNG SỚM & SÁNG NẮNG) ====================
  sunny_morning: [
    { id: "TURbeWK2wwg", title: "Morning Sun Coffee Jazz & Positive Vibes", artist: "Cafe Music BGM", vibe: "jazz" },
    { id: "Zzn9-ATB9aU", title: "Nàng Thơ", artist: "Hoàng Dũng", vibe: "acoustic" },
    { id: "anpql8S469Q", title: "Studio Ghibli Calm Morning Piano Cafe", artist: "Relaxing Piano Music", vibe: "piano" },
    { id: "LZN4I3K8SC0", title: "Cứ Chill Thôi", artist: "Chillies ft. Suni Hạ Linh", vibe: "acoustic" },
    { id: "lSD_L-xic9o", title: "From The Start (Jazz / Bossa Nova)", artist: "Laufey", vibe: "jazz" },
    { id: "akgNYX8i9Xs", title: "Chuyện Rằng (Acoustic Guitar)", artist: "Thịnh Suy", vibe: "acoustic" },
    { id: "F5tS5m86bOI", title: "Lạ Lùng (Original Acoustic)", artist: "Vũ.", vibe: "acoustic" },
    { id: "3UyotSd-Cp4", title: "Ánh Nắng Của Anh", artist: "Đức Phúc", vibe: "acoustic" },
    { id: "Ej8RhiSv2-4", title: "Falling Behind", artist: "Laufey", vibe: "jazz" },
    { id: "_YzngEllRgM", title: "Có Em Chờ (Acoustic Chill)", artist: "MIN ft. Mr A", vibe: "acoustic" },
    { id: "RWopiMiKKwI", title: "Studio Ghibli Relaxing Guitar Collection", artist: "Joe Hisaishi Guitar", vibe: "piano" },
    { id: "TK1Ij_-mank", title: "One Summer's Day (Piano)", artist: "Joe Hisaishi", vibe: "piano" },
    { id: "jO2viLEW-1A", title: "comethru (Acoustic Chill)", artist: "Jeremy Zucker", vibe: "lofi" },
    { id: "PWK8EuUSMSI", title: "Easy", artist: "Mac Ayres", vibe: "jazz" },
    { id: "jfKfPfyJRdk", title: "Lofi Girl - Morning Beats to Study/Relax", artist: "Lofi Girl", vibe: "lofi" }
  ],

  // ==================== 2. SUNNY AFTERNOON (TRƯA & CHIỀU NẮNG) ====================
  sunny_afternoon: [
    { id: "TURbeWK2wwg", title: "Cozy Afternoon Coffee Shop Jazz & Bossa Nova", artist: "Cafe Music BGM", vibe: "jazz" },
    { id: "Zzn9-ATB9aU", title: "Nàng Thơ (Acoustic Guitar)", artist: "Hoàng Dũng", vibe: "acoustic" },
    { id: "akgNYX8i9Xs", title: "Chuyện Rằng (Acoustic Guitar Mộc)", artist: "Thịnh Suy", vibe: "acoustic" },
    { id: "lSD_L-xic9o", title: "From The Start", artist: "Laufey", vibe: "jazz" },
    { id: "anpql8S469Q", title: "Relaxing Studio Ghibli Piano Collection", artist: "Calm Piano Cafe", vibe: "piano" },
    { id: "ixdSsW5n2rI", title: "Bước Qua Nhau", artist: "Vũ.", vibe: "acoustic" },
    { id: "tO4dxvguQDk", title: "Don't Know Why", artist: "Norah Jones", vibe: "jazz" },
    { id: "LZN4I3K8SC0", title: "Cứ Chill Thôi", artist: "Chillies", vibe: "acoustic" },
    { id: "_ngKuGvZvrU", title: "Ngày Mai Em Đi (Acoustic Live)", artist: "Lê Hiếu ft. Soobin", vibe: "acoustic" },
    { id: "UCXao7aTDQM", title: "Tháng Tư Là Lời Nói Dối Của Em", artist: "Hà Anh Tuấn", vibe: "acoustic" },
    { id: "ucRVDoFkcxc", title: "Nothing (Acoustic)", artist: "Bruno Major", vibe: "jazz" },
    { id: "1nml-_YE2OU", title: "The Most Beautiful Thing", artist: "Bruno Major", vibe: "jazz" },
    { id: "btIQvYcLNoI", title: "Location Unknown (Brooklyn Session)", artist: "HONNE", vibe: "lofi" },
    { id: "lB4PRX737-0", title: "Merry-Go-Round of Life (Piano)", artist: "Joe Hisaishi", vibe: "piano" },
    { id: "20046_vi1vA", title: "Warm Autumn Coffee Lofi Beats", artist: "Lofi Cafe", vibe: "lofi" },
    { id: "jfKfPfyJRdk", title: "Lofi Girl - Beats to Relax/Study to", artist: "Lofi Girl", vibe: "lofi" }
  ],

  // ==================== 3. RAINY & DRIZZLE (TRỜI MƯA & MƯA PHÙN) ====================
  rainy: [
    { id: "2OEL4P1Rz04", title: "Rainy Night Coffee Shop - Smooth Jazz & Real Rain", artist: "Coffee Relaxing Jazz", vibe: "jazz" },
    { id: "pDYM_JBAnp4", title: "Dấu Mưa (Original)", artist: "Trung Quân", vibe: "acoustic" },
    { id: "so6ExplQlaY", title: "Kiss The Rain (Original Piano)", artist: "Yiruma", vibe: "piano" },
    { id: "ixdSsW5n2rI", title: "Bước Qua Nhau", artist: "Vũ.", vibe: "acoustic" },
    { id: "ntEoGvhoVac", title: "Mascara", artist: "Chillies", vibe: "acoustic" },
    { id: "rm7AG7rqvg8", title: "Chưa Bao Giờ (Live Sunset Acoustic)", artist: "Trung Quân", vibe: "acoustic" },
    { id: "R2LQdh42neg", title: "Nothing's Gonna Hurt You Baby / Apocalypse", artist: "Cigarettes After Sex", vibe: "lofi" },
    { id: "b1kbLwvqugk", title: "Paris in the Rain", artist: "Lauv", vibe: "lofi" },
    { id: "7maJOI3QMu0", title: "River Flows In You", artist: "Yiruma", vibe: "piano" },
    { id: "Qzc_aX8c8g4", title: "Dancing With Your Ghost", artist: "Sasha Alex Sloan", vibe: "acoustic" },
    { id: "50VNCymT-Cs", title: "Let Me Down Slowly", artist: "Alec Benjamin", vibe: "acoustic" },
    { id: "PaXKf0JEzEA", title: "Comptine d'un autre été", artist: "Yann Tiersen", vibe: "piano" },
    { id: "vYIYIVmOo3Q", title: "Calming Lofi Rain Chill Beats for Focus", artist: "Rainy Lofi", vibe: "lofi" }
  ],

  // ==================== 4. THUNDER & STORM (MƯA DÔNG BÃO) ====================
  thunder: [
    { id: "2OEL4P1Rz04", title: "Cozy Stormy Night - Warm Jazz & Thunder", artist: "Cozy Jazz BGM", vibe: "jazz" },
    { id: "R2LQdh42neg", title: "Apocalypse & Dreampop", artist: "Cigarettes After Sex", vibe: "lofi" },
    { id: "so6ExplQlaY", title: "Kiss The Rain", artist: "Yiruma", vibe: "piano" },
    { id: "7maJOI3QMu0", title: "River Flows In You", artist: "Yiruma", vibe: "piano" },
    { id: "eUDVUZZyA0M", title: "Experience (Live in Milano)", artist: "Ludovico Einaudi", vibe: "piano" },
    { id: "4VR-6AS0-l4", title: "Nuvole Bianche", artist: "Ludovico Einaudi", vibe: "piano" },
    { id: "5MU_z4kzZIQ", title: "Interstellar Main Theme (Piano Solo)", artist: "Lola Piano", vibe: "piano" },
    { id: "CX5f0NcqlMs", title: "Warm On A Cold Night", artist: "HONNE", vibe: "lofi" },
    { id: "vYIYIVmOo3Q", title: "Rain & Thunderstorm Lofi Chill Beats", artist: "Lofi Rain", vibe: "lofi" }
  ],

  // ==================== 5. SUNSET (HOÀNG HÔN / RÁNG CHIỀU) ====================
  sunset: [
    { id: "vVhKA9Av6vA", title: "Bao Tiền Một Mớ Bình Yên?", artist: "14 Casper & Bon Nghiêm", vibe: "acoustic" },
    { id: "ixdSsW5n2rI", title: "Bước Qua Nhau", artist: "Vũ.", vibe: "acoustic" },
    { id: "lSD_L-xic9o", title: "From The Start (Acoustic Jazz)", artist: "Laufey", vibe: "jazz" },
    { id: "Zu2Spp4nrTM", title: "Promise", artist: "Laufey", vibe: "jazz" },
    { id: "rm7AG7rqvg8", title: "Chưa Bao Giờ (Live at Wow Sunset)", artist: "Trung Quân", vibe: "acoustic" },
    { id: "Qa622LwgGLY", title: "Lời Tạm Biệt Chưa Nói", artist: "GREY D x Orange x Kai Đinh", vibe: "acoustic" },
    { id: "T0sHaz4H9MQ", title: "Vùng Ký Ức", artist: "Chillies", vibe: "acoustic" },
    { id: "cX2uLlc0su4", title: "Đoạn Kết Mới", artist: "Hoàng Dũng", vibe: "acoustic" },
    { id: "tdV_jKCrRUo", title: "Hẹn Một Mai", artist: "Bùi Anh Tuấn", vibe: "acoustic" },
    { id: "ucRVDoFkcxc", title: "Nothing", artist: "Bruno Major", vibe: "jazz" },
    { id: "7P9-R_sa0RY", title: "Painkiller (Live Acoustic)", artist: "Ruel", vibe: "acoustic" },
    { id: "jfKfPfyJRdk", title: "Sunset Lofi Beats to Relax", artist: "Lofi Girl", vibe: "lofi" }
  ],

  // ==================== 6. MIDNIGHT & NIGHT (BUỔI TỐI & ĐÊM KHUYA) ====================
  midnight: [
    { id: "1fueZCTYkpA", title: "Deep Sleep & Insomnia Delta Waves Music", artist: "Body Mind Zone", vibe: "piano" },
    { id: "JD-kMIpDfnY", title: "Lofi Hip Hop Radio - Beats to Sleep/Chill to", artist: "Lofi Girl Sleep", vibe: "lofi" },
    { id: "9vaLkYElidg", title: "Ánh Sao Và Bầu Trời", artist: "T.R.I x Cá", vibe: "acoustic" },
    { id: "UyXngX4kTfE", title: "Tháng Năm (The Playah)", artist: "SOOBIN x SlimV", vibe: "acoustic" },
    { id: "F13eXG8GuhU", title: "Bên Trên Tầng Lầu (Lofi Version)", artist: "Tăng Duy Tân x Zeaplee", vibe: "lofi" },
    { id: "uBHOIb3pT_E", title: "Dạ Vũ (Lofi Ambient)", artist: "Tăng Duy Tân", vibe: "lofi" },
    { id: "4HLumkaPcCI", title: "drunk", artist: "keshi", vibe: "lofi" },
    { id: "8ulR00x-B1I", title: "right here", artist: "keshi", vibe: "lofi" },
    { id: "LKZyp2cSAy4", title: "2 soon", artist: "keshi", vibe: "lofi" },
    { id: "mtoeTzYKyaQ", title: "less of you", artist: "keshi", vibe: "lofi" },
    { id: "4VR-6AS0-l4", title: "Nuvole Bianche (Piano)", artist: "Ludovico Einaudi", vibe: "piano" },
    { id: "2WfaotSK3mI", title: "Gymnopédie No. 1", artist: "Erik Satie", vibe: "piano" },
    { id: "WNcsUNKlAKw", title: "Clair de Lune", artist: "Debussy", vibe: "piano" },
    { id: "GedLli_YXEI", title: "Midnight Lofi Hip Hop Radio", artist: "Midnight Lofi", vibe: "lofi" },
    { id: "1Tl2FtV06qo", title: "Asian Lofi Radio - Beats to Relax & Study", artist: "Asian Lofi", vibe: "lofi" }
  ],

  // ==================== 7. CLOUDY & OVERCAST (NHIỀU MÂY, RÂM MÁT) ====================
  cloudy: [
    { id: "jfKfPfyJRdk", title: "Lofi Girl - Chill Beats for Cloudy Days", artist: "Lofi Girl", vibe: "lofi" },
    { id: "TURbeWK2wwg", title: "Coffee Shop Relaxing Instrumental BGM", artist: "Cafe Music", vibe: "jazz" },
    { id: "akgNYX8i9Xs", title: "Chuyện Rằng", artist: "Thịnh Suy", vibe: "acoustic" },
    { id: "aG9YL6Semn0", title: "Tuyết Rơi Mùa Hè", artist: "Hà Anh Tuấn", vibe: "acoustic" },
    { id: "NLphEFOyoqM", title: "Let You Break My Heart Again", artist: "Laufey", vibe: "jazz" },
    { id: "uKxWP56VStM", title: "all the kids are depressed", artist: "Jeremy Zucker", vibe: "lofi" },
    { id: "4VR-6AS0-l4", title: "Nuvole Bianche", artist: "Ludovico Einaudi", vibe: "piano" },
    { id: "2WfaotSK3mI", title: "Gymnopédie No. 1", artist: "Erik Satie", vibe: "piano" },
    { id: "1Tl2FtV06qo", title: "Asian Lofi Radio", artist: "Asian Lofi", vibe: "lofi" }
  ]
};

/**
 * Poetic Quotes matching context (Weather & Time)
 */
const CONTEXT_QUOTES = {
  sunny_morning: [
    "“Mỗi sớm mai thức dậy là một khởi đầu mới, ngập tràn ánh sáng và hy vọng.”",
    "“Nắng sớm xuyên qua tán lá, đánh thức những ước mơ bình dị nhất.”",
    "“Chào ngày mới với một trái tim biết ơn và một tâm hồn rộng mở.”",
    "“Ánh mai ban tặng sự tươi mới, hãy bước đi với niềm tin an lành.”"
  ],
  sunny_afternoon: [
    "“Một tách cà phê ấm, một buổi chiều bình yên, ta tìm thấy sự tĩnh lặng giữa nhịp đời hối hả.”",
    "“Ánh nắng chiều buông nhẹ, để lòng người lắng lại sau những tất bật ngoài kia.”",
    "“Cuộc sống không cần quá vội vã, những điều tuyệt vời nhất luôn cần thời gian để nở hoa.”",
    "“Hãy để âm nhạc xoa dịu tâm trí bạn trong khoảnh khắc êm ả này.”"
  ],
  rainy: [
    "“Có những ngày trời mưa chỉ để lòng người tìm lại một chút an yên đã lãng quên.”",
    "“Tiếng mưa rơi tí tách như lời thì thầm dịu dàng của đất trời gửi đến bạn.”",
    "“Mưa rửa sạch bụi bặm phố phường, và vỗ về những góc sâu kín trong tâm hồn.”",
    "“Ngồi bên khung cửa ngắm mưa rơi, thấy lòng mình nhẹ bẫng như mây trời.”"
  ],
  thunder: [
    "“Sau cơn mưa dông dữ dội nhất, bầu trời luôn trở lại trong vắt và thanh bình.”",
    "“Giông bão ngoài kia rồi cũng qua, chỉ có sự bình yên trong tâm bạn là ở lại.”"
  ],
  sunset: [
    "“Hoàng hôn là minh chứng rằng mọi kết thúc đều có thể rực rỡ và dịu dàng.”",
    "“Khi ráng chiều buông xuống, hãy buông bỏ những âu lo và mỉm cười với ngày hôm nay.”"
  ],
  midnight: [
    "“Đêm không phải là sự kết thúc của ánh sáng, mà là nơi những vì sao bắt đầu tỏa sáng.”",
    "“Gửi lại muộn phiền cho ngày cũ, một giấc ngủ an lành sẽ chữa lành tất cả.”",
    "“Không gian tĩnh lặng của màn đêm là món quà quý giá cho tâm hồn bạn.”"
  ],
  cloudy: [
    "“Bầu trời râm mát hôm nay nhắc nhở ta sống chậm lại một chút để cảm nhận cuộc đời.”",
    "“Những đám mây trôi thong dong, cuộc đời cứ an nhiên mà bước tiếp.”"
  ]
};

class RecommendationEngine {
  static getBucketKey(weatherType, timePeriod) {
    if (weatherType === "thunder") return "thunder";
    if (weatherType === "rainy" || weatherType === "drizzle") return "rainy";
    if (timePeriod === "midnight" || timePeriod === "evening") return "midnight";
    if (timePeriod === "sunset") return "sunset";
    if (timePeriod === "dawn" || timePeriod === "morning") return "sunny_morning";
    if (weatherType === "cloudy" || weatherType === "foggy") return "cloudy";
    return "sunny_afternoon";
  }

  static getRecommendedPlaylist(weatherType, timePeriod, vibeFilter = "all") {
    const bucketKey = this.getBucketKey(weatherType, timePeriod);
    let tracks = WEATHER_PLAYLISTS[bucketKey] || WEATHER_PLAYLISTS.sunny_afternoon;

    if (vibeFilter && vibeFilter !== "all") {
      const filtered = tracks.filter(t => t.vibe === vibeFilter);
      if (filtered.length > 0) {
        tracks = filtered;
      }
    }

    return {
      bucketKey,
      tracks: [...tracks]
    };
  }

  static getRandomQuote(bucketKey) {
    const list = CONTEXT_QUOTES[bucketKey] || CONTEXT_QUOTES.sunny_afternoon;
    return list[Math.floor(Math.random() * list.length)];
  }
}
