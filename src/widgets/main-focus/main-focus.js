import { mainFocusMount, mainFocusUnmount } from "../../helper/mainFocusHelper";
import { mainFocusInputMount, mainFocusInputUnmount } from "../../helper/mainFocusInputHelper";
import { toastNotifications } from "../../helper/toastHelper";

const limitHandler = () => checkInputLimit();
const blurHandler = () => editMainFocusEnd();
const keydownHandler = (event) => {
    if (event.key === 'Enter') {
        editMainFocusEnd();
    }
}

function assignFocus() {
    const mainFocusInput = document.querySelector('[data-main-focus-input]');

    localStorage.setItem('mainFocus', mainFocusInput.value);

    mainFocusInputUnmount();

    mainFocusMount();
}

function updateCheckboxState() {
    const mainFocusCheckbox = document.querySelector('[data-main-focus-checkbox]');

    const state = mainFocusCheckbox.checked ? 'checked' : 'unchecked';
    localStorage.setItem('checkboxState', state);
}

function editMainFocus() {
    const mainFocus = document.querySelector('[data-main-focus]');

    mainFocus.setAttribute('contenteditable', true);
    mainFocus.focus();

    const setFocusToEnd = () => {
        const range = document.createRange();
        range.selectNodeContents(mainFocus);
        range.collapse(false);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    };

    setFocusToEnd();

    mainFocus.addEventListener('blur', blurHandler);
    mainFocus.addEventListener('keydown', keydownHandler);
    mainFocus.addEventListener('input', limitHandler)
}

function editMainFocusEnd() {
    const mainFocus = document.querySelector('[data-main-focus]');

    mainFocus.setAttribute('contenteditable', false);
    localStorage.setItem('mainFocus', mainFocus.textContent);

    mainFocus.removeEventListener('blur', blurHandler);
    mainFocus.removeEventListener('keydown', keydownHandler);
    mainFocus.removeEventListener('input', limitHandler);
}

function deleteMainFocus() {
    const mainFocusDropdown = document.querySelector('[data-main-focus-dropdown]');
    mainFocusDropdown.classList.remove("show");

    localStorage.removeItem('mainFocus');
    localStorage.removeItem('checkboxState');
    mainFocusUnmount();
    mainFocusInputMount();
    
    const mainFocusInput = document.querySelector('[data-main-focus-input]');
    mainFocusInput.value = '';
}

function checkInputLimit() {      
    const mainFocus = document.querySelector('[data-main-focus]');
    const maxLength = parseInt(mainFocus.getAttribute('maxlength'));
    const currentLength = mainFocus.textContent.length;

    if (currentLength === maxLength) {
        toastNotifications.showInfo({
            title: 'Input limit!',
            text: `Maximum length for main focus is ${maxLength}.`,
        });

        editMainFocusEnd();
    }
}

export {
    assignFocus,
    updateCheckboxState,
    editMainFocus,
    deleteMainFocus,
    checkInputLimit
}