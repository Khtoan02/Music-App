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
      onVolumeChange: callbacks.onVolumeChange || (() => {})
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
    this.videoVisible = false;

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
        controls: 0,
        disablekb: 1,
        fs: 0,
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
        onError: (err) => {
          console.warn("YouTube Player Error:", err);
          // Auto skip if video cannot be played or embedded
          setTimeout(() => {
            this.next();
          }, 1500);
        }
      }
    });
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
    this.playlist = newTracks;
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
