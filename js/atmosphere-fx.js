/**
 * AuraBeat - Living Atmosphere Visual FX Engine
 * Realistic Celestial Bodies (Top-Left Sun, Top-Right Moon) & Procedural Rain Glass Effects
 */

class AtmosphereFX {
  constructor() {
    this.sunEl = document.getElementById("celestial-sun");
    this.moonEl = document.getElementById("celestial-moon");
    this.rainCanvas = document.getElementById("rain-canvas");
    this.dropletsContainer = document.getElementById("window-droplets");
    
    this.ctx = this.rainCanvas ? this.rainCanvas.getContext("2d") : null;
    this.rainParticles = [];
    this.splashes = [];
    this.animId = null;
    this.isRaining = false;
    
    this.initCanvasResize();
  }

  initCanvasResize() {
    if (!this.rainCanvas) return;
    const resize = () => {
      this.rainCanvas.width = window.innerWidth;
      this.rainCanvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
  }

  /**
   * Main update entrypoint based on environment state
   */
  update({ isDay, timeSlot, weatherSlot, forceRain = false }) {
    // 1. Celestial Decision
    // Night/Evening: T7 (18-21h), T8 (21-04h), T1 (04-06h) or !isDay
    const isNightTime = !isDay || ["T7", "T8", "T1"].includes(timeSlot);
    
    // Rain condition: W5 (Mưa nhẹ), W6 (Mưa lớn/bão) or manual toggle
    const isRainyWeather = ["W5", "W6"].includes(weatherSlot) || forceRain;

    // A. Sun (Top-Left)
    // Visible only during clear/partly cloudy daytime
    const showSun = !isNightTime && ["W1", "W2", "W3"].includes(weatherSlot) && !isRainyWeather;
    this.setSunVisible(showSun);

    // B. Moon (Top-Right)
    // Visible during evening/night/early dawn
    const showMoon = isNightTime && !isRainyWeather;
    this.setMoonVisible(showMoon);

    // C. Rain (Falling Rain + Glass Window Droplets)
    this.setRainVisible(isRainyWeather);
  }

  setSunVisible(visible) {
    if (!this.sunEl) return;
    if (visible) {
      this.sunEl.classList.add("visible");
    } else {
      this.sunEl.classList.remove("visible");
    }
  }

  setMoonVisible(visible) {
    if (!this.moonEl) return;
    if (visible) {
      this.moonEl.classList.add("visible");
    } else {
      this.moonEl.classList.remove("visible");
    }
  }

  setRainVisible(visible) {
    if (this.isRaining === visible) return;
    this.isRaining = visible;

    if (visible) {
      if (this.rainCanvas) this.rainCanvas.classList.add("active");
      if (this.dropletsContainer) {
        this.dropletsContainer.classList.add("active");
        this.generateWindowDroplets();
      }
      this.startRainLoop();
    } else {
      if (this.rainCanvas) this.rainCanvas.classList.remove("active");
      if (this.dropletsContainer) this.dropletsContainer.classList.remove("active");
      this.stopRainLoop();
    }
  }

  // ===================== RAIN CANVAS ENGINE =====================
  startRainLoop() {
    if (this.animId || !this.ctx) return;

    // Initialize 140 particles
    this.rainParticles = [];
    const count = Math.min(160, Math.floor(window.innerWidth / 10));
    for (let i = 0; i < count; i++) {
      this.rainParticles.push({
        x: Math.random() * window.innerWidth * 1.2 - (window.innerWidth * 0.1),
        y: Math.random() * window.innerHeight,
        length: Math.random() * 24 + 14,
        speed: Math.random() * 14 + 16,
        slant: Math.random() * 2 + 1.5,
        opacity: Math.random() * 0.4 + 0.2,
        width: Math.random() * 1.5 + 0.8
      });
    }

    const animate = () => {
      this.ctx.clearRect(0, 0, this.rainCanvas.width, this.rainCanvas.height);

      // Draw and update falling streaks
      this.ctx.strokeStyle = "rgba(224, 242, 254, 0.4)";
      this.ctx.lineCap = "round";

      for (let i = 0; i < this.rainParticles.length; i++) {
        const p = this.rainParticles[i];

        this.ctx.beginPath();
        this.ctx.lineWidth = p.width;
        this.ctx.strokeStyle = `rgba(224, 242, 254, ${p.opacity})`;
        this.ctx.moveTo(p.x, p.y);
        this.ctx.lineTo(p.x - p.slant, p.y + p.length);
        this.ctx.stroke();

        p.x -= p.slant;
        p.y += p.speed;

        // Reset when passing bottom
        if (p.y > window.innerHeight) {
          p.y = -p.length;
          p.x = Math.random() * window.innerWidth * 1.2 - (window.innerWidth * 0.1);

          // Splash ring
          if (Math.random() > 0.6) {
            this.splashes.push({
              x: p.x,
              y: window.innerHeight - 8,
              radius: 1,
              maxRadius: Math.random() * 6 + 3,
              opacity: 0.5
            });
          }
        }
      }

      // Draw and update splashes
      for (let i = this.splashes.length - 1; i >= 0; i--) {
        const s = this.splashes[i];
        this.ctx.beginPath();
        this.ctx.ellipse(s.x, s.y, s.radius * 2, s.radius * 0.6, 0, 0, Math.PI * 2);
        this.ctx.strokeStyle = `rgba(224, 242, 254, ${s.opacity})`;
        this.ctx.lineWidth = 1;
        this.ctx.stroke();

        s.radius += 0.4;
        s.opacity -= 0.035;

        if (s.opacity <= 0) {
          this.splashes.splice(i, 1);
        }
      }

      this.animId = requestAnimationFrame(animate);
    };

    animate();
  }

  stopRainLoop() {
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
    if (this.ctx && this.rainCanvas) {
      this.ctx.clearRect(0, 0, this.rainCanvas.width, this.rainCanvas.height);
    }
  }

  // ===================== GLASS WINDOW DROPLETS =====================
  generateWindowDroplets() {
    if (!this.dropletsContainer) return;
    this.dropletsContainer.innerHTML = "";

    const dropCount = Math.min(45, Math.floor(window.innerWidth / 35));
    for (let i = 0; i < dropCount; i++) {
      const drop = document.createElement("div");
      drop.className = "window-drop";
      
      const size = Math.random() * 12 + 6; // 6px - 18px
      const left = Math.random() * 96 + 2; // 2% - 98%
      const top = Math.random() * 92 + 4;  // 4% - 96%
      const delay = Math.random() * 4;
      const duration = Math.random() * 6 + 8; // slide down slowly

      drop.style.width = `${size}px`;
      drop.style.height = `${size * (Math.random() * 0.4 + 1.1)}px`;
      drop.style.left = `${left}%`;
      drop.style.top = `${top}%`;
      drop.style.animationDelay = `${delay}s`;
      drop.style.animationDuration = `${duration}s`;

      if (Math.random() > 0.75) {
        drop.classList.add("sliding-drop");
      }

      this.dropletsContainer.appendChild(drop);
    }
  }
}

if (typeof window !== "undefined") {
  window.AtmosphereFX = AtmosphereFX;
}
