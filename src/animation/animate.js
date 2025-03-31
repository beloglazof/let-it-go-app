import { animationStateStore } from './animation-store';
import { frames } from '../constants';

const sound = new Audio(`${import.meta.env.BASE_URL}/stone-fall.MP3`);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function animate(catEl, animationSpeed, withSound) {
  animationStateStore.playstart();

  const animationDurationInSec = frames.length * animationSpeed;
  const soundDurationInSec = sound.duration * 1000;

  for (let i = 0; i < frames.length; i++) {
    requestAnimationFrame(() => {
      catEl.src = `${import.meta.env.BASE_URL}/cat-frames/${frames[i]}`;
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
