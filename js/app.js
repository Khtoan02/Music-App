/**
 * AuraBeat - 4K Living Weather Scenery & Precision Music Engine
 */

// Curated 4K / Ultra HD Living Sceneries (Untouched original color & clarity)
const WEATHER_SCENES = {
  sunny_morning: [
    {
      name: "Tán cây ngập nắng sớm ban mai (4K)",
      url: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=3840&q=95&auto=format&fit=crop"
    },
    {
      name: "Căn phòng ngập nắng sớm dịu dàng (4K)",
      url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=3840&q=95&auto=format&fit=crop"
    },
    {
      name: "Bờ biển sớm mai trong vắt (4K)",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=3840&q=95&auto=format&fit=crop"
    }
  ],
  sunny_afternoon: [
    {
      name: "Góc quán cà phê chiều nắng ấm (4K)",
      url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=3840&q=95&auto=format&fit=crop"
    },
    {
      name: "Tia nắng qua tán lá chiều (4K)",
      url: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=3840&q=95&auto=format&fit=crop"
    },
    {
      name: "Biển chiều ngập nắng vàng (4K)",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=3840&q=95&auto=format&fit=crop"
    }
  ],
  rainy: [
    {
      name: "Hạt mưa rơi trên ô cửa kính thành phố (4K)",
      url: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=3840&q=95&auto=format&fit=crop"
    },
    {
      name: "Cà phê ngày mưa tĩnh lặng (4K)",
      url: "https://images.unsplash.com/photo-1438449805896-28a666819a20?w=3840&q=95&auto=format&fit=crop"
    },
    {
      name: "Phố mưa lung linh ánh đèn đêm (4K)",
      url: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=3840&q=95&auto=format&fit=crop"
    }
  ],
  thunder: [
    {
      name: "Cơn bão dông mãnh liệt (4K)",
      url: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=3840&q=95&auto=format&fit=crop"
    },
    {
      name: "Mưa dông bên cửa sổ (4K)",
      url: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=3840&q=95&auto=format&fit=crop"
    }
  ],
  sunset: [
    {
      name: "Hoàng hôn tím vàng trên đỉnh núi (4K)",
      url: "https://images.unsplash.com/photo-1507499739999-097706ad8914?w=3840&q=95&auto=format&fit=crop"
    },
    {
      name: "Ráng chiều buông trên mặt biển (4K)",
      url: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=3840&q=95&auto=format&fit=crop"
    }
  ],
  midnight: [
    {
      name: "Bầu trời dải Ngân Hà sâu thẳm (4K)",
      url: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=3840&q=95&auto=format&fit=crop"
    },
    {
      name: "Thành phố đêm qua khung cửa (4K)",
      url: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=3840&q=95&auto=format&fit=crop"
    }
  ],
  cloudy: [
    {
      name: "Mây trời bảng lảng râm mát (4K)",
      url: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=3840&q=95&auto=format&fit=crop"
    }
  ]
};

