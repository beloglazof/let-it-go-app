const TOPICS_KEY = "letitgo_topics";
let topics = JSON.parse(localStorage.getItem(TOPICS_KEY)) || [];
let currentTopicIndex = 0;

const topicsModal = document.getElementById("topics-modal");
const newTopicForm = document.getElementById("new-topic-form");
const newTopicInput = document.getElementById("new-topic-input");
const topicsList = document.getElementById("topics-list");
const clearTopicsButton = document.getElementById("clear-topics-button");
const topicCardBody = document.getElementById("topic-card-body");
const topicCardEl = document.getElementById("topic-card");
const prevTopicButton = document.getElementById("prev-topic");
const nextTopicButton = document.getElementById("next-topic");
const topicsCounter = document.getElementById("topics-counter");

function autoResizeTopicCardFont(
  element = topicCardEl,
  minFontSize = 0.5,
  maxFontSize = 1.6
) {
  let fontSize = maxFontSize;
  element.style.fontSize = fontSize + "rem";

  while (
    (element.scrollWidth > element.clientWidth ||
      element.scrollHeight > element.clientHeight) &&
    fontSize > minFontSize
  ) {
    fontSize -= 0.1;
    element.style.fontSize = fontSize + "rem";
  }
}

function renderTopicsList() {
  topicsList.innerHTML = topics
    .map(
      (t, i) =>
        `<li class="list-group-item topic-item">
          <small class="text-body-secondary">#${i + 1}</small>${t}
          <button class="btn btn-sm btn-outline-danger delete-topic-button" data-idx="${i}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
            </svg>
          </button>
        </li>`
    )
    .join("");
}

function renderTopics() {
  if (topics.length === 0) {
    topicCardBody.innerHTML = `<span id="topic-card-placeholder">Что будем отпускать?</span>`;
    nextTopicButton.style.display = "";
    prevTopicButton.style.display = "";
    topicsCounter.textContent = "";

    return;
  }

  if (topics.length > 1) {
    nextTopicButton.style.display = "block";
    prevTopicButton.style.display = "block";
    topicsCounter.textContent = `${currentTopicIndex + 1}/${topics.length}`;
  }

  topicCardBody.innerHTML = `
    <div id="topic-text" class="flex-grow-1 text-center px-2">
      ${topics[currentTopicIndex]}
    </div>
  `;

  autoResizeTopicCardFont();
}

prevTopicButton.onclick = () => {
  currentTopicIndex = (currentTopicIndex - 1 + topics.length) % topics.length;
  document.getElementById("topic-text").textContent = topics[currentTopicIndex];
  topicsCounter.textContent = `${currentTopicIndex + 1}/${topics.length}`;
  autoResizeTopicCardFont();
};

nextTopicButton.onclick = () => {
  currentTopicIndex = (currentTopicIndex + 1) % topics.length;
  document.getElementById("topic-text").textContent = topics[currentTopicIndex];
  topicsCounter.textContent = `${currentTopicIndex + 1}/${topics.length}`;
  autoResizeTopicCardFont();
};

newTopicForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = newTopicInput.value.trim();

  if (value) {
    topics.push(value);
    localStorage.setItem(TOPICS_KEY, JSON.stringify(topics));
    newTopicInput.value = "";
    renderTopicsList();
  }
});

newTopicInput.addEventListener("paste", (event) => {
  event.preventDefault();
  const pastedText = (event.clipboardData || window.clipboardData).getData(
    "text"
  );
  const lines = pastedText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length > 1) {
    topics.push(...lines);
    localStorage.setItem(TOPICS_KEY, JSON.stringify(topics));
    renderTopicsList();
    newTopicInput.value = "";
    newTopicInput.blur();
  } else {
    newTopicInput.value = pastedText;
  }
});

// handle delete topic
topicsList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-topic-button")) {
    currentTopicIndex = 0;
    const idx = Number(e.target.dataset.idx);
    topics.splice(idx, 1);
    localStorage.setItem(TOPICS_KEY, JSON.stringify(topics));
    renderTopicsList();
  }
});

clearTopicsButton.addEventListener("click", () => {
  topics = [];
  currentTopicIndex = 0;
  localStorage.setItem(TOPICS_KEY, JSON.stringify(topics));
  renderTopicsList();
});

topicsModal.addEventListener("shown.bs.modal", () => {
  renderTopicsList();
});

topicsModal.addEventListener("hidden.bs.modal", () => {
  renderTopics();
});

document.addEventListener("DOMContentLoaded", () => {
  if (topics.length > 0) renderTopics();
});
