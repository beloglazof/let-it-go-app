const placeholderId = 'topic-card-placeholder';
const topicCardBodyEl = document.getElementById('topic-card-body');
const clearButtonEl = document.getElementById('clear-button');

let placeholderEl = document.getElementById(placeholderId);

function createCardPlaceholder() {
  const el = document.createElement('span');

  el.textContent = 'Что будем отпускать?';
  el.id = placeholderId;
  placeholderEl = el;

  return el;
}

function handleEmptyCard() {
  topicCardBodyEl.insertAdjacentElement('afterbegin', createCardPlaceholder());
  clearButtonEl.classList.add('d-none');
}

topicCardBodyEl.addEventListener('click', (event) => {
  event.stopPropagation();
  event.preventDefault();

  placeholderEl.remove();
});

topicCardBodyEl.addEventListener('blur', (event) => {
  if (!event.target.textContent.trim()) {
    handleEmptyCard();
  }
});

topicCardBodyEl.addEventListener('input', () => {
  clearButtonEl.classList.remove('d-none');
});

clearButtonEl.addEventListener('click', (event) => {
  event.stopPropagation();
  event.preventDefault();

  topicCardBodyEl.textContent = '';
  handleEmptyCard();
});
