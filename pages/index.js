import { v4 as uuidv4 } from "https://cdn.skypack.dev/uuid";
import {
  initialTodos,
  validationConfig,
  todoTemplateSelector,
} from "../utils/constants.js";
import Todo from "../components/Todo.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: () => {},
});

addTodoPopup.setEventListeners();

const section = new Section({
  items: [],
  renderer: (item) => {
    const todo = generateTodo(item);
    todosList.append(todo);
  },
  containerSelector: ".todos__list",
});

section.renderItems();

const generateTodo = (data) => {
  const todo = new Todo(data, todoTemplateSelector);
  const todoElement = todo.getView();

  return todoElement;
};

function renderTodo(item) {
  const todo = generateTodo(item);
  todosList.append(todo);
}

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();

  const values = { name, date, id };
  section.addItem(values);
  addTodoPopup.close();
});

initialTodos.forEach((item) => {
  const todo = generateTodo(item);
  section.addItem(todo);
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
