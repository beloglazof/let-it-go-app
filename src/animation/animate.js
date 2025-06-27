import { animationStateStore } from './animation-store';
import { FRAMES } from '../constants';

const extension = {
  png: 'png',
  svg: 'svg',
};

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
      catEl.src = getPublicPathTo(`cat-frames/${FRAMES[i]}.${extension.svg}`);
    });

    await sleep(animationSpeed);
  }

  animationStateStore.playend();
}
