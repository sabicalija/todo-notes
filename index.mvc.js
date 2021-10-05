document.addEventListener("DOMContentLoaded", function () {
  const save = document.getElementById("save");
  save.addEventListener("click", handleClickInputSave);
  initList();
});

// Model
const todos = [
  // { id: "676c9ba771", title: "Title 1", text: "ToDo 1", color: "#fff740" },
  // { id: "dc19d1538f", title: "Title 2", text: "ToDo 2", color: "#fff740" },
  // { id: "fd8c75b4fb", title: "Title 2", text: "ToDo 2", color: "#fff740" },
];

const colors = ["#fff740", "#feff9c", "#7afcff", "#ff65a3", "#ff7eb9"];

// View
function initUI() {
  initList();
}

function addListItem(id, title, text, color) {
  const todo = { id, title, text, color };
  const list = document.getElementById("list");
  const item = buildListItem(todo);
  list.appendChild(item);
}

function removeListItem(id) {
  const list = document.getElementById("list");
  const item = document.getElementById(id);
  list.removeChild(item);
}

function initList() {
  const list = document.getElementById("list");

  // Clear list
  while (list.firstChild) {
    list.firstChild.remove();
  }

  // Build list
  todos.map((todo) => buildListItem(todo)).forEach((item) => list.appendChild(item));
}

function buildListItem(todo) {
  const item = document.createElement("li");
  item.classList.add("todo__list__item", "controlable", "material", "slide-in");
  item.id = todo.id;

  const title = document.createElement("div");
  title.classList.add("todo__list__item__title");
  title.textContent = todo.title;

  const text = document.createElement("div");
  text.classList.add("todo__list__item__text");
  text.textContent = todo.text;

  const control = document.createElement("div");
  control.classList.add("todo__list__item__control");

  const buttonDelete = document.createElement("button");
  buttonDelete.title = "Delete note";
  buttonDelete.classList.add("todo__list__item__control--delete", "btn", "btn-size-1");

  const buttonDeleteIcon = document.createElement("i");
  buttonDeleteIcon.classList.add("fas", "fa-trash");
  buttonDelete.appendChild(buttonDeleteIcon);
  buttonDelete.addEventListener("click", handleClickItemDelete(todo.id));

  const buttonEdit = document.createElement("button");
  buttonEdit.title = "Edit note";
  buttonEdit.classList.add("todo__list__item__control--edit", "btn", "btn-size-1");

  const buttonEditIcon = document.createElement("i");
  buttonEditIcon.classList.add("fas", "fa-pen");
  buttonEdit.appendChild(buttonEditIcon);

  const buttonColor = document.createElement("button");
  buttonColor.title = "Change color";
  buttonColor.classList.add("todo__list__item__control--color", "btn", "btn-size-1");

  const buttonColorIcon = document.createElement("i");
  buttonColorIcon.classList.add("fas", "fa-palette");
  buttonColor.appendChild(buttonColorIcon);

  control.appendChild(buttonDelete);
  control.appendChild(buttonEdit);
  control.appendChild(buttonColor);

  item.appendChild(title);
  item.appendChild(text);
  item.appendChild(control);

  return item;
}

function getInput() {
  const title = document.getElementById("title");
  const text = document.getElementById("text");
  const color = { value: "#fff740" }; // document.getElementById("color");
  return [title.value, text.value, color.value];
}

function clearInput() {
  const title = document.getElementById("title");
  const text = document.getElementById("text");
  title.value = text.value = "";
}

function handleClickInputSave(event) {
  const [title, text, color] = getInput();

  if (text !== "") {
    const id = generateId();
    addToDo(id, title, text, color);
    addListItem(id, title, text, color);
    clearInput();
  }
}

function handleClickItemDelete(id) {
  return () => {
    removeToDo(id);
    removeListItem(id);
  };
}

function generateId(title, text, color) {
  return CryptoJS.SHA256(title + text + color + new Date())
    .toString()
    .substring(0, 10);
}

// Controller
function addToDo(id, title, text, color) {
  const todo = {
    id: id,
    title: title,
    text: text,
    color: color,
  };
  todos.push(todo);
}

function removeToDo(id) {
  const index = todos.findIndex((element) => element.id === id);
  if (index !== -1) {
    todos.splice(index, 1);
  }
}
