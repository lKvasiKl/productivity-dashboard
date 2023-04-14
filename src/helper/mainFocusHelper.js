import { deleteMainFocus, editMainFocus, updateCheckboxState } from "../widgets/main-focus/main-focus";
import { createNode } from "./nodeCreateHelper";
import { setLocale } from "./languageHelper";

const workingAreaContent = document.querySelector('.main');

const mainFocusCheckboxHandler = () => updateCheckboxState();
const mainFocusOpenDropdownHandler = () => showDropdown();
const mainFocusCloseDropdownHandler = (event) => closeDropdown(event);
const mainFocusEditHandler = () => editMainFocus();
const mainFocusDeleteHandler = () => deleteMainFocus();

async function mainFocusMount() {
    const mainFocusNode = createNode('main-focus-template');

    const mainFocusCheckbox = mainFocusNode.querySelector('.main-focus__real-checkbox');
    const mainFocusDropdownBtn = mainFocusNode.querySelector('.main-focus__button');
    const mainFocusEditBtn = mainFocusNode.querySelector('.dropdown__button-edit');
    const mainFocusDeleteBtn = mainFocusNode.querySelector('.dropdown__button-delete');

    workingAreaContent.appendChild(mainFocusNode);

    const mainFocus = document.querySelector('.main-focus__text');
    mainFocus.textContent = localStorage.getItem('mainFocus');

    mainFocusCheckbox.addEventListener('click', mainFocusCheckboxHandler);
    const savedCheckboxState = localStorage.getItem('checkboxState');
    mainFocusCheckbox.checked = savedCheckboxState === 'checked';

    mainFocusDropdownBtn.addEventListener('click', mainFocusOpenDropdownHandler);
    window.addEventListener('click', mainFocusCloseDropdownHandler);

    mainFocusEditBtn.addEventListener('click', mainFocusEditHandler);
    mainFocusDeleteBtn.addEventListener('click', mainFocusDeleteHandler);

    await setLocale();
}

function mainFocusUnmount() {
    const mainFocusElement = workingAreaContent.querySelector('.main-focus');
    const mainFocusCheckbox = mainFocusElement.querySelector('.main-focus__real-checkbox');
    const mainFocusDropdownBtn = mainFocusElement.querySelector('.main-focus__button');
    const mainFocusEditBtn = mainFocusElement.querySelector('.dropdown__button-edit');
    const mainFocusDeleteBtn = mainFocusElement.querySelector('.dropdown__button-delete');

    mainFocusCheckbox.removeEventListener('click', mainFocusCheckboxHandler);
    mainFocusDropdownBtn.removeEventListener('click', mainFocusOpenDropdownHandler);
    window.removeEventListener('click', mainFocusCloseDropdownHandler);
    mainFocusEditBtn.removeEventListener('click', mainFocusEditHandler);
    mainFocusDeleteBtn.removeEventListener('click', mainFocusDeleteHandler);

    workingAreaContent.removeChild(mainFocusElement);
}

function showDropdown() {
    const mainFocusDropdown = document.querySelector('.dropdown__content');

    mainFocusDropdown.classList.toggle("show");
}

function closeDropdown(event) {
    const mainFocusDropdown = document.querySelector('.dropdown__content');

    if (!event.target.matches('.main-focus__button')) {
        mainFocusDropdown.classList.remove("show");
    }
}

export {
    mainFocusMount,
    mainFocusUnmount
}