document.addEventListener("DOMContentLoaded", () => {
  const state = {
    currentWeather: null,
    currentTimeData: null,
    currentVibe: "all",
    currentSceneIndex: 0,
    currentBucketKey: "sunny_morning",
    activeSceneryBg: 1,
    isRainSoundOn: false
  };

  // 1. Scenery Manager (100% Original 4K quality, smooth cross-fading)
  function setScenery(bucketKey, forceNext = false) {
    const scenes = WEATHER_SCENES[bucketKey] || WEATHER_SCENES.sunny_morning;
    if (forceNext) {
      state.currentSceneIndex = (state.currentSceneIndex + 1) % scenes.length;
    } else if (state.currentBucketKey !== bucketKey) {
      state.currentSceneIndex = 0;
    }
    state.currentBucketKey = bucketKey;

    const currentScene = scenes[state.currentSceneIndex] || scenes[0];
    const bg1 = document.getElementById("scenery-bg-1");
    const bg2 = document.getElementById("scenery-bg-2");

    // Preload image for instant crisp display
    const img = new Image();
    img.src = currentScene.url;
    img.onload = () => {
      if (state.activeSceneryBg === 1) {
        bg2.style.backgroundImage = `url('${currentScene.url}')`;
        bg2.classList.add("active");
        bg1.classList.remove("active");
        state.activeSceneryBg = 2;
      } else {
        bg1.style.backgroundImage = `url('${currentScene.url}')`;
        bg1.classList.add("active");
        bg2.classList.remove("active");
        state.activeSceneryBg = 1;
      }
    };
  }

  // 2. Poetic Quote updater
  function updateQuote(bucketKey) {
    const quoteEl = document.getElementById("context-quote");
    if (quoteEl && typeof RecommendationEngine.getRandomQuote === "function") {
      quoteEl.textContent = RecommendationEngine.getRandomQuote(bucketKey);
    }
  }

  // 3. Audio & YouTube Player Engine
  const ambientAudio = new AmbientAudioEngine();
  const weatherEngine = new WeatherEngine();

  const player = new MusicPlayer({
    onTrackChange: (track) => {
      const titleEl = document.getElementById("now-playing-title");
      const artistEl = document.getElementById("now-playing-artist");
      if (titleEl) titleEl.textContent = track.title;
      if (artistEl) artistEl.textContent = track.artist;
    },
    onStateChange: (pState) => {
      const playBtn = document.getElementById("btn-play-pause");
      const eq = document.getElementById("equalizer");

      if (pState === "playing") {
        playBtn.innerHTML = `<i data-lucide="pause" class="w-4 h-4"></i>`;
        eq?.classList.remove("paused");
      } else {
        playBtn.innerHTML = `<i data-lucide="play" class="w-4 h-4 translate-x-0.5"></i>`;
        eq?.classList.add("paused");
      }
      lucide.createIcons();
    },
    onVolumeChange: (vol, isMuted) => {
      const volIcon = document.getElementById("volume-icon");
      const volSlider = document.getElementById("volume-slider");
      if (volSlider) volSlider.value = isMuted ? 0 : vol;
      if (volIcon) {
        if (isMuted || vol === 0) {
          volIcon.setAttribute("data-lucide", "volume-x");
        } else if (vol < 50) {
          volIcon.setAttribute("data-lucide", "volume-1");
        } else {
          volIcon.setAttribute("data-lucide", "volume-2");
        }
        lucide.createIcons();
      }
    }
  });

  // 4. Time Engine (Ticks every second, updates central clock)
  const timeEngine = new TimeEngine((timeData) => {
    state.currentTimeData = timeData;

    const clockEl = document.getElementById("time-clock");
    const dateEl = document.getElementById("time-date");

    if (clockEl) clockEl.textContent = timeData.time.clock;
    if (dateEl) dateEl.textContent = timeData.date.full;
  });

  // 5. Weather UI & Sync
  function updateWeatherUI(weather) {
    state.currentWeather = weather;

    const locEl = document.getElementById("weather-location");
    const tempEl = document.getElementById("weather-temp");
    const labelEl = document.getElementById("weather-label");
    const humEl = document.getElementById("weather-humidity");
    const iconContainer = document.getElementById("weather-icon-container");

    if (locEl) locEl.textContent = weather.city;
    if (tempEl) tempEl.textContent = `${weather.temp}°C`;
    if (labelEl) labelEl.textContent = weather.weatherLabel;
    if (humEl) humEl.textContent = `${weather.humidity}%`;

    if (iconContainer) {
      iconContainer.innerHTML = `<i data-lucide="${weather.weatherIcon}" class="w-3.5 h-3.5 text-amber-400"></i>`;
      lucide.createIcons();
    }

    const bucketKey = RecommendationEngine.getBucketKey(
      weather.weatherType,
      state.currentTimeData?.period?.id || "morning"
    );

    setScenery(bucketKey, false);
    updateQuote(bucketKey);
  }

  // 6. Music Playlist Sync
  function syncMusic(autoPlay = false) {
    if (!state.currentWeather || !state.currentTimeData) return;

    const weatherType = state.currentWeather.weatherType;
    const timePeriod = state.currentTimeData.period.id;

    const result = RecommendationEngine.getRecommendedPlaylist(
      weatherType,
      timePeriod,
      state.currentVibe
    );

    player.setPlaylist(result.tracks, autoPlay);
  }

  // 7. Event Handlers
  const togglePlay = () => player.togglePlay();
  document.getElementById("btn-play-pause")?.addEventListener("click", togglePlay);
  document.getElementById("btn-toggle-play-area")?.addEventListener("click", togglePlay);

  document.getElementById("btn-prev")?.addEventListener("click", () => player.prev());
  document.getElementById("btn-next")?.addEventListener("click", () => player.next());

  const volSlider = document.getElementById("volume-slider");
  volSlider?.addEventListener("input", (e) => player.setVolume(parseFloat(e.target.value)));
  document.getElementById("btn-volume-toggle")?.addEventListener("click", () => player.toggleMute());

  // Ambient Rain Audio Toggle
  const ambientRainBtn = document.getElementById("btn-ambient-rain");
  ambientRainBtn?.addEventListener("click", () => {
    state.isRainSoundOn = ambientAudio.toggleTrack("rain");
    ambientRainBtn.classList.toggle("text-sky-300", state.isRainSoundOn);
    ambientRainBtn.classList.toggle("text-slate-400", !state.isRainSoundOn);
  });

  // Next 4K Scene Button
  document.getElementById("btn-next-scene")?.addEventListener("click", () => {
    const bucketKey = RecommendationEngine.getBucketKey(
      state.currentWeather?.weatherType || "sunny",
      state.currentTimeData?.period?.id || "morning"
    );
    setScenery(bucketKey, true);
  });

  // Vibe Selector Buttons
  document.querySelectorAll(".vibe-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      document.querySelectorAll(".vibe-pill").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      state.currentVibe = pill.getAttribute("data-vibe");
      syncMusic(true);
    });
  });

  // Fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };
  document.getElementById("btn-fullscreen")?.addEventListener("click", toggleFullscreen);

  // Keyboard Shortcuts
  window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      e.preventDefault();
      togglePlay();
    } else if (e.key === "f" || e.key === "F") {
      toggleFullscreen();
    } else if (e.code === "ArrowRight") {
      player.next();
    } else if (e.code === "ArrowLeft") {
      player.prev();
    }
  });

  // Refresh GPS & Weather
  document.getElementById("btn-refresh-weather")?.addEventListener("click", async () => {
    const btn = document.getElementById("btn-refresh-weather");
    btn?.classList.add("animate-spin");
    const freshData = await weatherEngine.fetchWeather();
    updateWeatherUI(freshData);
    syncMusic(false);
    setTimeout(() => btn?.classList.remove("animate-spin"), 800);
  });

  // Auto start on first user interaction
  let hasInteracted = false;
  window.addEventListener("click", () => {
    if (!hasInteracted) {
      hasInteracted = true;
      if (!player.isPlaying) {
        player.play();
      }
    }
  }, { once: true });

  // 8. Bootstrap
  async function init() {
    lucide.createIcons();

    // Fetch initial location & weather
    const weatherData = await weatherEngine.fetchWeather();
    updateWeatherUI(weatherData);

    // Auto-refresh weather every 10 mins
    weatherEngine.startAutoRefresh((newData) => {
      updateWeatherUI(newData);
      syncMusic(false);
    });

    // Load matching playlist
    syncMusic(false);
  }

  init();
});
