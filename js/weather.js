/**
 * Weather Engine
 * High-accuracy Geolocation + Open-Meteo Weather API + Reverse Geocoding
 */

class WeatherEngine {
  constructor() {
    this.currentData = null;
    this.autoRefreshInterval = null;
  }

  /**
   * Translate WMO code into user-friendly metadata
   */
  static parseWMOCode(code, isDay = 1) {
    if (code === 0) {
      return {
        type: "sunny",
        label: isDay ? "Trời quang, Nắng đẹp" : "Đêm quang đãng, Đầy sao",
        description: isDay ? "Ánh nắng ấm áp, bầu trời trong vắt" : "Bầu trời trong lành, tĩnh mịch",
        icon: isDay ? "sun" : "moon",
        bgClass: isDay ? "theme-sunny" : "theme-midnight"
      };
    }
    if (code === 1 || code === 2) {
      return {
        type: "cloudy",
        label: isDay ? "Nắng nhẹ, Mây rải rác" : "Đêm mây thưa",
        description: "Thời tiết mát mẻ, êm dịu",
        icon: isDay ? "cloud-sun" : "cloud-moon",
        bgClass: isDay ? "theme-sunny" : "theme-midnight"
      };
    }
    if (code === 3) {
      return {
        type: "cloudy",
        label: "Trời nhiều mây, Râm mát",
        description: "Bầu trời êm đềm, không khí dịu nhẹ",
        icon: "cloud",
        bgClass: "theme-cloudy"
      };
    }
    if (code === 45 || code === 48) {
      return {
        type: "foggy",
        label: "Sương mù mờ ảo",
        description: "Không gian tĩnh lặng phủ sương",
        icon: "cloud-fog",
        bgClass: "theme-cloudy"
      };
    }
    if (code >= 51 && code <= 55) {
      return {
        type: "drizzle",
        label: "Mưa phùn lất phất",
        description: "Những hạt mưa nhẹ nhàng bay trong gió",
        icon: "cloud-drizzle",
        bgClass: "theme-rainy"
      };
    }
    if (code >= 61 && code <= 65) {
      const label = code === 61 ? "Mưa rào nhẹ" : code === 63 ? "Trời mưa vừa" : "Mưa to nặng hạt";
      return {
        type: "rainy",
        label: label,
        description: "Tiếng mưa rơi tí tách bên thềm",
        icon: "cloud-rain",
        bgClass: "theme-rainy"
      };
    }
    if (code >= 71 && code <= 77) {
      return {
        type: "cold",
        label: "Rất lạnh / Băng giá",
        description: "Không khí rét buốt, cần giai điệu ấm áp",
        icon: "snowflake",
        bgClass: "theme-cloudy"
      };
    }
    if (code >= 80 && code <= 82) {
      return {
        type: "rainy",
        label: "Mưa rào từng cơn",
        description: "Cơn mưa rào bất chợt làm dịu không gian",
        icon: "cloud-rain-wind",
        bgClass: "theme-rainy"
      };
    }
    if (code >= 95 && code <= 99) {
      return {
        type: "thunder",
        label: "Mưa dông, Sấm chớp",
        description: "Cơn dông mát lạnh với sấm rền xa xa",
        icon: "cloud-lightning",
        bgClass: "theme-thunder"
      };
    }

    return {
      type: "cloudy",
      label: "Thời tiết êm dịu",
      description: "Không gian yên bình",
      icon: "cloud",
      bgClass: "theme-cloudy"
    };
  }

