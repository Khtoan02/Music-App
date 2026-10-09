/**
 * AuraBeat - Vietnam Regional, Seasonal & Astronomical Solar Engine
 * 
 * Chính xác theo địa lý & thời tiết thực tế của Việt Nam:
 * - 3 Miền: Bắc (vĩ độ >= 19.5°), Trung (11.5° - 19.5°), Nam (< 11.5°)
 * - Miền Bắc: 4 mùa (Xuân, Hạ, Thu, Đông)
 * - Miền Trung: 2 mùa (Mùa Nắng Gió & Mùa Mưa Bão)
 * - Miền Nam: 2 mùa (Mùa Mưa & Mùa Khô)
 * - Thuật toán thiên văn tính chính xác giờ Bình minh (Sunrise), Hoàng hôn (Sunset), 
 *   Rạng sáng (Dawn) và Chạng vạng tối (Dusk) theo mùa:
 *   + Mùa hè miền Bắc: 05h15 sáng bưng, 19h00 mới tắt ráng hoàng hôn.
 *   + Mùa đông miền Bắc: 06h30 mới tỏ, 17h20 lặn và 17h45 đã tối đen ("ngày tháng mười chưa cười đã tối").
 *   + Miền Nam cận xích đạo: Bình minh 05h30 - 06h05, hoàng hôn 17h45 - 18h15 quanh năm.
 */

