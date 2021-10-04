document.addEventListener("DOMContentLoaded", function () {
  const btnAddToDo = document.getElementById("add-todo");
  btnAddToDo.addEventListener("click", handleClick);

  const input = document.getElementById("todo-note");
  input.addEventListener("keydown", handleKeyDown);

  // updateUI();
});

// Model
const todos = [
  // { id: "676c9ba771", text: "ToDo 1" },
  // { id: "dc19d1538f", text: "ToDo 2" },
  // { id: "fd8c75b4fb", text: "ToDo 2" },
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
  item.classList.add("todo-item");

  const btnDelete = document.createElement("button");
  btnDelete.textContent = "x";
  btnDelete.addEventListener("click", () => {
    removeToDo(todo.id);
    updateUI();
  });
  const span = document.createElement("span");
  span.textContent = todo.text;

  item.appendChild(btnDelete);
  item.appendChild(span);
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
  const id = CryptoJS.SHA256(text + new Date())
    .toString()
    .substring(0, 10);
  const todo = {
    id: id,
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
