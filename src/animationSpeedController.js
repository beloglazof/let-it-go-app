import { animationSpeedStore } from './animationStore';

const SPEED_STORAGE_KEY = 'animationSpeed';
const SpeedKey = {
  One: 'one',
  Two: 'two',
  Three: 'three',
};

const speed1ButtonEl = document.getElementById('speed-1-button');
const speed2ButtonEl = document.getElementById('speed-2-button');
const speed3ButtonEl = document.getElementById('speed-3-button');

function setSpeedOne() {
  animationSpeedStore.change(1);

  speed1ButtonEl.classList.add('active');
  speed2ButtonEl.classList.remove('active');
  speed3ButtonEl.classList.remove('active');
}

function setSpeedTwo() {
  animationSpeedStore.change(1.5);

  speed1ButtonEl.classList.remove('active');
  speed2ButtonEl.classList.add('active');
  speed3ButtonEl.classList.remove('active');
}

function setSpeedThree() {
  animationSpeedStore.change(2);

  speed1ButtonEl.classList.remove('active');
  speed2ButtonEl.classList.remove('active');
  speed3ButtonEl.classList.add('active');
}

const speedSetter = {
  [SpeedKey.One]: setSpeedOne,
  [SpeedKey.Two]: setSpeedTwo,
  [SpeedKey.Three]: setSpeedThree,
};

const handleChangeSpeedClick = (speedKey) => (event) => {
  event.stopPropagation();
  event.preventDefault();
  localStorage.setItem(SPEED_STORAGE_KEY, speedKey);
  speedSetter[speedKey]();
};

speed1ButtonEl.addEventListener('click', handleChangeSpeedClick(SpeedKey.One));
speed2ButtonEl.addEventListener('click', handleChangeSpeedClick(SpeedKey.Two));
speed3ButtonEl.addEventListener(
  'click',
  handleChangeSpeedClick(SpeedKey.Three),
);

const storedSpeed = localStorage.getItem(SPEED_STORAGE_KEY);

if (storedSpeed) {
  speedSetter[storedSpeed]();
} else {
  setSpeedOne();
}
