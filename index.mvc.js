document.addEventListener("DOMContentLoaded", function () {
  const btnAddToDo = document.getElementById("add");
  btnAddToDo.addEventListener("click", handleClick);

  const input = document.getElementById("text");
  input.addEventListener("keydown", handleKeyDown);

  // updateUI();
});

// Model
const todos = [
  // { id: "676c9ba771", text: "ToDo 1" },
  // { id: "dc19d1538f", text: "ToDo 2" },
  // { id: "fd8c75b4fb", text: "ToDo 2" },
];

const colors = ["#fff740", "#feff9c", "#7afcff", "#ff65a3", "#ff7eb9"];

// View
function updateUI() {
  updateToDoList();
}

function updateToDoList() {
  const list = document.getElementById("todo-list");

  // Clear list
  while (list.firstChild) {
    list.firstChild.remove();
  }

  // Build list
  // https://www.freecodecamp.org/news/functional-programming-in-javascript/
  todos.map((todo) => buildListItem(todo)).forEach((item) => list.appendChild(item));
}

function buildListItem(todo) {
  const item = document.createElement("li");
  item.classList.add("todo-item");

  const btnDelete = document.createElement("button");
  btnDelete.textContent = "x";
  btnDelete.addEventListener("click", () => {
    removeToDo(todo.id);
    updateUI();
  });
  const divTitle = document.createElement("div");
  const spanTitle = document.createElement("span");
  spanTitle.textContent = todo.title;
  divTitle.appendChild(spanTitle);

  const divText = document.createElement("div");
  const spanText = document.createElement("span");
  spanText.textContent = todo.text;
  divText.appendChild(spanText);

  item.appendChild(btnDelete);
  item.appendChild(divTitle);
  item.appendChild(divText);

  return item;
}

function getInput() {
  const inputTitle = document.getElementById("todo-note-title");
  const inputText = document.getElementById("todo-note");
  return [inputTitle.value, inputText.value];
}

function clearInput() {
  const inputTitle = document.getElementById("todo-note-title");
  const inputText = document.getElementById("todo-note");
  inputTitle.value = inputText.value = "";
}

function handleClick(event) {
  const [title, text] = getInput();
  if (text !== "") {
    addToDo(title, text);
    clearInput();
    updateUI();
  }
}

function handleKeyDown(event) {
  if (event.key === "Enter") {
    const [title, text] = getInput();
    if (text !== "") {
      addToDo(title, text);
      clearInput();
      updateUI();
    }
  }
}

// Controller
function addToDo(title, text) {
  const id = CryptoJS.SHA256(title + text + new Date())
    .toString()
    .substring(0, 10);
  const todo = {
    id: id,
    title: title,
    text: text,
  };
  todos.push(todo);
}

function removeToDo(id) {
  const index = todos.findIndex((element) => element.id === id);
  if (index !== -1) {
    todos.splice(index, 1);
  }
}
