import { AnimationState } from './src/constants';
import { animate } from './src/animation/animate';
import {
  animationStateStore,
  animationSpeedStore,
} from './src/animation/animation-store';
import { incCounter } from './src/counter/counter-controller';

const catEl = document.getElementById('cat');
const catContainerEl = document.getElementById('cat-container');
const soundStatus = document.getElementById('sound-status');

if (window.Telegram) {
  document.documentElement.dataset.bsTheme = window.Telegram.WebApp.colorScheme;

  window.Telegram.WebApp.onEvent('themeChanged', function () {
    document.documentElement.dataset.bsTheme = this.colorScheme;
  });
}

function letGo() {
  if (!catEl || animationStateStore.state === AnimationState.Play) {
    return;
  }

  const withSound = soundStatus.checked;

  animate(catEl, animationSpeedStore.speed, withSound);
  incCounter();
}

catContainerEl.addEventListener('click', letGo);
document.addEventListener('keydown', (event) => {
  if (event.key === ' ') {
    letGo();
  }
});
