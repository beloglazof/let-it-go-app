import { animationStateStore } from "./animation-store";
import { animationSpeedStore } from "../settings/animation-speed-store";
import { FRAMES } from "../constants";
import { WebHaptics, defaultPatterns } from "web-haptics";

const extension = {
  png: "png",
  svg: "svg",
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getPublicPathTo(filePath) {
  const envBaseUrl = import.meta.env.BASE_URL;
  const baseUrl = envBaseUrl.endsWith("/") ? envBaseUrl : `${envBaseUrl}/`;

  const url = `${baseUrl}${filePath}`;

  return url;
}

const sound = new Audio(getPublicPathTo(`stone-fall.MP3`));
const haptics = new WebHaptics();

export async function animate(catEl, options) {
  animationStateStore.playstart();

  const { withSound, withHapticFeedback } = options || {};

  const animationSpeed = animationSpeedStore.speed;
  const animationDurationInMs = FRAMES.length * animationSpeed;

  if (withSound) {
    sound.pause();
    sound.currentTime = 0;

    const soundDurationInMs = sound.duration * 1000;
    const soundStartDelay = animationDurationInMs - soundDurationInMs;

    const timeoutId = setTimeout(() => {
      sound.play();
      clearTimeout(timeoutId);
    }, soundStartDelay);
  }

  if (withHapticFeedback) {
    const hapticFeedbackDurationInMs = 100;
    const hapticFeedbackDelay =
      animationDurationInMs - hapticFeedbackDurationInMs;

    const timeoutId = setTimeout(() => {
      haptics.trigger(defaultPatterns.success);
      clearTimeout(timeoutId);
    }, hapticFeedbackDelay);
  }

  for (let i = 0; i < FRAMES.length; i++) {
    requestAnimationFrame(() => {
      catEl.src = getPublicPathTo(`cat-frames/${FRAMES[i]}.${extension.svg}`);
    });

    await sleep(animationSpeed);
  }

  animationStateStore.playend();
}
