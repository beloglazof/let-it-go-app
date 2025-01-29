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

  catEl.src = `./assets/animated-cat.png`;

  const timeoutId = setTimeout(() => {
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
