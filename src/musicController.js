const musicEl = document.getElementById('music');
const musicButtonEl = document.getElementById('music-button');

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

musicButtonEl.addEventListener('click', handleMusicToggle);
