/**
 * AuraBeat - 4K Living Weather Scenery & Autonomous Reactive Music Engine
 * Powered by MATRIX 280 (8 Time Slots x 7 Weather Conditions x 5 Moods)
 * Fully automatic: reacts in real-time to hours, sunset, night, and weather shifts
 * without ever needing a manual page reload!
 */

document.addEventListener("DOMContentLoaded", () => {
  const state = {
    currentWeather: null,
    currentTimeData: null,
    selectedMood: "auto", // "auto", "M1", "M2", "M3", "M4", "M5"
    activeCase: null,
    currentImageIndex: 0,
    activeSceneryBg: 1,
    isRainSoundOn: false
  };

  // ===================== 1. SCENERY MANAGER (4K SMOOTH CROSS-FADE) =====================
  function setScenery(forceNext = false) {
    if (!state.activeCase || !state.activeCase.images || state.activeCase.images.length === 0) return;

    const images = state.activeCase.images;
    if (forceNext) {
      state.currentImageIndex = (state.currentImageIndex + 1) % images.length;
    } else {
      state.currentImageIndex = 0;
    }

    const currentImg = images[state.currentImageIndex] || images[0];
    const bg1 = document.getElementById("scenery-bg-1");
    const bg2 = document.getElementById("scenery-bg-2");

    // Preload image for instant crisp display
    const img = new Image();
    img.src = currentImg.url;
    img.onload = () => {
      if (state.activeSceneryBg === 1) {
        bg2.style.backgroundImage = `url('${currentImg.url}')`;
        bg2.classList.add("active");
        bg1.classList.remove("active");
        state.activeSceneryBg = 2;
      } else {
        bg1.style.backgroundImage = `url('${currentImg.url}')`;
        bg1.classList.add("active");
        bg2.classList.remove("active");
        state.activeSceneryBg = 1;
      }
    };
  }

  // ===================== 2. CONTEXTUAL POETIC QUOTE =====================
  function fadeUpdateQuote() {
    const quoteEl = document.getElementById("context-quote");
    if (!quoteEl || !state.activeCase) return;

    quoteEl.classList.add("quote-fading");
    setTimeout(() => {
      quoteEl.textContent = state.activeCase.quote;
      quoteEl.classList.remove("quote-fading");
    }, 450);
  }

  // ===================== 3. CONTEXT MATRIX BADGE =====================
  function updateMatrixBadge() {
    if (!state.activeCase) return;
    const codeEl = document.getElementById("matrix-code");
    const descEl = document.getElementById("matrix-desc");
    const badgeEl = document.getElementById("matrix-badge");

    if (codeEl) codeEl.textContent = state.activeCase.id;
    if (descEl) descEl.textContent = state.activeCase.description;
    if (badgeEl) {
      badgeEl.title = `${state.activeCase.id}: ${state.activeCase.timeName} • ${state.activeCase.weatherName} • ${state.activeCase.moodName}\n"${state.activeCase.description}"`;
    }
  }

  // ===================== 4. AUDIO & YOUTUBE PLAYER =====================
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

  // ===================== 5. AUTONOMOUS 280-CASE TRANSITION ENGINE =====================
  /**
   * Evaluates exact context from time, weather, and mood selection.
   * Seamlessly resolves to one of the 280 distinct cases BG-T{1..8}-W{1..7}-M{1..5}
   */
  function evaluateContext(triggerSource = "tick") {
    if (!state.currentTimeData) return;

    const date = state.currentTimeData.rawDate || state.currentTimeData.dateRaw || new Date();
    const tSlot = MatrixEngine.getTimeSlot(date);

    // Weather slot
    const wmoCode = state.currentWeather?.weatherCode ?? 0;
    const temp = state.currentWeather?.temp ?? 25;
    const isDay = state.currentWeather?.isDay ? 1 : 0;
    const wSlot = MatrixEngine.getWeatherSlot(wmoCode, temp, isDay);

    // Mood slot
    const mSlot = (state.selectedMood === "auto")
      ? MatrixEngine.getDefaultMood(tSlot, wSlot)
      : state.selectedMood;

    const targetCase = MatrixEngine.getCase(tSlot, wSlot, mSlot);

    const isCaseChanged = !state.activeCase || (state.activeCase.id !== targetCase.id);

    if (isCaseChanged || triggerSource === "mood_switch") {
      console.log(`[Matrix 280] Context active: ${targetCase.id} (${targetCase.timeName} • ${targetCase.weatherName} • ${targetCase.moodName})`);
      state.activeCase = targetCase;

      // 1. Cross-fade 4K wallpaper
      setScenery(false);

      // 2. Fade update poetic quote
      fadeUpdateQuote();

      // 3. Update status badge
      updateMatrixBadge();

      // 4. Synchronize playlist
      const shouldRestart = (triggerSource === "mood_switch");
      if (shouldRestart || !player.isPlaying) {
        player.setPlaylist(targetCase.playlist, false);
      } else {
        // Keep current song playing, smoothly queue remaining tracks of the new case
        const current = player.getCurrentTrack();
        if (current) {
          player.playlist = [current, ...targetCase.playlist.filter(t => t.id !== current.id)];
          player.currentIndex = 0;
        } else {
          player.setPlaylist(targetCase.playlist, false);
        }
      }
    }
  }

  // ===================== 6. TIME ENGINE (TICKS EVERY SECOND) =====================
  const timeEngine = new TimeEngine((timeData) => {
    state.currentTimeData = timeData;

    // Center Big Digital Clock & Date
    const clockEl = document.getElementById("time-clock");
    const dateEl = document.getElementById("time-date");

    if (clockEl) clockEl.textContent = timeData.time.clock;
    if (dateEl) dateEl.textContent = timeData.date.full;

    // Check autonomous time transition
    evaluateContext("tick");
  });

  // ===================== 7. WEATHER UI & POLLER =====================
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

    // Trigger context re-evaluation
    evaluateContext("weather_update");
  }

  // ===================== 8. PERIODIC AUTO-CYCLES (LIVING AMBIENCE) =====================
  
  // A. Auto-rotate 4K wallpapers within the active case every 10 minutes
  setInterval(() => {
    if (state.activeCase) {
      setScenery(true);
    }
  }, 10 * 60 * 1000);

  // B. Auto-rotate contextual quotes every 4 minutes
  setInterval(() => {
    if (state.activeCase) {
      fadeUpdateQuote();
    }
  }, 4 * 60 * 1000);

  // C. Page Visibility & Sleep/Wake Detection (re-sync without page reload)
  document.addEventListener("visibilitychange", async () => {
    if (document.visibilityState === "visible") {
      timeEngine.tick();
      const freshData = await weatherEngine.fetchWeather();
      updateWeatherUI(freshData);
      evaluateContext("wake_sync");
    }
  });

  window.addEventListener("focus", async () => {
    timeEngine.tick();
    evaluateContext("focus_sync");
  });

  // ===================== 9. USER INTERACTION & CONTROLS =====================
  
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

  // Next 4K Scene Manual Button (Cycle through images for current case)
  document.getElementById("btn-next-scene")?.addEventListener("click", () => {
    setScenery(true);
  });

  // Mood Selector Pills (Ma trận 280 bối cảnh)
  document.querySelectorAll(".mood-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      document.querySelectorAll(".mood-pill").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      const mood = pill.getAttribute("data-mood");
      state.selectedMood = mood;
      evaluateContext("mood_switch");
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
    setTimeout(() => btn?.classList.remove("animate-spin"), 800);
  });

  // Auto start audio on first user click anywhere
  let hasInteracted = false;
  window.addEventListener("click", () => {
    if (!hasInteracted) {
      hasInteracted = true;
      if (!player.isPlaying) {
        player.play();
      }
    }
  }, { once: true });

  // ===================== 10. APP BOOTSTRAP =====================
  async function init() {
    lucide.createIcons();

    // 1. Initial time tick
    const initialTimeData = timeEngine.tick();
    state.currentTimeData = initialTimeData;

    // 2. Fetch live weather & location
    const weatherData = await weatherEngine.fetchWeather();
    state.currentWeather = weatherData;

    // 3. Render initial weather UI
    updateWeatherUI(weatherData);

    // 4. Initial evaluation of 280-case context
    evaluateContext("init");

    // 5. Start 3-minute weather auto-refresh poller
    weatherEngine.startAutoRefresh((newData) => {
      updateWeatherUI(newData);
    });
  }

  init();
});
