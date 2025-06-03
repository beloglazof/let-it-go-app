const placeholderId = 'topic-card-placeholder';
const topicCardEl = document.getElementById('topic-card');
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
  topicCardEl.style.paddingRight = null;
}

topicCardBodyEl.addEventListener('click', () => {
  placeholderEl.remove();
});

topicCardBodyEl.addEventListener('blur', (event) => {
  if (!event.target.textContent.trim()) {
    handleEmptyCard();
  }
});

topicCardBodyEl.addEventListener('input', () => {
  clearButtonEl.classList.remove('d-none');
  topicCardEl.style.paddingRight = '28px';
});

clearButtonEl.addEventListener('click', () => {
  topicCardBodyEl.textContent = '';
  handleEmptyCard();
});

topicCardBodyEl.addEventListener('keydown', (event) => {
  if (event.key === ' ') {
    event.stopPropagation();
  }
});