const VIETNAM_REGIONS = {
  north: {
    id: "north",
    name: "Miền Bắc",
    fullName: "Bắc Bộ (Hà Nội, Vùng Đồng Bằng & Vùng Núi Tây Bắc, Đông Bắc)",
    shortName: "Bắc",
    icon: "mountain",
    defaultCoords: { lat: 21.0285, lon: 105.8542, city: "Hà Nội" },
    climateType: "Nhiệt đới gió mùa có 4 mùa rõ rệt (Xuân - Hạ - Thu - Đông)",
    seasons: {
      spring: {
        id: "spring",
        name: "Mùa Xuân",
        icon: "flower-2",
        months: [2, 3, 4],
        tagline: "Mưa phùn lất phất & Tiết trời nồm ẩm se lạnh",
        desc: "Tiết xuân se lạnh ấm dần, hoa đào hé nụ, mưa xuân bay bay giăng mắc ngõ phố.",
        solarDesc: "Bình minh ~05:50, hoàng hôn ~18:00, tiết trời dịu dàng",
        quotes: [
          "Mưa xuân lất phất giăng mờ lối cũ Hà Nội, sắc đào thắm báo hiệu một năm an lành.",
          "Tiết trời se lạnh chớm xuân, ngắm dòng người trẩy hội trong hương hoa bưởi ngào ngạt.",
          "Mưa bụi đầu xuân mang sức sống đâm chồi nảy lộc khắp núi rừng mờ sương Tây Bắc.",
          "Ngồi bên hiên nhà nhấp chén trà ấm, lắng nghe mùa xuân dịu dàng gõ cửa từng mái ngói rêu phong."
        ]
      },
      summer: {
        id: "summer",
        name: "Mùa Hè",
        icon: "sun",
        months: [5, 6, 7],
        tagline: "Nắng vàng chói chang & Ngày dài đêm ngắn (19h mới tối)",
        desc: "Đêm tháng năm chưa nằm đã sáng. 05h trời đã sáng bưng, chiều 19h mới bắt đầu tắt nắng hoàng hôn.",
        solarDesc: "Bình minh sớm ~05:15, hoàng hôn muộn ~18:40, tối sụp lúc 19:15",
        quotes: [
          "Nắng hạ vàng rực rỡ trên mặt hồ Tây, hương sen thơm ngát đón làn gió sớm trong trẻo.",
          "Chiều mùa hè 19h nắng vẫn còn vương vấn trên những tán xà cừ cổ thụ Hà Nội.",
          "Tiếng ve râm ran trưa hè, cơn gió hồ mát lành xua tan cái oi ả của ngày dài rực nắng.",
          "Hoàng hôn mùa hạ nhuộm tím mặt nước hồ Gươm, ánh đèn phố bắt đầu lung linh khi đêm dần buông."
        ]
      },
      autumn: {
        id: "autumn",
        name: "Mùa Thu",
        icon: "leaf",
        months: [8, 9, 10],
        tagline: "Thu Hà Nội nồng nàn hoa sữa & Nắng mật ong gió heo may",
        desc: "Thời khắc đẹp nhất trong năm của xứ Bắc. Trời trong xanh ngắt, gió heo may se lạnh, lá vàng rơi.",
        solarDesc: "Bình minh ~05:45, hoàng hôn ~17:40, chiều mát mẻ thanh bình",
        quotes: [
          "Hà Nội mùa thu, hoa sữa nồng nàn từng góc phố, nắng vàng như rót mật trên đường Phan Đình Phùng.",
          "Gió heo may se se lạnh thổi qua mái ngói rêu phong, lá vàng rơi êm ả báo hiệu mùa thu về.",
          "Mặt hồ Gươm phẳng lặng trong sương sớm mùa thu, lắng nghe nhịp sống chậm lại đầy chất thơ.",
          "Mùa thu chạm ngõ bằng một sớm mai trong trẻo, hương cốm Vòng thoang thoảng theo gió nhẹ."
        ]
      },
      winter: {
        id: "winter",
        name: "Mùa Đông",
        icon: "snowflake",
        months: [11, 12, 1],
        tagline: "Gió mùa Đông Bắc rét ngọt & Ngày ngắn đêm dài (17h30 đã tối)",
        desc: "Ngày tháng mười chưa cười đã tối. 17h20 mặt trời đã lặn, 17h45 phố xá đã lên đèn trong sương lạnh.",
        solarDesc: "Bình minh muộn ~06:30, hoàng hôn sớm ~17:20, tối sụp lúc 17:45",
        quotes: [
          "Gió mùa Đông Bắc tràn về rét buốt, tách trà nóng vỉa hè sưởi ấm tâm hồn giữa mùa đông Hà Nội.",
          "Mùa đông ngày ngắn ngủi, 17h30 phố xá đã lên đèn trong màn sương lạnh buốt giá.",
          "Khoác chiếc áo len ấm, dạo bước qua từng góc phố cổ mùa đông lặng lẽ mà sâu lắng khó quên.",
          "Sớm mùa đông 6h trời vẫn còn mờ tối trong làn sương bảng lảng, ngọn đèn đường vàng vọt lặng yên."
        ]
      }
    }
  },
  central: {
    id: "central",
    name: "Miền Trung",
    fullName: "Trung Bộ (Huế, Đà Nẵng, Duyên Hải Miền Trung & Tây Nguyên)",
    shortName: "Trung",
    icon: "waves",
    defaultCoords: { lat: 16.0544, lon: 108.2022, city: "Đà Nẵng" },
    climateType: "Khí hậu duyên hải chuyển tiếp: Mùa Nắng Gió & Mùa Mưa Bão",
    seasons: {
      dry: {
        id: "dry",
        name: "Mùa Nắng Gió",
        icon: "sun-medium",
        months: [1, 2, 3, 4, 5, 6, 7, 8],
        tagline: "Nắng biển rực rỡ, gió phơn Tây Nam & Phố cổ Hội An",
        desc: "Nắng vàng trải dài bờ cát trắng Mỹ Khê - Nha Trang, sóng biển rì rào, Hội An lung linh lồng đèn.",
        solarDesc: "Bình minh ~05:25, hoàng hôn ~18:25, ngày nắng ráo",
        quotes: [
          "Nắng vàng trải dài bờ cát trắng Mỹ Khê, sóng biển miền Trung rì rào ôm trọn bình yên.",
          "Phố cổ Hội An rực rỡ sắc màu trong nắng trưa hè, dòng sông Hoài lấp lánh ánh kim.",
          "Gió biển mặn mà thổi qua đèo Hải Vân, mây trắng vờn quanh đỉnh núi hùng vĩ.",
          "Hoàng hôn trên biển Nhật Lệ buông ánh tím biếc, thuyền câu rục rịch ra khơi đón đêm."
        ]
      },
      rainy: {
        id: "rainy",
        name: "Mùa Mưa Bão",
        icon: "cloud-rain",
        months: [9, 10, 11, 12],
        tagline: "Mưa dầm xứ Huế & Không gian cổ kính trầm mặc",
        desc: "Những cơn mưa dầm xứ Huế bên dòng Hương giang, tiếng chuông chùa Thiên Mụ trầm mặc ngân vang.",
        solarDesc: "Bình minh ~06:05, hoàng hôn ~17:30, trời âm u và mưa kéo dài",
        quotes: [
          "Mưa dầm xứ Huế rơi trên dòng sông Hương, tiếng chuông chùa Thiên Mụ ngân vang giữa màn sương.",
          "Cơn mưa chiều miền Trung rào rạt ngoài hiên, giữ lại những khoảng lặng sâu lắng cho tâm hồn.",
          "Ngồi bên tách cà phê ngắm mưa rơi trên mái ngói rêu phong Đại Nội cổ kính.",
          "Mưa giăng mờ lối qua cầu Tràng Tiền, nhịp đời chậm rãi nép mình vào nỗi nhớ khôn nguôi."
        ]
      }
    }
  },
  south: {
    id: "south",
    name: "Miền Nam",
    fullName: "Nam Bộ (TP. Hồ Chí Minh, Miền Đông & Đồng Bằng Sông Cửu Long)",
    shortName: "Nam",
    icon: "palmtree",
    defaultCoords: { lat: 10.8231, lon: 106.6297, city: "TP. Hồ Chí Minh" },
    climateType: "Khí hậu cận xích đạo quanh năm ấm áp: Mùa Mưa & Mùa Khô",
    seasons: {
      rainy: {
        id: "rainy",
        name: "Mùa Mưa",
        icon: "cloud-lightning",
        months: [5, 6, 7, 8, 9, 10, 11],
        tagline: "Mưa rào Sài Gòn chợt đến rồi chợt đi xua tan oi bức",
        desc: "Cơn mưa rào bất chợt làm dịu mát phố thị buổi xế chiều, sau mưa bầu trời lại trong vắt đầy năng lượng.",
        solarDesc: "Bình minh ~05:35, hoàng hôn ~18:15 quanh năm, không có mùa đông lạnh",
        quotes: [
          "Cơn mưa rào Sài Gòn bất chợt ào đến rồi vội tan, để lại phố phường xế chiều mát rượi trong veo.",
          "Mưa nhiệt đới tưới mát những hàng cây dầu cổ thụ, nhịp sống phương Nam lại tươi vui rộn rã.",
          "Ngồi quán cóc ven đường trú mưa ngắm dòng người qua lại, cảm nhận nét hào sảng ấm áp của đất phương Nam.",
          "Mưa tạnh, ánh hoàng hôn vàng rực dát vàng trên mặt sông Sài Gòn, phố xá bừng sáng sắc màu."
        ]
      },
      dry: {
        id: "dry",
        name: "Mùa Khô",
        icon: "sun",
        months: [12, 1, 2, 3, 4],
        tagline: "Nắng ấm chan hòa, Cà phê bệt & Gió lộng sông Sài Gòn",
        desc: "Quanh năm chan hòa nắng ấm, nhịp sống trẻ trung sôi động, gió mát lộng bên bến Bạch Đằng.",
        solarDesc: "Bình minh ~06:05, hoàng hôn ~17:45, thời tiết ấm áp dễ chịu",
        quotes: [
          "Nắng ấm chan hòa phố phường phương Nam, ngụm cà phê sáng rộn rã tiếng cười vui bên nhà thờ Đức Bà.",
          "Chiều buông ráng vàng rực rỡ trên dòng sông Sài Gòn, đón làn gió mát lành từ bến Bạch Đằng.",
          "Trời phương Nam trong vắt chan chứa nắng vàng, năng lượng căng tràn cho những hành trình mới.",
          "Dưới tán me xanh rợp bóng phố Sài Gòn, giai điệu tươi vui vang lên giữa buổi sáng rạng rỡ."
        ]
      }
    }
  }
};

