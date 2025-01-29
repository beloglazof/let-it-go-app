const tipEl = document.getElementById('tip');
const catEl = document.getElementById('cat');

let firstPlay = true;

function letGo() {
  if (!catEl) {
    return;
  }

  if (firstPlay) {
    firstPlay = false;

    tipEl.classList.add('hidden');
  }

  catEl.src = `./assets/let-go-cat-animated.png`;

  const timeoutId = setTimeout(() => {
    catEl.src = `./assets/frame_1.png`;
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
