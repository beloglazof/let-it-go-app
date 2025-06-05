import { animationStateStore } from './animation-store';
import { FRAMES } from '../constants';

const catContainerEl = document.getElementById('cat-container');
// prelaod images
FRAMES.forEach((frame, index) => {
  // skip first because it's already loaded
  if (index === 0) return;

  const img = new Image(512, 512);
  img.src = `/cat-frames/${frame}`;
  img.classList.add('d-none');
  catContainerEl.append(img);
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getPublicPathTo(filePath) {
  const envBaseUrl = import.meta.env.BASE_URL;
  const baseUrl = envBaseUrl.endsWith('/') ? envBaseUrl : `${envBaseUrl}/`;

  const url = `${baseUrl}${filePath}`;

  return url;
}

const sound = new Audio(getPublicPathTo(`stone-fall.MP3`));

export async function animate(catEl, animationSpeed, withSound) {
  animationStateStore.playstart();

  if (withSound) {
    sound.pause();
    sound.currentTime = 0;

    const animationDurationInMs = FRAMES.length * animationSpeed;
    const soundDurationInMs = sound.duration * 1000;
    const soundStartDelay = animationDurationInMs - soundDurationInMs;
    const timeoutId = setTimeout(() => {
      sound.play();
      clearTimeout(timeoutId);
    }, soundStartDelay);
  }

  for (let i = 0; i < FRAMES.length; i++) {
    requestAnimationFrame(() => {
      catEl.src = getPublicPathTo(`cat-frames/${FRAMES[i]}`);
    });

    await sleep(animationSpeed);
  }

  animationStateStore.playend();
}
