const contentEl = document.getElementById('content');
const videoEl = document.getElementById('video');
const tipEl = document.getElementById('tip');

let firstPlay = true;

function playVideo() {
  if (!videoEl) {
    return;
  }

  if (firstPlay) {
    firstPlay = false;

    tipEl.classList.add('hidden');
  }

  videoEl.play();
}

function handleSpaceKeyDown(event) {
  if (event.code !== 'Space') {
    return;
  }

  playVideo();
}

contentEl.addEventListener('click', playVideo);
document.addEventListener('keydown', handleSpaceKeyDown);
