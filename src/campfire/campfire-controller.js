const campfire = document.getElementById('campfire');
const campfireCheckbox = document.getElementById('campfire-checkbox');

function getFireCenter() {
  const r = campfire.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height * 0.55 };
}

function smallEmber() {
  const e = document.createElement('div');
  e.style.position = 'absolute';
  const c = getFireCenter();
  e.style.left = c.x - 6 + 'px';
  e.style.top = c.y - 18 + 'px';
  e.style.width = '12px';
  e.style.height = '12px';
  e.style.borderRadius = '50%';
  e.style.pointerEvents = 'none';
  e.style.background =
    'radial-gradient(circle, rgba(255,240,180,0.95) 0%, rgba(255,150,60,0.9) 40%, rgba(255,60,40,0.1) 70%)';
  e.style.filter = 'blur(6px)';
  document.body.appendChild(e);
  e.animate(
    [
      { transform: 'translateY(0) scale(1)', opacity: 1 },
      { transform: 'translateY(-36px) scale(0.3)', opacity: 0 },
    ],
    { duration: 500 + Math.random() * 300, easing: 'ease-out' },
  ).onfinish = () => e.remove();
}

document.addEventListener("animationEnd", () => {
  if (campfireCheckbox.checked) {
    smallEmber()
  }
}, false)

campfireCheckbox.addEventListener('change', (event) => {
  if (event.target.checked) {
    campfire.classList.remove('d-none');
  } else {
    campfire.classList.add('d-none');
  }
});