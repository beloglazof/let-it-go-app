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

const shortDateOptions = { weekday: "short", month: "short", day: "numeric" };
const longDateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
function formatDate(dateString, options = shortDateOptions) {
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("ru-RU", options);
}

function getDaysInMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function getFirstDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
}

function getDateString(year, month, day) {
  return new Date(year, month, day + 1).toISOString().split("T")[0];
}

const calendarContainerEl = document.getElementById("timer-history-calendar");
const dayDetailsEl = document.getElementById("timer-history-day-details");
const calendarModalEl = document.getElementById("timer-history-modal");

const todayDateString = new Date().toISOString().split("T")[0];
const expandedTopics = new Set();

let currentDate = new Date();
let selectedDate = todayDateString;

const monthNames = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];
const dayNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

function renderCalendar() {
  if (!calendarContainerEl) return;

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);

  calendarContainerEl.innerHTML = `
    <div class="calendar-header">
      <button class="btn btn-sm" id="prev-month">←</button>
      <h6 class="mb-0">${monthNames[month]} ${year}</h6>
      <button class="btn btn-sm" id="next-month">→</button>
    </div>
    <div class="calendar-weekdays">
      ${dayNames.map((day) => `<div class="weekday">${day}</div>`).join("")}
    </div>
    <div class="calendar-days" id="calendar-days"></div>
  `;

  const calendarDaysEl = document.getElementById("calendar-days");

  // Пустые ячейки в начале месяца (с понедельника)
  const adjustedFirstDay = (firstDay + 6) % 7;
  for (let i = 0; i < adjustedFirstDay; i++) {
    const emptyDay = document.createElement("div");
    emptyDay.className = "calendar-day empty";
    calendarDaysEl.appendChild(emptyDay);
  }

  const historyData = timerHistoryStore.getHistoryWithTotals();
  const datesWithData = new Set(historyData.map((item) => item.date));

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = getDateString(year, month, day);
    const dayEl = document.createElement("button");
    dayEl.className = "calendar-day";
    dayEl.type = "button";
    dayEl.textContent = day;
    dayEl.dataset.date = dateStr;

    if (dateStr === todayDateString) {
      dayEl.classList.add("today");
    }

    if (datesWithData.has(dateStr)) {
      dayEl.classList.add("has-data");
    }

    if (dateStr === selectedDate) {
      dayEl.classList.add("selected");
    }

    dayEl.addEventListener("click", () => {
      selectDate(dateStr);
    });

    calendarDaysEl.appendChild(dayEl);
  }

  document.getElementById("prev-month").addEventListener("click", () => {
    currentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
    );
    renderCalendar();
  });

  document.getElementById("next-month").addEventListener("click", () => {
    currentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
    );
    renderCalendar();
  });
}

function selectDate(dateStr) {
  if (selectedDate === dateStr) {
    return;
  }

  selectedDate = dateStr;
  renderCalendar();
  renderDayDetails(dateStr);
}

function renderDayDetails(dateStr) {
  if (!dayDetailsEl) return;

  const sessionData = timerHistoryStore.getSessionsForDay(dateStr);

  if (!sessionData || Object.keys(sessionData).length === 0) {
    dayDetailsEl.innerHTML = `<div class="day-details-header no-data">
        <span>${formatDate(dateStr)}</span>
        Нет данных
      </div>`;
    return;
  }

  let totalDayTime = 0;
  const topicsArray = Object.entries(sessionData).map(([topic, times]) => {
    const topicTime = times.reduce((sum, time) => sum + time, 0);
    totalDayTime += topicTime;
    return { topic, topicTime };
  });

  const topicsListHtml = topicsArray
    .map(({ topic, topicTime }) => {
      return `
        <div class="topic-item">
          <span class="topic-name">${topic}</span>
          <span class="topic-total">${formatTime(topicTime)}</span>
        </div>
      `;
    })
    .join("");

  const detailsId = `${dateStr}-details`;
  const isExpanded = expandedTopics.has(detailsId);

  dayDetailsEl.innerHTML = `
    <button class="expand-button day-details-header" data-details-id="${detailsId}">
      <span class="day-details-date">
        <span class="toggle-icon">${isExpanded ? "▼" : "▶"}</span>
        <span>${formatDate(dateStr)}</span>
      </span>
      <span class="day-total">${formatTime(totalDayTime)}</span>
    </button>
    ${
      isExpanded
        ? `
      <div class="day-details-body">
        ${topicsListHtml}
      </div>
    `
        : ""
    }
  `;

  dayDetailsEl.querySelector(".expand-button").addEventListener("click", () => {
    if (expandedTopics.has(detailsId)) {
      expandedTopics.delete(detailsId);
    } else {
      expandedTopics.add(detailsId);
    }

    renderDayDetails(dateStr);
  });
}

export function updateHistoryDisplay() {
  currentDate = new Date();
  selectedDate = todayDateString;
  renderCalendar();

  if (dayDetailsEl) {
    renderDayDetails(todayDateString);
  }
}

if (calendarModalEl) {
  calendarModalEl.addEventListener("show.bs.modal", updateHistoryDisplay);
}
