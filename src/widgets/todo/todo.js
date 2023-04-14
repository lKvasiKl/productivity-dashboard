import { getLocalizedText } from "../../helper/languageHelper";
import { toastNotifications } from "../../helper/toastHelper";

let draggedItem;
let droppedItem;

const editTaskHandler = (editItem) => editTask(editItem);
const blurHandler = (event) => editTaskEnd(event);
const limitHandler = (event) => checkTodoInputLimit(event);
const keydownHandler = (event) => {
    if (event.key === 'Enter') {
        editTaskEnd(event);
    }
}

function createNewTaskElement(taskText) {
    const listItem = document.createElement("li");
    listItem.id = `task-${Date.now()}`;
    listItem.setAttribute('draggable', true);

    const checkbox = document.createElement("input");
    const todoItemText = document.createElement("span");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    todoItemText.textContent = taskText;

    checkbox.type = "checkbox";

    listItem.classList.add('todo__item');
    checkbox.classList.add('todo__checbox');
    todoItemText.classList.add('todo__item-text');
    todoItemText.setAttribute('maxlength', 150);
    editButton.classList.add('button', 'button_type_edit');
    deleteButton.classList.add('button', 'button_type_delete');

    listItem.appendChild(checkbox);
    listItem.appendChild(todoItemText);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    listItem.addEventListener('dragstart', dragStart);
    listItem.addEventListener('dragover', dragOver);
    listItem.addEventListener('drop', drop);
    listItem.addEventListener('dragend', dragEnd);

    return listItem;
}

async function addTask() {
    const taskInput = document.querySelector('.todo__input');
    const taskText = taskInput.value.trim();

    if (!taskText) {
        toastNotifications.showInfo({
            title: await getLocalizedText('info'),
            text: await getLocalizedText('todo-limit'),
        });

        return;
    }

    const taskId = `task-${Date.now()}`;
    const task = {
        id: taskId,
        text: taskText,
        completed: false,
    };

    const tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    var listItem = createNewTaskElement(taskText);
    listItem.id = taskId;
    taskIncomplete(listItem);
    bindTaskEvents(listItem);

    taskInput.value = '';
}

function editTask(editItem) {
    const item = editItem.querySelector('.todo__item-text');
    item.setAttribute('contenteditable', true);
    item.focus();

    const setFocusToEnd = () => {
        const range = document.createRange();
        range.selectNodeContents(item);
        range.collapse(false);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    };

    setFocusToEnd();

    item.addEventListener('blur', blurHandler);
    item.addEventListener('keydown', keydownHandler);
    item.addEventListener('input', limitHandler);
}

function editTaskEnd(event) {
    const editItem = event.target;
    editItem.setAttribute('contenteditable', false);
    editItem.textContent = editItem.textContent.substring(0, 150).trim();

    const index = getTaskIndexInLocalStorage(editItem.parentNode);
    const tasks = getTasksFromLocalStorage();
    tasks[index].text = editItem.textContent;
    localStorage.setItem('tasks', JSON.stringify(tasks));

    editItem.removeEventListener('blur', blurHandler);
    editItem.removeEventListener('keydown', keydownHandler);
    editItem.removeEventListener('input', limitHandler);
}

function deleteTask(deleteItem) {
    const index = getTaskIndexInLocalStorage(deleteItem);
    const tasks = getTasksFromLocalStorage();
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    deleteItem.parentNode.removeChild(deleteItem);
}

function taskCompleted(listItem) {
    const completedTasksHolder = document.querySelector('.todo__completed-tasks');
    const taskId = listItem.id;
    const tasks = getTasksFromLocalStorage();
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    tasks[taskIndex].completed = true;
    localStorage.setItem('tasks', JSON.stringify(tasks));

    completedTasksHolder.appendChild(listItem);
}

function taskIncomplete(listItem) {
    const incompleteTaskHolder = document.querySelector('.todo__incomplete-tasks');
    const taskId = listItem.id;
    const tasks = getTasksFromLocalStorage();
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    tasks[taskIndex].completed = false;
    localStorage.setItem('tasks', JSON.stringify(tasks));

    incompleteTaskHolder.appendChild(listItem);
}

function bindTaskEvents(listItem) {
    var checkBox = listItem.querySelector(".todo__checbox");
    var editButton = listItem.querySelector(".button_type_edit");
    var deleteButton = listItem.querySelector(".button_type_delete");

    checkBox.addEventListener('change', () => {
        if (checkBox.checked) {
            const sound = new Audio('audio/minecraft_levelup.mp3'); 
            sound.play();
            taskCompleted(listItem);
        } else {
            taskIncomplete(listItem);
        }
    });
    editButton.addEventListener('click', () => editTaskHandler(listItem));
    deleteButton.addEventListener('click', () => deleteTask(listItem));
}

function getTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return tasks;
}

function getTaskIndexInLocalStorage(listItem) {
    const taskId = listItem.id;
    const tasks = getTasksFromLocalStorage();
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    return taskIndex;
}

function renderTasks() {
    const tasks = getTasksFromLocalStorage();

    tasks.forEach((task) => {
        const listItem = createNewTaskElement(task.text);
        listItem.id = task.id;

        if (task.completed) {
            taskCompleted(listItem);
            listItem.querySelector('.todo__checbox').checked = true;
        } else {
            taskIncomplete(listItem);
        }

        bindTaskEvents(listItem);
    });
}

function dragStart() {
    draggedItem = this;
}

function dragOver(e) {
    e.preventDefault();
}

function drop() {
    droppedItem = this;
    swapElements(draggedItem, droppedItem);
}

function dragEnd() {
    draggedItem = null;
    droppedItem = null;
}

function swapElements(draggedItem, droppedItem) {
    const itemsContainer = draggedItem.parentNode;
    const draggedIndex = Array.from(itemsContainer.children).indexOf(draggedItem);
    const droppedIndex = Array.from(itemsContainer.children).indexOf(droppedItem);

    if (draggedIndex < droppedIndex) {
        itemsContainer.insertBefore(droppedItem, draggedItem);
    } else {
        itemsContainer.insertBefore(draggedItem, droppedItem);
    }
}

async function checkTodoInputLimit(event) {
    const maxLength = parseInt(event.target.getAttribute('maxlength'));
    const currentLength = event.target.textContent.length;

    if (currentLength >= maxLength) {
        toastNotifications.showInfo({
            title: await getLocalizedText('info'),
            text: await getLocalizedText('input-limit'),
        });

        editTaskEnd(event);
    }
}

export {
    addTask,
    renderTasks
}