  /**
   * Determine exact location using Browser GPS + BigDataCloud fallback
   */
  async getExactLocation() {
    // 1. Try High Accuracy Browser Geolocation
    if (navigator.geolocation) {
      try {
        const pos = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 9000,
            maximumAge: 30000
          });
        });

        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const geoInfo = await this.reverseGeocode(lat, lon);
        return {
          latitude: lat,
          longitude: lon,
          city: geoInfo.displayName,
          country: geoInfo.country,
          source: "gps"
        };
      } catch (err) {
        console.warn("GPS Geolocation failed or denied, using IP fallback:", err.message);
      }
    }

    // 2. IP-based location via BigDataCloud
    try {
      const res = await fetch("https://api.bigdatacloud.net/data/reverse-geocode-client?localityLanguage=vi");
      if (res.ok) {
        const data = await res.json();
        const district = data.locality || data.localityInfo?.administrative?.[data.localityInfo.administrative.length - 1]?.name || "";
        const city = data.principalSubdivision || data.city || "Hà Nội";
        const displayName = district && district !== city ? `${district}, ${city}` : city;
        return {
          latitude: parseFloat(data.latitude),
          longitude: parseFloat(data.longitude),
          city: displayName,
          country: data.countryName || "Việt Nam",
          source: "ip"
        };
      }
    } catch (e) {
      console.warn("IP Geolocation via BigDataCloud failed:", e);
    }

    // 3. Ultimate Fallback
    return {
      latitude: 21.0285,
      longitude: 105.8542,
      city: "Hà Nội",
      country: "Việt Nam",
      source: "default"
    };
  }

  /**
   * Reverse Geocode coordinates to human-readable district and city
   */
  async reverseGeocode(lat, lon) {
    try {
      const res = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=vi`
      );
      if (res.ok) {
        const data = await res.json();
        const city = data.principalSubdivision || data.city || "Hà Nội";
        const district = data.locality || data.localityInfo?.administrative?.[data.localityInfo.administrative.length - 1]?.name || "";
        const displayName = district && district !== city ? `${district}, ${city}` : city;
        return {
          displayName,
          city,
          country: data.countryName || "Việt Nam"
        };
      }
    } catch (e) {
      console.warn("Reverse geocode failed:", e);
    }
    return {
      displayName: "Hà Nội",
      city: "Hà Nội",
      country: "Việt Nam"
    };
  }

  /**
   * Fetch live weather from Open-Meteo
   */
  async fetchWeather() {
    try {
      const loc = await this.getExactLocation();
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${loc.latitude}&longitude=${loc.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,weather_code,wind_speed_10m&daily=sunrise,sunset&timezone=Asia%2FHo_Chi_Minh`;

      const weatherRes = await fetch(weatherUrl);
      if (!weatherRes.ok) {
        throw new Error("Open-Meteo API response not OK");
      }

      const weatherJson = await weatherRes.json();
      const current = weatherJson.current;
      const daily = weatherJson.daily || {};
      const parsed = WeatherEngine.parseWMOCode(current.weather_code, current.is_day);
      
      const regionId = (typeof VietnamEngine !== "undefined")
        ? VietnamEngine.detectRegion(loc.latitude, loc.longitude, loc.city)
        : "north";

      this.currentData = {
        city: loc.city,
        country: loc.country,
        latitude: loc.latitude,
        longitude: loc.longitude,
        regionId: regionId,
        temp: Math.round(current.temperature_2m * 10) / 10,
        apparentTemp: Math.round(current.apparent_temperature * 10) / 10,
        humidity: current.relative_humidity_2m,
        windSpeed: Math.round(current.wind_speed_10m * 10) / 10,
        weatherCode: current.weather_code,
        weatherType: parsed.type,
        weatherLabel: parsed.label,
        weatherDesc: parsed.description,
        weatherIcon: parsed.icon,
        bgClass: parsed.bgClass,
        isDay: Boolean(current.is_day),
        dailySunrise: daily.sunrise?.[0] || null,
        dailySunset: daily.sunset?.[0] || null,
        updatedAt: new Date()
      };

      return this.currentData;
    } catch (err) {
      console.error("Error fetching live weather:", err);
      const currentHour = new Date().getHours();
      const fallbackIsDay = currentHour >= 6 && currentHour < 18;
      const parsed = WeatherEngine.parseWMOCode(0, fallbackIsDay ? 1 : 0);
      this.currentData = {
        city: "Hà Nội",
        country: "Việt Nam",
        latitude: 21.0285,
        longitude: 105.8542,
        regionId: "north",
        temp: fallbackIsDay ? 29.0 : 24.0,
        apparentTemp: fallbackIsDay ? 31.0 : 25.0,
        humidity: 65,
        windSpeed: 8.0,
        weatherCode: 0,
        weatherType: parsed.type,
        weatherLabel: parsed.label,
        weatherDesc: parsed.description,
        weatherIcon: parsed.icon,
        bgClass: parsed.bgClass,
        isDay: fallbackIsDay,
        updatedAt: new Date()
      };
      return this.currentData;
    }
  }

  /**
   * Start auto-refreshing weather every 3 minutes
   */
  startAutoRefresh(callback) {
    if (this.autoRefreshInterval) clearInterval(this.autoRefreshInterval);
    this.autoRefreshInterval = setInterval(async () => {
      const data = await this.fetchWeather();
      if (callback) callback(data);
    }, 3 * 60 * 1000);
  }
}
