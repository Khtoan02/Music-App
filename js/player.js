/**
 * YouTube Music Player Controller
 * Encapsulates YouTube IFrame API with custom controls, scrubbing, playlist handling
 */

class MusicPlayer {
  constructor(callbacks = {}) {
    this.callbacks = {
      onTrackChange: callbacks.onTrackChange || (() => {}),
      onStateChange: callbacks.onStateChange || (() => {}),
      onTimeUpdate: callbacks.onTimeUpdate || (() => {}),
      onVolumeChange: callbacks.onVolumeChange || (() => {}),
      onTrackFallback: callbacks.onTrackFallback || (() => null),
      onShowToast: callbacks.onShowToast || (() => {})
    };

    this.ytPlayer = null;
    this.isReady = false;
    this.playlist = [];
    this.currentIndex = 0;
    this.isPlaying = false;
    this.isShuffle = false;
    this.repeatMode = "all"; // 'none' | 'one' | 'all'
    this.volume = 80;
    this.isMuted = false;
    this.timeUpdateTimer = null;
    this.videoVisible = true;

    // Track blacklisted / non-embeddable YouTube IDs (errors 101, 150, 100)
    let storedFailed = [];
    try {
      storedFailed = JSON.parse(sessionStorage.getItem("aurabeat_failed_tracks") || "[]");
    } catch (e) {
      storedFailed = [];
    }
    this.failedTrackIds = new Set(storedFailed);

    this.initYouTubeAPI();
  }

