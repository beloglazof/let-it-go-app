import { registerSW } from 'virtual:pwa-register';

import { AnimationState } from './src/constants';
import { animate } from './src/animation/animate';
import {
  animationStateStore,
  animationSpeedStore,
} from './src/animation/animation-store';
import { incCounter } from './src/counter/counter-controller';

import 'bootstrap/js/dist/offcanvas';
import './src/topic-card/topic-card-controller';
import './src/music/music-controller';
import './src/animation/animation-speed-controller';
import './styles.scss';

registerSW({ immediate: true });

const catEl = document.getElementById('cat');
const catContainerEl = document.getElementById('cat-container');
const soundStatus = document.getElementById('sound-status');
const preferColorScheme = window.matchMedia('(prefers-color-scheme: dark)');

function setColorTheme() {
  document.documentElement.dataset.bsTheme = preferColorScheme.matches
    ? 'dark'
    : 'light';
}

setColorTheme();

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
preferColorScheme.addEventListener('change', () => {
  setColorTheme();
});
