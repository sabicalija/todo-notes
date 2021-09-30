// https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement
const btnAddToDo = window.document.getElementById("add-todo");
btnAddToDo.addEventListener("click", handleClick);

const input = document.getElementById("todo-note");
input.addEventListener("keydown", handleKeyDown);

function handleClick(event) {
  addToDo();
}

function handleKeyDown(event) {
  // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
  if (event.key === "Enter") {
    addToDo();
  }
}

function addToDo() {
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLUListElement
  const list = document.getElementById("todo-list");
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement
  const input = document.getElementById("todo-note");
  const text = input.value;

  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLLIElement
  const item = document.createElement("li");
  item.textContent = text;
  item.addEventListener("click", removeToDo);
  input.value = "";
  input.focus();

  list.appendChild(item);
}

function removeToDo(event) {
  const list = document.getElementById("todo-list");
  list.removeChild(event.target);
}
