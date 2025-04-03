import { animationStateStore } from './animation-store';
import { frames } from '../constants';

function getPublicPathTo(filePath) {
  const envBaseUrl = import.meta.env.BASE_URL;
  const baseUrl = envBaseUrl.endsWith('/') ? envBaseUrl : `${envBaseUrl}/`;

  const url = `${baseUrl}${filePath}`;

  return url;
}

const sound = new Audio(getPublicPathTo(`stone-fall.MP3`));

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function animate(catEl, animationSpeed, withSound) {
  animationStateStore.playstart();

  const animationDurationInSec = frames.length * animationSpeed;
  const soundDurationInSec = sound.duration * 1000;

  for (let i = 0; i < frames.length; i++) {
    requestAnimationFrame(() => {
      catEl.src = getPublicPathTo(`cat-frames/${frames[i]}`);
    });

    await sleep(animationSpeed);

    const shouldPlaySound =
      animationDurationInSec - animationSpeed * i < soundDurationInSec &&
      sound.paused &&
      withSound;

    if (shouldPlaySound) {
      sound.play();
    }
  }

  animationStateStore.playend();

  if (sound) {
    sound.pause();
    sound.fastSeek(0);
  }
}
