/**
 * AuraBeat - 4K Living Weather Scenery & Autonomous Reactive Music Engine
 * Powered by MATRIX 280 (8 Time Slots x 7 Weather Conditions x 5 Moods)
 * & SPACE CONTEXT ENGINE (10 Groups x 55 Living Spaces with Non-Colliding Playlists)
 * Fully automatic: reacts in real-time to hours, sunset, night, and weather shifts
 * without ever needing a manual page reload!
 */

document.addEventListener("DOMContentLoaded", () => {
  const state = {
    currentWeather: null,
    currentTimeData: null,
    selectedMood: "auto",         // "auto", "M1", "M2", "M3", "M4", "M5"
    selectedSpace: "auto",        // "auto" or space id (e.g. "phong_ngu", "phong_gym")
    selectedRegion: "auto",       // "auto", "north", "central", "south"
    selectedSeason: "auto",       // "auto", "spring", "summer", "autumn", "winter", "dry", "rainy"
    activeRegionId: "north",
    activeSeasonId: "autumn",
    currentSolar: null,
    activeCase: null,
    currentImageIndex: 0,
    activeSceneryBg: 1,
    isRainSoundOn: false,
    activeGroupFilter: "all"
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
  function fadeUpdateQuote(customQuote = null) {
    const quoteEl = document.getElementById("context-quote");
    if (!quoteEl || !state.activeCase) return;

    const targetQuote = customQuote || state.activeCase.quote;
    quoteEl.classList.add("quote-fading");
    setTimeout(() => {
      quoteEl.textContent = targetQuote;
      quoteEl.classList.remove("quote-fading");
    }, 450);
  }

  // ===================== 3. CONTEXT MATRIX BADGE =====================
  function updateMatrixBadge(spaceName = null) {
    if (!state.activeCase) return;
    const codeEl = document.getElementById("matrix-code");
    const descEl = document.getElementById("matrix-desc");
    const badgeEl = document.getElementById("matrix-badge");

    if (codeEl) codeEl.textContent = state.activeCase.id;
    if (descEl) {
      if (spaceName) {
        descEl.textContent = `${spaceName} • ${state.activeCase.description}`;
      } else {
        descEl.textContent = state.activeCase.description;
      }
    }
    if (badgeEl) {
      const spacePrefix = spaceName ? `[Không gian: ${spaceName}]\n` : "";
      badgeEl.title = `${spacePrefix}${state.activeCase.id}: ${state.activeCase.timeName} • ${state.activeCase.weatherName} • ${state.activeCase.moodName}\n"${state.activeCase.description}"`;
    }
  }

  // ===================== 4. AUDIO & YOUTUBE PLAYER & ATMOSPHERE FX =====================
  const ambientAudio = new AmbientAudioEngine();
  const weatherEngine = new WeatherEngine();
  const atmosphereFX = new AtmosphereFX();

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

  // ===================== 5. AUTONOMOUS TRANSITION ENGINE =====================
  /**
   * Resolves exact context from:
   * - Vietnam Region: Bắc / Trung / Nam (Accurate geography & climate)
   * - Seasonal Solar Time: Dynamic Sunrise, Sunset, Dusk, Dawn
   *   (Summer North: 05h15 dawn, 19h00 sunset; Winter North: 06h30 dawn, 17h20 sunset, 17h45 dark!)
   * - Time Slot (T1..T8), Weather Slot (W1..W7), Mood Slot (M1..M5)
   * - Living Space (55 Spaces across 10 Groups) with zero duplicate playlists!
   */
  function evaluateContext(triggerSource = "tick") {
    if (!state.currentTimeData) return;

    const date = state.currentTimeData.rawDate || state.currentTimeData.dateRaw || new Date();

    // 1. Resolve Region (Auto via GPS/IP or Manual)
    const activeRegionId = (state.selectedRegion === "auto")
      ? (state.currentWeather?.regionId || "north")
      : state.selectedRegion;
    state.activeRegionId = activeRegionId;
    const regObj = (typeof VIETNAM_REGIONS !== "undefined" && VIETNAM_REGIONS[activeRegionId])
      ? VIETNAM_REGIONS[activeRegionId]
      : { id: "north", name: "Miền Bắc", shortName: "Bắc", seasons: {} };

    // 2. Resolve Season (Auto via Month or Manual)
    let activeSeasonObj;
    if (typeof VietnamEngine !== "undefined") {
      if (state.selectedSeason === "auto") {
        activeSeasonObj = VietnamEngine.getSeason(activeRegionId, date);
      } else {
        activeSeasonObj = regObj.seasons[state.selectedSeason] || VietnamEngine.getSeason(activeRegionId, date);
      }
    } else {
      activeSeasonObj = { id: "autumn", name: "Mùa Thu", icon: "leaf" };
    }
    state.activeSeasonId = activeSeasonObj.id;

    // 3. Resolve Astronomical Solar Times (Sunrise, Sunset, Dawn, Dusk)
    const coords = state.currentWeather ? {
      lat: state.currentWeather.latitude,
      lon: state.currentWeather.longitude
    } : (regObj.defaultCoords || { lat: 21.0285, lon: 105.8542 });

    let solarCalcDate = date;
    if (state.selectedSeason !== "auto" && activeSeasonObj.months && activeSeasonObj.months.length > 0) {
      solarCalcDate = new Date(date);
      solarCalcDate.setMonth(activeSeasonObj.months[0] - 1);
    }

    let solar;
    if (typeof VietnamEngine !== "undefined") {
      solar = VietnamEngine.calculateSolarTimes(
        coords.lat,
        coords.lon,
        solarCalcDate,
        state.selectedSeason === "auto" ? state.currentWeather?.dailySunrise : null,
        state.selectedSeason === "auto" ? state.currentWeather?.dailySunset : null
      );
    } else {
      solar = { sunrise: 6, sunset: 18, dawn: 5.35, dusk: 18.5, sunriseStr: "06:00", sunsetStr: "18:00", dawnStr: "05:20", duskStr: "18:30", dayLengthHours: 12 };
    }
    state.currentSolar = solar;

    // 4. Resolve Dynamic Time Slot (T1..T8) based on exact Solar Times
    const tSlot = (typeof VietnamEngine !== "undefined")
      ? VietnamEngine.resolveDynamicTimeSlot(date, solar)
      : MatrixEngine.getTimeSlot(date);

    // 5. Accurate Visual Daylight (Sun is up between sunrise and dusk)
    const isVisualDay = (typeof VietnamEngine !== "undefined")
      ? VietnamEngine.isVisualDaytime(date, solar)
      : (date.getHours() >= 6 && date.getHours() < 18);

    // 6. Weather Slot
    const wmoCode = state.currentWeather?.weatherCode ?? 0;
    const temp = state.currentWeather?.temp ?? 25;
    const wSlot = MatrixEngine.getWeatherSlot(wmoCode, temp, isVisualDay ? 1 : 0);

    // 7. Mood Slot
    const mSlot = (state.selectedMood === "auto")
      ? MatrixEngine.getDefaultMood(tSlot, wSlot)
      : state.selectedMood;

    const targetCase = MatrixEngine.getCase(tSlot, wSlot, mSlot);

    const isCaseChanged = !state.activeCase || (state.activeCase.id !== targetCase.id);
    const isUserTrigger = triggerSource === "space_switch" || triggerSource === "region_switch" || triggerSource === "mood_switch" || triggerSource === "init";

    // 8. Update Celestial Bodies (Sun Top-Left, Moon Top-Right) & Rain Canvas
    atmosphereFX.update({
      isDay: isVisualDay,
      timeSlot: tSlot,
      weatherSlot: wSlot,
      forceRain: state.isRainSoundOn
    });

    // 9. Synchronize Badges for Region & Season and Solar
    updateRegionSeasonUI(regObj, activeSeasonObj, solar);

    if (isCaseChanged || isUserTrigger) {
      console.log(`[Atmosphere Shift] ${targetCase.id} | Region: ${activeRegionId} (${activeSeasonObj.name}) | Space: ${state.selectedSpace} | Trigger: ${triggerSource}`);
      state.activeCase = targetCase;

      // Cross-fade 4K wallpaper
      setScenery(false);

      // Determine tailored playlist and poetic quote
      let activePlaylist = targetCase.playlist;
      let activeQuote = targetCase.quote;
      let activeSpaceName = null;

      if (state.selectedSpace && state.selectedSpace !== "auto" && typeof SpaceEngine !== "undefined") {
        const spaceObj = SpaceEngine.getSpace(state.selectedSpace);
        if (spaceObj) {
          activeSpaceName = spaceObj.name;
          activePlaylist = SpaceEngine.getPlaylistForSpace(state.selectedSpace, tSlot, wSlot, mSlot);
          activeQuote = `“Tại ${spaceObj.name}, ${targetCase.description.toLowerCase()}. ${spaceObj.desc}.”`;
        }
      } else if (typeof VietnamEngine !== "undefined") {
        const regionalQuote = VietnamEngine.getContextualQuote(activeRegionId, activeSeasonObj.id);
        if (regionalQuote) {
          activeQuote = `“${regionalQuote}”`;
        }
      }

      // Update Poetic Quote
      fadeUpdateQuote(activeQuote);

      // Update Status Badge & Central Clock Island Space Badge
      updateMatrixBadge(activeSpaceName);
      const clockSpaceEl = document.getElementById("clock-space-name");
      if (clockSpaceEl) {
        clockSpaceEl.textContent = activeSpaceName || "Tự động cảm biến";
      }

      // Synchronize Playlist
      if (isUserTrigger || !player.isPlaying) {
        player.setPlaylist(activePlaylist, isUserTrigger && triggerSource !== "init");
      } else {
        const current = player.getCurrentTrack();
        if (current) {
          player.playlist = [current, ...activePlaylist.filter(t => t.id !== current.id)];
          player.currentIndex = 0;
        } else {
          player.setPlaylist(activePlaylist, false);
        }
      }
    }
  }

  // ===================== 6. TIME ENGINE (TICKS EVERY SECOND) =====================
  const timeEngine = new TimeEngine((timeData) => {
    state.currentTimeData = timeData;

    // Center Big Digital Clock & Date
    const clockEl = document.getElementById("time-clock");
    const dateTextEl = document.getElementById("time-date-text");
    const dateEl = document.getElementById("time-date");
    const slotEl = document.getElementById("clock-slot-name");

    if (clockEl) clockEl.textContent = timeData.time.clock;
    if (dateTextEl) {
      dateTextEl.textContent = timeData.date.full;
    } else if (dateEl) {
      dateEl.textContent = timeData.date.full;
    }
    if (slotEl && timeData.period) {
      slotEl.textContent = timeData.period.label;
    }

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
  
  // A. Auto-rotate 4K wallpapers within active case every 10 minutes
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

  // C. Page Visibility & Sleep/Wake Detection
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

  // ===================== 9. SPACE SELECTION MODAL SYSTEM =====================
  const spaceModal = document.getElementById("space-modal");
  const spaceTabsContainer = document.getElementById("space-group-tabs");
  const spaceItemsContainer = document.getElementById("space-items-container");
  const spaceSearchInput = document.getElementById("space-search-input");
  const activeSpaceLabel = document.getElementById("active-space-label");

  function openSpaceModal() {
    if (!spaceModal) return;
    spaceModal.classList.add("open");
    renderSpaceModalTabs();
    renderSpaceItems();
    spaceSearchInput?.focus();
  }

  function closeSpaceModal() {
    if (!spaceModal) return;
    spaceModal.classList.remove("open");
    if (spaceSearchInput) spaceSearchInput.value = "";
  }

  function renderSpaceModalTabs() {
    if (!spaceTabsContainer || typeof SpaceEngine === "undefined") return;
    const groups = SpaceEngine.getAllGroups();

    let html = `<button data-group="all" class="space-pill ${state.activeGroupFilter === 'all' ? 'active' : ''}">Tất cả (55)</button>`;
    for (const g of groups) {
      const isActive = state.activeGroupFilter === g.id;
      html += `<button data-group="${g.id}" class="space-pill ${isActive ? 'active' : ''}">${g.name}</button>`;
    }
    spaceTabsContainer.innerHTML = html;

    spaceTabsContainer.querySelectorAll("button").forEach(btn => {
      btn.addEventListener("click", () => {
        state.activeGroupFilter = btn.getAttribute("data-group");
        renderSpaceModalTabs();
        renderSpaceItems();
      });
    });
  }

  function renderSpaceItems() {
    if (!spaceItemsContainer || typeof SpaceEngine === "undefined") return;
    const allSpaces = SpaceEngine.getAllSpaces();
    const query = (spaceSearchInput?.value || "").toLowerCase().trim();

    const filtered = allSpaces.filter(s => {
      const matchesGroup = (state.activeGroupFilter === "all") || (s.groupId === state.activeGroupFilter);
      const matchesQuery = !query || s.name.toLowerCase().includes(query) || s.desc.toLowerCase().includes(query) || s.groupName.toLowerCase().includes(query);
      return matchesGroup && matchesQuery;
    });

    if (filtered.length === 0) {
      spaceItemsContainer.innerHTML = `<div class="text-center py-8 text-slate-400 text-sm">Không tìm thấy bối cảnh phù hợp với từ khóa "${query}"</div>`;
      return;
    }

    // Group items by groupName
    const grouped = {};
    for (const s of filtered) {
      if (!grouped[s.groupName]) grouped[s.groupName] = [];
      grouped[s.groupName].push(s);
    }

    let html = "";
    for (const [groupName, items] of Object.entries(grouped)) {
      html += `
        <div class="space-group-section">
          <h4 class="text-xs font-semibold tracking-wider text-amber-300/90 uppercase mb-2 flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span>${groupName}</span>
            <span class="text-slate-500 font-normal">(${items.length})</span>
          </h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
      `;

      for (const item of items) {
        const isCurrentActive = state.selectedSpace === item.id;
        html += `
          <button data-space-id="${item.id}" class="space-card-btn p-3 rounded-2xl text-left flex items-start gap-2.5 ${isCurrentActive ? 'active' : ''}">
            <div class="p-2 rounded-xl bg-white/10 text-amber-300 flex-shrink-0 mt-0.5">
              <i data-lucide="${item.icon}" class="w-4 h-4"></i>
            </div>
            <div class="overflow-hidden">
              <div class="font-medium text-xs sm:text-sm text-white flex items-center gap-1">
                <span class="truncate">${item.name}</span>
                ${isCurrentActive ? '<i data-lucide="check" class="w-3.5 h-3.5 text-amber-400 flex-shrink-0"></i>' : ''}
              </div>
              <p class="text-[11px] text-slate-400 leading-tight mt-0.5 line-clamp-2">${item.desc}</p>
            </div>
          </button>
        `;
      }

      html += `
          </div>
        </div>
      `;
    }

    spaceItemsContainer.innerHTML = html;
    lucide.createIcons();

    // Attach click events
    spaceItemsContainer.querySelectorAll("[data-space-id]").forEach(card => {
      card.addEventListener("click", () => {
        const spaceId = card.getAttribute("data-space-id");
        selectSpace(spaceId);
        closeSpaceModal();
      });
    });
  }

  function selectSpace(spaceId) {
    state.selectedSpace = spaceId;

    // Update dock pills active state
    document.querySelectorAll(".space-pill").forEach(pill => {
      const pSpace = pill.getAttribute("data-space");
      if (pSpace) {
        pill.classList.toggle("active", pSpace === spaceId);
      }
    });

    // Update Space button label & Central Clock Island
    const clockSpaceEl = document.getElementById("clock-space-name");
    if (spaceId === "auto") {
      if (activeSpaceLabel) activeSpaceLabel.textContent = "Tự động cảm biến";
      if (clockSpaceEl) clockSpaceEl.textContent = "Tự động cảm biến";
    } else {
      const sp = SpaceEngine.getSpace(spaceId);
      if (sp) {
        if (activeSpaceLabel) activeSpaceLabel.textContent = sp.name;
        if (clockSpaceEl) clockSpaceEl.textContent = sp.name;
      }
    }

    // Evaluate context with space_switch trigger
    evaluateContext("space_switch");
  }

  // Search input live filtering
  spaceSearchInput?.addEventListener("input", () => {
    renderSpaceItems();
  });

  // Modal Buttons & Triggers
  document.getElementById("btn-open-space-modal")?.addEventListener("click", openSpaceModal);
  document.getElementById("btn-close-space-modal")?.addEventListener("click", closeSpaceModal);

  spaceModal?.addEventListener("click", (e) => {
    if (e.target === spaceModal) {
      closeSpaceModal();
    }
  });

  // Space Pills on Dock
  document.querySelectorAll(".space-pill[data-space]").forEach(pill => {
    pill.addEventListener("click", () => {
      const space = pill.getAttribute("data-space");
      selectSpace(space);
    });
  });

  // ===================== 10. VIETNAM REGION & SEASON MODAL SYSTEM =====================
  const regionModal = document.getElementById("region-modal");
  const regionsContainer = document.getElementById("vietnam-regions-container");
  const btnRegionAuto = document.getElementById("btn-region-auto");

  function openRegionModal() {
    if (!regionModal) return;
    regionModal.classList.add("open");
    renderRegionModal();
  }

  function closeRegionModal() {
    if (!regionModal) return;
    regionModal.classList.remove("open");
  }

  function updateRegionSeasonUI(regObj, seasonObj, solar) {
    const clockLabel = document.getElementById("clock-region-season-name");
    const dockLabel = document.getElementById("active-region-season-label");
    const clockIcon = document.getElementById("clock-region-season-icon");
    const dockIcon = document.getElementById("active-region-season-icon");

    const text = `${regObj.name} • ${seasonObj.name}`;
    if (clockLabel) clockLabel.textContent = text;
    if (dockLabel) dockLabel.textContent = text;

    if (clockIcon && seasonObj.icon) clockIcon.setAttribute("data-lucide", seasonObj.icon);
    if (dockIcon && seasonObj.icon) dockIcon.setAttribute("data-lucide", seasonObj.icon);

    const sunriseEl = document.getElementById("solar-sunrise-val");
    const sunsetEl = document.getElementById("solar-sunset-val");
    const duskEl = document.getElementById("solar-dusk-val");
    const lengthEl = document.getElementById("solar-daylength-val");

    if (sunriseEl && solar) sunriseEl.textContent = solar.sunriseStr;
    if (sunsetEl && solar) sunsetEl.textContent = solar.sunsetStr;
    if (duskEl && solar) duskEl.textContent = solar.duskStr;
    if (lengthEl && solar) lengthEl.textContent = `${solar.dayLengthHours.toFixed(1)} giờ`;

    lucide.createIcons();
  }

  function renderRegionModal() {
    if (!regionsContainer || typeof VIETNAM_REGIONS === "undefined") return;

    // Highlight Auto button
    const isAuto = state.selectedRegion === "auto" && state.selectedSeason === "auto";
    if (btnRegionAuto) {
      btnRegionAuto.classList.toggle("text-amber-300", isAuto);
      btnRegionAuto.classList.toggle("border-amber-400/40", isAuto);
      btnRegionAuto.classList.toggle("bg-amber-400/10", isAuto);
      btnRegionAuto.classList.toggle("text-slate-400", !isAuto);
      btnRegionAuto.classList.toggle("border-white/10", !isAuto);
      btnRegionAuto.classList.toggle("bg-white/5", !isAuto);
    }

    let html = "";
    for (const [rId, reg] of Object.entries(VIETNAM_REGIONS)) {
      const isCurrentRegion = state.activeRegionId === rId;
      html += `
        <div class="region-card-box ${isCurrentRegion ? 'active-region' : ''}">
          <div class="flex items-center justify-between pb-2 mb-2 border-b border-white/5">
            <div class="flex items-center gap-2">
              <div class="p-1.5 rounded-lg bg-white/10 text-emerald-400">
                <i data-lucide="${reg.icon}" class="w-4 h-4"></i>
              </div>
              <div>
                <h4 class="font-bold text-sm text-white flex items-center gap-1.5">
                  <span>${reg.name}</span>
                  ${isCurrentRegion ? '<span class="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">Đang hoạt động</span>' : ''}
                </h4>
                <p class="text-[11px] text-slate-400 leading-tight">${reg.fullName}</p>
              </div>
            </div>
            <button data-select-region="${rId}" class="px-2.5 py-1 rounded-lg text-xs bg-white/10 hover:bg-emerald-500/20 hover:text-emerald-300 transition-colors">
              Chọn miền này
            </button>
          </div>

          <div class="flex flex-wrap items-center gap-1.5 mt-2.5">
      `;

      for (const [sId, season] of Object.entries(reg.seasons)) {
        const isSeasonActive = isCurrentRegion && state.activeSeasonId === sId;
        html += `
          <button data-region="${rId}" data-season="${sId}" class="season-chip ${isSeasonActive ? 'active' : ''}" title="${season.tagline}">
            <i data-lucide="${season.icon}" class="w-3.5 h-3.5"></i>
            <span>${season.name}</span>
          </button>
        `;
      }

      html += `
          </div>
          <p class="text-[11px] text-slate-400 mt-2 italic flex items-center gap-1">
            <i data-lucide="info" class="w-3 h-3 text-slate-500 flex-shrink-0"></i>
            <span>${reg.climateType}</span>
          </p>
        </div>
      `;
    }

    regionsContainer.innerHTML = html;
    lucide.createIcons();

    // Attach listeners
    regionsContainer.querySelectorAll("[data-select-region]").forEach(btn => {
      btn.addEventListener("click", () => {
        const rId = btn.getAttribute("data-select-region");
        state.selectedRegion = rId;
        state.selectedSeason = "auto";
        evaluateContext("region_switch");
        renderRegionModal();
      });
    });

    regionsContainer.querySelectorAll("[data-region][data-season]").forEach(chip => {
      chip.addEventListener("click", () => {
        const rId = chip.getAttribute("data-region");
        const sId = chip.getAttribute("data-season");
        state.selectedRegion = rId;
        state.selectedSeason = sId;
        evaluateContext("region_switch");
        renderRegionModal();
      });
    });
  }

  // Region Modal Buttons & Triggers
  document.getElementById("btn-open-region-modal")?.addEventListener("click", openRegionModal);
  document.getElementById("clock-region-season-badge")?.addEventListener("click", openRegionModal);
  document.getElementById("btn-close-region-modal")?.addEventListener("click", closeRegionModal);

  btnRegionAuto?.addEventListener("click", () => {
    state.selectedRegion = "auto";
    state.selectedSeason = "auto";
    evaluateContext("region_switch");
    renderRegionModal();
  });

  regionModal?.addEventListener("click", (e) => {
    if (e.target === regionModal) {
      closeRegionModal();
    }
  });

  // ===================== 11. USER CONTROLS & INTERACTION =====================
  
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
    evaluateContext("ambient_toggle");
  });

  // Next 4K Scene Manual Button (Cycle through images for current case)
  document.getElementById("btn-next-scene")?.addEventListener("click", () => {
    setScenery(true);
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
    if (e.key === "Escape") {
      closeSpaceModal();
      closeRegionModal();
    } else if (e.code === "Space") {
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

  // ===================== 11. APP BOOTSTRAP =====================
  async function init() {
    lucide.createIcons();

    // 1. Initial time tick
    const initialTimeData = timeEngine.tick();
    state.currentTimeData = initialTimeData;

    // Fast-path: immediately evaluate atmosphere based on clock hour
    evaluateContext("pre_init");

    // 2. Fetch live weather & location
    const weatherData = await weatherEngine.fetchWeather();
    state.currentWeather = weatherData;

    // 3. Render initial weather UI
    updateWeatherUI(weatherData);

    // 4. Re-evaluate with exact live weather
    evaluateContext("init");

    // 5. Start 3-minute weather auto-refresh poller
    weatherEngine.startAutoRefresh((newData) => {
      updateWeatherUI(newData);
    });
  }

  init();
});