class VietnamEngine {
  /**
   * Detect region from coordinates and city name
   */
  static detectRegion(lat, lon, cityName = "") {
    const nameLower = (cityName || "").toLowerCase();

    // Check by province/city keywords
    const northKeywords = [
      "hà nội", "ha noi", "hanoi", "hải phòng", "hai phong", "quảng ninh", "sa pa", "sapa",
      "lào cai", "ninh bình", "hà nam", "nam định", "thái bình", "hải dương", "hưng yên",
      "bắc ninh", "bắc giang", "vĩnh phúc", "phú thọ", "thái nguyên", "tuyên quang",
      "lạng sơn", "cao bằng", "hà giang", "sơn la", "điện biên", "lai châu", "hòa bình", "yên bái"
    ];

    const centralKeywords = [
      "thanh hóa", "thanh hoa", "nghệ an", "nghe an", "vinh", "hà tĩnh", "quảng bình",
      "quảng trị", "huế", "hue", "thừa thiên", "đà nẵng", "da nang", "danang", "quảng nam",
      "hội an", "quảng ngãi", "bình định", "quy nhơn", "phú yên", "tuy hòa", "khánh hòa",
      "nha trang", "ninh thuận", "phan rang", "bình thuận", "phan thiết", "đà lạt", "dalat",
      "lâm đồng", "đắk lắk", "buôn ma thuột", "gia lai", "pleiku", "kon tum", "đắk nông"
    ];

    const southKeywords = [
      "hồ chí minh", "ho chi minh", "sài gòn", "saigon", "bình dương", "thủ dầu một",
      "đồng nai", "biên hòa", "vũng tàu", "bà rịa", "tây ninh", "bình phước", "long an",
      "tiền giang", "mỹ tho", "bến tre", "trà vinh", "vĩnh long", "đồng tháp", "cao lãnh",
      "an giang", "long xuyên", "kiên giang", "rạch giá", "phú quốc", "cần thơ", "can tho",
      "hậu giang", "sóc trăng", "bạc liêu", "cà mau"
    ];

    for (const kw of northKeywords) {
      if (nameLower.includes(kw)) return "north";
    }
    for (const kw of centralKeywords) {
      if (nameLower.includes(kw)) return "central";
    }
    for (const kw of southKeywords) {
      if (nameLower.includes(kw)) return "south";
    }

    // Geographical Latitude Boundary check
    if (typeof lat === "number" && !isNaN(lat)) {
      if (lat >= 19.5) return "north";
      if (lat >= 11.5) return "central";
      return "south";
    }

    return "north"; // Default fallback
  }

