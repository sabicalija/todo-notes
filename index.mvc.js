document.addEventListener("DOMContentLoaded", function () {
  const btnAddToDo = document.getElementById("add-todo");
  btnAddToDo.addEventListener("click", handleClick);

  const input = document.getElementById("todo-note");
  input.addEventListener("keydown", handleKeyDown);

  updateUI();
});

// Model
const todos = [
  // { id: 12345678, text: "ToDo 1" },
  // { id: 54256198, text: "ToDo 2" },
];

// View
function clearInput() {
  const input = document.getElementById("todo-note");
  input.value = "";
}

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
  item.textContent = todo;
  item.addEventListener("click", () => {
    removeToDo(todo);
    updateUI();
  });
  return item;
}

function getInput() {
  const input = document.getElementById("todo-note");
  return input.value;
}

function handleClick(event) {
  const text = getInput();
  addToDo(text);
  clearInput();
  updateUI();
}

function handleKeyDown(event) {
  if (event.key === "Enter") {
    const text = getInput();
    addToDo(text);
    clearInput();
    updateUI();
  }
}

// Controller
function addToDo(text) {
  todos.push(text);
}

function removeToDo(text) {
  const index = todos.indexOf(text);
  if (index !== -1) {
    todos.splice(index, 1);
  }
}
