import { AnimationState } from './src/constants';
import { animate } from './src/animation/animate';
import {
  animationStateStore,
  animationSpeedStore,
} from './src/animation/animation-store';
import { incCounter } from './src/counter/counter-controller';

const catEl = document.getElementById('cat');
const stoneFallSound = document.getElementById('stone-fall-sound');
const soundStatusButton = document.getElementById('sound-status-button');

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

  const withSound = soundStatusButton.dataset.status === 'on';
  const sound = withSound ? stoneFallSound : null;

  animate(catEl, animationSpeedStore.speed, sound);
  incCounter();
}

document.addEventListener('click', letGo);
document.addEventListener('keydown', (event) => {
  if (event.key === ' ') {
    letGo();
  }
});

soundStatusButton.addEventListener(
  'click',
  function (event) {
    event.stopPropagation();
    event.preventDefault();

    if (this.dataset.status === 'on') {
      this.dataset.status = 'off';
      this.textContent = '🔈';
    } else if (this.dataset.status === 'off') {
      this.dataset.status = 'on';
      this.textContent = '🔇';
    }
    this.setAttribute('aria-checked', state ? 'false' : 'true');
  },
  false,
);