  /**
   * Determine exact season based on Region and Date (month 1..12)
   */
  static getSeason(regionId, date = new Date()) {
    const region = VIETNAM_REGIONS[regionId] || VIETNAM_REGIONS.north;
    const month = date.getMonth() + 1; // 1-12

    for (const [seasonKey, seasonObj] of Object.entries(region.seasons)) {
      if (seasonObj.months.includes(month)) {
        return seasonObj;
      }
    }

    // Default first season
    const firstKey = Object.keys(region.seasons)[0];
    return region.seasons[firstKey];
  }

  /**
   * Astronomical Solar Calculation for any Vietnam latitude, longitude and date.
   * Calculates exact Sunrise, Sunset, Civil Dawn, and Civil Dusk in decimal hours.
   */
  static calculateSolarTimes(lat, lon, date = new Date(), liveSunriseStr = null, liveSunsetStr = null) {
    // 1. If live Open-Meteo Sunrise and Sunset strings are provided, use them directly
    if (liveSunriseStr && liveSunsetStr) {
      const parseIsoHour = (isoStr) => {
        try {
          const parts = isoStr.split("T")[1].split(":");
          return parseInt(parts[0], 10) + parseInt(parts[1], 10) / 60;
        } catch {
          return null;
        }
      };

      const liveSunrise = parseIsoHour(liveSunriseStr);
      const liveSunset = parseIsoHour(liveSunsetStr);

      if (liveSunrise !== null && liveSunset !== null) {
        const dawn = liveSunrise - 0.65; // ~40 min twilight
        const dusk = liveSunset + 0.55;  // ~33 min twilight
        return {
          sunrise: liveSunrise,
          sunset: liveSunset,
          dawn,
          dusk,
          sunriseStr: VietnamEngine.formatDecimalHour(liveSunrise),
          sunsetStr: VietnamEngine.formatDecimalHour(liveSunset),
          dawnStr: VietnamEngine.formatDecimalHour(dawn),
          duskStr: VietnamEngine.formatDecimalHour(dusk),
          dayLengthHours: (liveSunset - liveSunrise),
          source: "open-meteo"
        };
      }
    }

    // 2. High-precision Astronomical Calculation
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((date - startOfYear) / (24 * 3600 * 1000)) + 1;
    const B = (360 / 365) * (dayOfYear - 81) * (Math.PI / 180);
    const EoT = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B);
    const declination = 23.45 * Math.sin(B) * (Math.PI / 180);
    const latRad = lat * (Math.PI / 180);

    // Zenith angle for sunrise/sunset (90.833 deg taking refraction into account)
    const cosH0 = (Math.sin(-0.833 * Math.PI / 180) - Math.sin(latRad) * Math.sin(declination)) /
                  (Math.cos(latRad) * Math.cos(declination));
    const clampedH0 = Math.max(-1, Math.min(1, cosH0));
    const H0 = Math.acos(clampedH0) * (180 / Math.PI);

    // Vietnam standard meridian is 105°E (UTC+7)
    const standardMeridian = 105;
    const solarNoon = 12 - (lon - standardMeridian) / 15 - EoT / 60;

