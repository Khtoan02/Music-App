/**
 * AuraBeat - 4K Living Weather Scenery & Autonomous Reactive Music Engine
 * Fully automatic: reacts to real-time transitions (hours, sunset, night, weather changes)
 * without ever needing a manual page reload!
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
    currentBucketKey: null,
    activeSceneryBg: 1,
    isRainSoundOn: false
  };

  // ===================== 1. SCENERY MANAGER (4K SMOOTH CROSS-FADE) =====================
  function setScenery(bucketKey, forceNext = false) {
    const scenes = WEATHER_SCENES[bucketKey] || WEATHER_SCENES.sunny_morning;
    if (forceNext) {
      state.currentSceneIndex = (state.currentSceneIndex + 1) % scenes.length;
    } else if (state.currentBucketKey !== bucketKey) {
      state.currentSceneIndex = 0;
    }

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

  // ===================== 2. POETIC QUOTE WITH SMOOTH FADE TRANSITION =====================
  function fadeUpdateQuote(bucketKey) {
    const quoteEl = document.getElementById("context-quote");
    if (!quoteEl || typeof RecommendationEngine.getRandomQuote !== "function") return;

    quoteEl.classList.add("quote-fading");
    setTimeout(() => {
      quoteEl.textContent = RecommendationEngine.getRandomQuote(bucketKey);
      quoteEl.classList.remove("quote-fading");
    }, 450);
  }

  // ===================== 3. AUDIO & YOUTUBE PLAYER =====================
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

  // ===================== 4. AUTONOMOUS SEAMLESS TRANSITION ENGINE =====================
  /**
   * Automatically reacts when the day shifts (e.g., Afternoon -> Sunset -> Night)
   * or when the weather changes (e.g., Sunny -> Rain)
   * Without any page reload required!
   */
  function checkAndHandleEnvironmentTransition() {
    if (!state.currentWeather || !state.currentTimeData) return;

    const weatherType = state.currentWeather.weatherType || "sunny";
    const timePeriodId = state.currentTimeData.period.id || "morning";

    const targetBucket = RecommendationEngine.getBucketKey(weatherType, timePeriodId);

    // If bucket changed (e.g., from afternoon to sunset at 18:00, or to night at 19:00)
    if (targetBucket !== state.currentBucketKey) {
      console.log(`[Auto Reactive] Atmosphere shifted: ${state.currentBucketKey} -> ${targetBucket}`);
      state.currentBucketKey = targetBucket;

      // 1. Cross-fade to the new 4K scene
      setScenery(targetBucket, false);

      // 2. Fade to the new contextual quote
      fadeUpdateQuote(targetBucket);

      // 3. Gracefully update playlist
      syncMusicGracefully(targetBucket);
    }
  }

  /**
   * Graceful playlist update: if currently playing, keep the current song running smoothly
   * and load the new atmosphere tracks for the upcoming queue!
   */
  function syncMusicGracefully(bucketKey) {
    const weatherType = state.currentWeather?.weatherType || "sunny";
    const timePeriod = state.currentTimeData?.period?.id || "morning";

    const result = RecommendationEngine.getRecommendedPlaylist(
      weatherType,
      timePeriod,
      state.currentVibe
    );

    if (player.isPlaying) {
      // Don't cut the song abruptly! Queue the new tracks for the next songs
      const current = player.getCurrentTrack();
      if (current) {
        player.playlist = [current, ...result.tracks.filter(t => t.id !== current.id)];
        player.currentIndex = 0;
      } else {
        player.setPlaylist(result.tracks, false);
      }
    } else {
      player.setPlaylist(result.tracks, false);
    }
  }

  // ===================== 5. TIME ENGINE (TICKS EVERY SECOND) =====================
  const timeEngine = new TimeEngine((timeData) => {
    state.currentTimeData = timeData;

    // Update Clock and Date DOM
    const clockEl = document.getElementById("time-clock");
    const dateEl = document.getElementById("time-date");

    if (clockEl) clockEl.textContent = timeData.time.clock;
    if (dateEl) dateEl.textContent = timeData.date.full;

    // Continuously check if hour/period transitioned to next phase (e.g. 18:00 sunset, 19:00 night)
    checkAndHandleEnvironmentTransition();
  });

  // ===================== 6. WEATHER UI & POLLER =====================
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

    // Trigger state check to see if weather change necessitates a scenery/music shift
    checkAndHandleEnvironmentTransition();
  }

  // Direct Vibe switcher
  function applyVibeFilter(vibe) {
    state.currentVibe = vibe;
    const weatherType = state.currentWeather?.weatherType || "sunny";
    const timePeriod = state.currentTimeData?.period?.id || "morning";

    const result = RecommendationEngine.getRecommendedPlaylist(
      weatherType,
      timePeriod,
      state.currentVibe
    );

    player.setPlaylist(result.tracks, true);
  }

  // ===================== 7. PERIODIC AUTO-CYCLES (LIVING AMBIENCE) =====================
  
  // A. Auto-rotate 4K wallpapers within the current bucket every 10 minutes
  setInterval(() => {
    if (state.currentBucketKey) {
      setScenery(state.currentBucketKey, true);
    }
  }, 10 * 60 * 1000);

  // B. Auto-rotate contextual quotes every 4 minutes
  setInterval(() => {
    if (state.currentBucketKey) {
      fadeUpdateQuote(state.currentBucketKey);
    }
  }, 4 * 60 * 1000);

  // C. Page Visibility & Sleep/Wake Detection
  // When user opens laptop lid or returns to tab, immediately re-sync without reload
  document.addEventListener("visibilitychange", async () => {
    if (document.visibilityState === "visible") {
      timeEngine.tick();
      const freshData = await weatherEngine.fetchWeather();
      updateWeatherUI(freshData);
      checkAndHandleEnvironmentTransition();
    }
  });

  window.addEventListener("focus", async () => {
    timeEngine.tick();
    checkAndHandleEnvironmentTransition();
  });

  // ===================== 8. USER INTERACTION & CONTROLS =====================
  
  // Play / Pause
  const togglePlay = () => player.togglePlay();
  document.getElementById("btn-play-pause")?.addEventListener("click", togglePlay);
  document.getElementById("btn-toggle-play-area")?.addEventListener("click", togglePlay);

  // Prev / Next
  document.getElementById("btn-prev")?.addEventListener("click", () => player.prev());
  document.getElementById("btn-next")?.addEventListener("click", () => player.next());

  // Volume
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

  // Next 4K Scene Manual Button
  document.getElementById("btn-next-scene")?.addEventListener("click", () => {
    if (state.currentBucketKey) {
      setScenery(state.currentBucketKey, true);
    }
  });

  // Vibe Selector Buttons
  document.querySelectorAll(".vibe-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      document.querySelectorAll(".vibe-pill").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      applyVibeFilter(pill.getAttribute("data-vibe"));
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

  // Refresh GPS & Weather Button
  document.getElementById("btn-refresh-weather")?.addEventListener("click", async () => {
    const btn = document.getElementById("btn-refresh-weather");
    btn?.classList.add("animate-spin");
    const freshData = await weatherEngine.fetchWeather();
    updateWeatherUI(freshData);
    checkAndHandleEnvironmentTransition();
    setTimeout(() => btn?.classList.remove("animate-spin"), 800);
  });

  // Auto start on first user click anywhere
  let hasInteracted = false;
  window.addEventListener("click", () => {
    if (!hasInteracted) {
      hasInteracted = true;
      if (!player.isPlaying) {
        player.play();
      }
    }
  }, { once: true });

  // ===================== 9. APP BOOTSTRAP =====================
  async function init() {
    lucide.createIcons();

    // 1. Initial time tick
    const initialTimeData = timeEngine.tick();
    state.currentTimeData = initialTimeData;

    // 2. Fetch live weather & location
    const weatherData = await weatherEngine.fetchWeather();
    state.currentWeather = weatherData;

    // 3. Calculate initial atmosphere bucket (e.g. sunset if after 18:00)
    const initialBucket = RecommendationEngine.getBucketKey(
      weatherData.weatherType,
      initialTimeData.period.id
    );
    state.currentBucketKey = initialBucket;

    // 4. Render initial scenery, quote, and weather
    setScenery(initialBucket, false);
    fadeUpdateQuote(initialBucket);
    updateWeatherUI(weatherData);

    // 5. Setup initial playlist
    const initialPlaylist = RecommendationEngine.getRecommendedPlaylist(
      weatherData.weatherType,
      initialTimeData.period.id,
      state.currentVibe
    );
    player.setPlaylist(initialPlaylist.tracks, false);

    // 6. Start 3-minute weather auto-refresh poller
    weatherEngine.startAutoRefresh((newData) => {
      updateWeatherUI(newData);
    });
  }

  init();
});
