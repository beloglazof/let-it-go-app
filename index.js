import { fps, frames, AnimationState } from './constants';

const tipEl = document.getElementById('tip');
const catEl = document.getElementById('cat');
const musicEl = document.getElementById('music');
const musicButtonEl = document.getElementById('music-button');
const speed1ButtonEl = document.getElementById('speed-1-button');
const speed2ButtonEl = document.getElementById('speed-2-button');
const speed3ButtonEl = document.getElementById('speed-3-button');

let firstPlay = true;
let animationState = AnimationState.Idle;
let animationSpeed = 1000 / fps;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function letGo() {
  if (!catEl || animationState === AnimationState.Play) {
    return;
  }

  animationState = AnimationState.Play;

  if (firstPlay) {
    firstPlay = false;

    tipEl.classList.add('hidden');
  }

  const animate = async () => {
    for await (const frame of frames) {
      requestAnimationFrame(() => {
        catEl.src = `/cat-frames/${frame}`;
      });

      await sleep(animationSpeed);
    }

    animationState = AnimationState.Idle;
  };

  animate();
}

function handleSpaceKeyDown(event) {
  if (event.code !== 'Space') {
    return;
  }

  letGo();
}

const playMusic = () => {
  musicEl.play();
  musicButtonEl.innerText = '🙅';
};

const pauseMusic = () => {
  musicEl.pause();
  musicButtonEl.innerText = '🕺';
};

function handleMusicToggle(event) {
  event.stopPropagation();
  event.preventDefault();

  musicEl.paused ? playMusic() : pauseMusic();
}

function changeAnimationSpeed(multiplier) {
  animationSpeed = 1000 / (fps * multiplier);
}

document.addEventListener('click', letGo);
document.addEventListener('keydown', handleSpaceKeyDown);
musicButtonEl.addEventListener('click', handleMusicToggle);
speed1ButtonEl.addEventListener('click', (event) => {
  event.stopPropagation();
  event.preventDefault();
  changeAnimationSpeed(1);

  event.target.classList.add('active');
  speed2ButtonEl.classList.remove('active');
  speed3ButtonEl.classList.remove('active');
});
speed2ButtonEl.addEventListener('click', (event) => {
  event.stopPropagation();
  event.preventDefault();
  changeAnimationSpeed(1.5);

  event.target.classList.add('active');
  speed1ButtonEl.classList.remove('active');
  speed3ButtonEl.classList.remove('active');
});
speed3ButtonEl.addEventListener('click', (event) => {
  event.stopPropagation();
  event.preventDefault();
  changeAnimationSpeed(2);

  event.target.classList.add('active');
  speed2ButtonEl.classList.remove('active');
  speed1ButtonEl.classList.remove('active');
});
