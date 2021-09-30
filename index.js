// https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement
const btnAddToDo = document.getElementById("add-todo");
btnAddToDo.addEventListener("click", handleClick);

function handleClick(event) {
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLUListElement
  const list = window.document.getElementById("todo-list");
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement
  const input = document.getElementById("todo-note");
  const text = input.value;

  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLLIElement
  const item = document.createElement("li");
  item.textContent = text;

  list.appendChild(item);
}