  initYouTubeAPI() {
    if (window.YT && window.YT.Player) {
      this.createPlayer();
      return;
    }

    // Load YouTube IFrame API script
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      this.createPlayer();
    };
  }

  createPlayer() {
    this.ytPlayer = new YT.Player("yt-iframe-placeholder", {
      height: "100%",
      width: "100%",
      playerVars: {
        playsinline: 1,
        controls: 1,
        disablekb: 0,
        fs: 1,
        rel: 0,
        modestbranding: 1,
        iv_load_policy: 3
      },
      events: {
        onReady: () => {
          this.isReady = true;
          this.ytPlayer.setVolume(this.volume);
          if (this.playlist.length > 0 && this.playlist[this.currentIndex]) {
            this.cueTrack(this.playlist[this.currentIndex]);
          }
        },
        onStateChange: (event) => {
          this.handleStateChange(event.data);
        },
        onError: (event) => {
          const errCode = (event && typeof event.data !== "undefined") ? event.data : 0;
          this.handlePlaybackError(errCode);
        }
      }
    });
  }

  /**
   * Resilient Error Recovery for YouTube Codes 101, 150, 100, 2
   * Automatically blacklists unplayable ID and switches to an equivalent track in same mood
   */
  handlePlaybackError(errCode) {
    const failedTrack = this.getCurrentTrack();
    const failedId = failedTrack ? failedTrack.id : null;

    console.warn(`[AuraBeat MusicPlayer] YouTube error code ${errCode} on track:`, failedTrack);

    if (failedId) {
      this.failedTrackIds.add(failedId);
      try {
        sessionStorage.setItem("aurabeat_failed_tracks", JSON.stringify([...this.failedTrackIds]));
      } catch (e) {}
    }

    let toastMsg = "Đang chuyển sang bài hát tiếp theo...";
    if (errCode === 101 || errCode === 150) {
      toastMsg = `Video "${failedTrack ? failedTrack.title : 'bài hát'}" bị hạn chế nhúng (Lỗi 150/101). Đang chuyển bài tương đương...`;
    } else if (errCode === 100) {
      toastMsg = `Video "${failedTrack ? failedTrack.title : 'bài hát'}" không khả dụng (Lỗi 100). Đang chuyển bài mới...`;
    } else if (errCode === 2 || errCode === 5) {
      toastMsg = "Lỗi kết nối YouTube. Đang tìm bài hát thay thế...";
    }

    this.callbacks.onShowToast(toastMsg, "warning");

    // Remove the broken track from current playlist
    if (this.playlist.length > 0 && this.currentIndex >= 0 && this.currentIndex < this.playlist.length) {
      this.playlist.splice(this.currentIndex, 1);
    }

    // Try finding equivalent fallback track via host engine
    const fallbackTrack = this.callbacks.onTrackFallback(failedTrack, errCode);
    if (fallbackTrack && fallbackTrack.id) {
      this.playlist.splice(this.currentIndex, 0, fallbackTrack);
      setTimeout(() => {
        this.loadTrack(fallbackTrack);
      }, 250);
    } else {
      // Fallback to next track in remaining playlist
      if (this.playlist.length > 0) {
        if (this.currentIndex >= this.playlist.length) {
          this.currentIndex = 0;
        }
        setTimeout(() => {
          this.loadTrack(this.playlist[this.currentIndex]);
        }, 300);
      }
    }
  }

  handleStateChange(state) {
    // YT.PlayerState: UNSTARTED (-1), ENDED (0), PLAYING (1), PAUSED (2), BUFFERING (3), CUED (5)
    if (state === YT.PlayerState.PLAYING) {
      this.isPlaying = true;
      this.startTimeUpdater();
      this.callbacks.onStateChange("playing");
    } else if (state === YT.PlayerState.PAUSED) {
      this.isPlaying = false;
      this.stopTimeUpdater();
      this.callbacks.onStateChange("paused");
    } else if (state === YT.PlayerState.BUFFERING) {
      this.callbacks.onStateChange("buffering");
    } else if (state === YT.PlayerState.ENDED) {
      this.handleTrackEnded();
    }
  }

  startTimeUpdater() {
    this.stopTimeUpdater();
    this.timeUpdateTimer = setInterval(() => {
      if (this.isReady && this.ytPlayer && this.ytPlayer.getCurrentTime) {
        const current = this.ytPlayer.getCurrentTime() || 0;
        const duration = this.ytPlayer.getDuration() || 0;
        this.callbacks.onTimeUpdate(current, duration);
      }
    }, 500);
  }

  stopTimeUpdater() {
    if (this.timeUpdateTimer) {
      clearInterval(this.timeUpdateTimer);
      this.timeUpdateTimer = null;
    }
  }

  handleTrackEnded() {
    if (this.repeatMode === "one") {
      this.seek(0);
      this.play();
    } else if (this.repeatMode === "all") {
      this.next();
    } else {
      if (this.currentIndex < this.playlist.length - 1) {
        this.next();
      } else {
        this.isPlaying = false;
        this.stopTimeUpdater();
        this.callbacks.onStateChange("ended");
      }
    }
  }

  setPlaylist(newTracks, autoPlay = false) {
    if (!newTracks || newTracks.length === 0) return;
    
    // Automatically filter out any known broken YouTube IDs
    const cleanTracks = newTracks.filter(t => !this.failedTrackIds.has(t.id));
    this.playlist = cleanTracks.length > 0 ? cleanTracks : newTracks;
    this.currentIndex = 0;
    const currentTrack = this.playlist[0];

    if (this.isReady) {
      if (autoPlay || this.isPlaying) {
        this.loadTrack(currentTrack);
      } else {
        this.cueTrack(currentTrack);
      }
    }
    this.callbacks.onTrackChange(currentTrack, 0, this.playlist);
  }

  cueTrack(track) {
    if (!this.isReady || !track) return;
    this.ytPlayer.cueVideoById(track.id);
    this.callbacks.onTrackChange(track, this.currentIndex, this.playlist);
  }

  loadTrack(track) {
    if (!this.isReady || !track) return;
    this.ytPlayer.loadVideoById(track.id);
    this.isPlaying = true;
    this.callbacks.onTrackChange(track, this.currentIndex, this.playlist);
  }

  playTrackByIndex(index) {
    if (index >= 0 && index < this.playlist.length) {
      this.currentIndex = index;
      const track = this.playlist[index];
      this.loadTrack(track);
    }
  }

  play() {
    if (!this.isReady) return;
    this.ytPlayer.playVideo();
  }

  pause() {
    if (!this.isReady) return;
    this.ytPlayer.pauseVideo();
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  next() {
    if (this.playlist.length === 0) return;
    if (this.isShuffle) {
      const nextIndex = Math.floor(Math.random() * this.playlist.length);
      this.playTrackByIndex(nextIndex);
    } else {
      const nextIndex = (this.currentIndex + 1) % this.playlist.length;
      this.playTrackByIndex(nextIndex);
    }
  }

  prev() {
    if (this.playlist.length === 0) return;
    // If played more than 3s, restart current song
    if (this.ytPlayer && this.ytPlayer.getCurrentTime && this.ytPlayer.getCurrentTime() > 3) {
      this.seek(0);
      return;
    }
    const prevIndex = (this.currentIndex - 1 + this.playlist.length) % this.playlist.length;
    this.playTrackByIndex(prevIndex);
  }

  seek(seconds) {
    if (!this.isReady) return;
    this.ytPlayer.seekTo(seconds, true);
  }

  seekPercentage(percent) {
    if (!this.isReady) return;
    const dur = this.ytPlayer.getDuration() || 0;
    this.seek((percent / 100) * dur);
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(100, vol));
    if (this.isReady) {
      this.ytPlayer.setVolume(this.volume);
      if (this.volume > 0 && this.isMuted) {
        this.unMute();
      }
    }
    this.callbacks.onVolumeChange(this.volume, this.isMuted);
  }

  toggleMute() {
    if (!this.isReady) return;
    if (this.isMuted) {
      this.ytPlayer.unMute();
      this.isMuted = false;
    } else {
      this.ytPlayer.mute();
      this.isMuted = true;
    }
    this.callbacks.onVolumeChange(this.volume, this.isMuted);
  }

  unMute() {
    if (this.isReady) {
      this.ytPlayer.unMute();
      this.isMuted = false;
      this.callbacks.onVolumeChange(this.volume, this.isMuted);
    }
  }

  toggleShuffle() {
    this.isShuffle = !this.isShuffle;
    return this.isShuffle;
  }

  toggleRepeat() {
    if (this.repeatMode === "all") {
      this.repeatMode = "one";
    } else if (this.repeatMode === "one") {
      this.repeatMode = "none";
    } else {
      this.repeatMode = "all";
    }
    return this.repeatMode;
  }

  getCurrentTrack() {
    return this.playlist[this.currentIndex] || null;
  }

  /**
   * Play any custom YouTube link or ID provided by user
   */
  loadCustomVideo(urlOrId) {
    let id = urlOrId.trim();
    if (id.includes("youtube.com/watch?v=")) {
      id = id.split("v=")[1].split("&")[0];
    } else if (id.includes("youtu.be/")) {
      id = id.split("youtu.be/")[1].split("?")[0];
    }

    if (id) {
      const customTrack = {
        id,
        title: "Video YouTube Tự Chọn",
        artist: "YouTube Custom Track",
        duration: "--:--",
        category: "custom",
        weathers: ["all"],
        times: ["all"],
        moods: ["chill"]
      };
      this.playlist.unshift(customTrack);
      this.currentIndex = 0;
      this.loadTrack(customTrack);
      return customTrack;
    }
    return null;
  }
}
