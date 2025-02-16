import { animationStateStore } from './animation-store';
import { frames } from '../constants';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function animate(catEl, animationSpeed) {
  animationStateStore.playstart();

  for await (const frame of frames) {
    requestAnimationFrame(() => {
      catEl.src = `/cat-frames/${frame}`;
    });

    await sleep(animationSpeed);
  }

  animationStateStore.playend();
}
