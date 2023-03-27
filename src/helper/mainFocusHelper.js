import { deleteMainFocus, editMainFocus, updateCheckboxState } from "../widgets/main-focus/main-focus";
import { createNode } from "./nodeCreateHelper";

const workingAreaContent = document.querySelector('.main');
const mainFocusNode = createNode('main-focus-template');
const mainFocusCheckbox = mainFocusNode.querySelector('[data-main-focus-checkbox]');
const mainFocusDropdownBtn = mainFocusNode.querySelector('[data-dropdown-button]');
const mainFocusDropdown = mainFocusNode.querySelector('[data-main-focus-dropdown]');
const mainFocusEditBtn = mainFocusNode.querySelector('[data-main-focus-edit]');
const mainFocusDeleteBtn = mainFocusNode.querySelector('[data-main-focus-delete]');

const mainFocusCheckboxHandler = () => updateCheckboxState();
const mainFocusOpenDropdownHandler = () => showDropdown();
const mainFocusCloseDropdownHandler = (event) => closeDropdown(event);
const mainFocusEditHandler = () => editMainFocus();
const mainFocusDeleteHandler = () => deleteMainFocus();

function mainFocusMount() {
    workingAreaContent.appendChild(mainFocusNode);

    const mainFocus = document.querySelector('[data-main-focus]');
    mainFocus.textContent = localStorage.getItem('mainFocus');

    mainFocusCheckbox.addEventListener('click', mainFocusCheckboxHandler);
    const savedCheckboxState = localStorage.getItem('checkboxState');
    mainFocusCheckbox.checked = savedCheckboxState === 'checked';

    mainFocusDropdownBtn.addEventListener('click', mainFocusOpenDropdownHandler);
    window.addEventListener('click', mainFocusCloseDropdownHandler);

    mainFocusEditBtn.addEventListener('click', mainFocusEditHandler);
    mainFocusDeleteBtn.addEventListener('click', mainFocusDeleteHandler);
}

function mainFocusUnmount() {
    mainFocusCheckbox.removeEventListener('click', mainFocusCheckboxHandler);
    mainFocusDropdownBtn.removeEventListener('click', mainFocusOpenDropdownHandler);
    window.removeEventListener('click', mainFocusCloseDropdownHandler);
    mainFocusEditBtn.removeEventListener('click', mainFocusEditHandler);
    mainFocusDeleteBtn.removeEventListener('click', mainFocusDeleteHandler);
    
    workingAreaContent.removeChild(mainFocusNode);
}

function showDropdown() {
    const mainFocusDropdown = document.querySelector('[data-main-focus-dropdown]');

    mainFocusDropdown.classList.toggle("show");
}

function closeDropdown(event) {
    if (!event.target.matches('[data-dropdown-button]')) {
        mainFocusDropdown.classList.remove("show");
    }
}

export {
    mainFocusMount,
    mainFocusUnmount
}