import { AnimationState } from "./src/constants";
import { animate } from "./src/animation/animate";
import { animationStateStore } from "./src/animation/animation-store";
import { incCounter } from "./src/counter/counter-controller";

import "bootstrap/js/dist/offcanvas";
import "bootstrap/js/dist/modal";
import "./src/topics/topics-controller";
import "./src/music/music-controller";
import "./src/animation/animation-speed-controller";
import "./src/campfire/campfire-controller";

import "./styles.scss";
import "./src/campfire/campfire.scss";

const catEl = document.getElementById("cat");
const catContainerEl = document.getElementById("cat-container");
const soundCheckbox = document.getElementById("sound-checkbox");
const hapticFeedbackCheckbox = document.getElementById(
  "haptic-feedback-checkbox",
);

const preferColorScheme = window.matchMedia("(prefers-color-scheme: dark)");

function setColorTheme() {
  document.documentElement.dataset.bsTheme = preferColorScheme.matches
    ? "dark"
    : "light";
}

setColorTheme();

function letGo() {
  if (!catEl || animationStateStore.state === AnimationState.Play) {
    return;
  }

  const withSound = soundCheckbox.checked;
  const withHapticFeedback = hapticFeedbackCheckbox.checked;

  animate(catEl, { withSound, withHapticFeedback });
  incCounter();
}

catContainerEl.addEventListener("click", letGo);

document.addEventListener("keydown", (event) => {
  if (event.key === " ") {
    letGo();
  }
});

preferColorScheme.addEventListener("change", () => {
  setColorTheme();
});
