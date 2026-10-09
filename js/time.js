/**
 * Time and Period Engine
 * Tracks exact local time, determines day period, and provides temporal metadata
 */

class TimeEngine {
  constructor(onTickCallback) {
    this.onTick = onTickCallback;
    this.timerId = null;
    this.customTime = null; // Used for simulation/testing
    this.start();
  }

  start() {
    this.tick();
    this.timerId = setInterval(() => this.tick(), 1000);
  }

  stop() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  setCustomHour(hour) {
    if (hour === null) {
      this.customTime = null;
    } else {
      const now = new Date();
      now.setHours(hour, 0, 0);
      this.customTime = now;
    }
    this.tick();
  }

  getCurrentDate() {
    return this.customTime || new Date();
  }

  getTimePeriod(date) {
    const hours = date.getHours();

    if (hours >= 5 && hours < 7) {
      return {
        id: "dawn",
        label: "Bình minh / Sáng sớm",
        greeting: "Chào buổi sáng sớm!",
        description: "Bầu không khí trong lành, khởi đầu ngày mới an yên.",
        icon: "sunrise"
      };
    } else if (hours >= 7 && hours < 11.5) {
      return {
        id: "morning",
        label: "Buổi sáng",
        greeting: "Chào buổi sáng năng lượng!",
        description: "Thời điểm lý tưởng để tập trung và bứt phá công việc.",
        icon: "sun"
      };
    } else if (hours >= 11.5 && hours < 14) {
      return {
        id: "noon",
        label: "Buổi trưa",
        greeting: "Chào buổi trưa an lành!",
        description: "Giờ nghỉ ngơi, thả lỏng tâm trí sau buổi sáng bận rộn.",
        icon: "sun-dim"
      };
    } else if (hours >= 14 && hours < 18) {
      return {
        id: "afternoon",
        label: "Buổi chiều",
        greeting: "Chào buổi chiều êm ả!",
        description: "Giai điệu nhẹ nhàng cho ly cà phê chiều thư thái.",
        icon: "coffee"
      };
    } else if (hours >= 18 && hours < 19) {
      return {
        id: "sunset",
        label: "Hoàng hôn",
        greeting: "Hoàng hôn buông xuống",
        description: "Khoảnh khắc giao hòa giữa ngày và đêm đầy chất thơ.",
        icon: "sunset"
      };
    } else if (hours >= 19 && hours < 23) {
      return {
        id: "evening",
        label: "Buổi tối",
        greeting: "Chào buổi tối ấm áp!",
        description: "Thả mình vào âm nhạc sau một ngày dài vất vả.",
        icon: "moon"
      };
    } else {
      return {
        id: "midnight",
        label: "Đêm khuya",
        greeting: "Đêm muộn tĩnh mịch",
        description: "Không gian tĩnh lặng, âm nhạc xoa dịu tâm hồn và đưa vào giấc ngủ.",
        icon: "moon-star"
      };
    }
  }

  formatTime(date) {
    const pad = (n) => String(n).padStart(2, "0");
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    return {
      clock: `${hours}:${minutes}:${seconds}`,
      shortClock: `${hours}:${minutes}`,
      hours,
      minutes,
      seconds
    };
  }

  formatDate(date) {
    const days = [
      "Chủ Nhật",
      "Thứ Hai",
      "Thứ Ba",
      "Thứ Tư",
      "Thứ Năm",
      "Thứ Sáu",
      "Thứ Bảy"
    ];
    const dayName = days[date.getDay()];
    const pad = (n) => String(n).padStart(2, "0");
    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();

    return {
      full: `${dayName}, ${day}/${month}/${year}`,
      dayName,
      dateString: `${day}/${month}/${year}`
    };
  }

  tick() {
    const now = this.getCurrentDate();
    const period = this.getTimePeriod(now);
    const timeFormatted = this.formatTime(now);
    const dateFormatted = this.formatDate(now);

    const timeData = {
      rawDate: now,
      period,
      time: timeFormatted,
      date: dateFormatted,
      isSimulated: this.customTime !== null
    };

    if (this.onTick) {
      this.onTick(timeData);
    }

    return timeData;
  }
}
