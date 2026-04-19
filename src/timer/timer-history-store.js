const STORAGE_KEY = "timerHistory";

function getTodayKey() {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  return today;
}

export const timerHistoryStore = {
  // Структура: { "2026-04-18": { "Работа": [10000, 20000], "Отношения": [20000, 30000] } }
  history: {},

  load() {
    const data = localStorage.getItem(STORAGE_KEY);
    this.history = data ? JSON.parse(data) : {};
  },

  save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.history));
  },

  _ensureDay(day) {
    if (!this.history[day]) {
      this.history[day] = {};
    }
  },

  _ensureTopic(day, topic) {
    this._ensureDay(day);
    if (!this.history[day][topic]) {
      this.history[day][topic] = [];
    }
  },

  addSessionToday(milliseconds, topic = null) {
    const today = getTodayKey();
    const topicName = topic || "Без темы";
    this._ensureTopic(today, topicName);
    this.history[today][topicName].push(milliseconds);
    this.save();
  },

  updateLastSessionToday(milliseconds, topic = null) {
    const today = getTodayKey();
    const topicName = topic || "Без темы";
    this._ensureTopic(today, topicName);

    const sessions = this.history[today][topicName];
    if (sessions.length === 0) {
      sessions.push(milliseconds);
    } else {
      sessions[sessions.length - 1] = milliseconds;
    }
    this.save();
  },

  getSessionsForDay(day) {
    return this.history[day] || {};
  },

  getSessionsToday() {
    return this.getSessionsForDay(getTodayKey());
  },

  // Получить всю историю в формате [{ date, topicData, totalTime }]
  getHistoryWithTotals() {
    return Object.entries(this.history)
      .sort((a, b) => new Date(b[0]) - new Date(a[0]))
      .map(([date, topicData]) => ({
        date,
        topicData,
        totalTime: Object.values(topicData).reduce((daySum, sessions) => {
          return (
            daySum + sessions.reduce((topicSum, time) => topicSum + time, 0)
          );
        }, 0),
      }));
  },

  clear() {
    this.history = {};
    this.save();
  },
};

timerHistoryStore.load();
