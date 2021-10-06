document.addEventListener("DOMContentLoaded", function () {
  const save = document.getElementById("save");
  save.addEventListener("click", handleClickInputSave);
  init();
});

// Model
let notes = [
  // { id: "676c9ba771", title: "Title 1", text: "ToDo 1", color: "#fff740" },
  // { id: "dc19d1538f", title: "Title 2", text: "ToDo 2", color: "#fff740" },
  // { id: "fd8c75b4fb", title: "Title 2", text: "ToDo 2", color: "#fff740" },
];

let colors = [
  { background: "#fff740", shadow: "1px 1px 4px 1px #bfb700" },
  { background: "#feff9c", shadow: "1px 1px 4px 1px #a3a400" },
  { background: "#7afcff", shadow: "1px 1px 4px 1px #009397" },
  { background: "#ff65a3", shadow: "1px 1px 4px 1px #8e0039" },
  { background: "#ff7eb9", shadow: "1px 1px 4px 1px #980046" },
];

// View
function initUI() {
  initInput();
  initList();
}

function addListItem(id, title, text, color) {
  const todo = { id, title, text, color };
  const list = document.getElementById("list");
  const item = buildListItem(todo, ["slide-in"]);
  list.appendChild(item);
}

function removeListItem(id) {
  const list = document.getElementById("list");
  const item = document.getElementById(id);
  list.removeChild(item);
}

function initInput() {
  const button = document.getElementById("color");
  const note = document.getElementById("title").parentNode;
  wrapButtonColorSelect(button, note, "todo__input__control--color--select");
}

function wrapButtonColorSelect(listener, target, className) {
  const div = document.createElement("div");
  div.classList.add(className, "hidden");

  for (const color of colors) {
    const button = document.createElement("button");
    button.classList.add(className + "--button");
    button.style.background = color.background;
    button.addEventListener("click", (event) => {
      target.style.background = color.background;
      target.style.boxShadow = color.shadow;
    });
    div.appendChild(button);
  }

  listener.appendChild(div);
  listener.addEventListener("click", (event) => {
    div.classList.toggle("hidden");
  });

  window.addEventListener("click", (event) => {
    if (listener.contains(event.target) || listener === event.target) return;
    if (!div.classList.contains("hidden")) {
      div.classList.add("hidden");
    }
  });
}

function initList() {
  const list = document.getElementById("list");

  // Clear list
  while (list.firstChild) {
    list.firstChild.remove();
  }

  // Build list
  notes.map((todo) => buildListItem(todo)).forEach((item) => list.appendChild(item));
}

function buildListItem(todo, classNames = []) {
  const item = document.createElement("li");
  item.classList.add("todo__list__item", "controlable", "material", ...classNames);
  item.id = todo.id;
  item.style.background = todo.color.background;
  item.style.boxShadow = todo.color.shadow;

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
  wrapButtonColorSelect(buttonColor, item, "todo__list__item__control--color--select");

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
  const color = {
    background: title.parentNode.style.background,
    shadow: title.parentNode.style.boxShadow,
  };
  return [title.value, text.value, color];
}

function clearInput() {
  const title = document.getElementById("title");
  const text = document.getElementById("text");
  title.value = text.value = "";
}

function handleClickInputSave(event) {
  const [title, text, color] = getInput();

  if (title !== "" && text !== "") {
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
function init() {
  registerServiceWorker("/todo-notes");
  load();
  initUI();
}

function load() {
  notes = JSON.parse(localStorage.getItem("notes")) || [];
  // colors = JSON.parse(localStorage.getItem("colors")) || [
  //   { background: "#fff740", shadow: "1px 1px 4px 1px #bfb700" },
  //   { background: "#feff9c", shadow: "1px 1px 4px 1px #a3a400" },
  //   { background: "#7afcff", shadow: "1px 1px 4px 1px #009397" },
  //   { background: "#ff65a3", shadow: "1px 1px 4px 1px #8e0039" },
  //   { background: "#ff7eb9", shadow: "1px 1px 4px 1px #980046" },
  // ];
}

function save() {
  localStorage.setItem("notes", JSON.stringify(notes));
  // localStorage.setItem("colors", JSON.stringify(colors));
}

function addToDo(id, title, text, color) {
  const todo = {
    id: id,
    title: title,
    text: text,
    color: color,
  };
  notes.push(todo);
  save();
}

function removeToDo(id) {
  const index = notes.findIndex((element) => element.id === id);
  if (index !== -1) {
    notes.splice(index, 1);
  }
  save();
}

// Extras
function registerServiceWorker(base) {
  window.addEventListener("load", () => {
    if ("serviceWorker" in navigator) {
      let refreshing;
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (refreshing) return;
        window.location.reload();
        refreshing = true;
      });
      navigator.serviceWorker
        .register(base + "/sw.js", { scope: base + "/" })
        .then((reg) => handleRegistration(reg))
        .catch((err) => console.log("Service Worker Registration failed!", err));
    }
  });
}

function handleRegistration(reg) {
  reg.addEventListener("updatefound", () => {
    if (reg.installing) {
      const worker = reg.installing;
      worker.addEventListener("statechange", () => {
        switch (worker.state) {
          case "installed":
            handleUpdate(worker);
            break;
        }
      });
    } else if (reg.waiting) {
      const worker = reg.waiting;
      if (worker.state === "installed") {
        handleUpdate(worker);
      }
    }
  });
}

function handleUpdate(worker) {
  const serviceWorkerUpdateModal = document.getElementById("service-worker-modal");
  const serviceWorkerUpdateControl = document.getElementById("service-worker");
  if (navigator.serviceWorker.controller) {
    serviceWorkerUpdateControl.addEventListener("click", () => {
      worker.postMessage({ action: "skipWaiting" });
      serviceWorkerUpdateModal.classList.toggle("hidden");
    });
    serviceWorkerUpdateModal.classList.toggle("hidden");
  }
}