    const sunrise = solarNoon - H0 / 15;
    const sunset = solarNoon + H0 / 15;
    const dawn = sunrise - 0.65; // Ánh rạng đông bắt đầu hé
    const dusk = sunset + 0.55;  // Mặt trời lặn sau 30-35p thì trời tối sụp

    return {
      sunrise,
      sunset,
      dawn,
      dusk,
      sunriseStr: VietnamEngine.formatDecimalHour(sunrise),
      sunsetStr: VietnamEngine.formatDecimalHour(sunset),
      dawnStr: VietnamEngine.formatDecimalHour(dawn),
      duskStr: VietnamEngine.formatDecimalHour(dusk),
      dayLengthHours: (sunset - sunrise),
      source: "astronomy"
    };
  }

  /**
   * Helper to format decimal hour to HH:MM
   */
  static formatDecimalHour(h) {
    const norm = (h + 24) % 24;
    const hh = Math.floor(norm);
    const mm = Math.floor((norm - hh) * 60);
    return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
  }

  /**
   * Dynamically resolves temporal slot T1..T8 based on exact solar times of the day!
   * 
   * - T1 (Rạng sáng / Dawn): Từ dawn (ánh sáng hé rạng) đến sunrise
   * - T2 (Sáng sớm / Early Morning): Từ sunrise đến sunrise + 2h
   * - T3 (Buổi sáng / Morning): Từ sunrise + 2h đến 11:00
   * - T4 (Buổi trưa / Noon): 11:00 đến 13:30
   * - T5 (Buổi chiều / Afternoon): 13:30 đến sunset - 1h15
   * - T6 (Chiều tà & Hoàng hôn / Golden Hour & Twilight): sunset - 1h15 đến dusk (hoàng hôn lặn hẳn)
   * - T7 (Buổi tối / Evening): Từ dusk đến 21:30 (Đêm tối ấm cúng)
   * - T8 (Đêm khuya / Night): 21:30 đến dawn sáng hôm sau
   */
  static resolveDynamicTimeSlot(date, solar) {
    const currentHourDecimal = date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600;
    const { dawn, sunrise, sunset, dusk } = solar;

    // Check Dawn (T1)
    if (currentHourDecimal >= dawn && currentHourDecimal < sunrise) {
      return "T1";
    }

    // Check Early Morning (T2)
    const earlyMorningEnd = sunrise + 2.0;
    if (currentHourDecimal >= sunrise && currentHourDecimal < earlyMorningEnd) {
      return "T2";
    }

    // Check Morning (T3)
    if (currentHourDecimal >= earlyMorningEnd && currentHourDecimal < 11.0) {
      return "T3";
    }

    // Check Noon (T4)
    if (currentHourDecimal >= 11.0 && currentHourDecimal < 13.5) {
      return "T4";
    }

    // Check Afternoon (T5)
    const goldenHourStart = sunset - 1.25;
    if (currentHourDecimal >= 13.5 && currentHourDecimal < goldenHourStart) {
      return "T5";
    }

    // Check Sunset & Twilight (T6)
    // Vào mùa hè miền Bắc: T6 kéo dài tới tận 19h15! (19h vẫn hoàng hôn)
    // Vào mùa đông miền Bắc: T6 kết thúc lúc 17h45! (17h30 đang hoàng hôn và tắt hẳn)
    if (currentHourDecimal >= goldenHourStart && currentHourDecimal < dusk) {
      return "T6";
    }

    // Check Evening (T7)
    if (currentHourDecimal >= dusk && currentHourDecimal < 21.5) {
      return "T7";
    }

    // Night (T8)
    return "T8";
  }

  /**
   * High accuracy check whether current moment is visually Day or Night
   */
  static isVisualDaytime(date, solar) {
    const currentHourDecimal = date.getHours() + date.getMinutes() / 60;
    return currentHourDecimal >= solar.sunrise && currentHourDecimal < solar.dusk;
  }

  /**
   * Get random contextual quote for active Region, Season and Time Slot
   */
  static getContextualQuote(regionId, seasonId) {
    const region = VIETNAM_REGIONS[regionId] || VIETNAM_REGIONS.north;
    const season = region.seasons[seasonId] || Object.values(region.seasons)[0];
    const quotes = season.quotes || [];
    if (quotes.length === 0) return null;
    return quotes[Math.floor(Math.random() * quotes.length)];
  }
}

// Export for Node/CommonJS test compatibility
if (typeof module !== "undefined" && module.exports) {
  module.exports = { VietnamEngine, VIETNAM_REGIONS };
}
