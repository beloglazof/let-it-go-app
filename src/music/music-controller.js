const musicEl = document.getElementById('music');
const musicButtonEl = document.getElementById('music-button');

const playMusic = () => {
  if (!musicEl) {
    return;
  }

  musicEl.play();
  musicButtonEl.innerText = '🙅';
  musicButtonEl.classList.add('playing');
};

const pauseMusic = () => {
  if (!musicEl) {
    return;
  }

  musicEl.pause();
  musicButtonEl.innerText = '🕺';
  musicButtonEl.classList.remove('playing');
};

function handleMusicToggle(event) {
  event.stopPropagation();
  event.preventDefault();

  musicEl.paused ? playMusic() : pauseMusic();
}

musicButtonEl.addEventListener('click', handleMusicToggle);
