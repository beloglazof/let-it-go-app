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
import './src/campfire.scss'

const catEl = document.getElementById('cat');
const catContainerEl = document.getElementById('cat-container');
const soundCheckbox = document.getElementById('sound-checkbox');
const campfireCheckbox = document.getElementById('campfire-checkbox');
const campfire = document.getElementById('campfire');

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

  const withSound = soundCheckbox.checked;

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

campfireCheckbox.addEventListener('change', (event) => {
  if (event.target.checked) {
    campfire.classList.remove('d-none')
  } else {
    campfire.classList.add('d-none')
  }
})