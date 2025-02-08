import { animationSpeedStore } from './animationStore';

const speed1ButtonEl = document.getElementById('speed-1-button');
const speed2ButtonEl = document.getElementById('speed-2-button');
const speed3ButtonEl = document.getElementById('speed-3-button');

speed1ButtonEl.addEventListener('click', (event) => {
  event.stopPropagation();
  event.preventDefault();
  animationSpeedStore.change(1);

  event.target.classList.add('active');
  speed2ButtonEl.classList.remove('active');
  speed3ButtonEl.classList.remove('active');
});
speed2ButtonEl.addEventListener('click', (event) => {
  event.stopPropagation();
  event.preventDefault();
  animationSpeedStore.change(1.5);

  event.target.classList.add('active');
  speed1ButtonEl.classList.remove('active');
  speed3ButtonEl.classList.remove('active');
});
speed3ButtonEl.addEventListener('click', (event) => {
  event.stopPropagation();
  event.preventDefault();
  animationSpeedStore.change(2);

  event.target.classList.add('active');
  speed2ButtonEl.classList.remove('active');
  speed1ButtonEl.classList.remove('active');
});
