import { timerHistoryStore } from "./timer-history-store.js";
import { updateHistoryDisplay } from "./timer-history-controller.js";

const TimerState = {
  Idle: "idle",
  Run: "run",
  Pause: "pause",
};
const PAUSE_DELAY_MS = 3000;

let intervalId;
let pauseTimeoutId;
let elapsedTime = 0;
let state = TimerState.Idle;
let currentTopic = null;

function resetTimer() {
  elapsedTime = 0;
  state = TimerState.Idle;
  clearInterval(intervalId);
  clearTimeout(pauseTimeoutId);
  intervalId = null;
  pauseTimeoutId = null;

  updateTimerDisplay();
}

function getFormattedTime() {
  const totalSeconds = Math.floor(elapsedTime / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

const timerEl = document.getElementById("timer");

function updateTimerDisplay() {
  if (!timerEl) return;

  timerEl.innerText = getFormattedTime();
}

function shedulePause() {
  if (pauseTimeoutId) {
    clearTimeout(pauseTimeoutId);
  }

  pauseTimeoutId = setTimeout(() => {
    if (elapsedTime > 0) {
      timerHistoryStore.updateLastSessionToday(elapsedTime, currentTopic);

      updateHistoryDisplay();
    }

    state = TimerState.Pause;
    clearInterval(intervalId);
    clearTimeout(pauseTimeoutId);
    pauseTimeoutId = null;
    intervalId = null;
  }, PAUSE_DELAY_MS);
}

export function pingTimer() {
  shedulePause();

  if (state === TimerState.Run) {
    return;
  }

  if (state === TimerState.Idle) {
    timerHistoryStore.addSessionToday(elapsedTime, currentTopic);
  }

  updateTimerDisplay();
  state = TimerState.Run;

  const startTime = Date.now() - elapsedTime;

  intervalId = setInterval(() => {
    if (state === TimerState.Run) {
      elapsedTime = Date.now() - startTime;
      updateTimerDisplay();
    } else {
      clearInterval(intervalId);
      intervalId = null;
    }
  }, 1000);
}

export function setCurrentTopic(topic) {
  currentTopic = topic;
}

export function saveSession() {
  if (elapsedTime > 0 && state !== TimerState.Idle) {
    timerHistoryStore.updateLastSessionToday(elapsedTime, currentTopic);
    updateHistoryDisplay();
  }
}

export function startNewSession(newTopic) {
  resetTimer();
  currentTopic = newTopic;
}
