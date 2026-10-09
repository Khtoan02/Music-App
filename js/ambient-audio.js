/**
 * Procedural Ambient Audio Generator
 * Uses Web Audio API to generate realistic ambient nature sounds without external audio files
 */

class AmbientAudioEngine {
  constructor() {
    this.ctx = null;
    this.isInitialized = false;
    this.tracks = {
      rain: { active: false, gain: null, node: null, volume: 0.5 },
      wind: { active: false, gain: null, node: null, volume: 0.4 },
      thunder: { active: false, gain: null, node: null, volume: 0.6, interval: null },
      fire: { active: false, gain: null, node: null, volume: 0.5 },
      waves: { active: false, gain: null, node: null, volume: 0.5 }
    };
    this.masterGain = null;
  }

  init() {
    if (this.isInitialized) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) {
      console.warn("Web Audio API not supported");
      return;
    }
    this.ctx = new AudioCtx();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
    this.isInitialized = true;
  }

  ensureContext() {
    if (!this.isInitialized) {
      this.init();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  /**
   * Helper: Create continuous white/pink noise buffer
   */
  createNoiseBuffer(seconds = 5) {
    const bufferSize = this.ctx.sampleRate * seconds;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Pink noise filter algorithm (Paul Kellet's method)
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.08;
      b6 = white * 0.115926;
    }
    return buffer;
  }

  /**
   * Rain Sound Generator
   */
  startRain() {
    this.ensureContext();
    if (this.tracks.rain.active) return;

    const noiseBuffer = this.createNoiseBuffer(5);
    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    // Filter for gentle rain effect
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1000, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(this.tracks.rain.volume, this.ctx.currentTime);

    noiseSource.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noiseSource.start();

    this.tracks.rain.node = noiseSource;
    this.tracks.rain.gain = gain;
    this.tracks.rain.active = true;
  }

  stopRain() {
    if (!this.tracks.rain.active) return;
    try {
      this.tracks.rain.node.stop();
      this.tracks.rain.node.disconnect();
    } catch (e) {}
    this.tracks.rain.active = false;
  }

  /**
   * Wind Sound Generator (Sweeping resonance)
   */
  startWind() {
    this.ensureContext();
    if (this.tracks.wind.active) return;

    const noiseBuffer = this.createNoiseBuffer(5);
    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(400, this.ctx.currentTime);
    filter.Q.setValueAtTime(3.0, this.ctx.currentTime);

    // LFO for gentle wind gusts
    const lfo = this.ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.setValueAtTime(0.2, this.ctx.currentTime);

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(250, this.ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(this.tracks.wind.volume, this.ctx.currentTime);

    noiseSource.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    lfo.start();
    noiseSource.start();

    this.tracks.wind.node = { noise: noiseSource, lfo };
    this.tracks.wind.gain = gain;
    this.tracks.wind.active = true;
  }

  stopWind() {
    if (!this.tracks.wind.active) return;
    try {
      this.tracks.wind.node.noise.stop();
      this.tracks.wind.node.lfo.stop();
    } catch (e) {}
    this.tracks.wind.active = false;
  }

  /**
   * Thunder Generator (Periodic low rumble)
   */
  startThunder() {
    this.ensureContext();
    if (this.tracks.thunder.active) return;

    this.tracks.thunder.active = true;
    this.triggerThunderRumble();

    // Trigger thunder randomly every 12 - 25 seconds
    this.tracks.thunder.interval = setInterval(() => {
      if (this.tracks.thunder.active && Math.random() > 0.3) {
        this.triggerThunderRumble();
      }
    }, 15000);
  }

  triggerThunderRumble() {
    if (!this.ctx || !this.tracks.thunder.active) return;

    const dur = 4 + Math.random() * 3;
    const osc = this.ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(60, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + dur);

    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(120, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    const peak = (this.tracks.thunder.volume || 0.6) * 0.9;
    gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(peak, this.ctx.currentTime + 0.6);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + dur);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(this.ctx.currentTime + dur);
  }

  stopThunder() {
    if (!this.tracks.thunder.active) return;
    if (this.tracks.thunder.interval) {
      clearInterval(this.tracks.thunder.interval);
      this.tracks.thunder.interval = null;
    }
    this.tracks.thunder.active = false;
  }

  /**
   * Campfire Generator (Crackle + warmth)
   */
  startFire() {
    this.ensureContext();
    if (this.tracks.fire.active) return;

    const noiseBuffer = this.createNoiseBuffer(4);
    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(650, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(this.tracks.fire.volume, this.ctx.currentTime);

    noiseSource.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noiseSource.start();

    this.tracks.fire.node = noiseSource;
    this.tracks.fire.gain = gain;
    this.tracks.fire.active = true;
  }

  stopFire() {
    if (!this.tracks.fire.active) return;
    try {
      this.tracks.fire.node.stop();
      this.tracks.fire.node.disconnect();
    } catch (e) {}
    this.tracks.fire.active = false;
  }

  /**
   * Ocean Waves Generator
   */
  startWaves() {
    this.ensureContext();
    if (this.tracks.waves.active) return;

    const noiseBuffer = this.createNoiseBuffer(6);
    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(300, this.ctx.currentTime);

    // LFO for surf wave crest and withdrawal
    const lfo = this.ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime); // ~8s wave period

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(350, this.ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(this.tracks.waves.volume, this.ctx.currentTime);

    noiseSource.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    lfo.start();
    noiseSource.start();

    this.tracks.waves.node = { noise: noiseSource, lfo };
    this.tracks.waves.gain = gain;
    this.tracks.waves.active = true;
  }

  stopWaves() {
    if (!this.tracks.waves.active) return;
    try {
      this.tracks.waves.node.noise.stop();
      this.tracks.waves.node.lfo.stop();
    } catch (e) {}
    this.tracks.waves.active = false;
  }

  /**
   * Toggle track by name
   */
  toggleTrack(name) {
    if (name === "rain") {
      this.tracks.rain.active ? this.stopRain() : this.startRain();
    } else if (name === "wind") {
      this.tracks.wind.active ? this.stopWind() : this.startWind();
    } else if (name === "thunder") {
      this.tracks.thunder.active ? this.stopThunder() : this.startThunder();
    } else if (name === "fire") {
      this.tracks.fire.active ? this.stopFire() : this.startFire();
    } else if (name === "waves") {
      this.tracks.waves.active ? this.stopWaves() : this.startWaves();
    }
    return this.tracks[name]?.active || false;
  }

  setTrackVolume(name, val) {
    if (this.tracks[name]) {
      this.tracks[name].volume = val;
      if (this.tracks[name].gain && this.ctx) {
        this.tracks[name].gain.gain.setValueAtTime(val, this.ctx.currentTime);
      }
    }
  }

  setMasterVolume(val) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(val, this.ctx.currentTime);
    }
  }
}
