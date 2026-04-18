import { timerHistoryStore } from "./timer-history-store.js";

function formatTime(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);
  const secondsOnly = seconds % 60;
  const minutes = Math.floor(seconds / 60);
  const minutesOnly = minutes % 60;
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}ч ${minutesOnly}м ${secondsOnly}с`;
  }

  if (minutes > 0) {
    return `${minutesOnly}м ${secondsOnly}с`;
  }

  return `${secondsOnly}с`;
}

function formatDate(dateString) {
  const date = new Date(dateString + "T00:00:00");
  const options = { weekday: "short", month: "short", day: "numeric" };
  return date.toLocaleDateString("ru-RU", options);
}

const historyListEl = document.getElementById("timer-history-list");

export function updateHistoryDisplay() {
  if (!historyListEl) return;

  const historyData = timerHistoryStore.getHistoryWithTotals();
  historyListEl.innerHTML = "";

  if (historyData.length === 0) {
    historyListEl.innerHTML =
      '<li class="list-group-item text-muted">Записей пока нет</li>';
    return;
  }

  historyData.forEach(({ date, topicData, totalTime }, dayIndex) => {
    const dayId = `day-${dayIndex}`;

    const dayBtn = document.createElement("li");
    dayBtn.className = "list-group-item";
    dayBtn.style.cursor = "pointer";
    dayBtn.dataset.dayId = dayId;
    dayBtn.innerHTML = `
      <div class="d-flex justify-content-between align-items-center fw-bold">
        <div class="d-flex align-items-center gap-2">
          <span class="day-toggle" style="display: inline-block; width: 12px; text-align: center;">▶</span>
          <span>${formatDate(date)}</span>
        </div>
        <strong>${formatTime(totalTime)}</strong>
      </div>
    `;
    historyListEl.appendChild(dayBtn);

    const topicsContainer = document.createElement("div");
    topicsContainer.id = dayId;
    topicsContainer.className = "topics-container";
    topicsContainer.style.display = "none";

    Object.entries(topicData).forEach(([topic, times]) => {
      const topicTotalTime = times.reduce((sum, time) => sum + time, 0);
      const topicLi = document.createElement("li");
      topicLi.className = "list-group-item ps-4";
      topicLi.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
          <span class="text-muted">${topic}</span>
          <strong>${formatTime(topicTotalTime)}</strong>
        </div>
      `;
      topicsContainer.appendChild(topicLi);
    });

    historyListEl.appendChild(topicsContainer);

    dayBtn.addEventListener("click", () => {
      const isHidden = topicsContainer.style.display === "none";
      topicsContainer.style.display = isHidden ? "block" : "none";
      const toggleEl = dayBtn.querySelector(".day-toggle");
      toggleEl.textContent = isHidden ? "▼" : "▶";
    });
  });
}

const historyModalEl = document.getElementById("timer-history-modal");

if (historyModalEl) {
  historyModalEl.addEventListener("show.bs.modal", updateHistoryDisplay);
}
