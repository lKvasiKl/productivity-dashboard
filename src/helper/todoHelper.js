import { createNode } from "./nodeCreateHelper";
import { addTask, renderTasks } from "../widgets/todo/todo";
import { getLocalizedText, setLocale } from "./languageHelper";
import { toastNotifications } from "./toastHelper";

const workingAreaContent = document.querySelector('.main');

const todoDropdownHandler = () => clickTodoDropdown();
const openTodoInputHandler = () => showInputDropdown();
const closeTodoInputHandler = (event) => closeInputDropdown(event);
const resetTodoInputHandler = () => clearTodoInput();
const limitHandler = (event) => checkTodoInputLimit(event);
const keydownHandler = async (event) => {
    if (event.key === 'Enter') {
        await addTask();
    }
}

async function todoMount() {
    const todoNode = createNode('todo-template');
    workingAreaContent.appendChild(todoNode);
    await setLocale();

    renderTasks();

    const isTodoDropdownOpen = localStorage.getItem('isTodoDropdownOpen');

    if (isTodoDropdownOpen === 'true') {
        const todoDropdown = document.querySelector('.todo__dropdown');

        todoDropdown.classList.toggle("show");
    }

    const todoDropdownButton = document.querySelector('.button_type_todo');
    const todoInputButton = document.querySelector('.todo__button');
    const todoResetButton = document.querySelector('.button_type_reset');
    const todoInput = document.querySelector('.todo__input');

    todoDropdownButton.addEventListener('click', todoDropdownHandler);
    todoInputButton.addEventListener('click', openTodoInputHandler);
    todoResetButton.addEventListener('click', resetTodoInputHandler);
    window.addEventListener('click', closeTodoInputHandler, true);

    todoInput.addEventListener('keydown', keydownHandler);
    todoInput.addEventListener('input', limitHandler);
}

function todoUnmount() {
    const todoElement = workingAreaContent.querySelector('.todo')
    const todoDropdownButton = todoElement.querySelector('.button_type_todo');
    const todoInputButton = todoElement.querySelector('.todo__button');
    const todoResetButton = todoElement.querySelector('.button_type_reset');
    const todoInput = todoElement.querySelector('.todo__input');
    const todoDropdown = todoElement.querySelector('.todo__dropdown');

    workingAreaContent.removeChild(todoElement);

    todoDropdownButton.removeEventListener('click', todoDropdownHandler);
    todoInputButton.removeEventListener('click', openTodoInputHandler);
    todoResetButton.removeEventListener('click', resetTodoInputHandler);
    window.removeEventListener('click', closeTodoInputHandler, true);

    todoInput.removeEventListener('keydown', keydownHandler);
    todoInput.removeEventListener('input', limitHandler);

    todoDropdown.classList.remove("show");
}

function clickTodoDropdown() {
    const todoDropdown = document.querySelector('.todo__dropdown');

    todoDropdown.classList.toggle("show");
    const isTodoDropdownOpen = localStorage.getItem('isTodoDropdownOpen') === 'true';
    localStorage.setItem('isTodoDropdownOpen', !isTodoDropdownOpen);
}

function showInputDropdown() {
    const todoInputDropdown = document.querySelector('.todo__task-input');
    const todoInput = document.querySelector('.todo__input');

    todoInputDropdown.classList.toggle("show-todo")
    todoInput.focus();
}

function closeInputDropdown(event) {
    const isTodoInputElement = event.target.closest('.todo__task-input');

    if (isTodoInputElement) {
        return;
    }

    clearTodoInput();
    hideTodoInputDropdown();
}

function hideTodoInputDropdown() {
    const todoInputDropdown = document.querySelector('.todo__task-input');

    todoInputDropdown.classList.remove("show-todo");
}

function clearTodoInput() {
    const todoInput = document.querySelector('.todo__input');

    todoInput.value = '';
}

async function checkTodoInputLimit(event) {
    const maxLength = parseInt(event.target.getAttribute('maxlength'));
    const currentLength = event.target.value.length;

    if (currentLength === maxLength) {
        toastNotifications.showInfo({
            title: await getLocalizedText('info'),
            text: await getLocalizedText('input-limit'),
        });
    }
}

export {
    todoMount,
    todoUnmount
}