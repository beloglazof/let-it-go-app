import { animationStateStore } from './animation-store';
import { frames } from '../constants';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function animate(catEl, animationSpeed, sound) {
  animationStateStore.playstart();

  const animationDuration = frames.length * animationSpeed;
  let soundDuration, soundState;

  if (sound) {
    soundDuration = sound.duration * 1000;
    soundState = 'idle';
  }

  for (let i = 0; i < frames.length; i++) {
    requestAnimationFrame(() => {
      catEl.src = `/cat-frames/${frames[i]}`;
    });

    await sleep(animationSpeed);

    if (
      animationDuration - animationSpeed * i < soundDuration &&
      soundState === 'idle'
    ) {
      soundState = 'playing';
      sound.play();
    }
  }

  animationStateStore.playend();

  if (sound) {
    sound.pause();
    sound.currentTime = 0;
  }
}
