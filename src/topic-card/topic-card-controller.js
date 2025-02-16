const placeholderId = 'topic-card-placeholder';
const topicCardBodyEl = document.getElementById('topic-card-body');

let placeholderEl = document.getElementById(placeholderId);

function createCardPlaceholder() {
  const el = document.createElement('span');

  el.textContent = 'Что сегодня отпускаем?';
  el.id = placeholderId;
  placeholderEl = el;

  return el;
}

topicCardBodyEl.addEventListener('click', (event) => {
  event.stopPropagation();
  event.preventDefault();

  placeholderEl.remove();
});

topicCardBodyEl.addEventListener('blur', (event) => {
  if (!event.target.textContent.trim()) {
    event.target.insertAdjacentElement('afterbegin', createCardPlaceholder());
  }
});
