const tipEl = document.getElementById('tip');
const catEl = document.getElementById('cat');

let firstPlay = true;
let timeoutId;

function letGo() {
  if (!catEl) {
    return;
  }

  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  if (firstPlay) {
    firstPlay = false;

    tipEl.classList.add('hidden');
  }

  catEl.src = `./assets/animated-cat.png`;

  timeoutId = setTimeout(() => {
    catEl.src = `./assets/static-cat.png`;
    clearTimeout(timeoutId);
  }, 1500);
}

function handleSpaceKeyDown(event) {
  if (event.code !== 'Space') {
    return;
  }

  letGo();
}

document.addEventListener('click', letGo);
document.addEventListener('keydown', handleSpaceKeyDown);
