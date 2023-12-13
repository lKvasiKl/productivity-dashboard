import { getLocalizedText } from "../../helper/languageHelper";
import { mainFocusMount, mainFocusUnmount } from "../../helper/mainFocusHelper";
import { mainFocusInputMount, mainFocusInputUnmount } from "../../helper/mainFocusInputHelper";
import { toastNotifications } from "../../helper/toastHelper";

const limitHandler = () => checkInputLimit();
const blurHandler = () => editMainFocusEnd();
const keydownHandler = (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        editMainFocusEnd();
    }
}

async function assignFocus() {
    const mainFocusInput = document.querySelector('.main-focus-input__input');
    const mainFocus = mainFocusInput.value.substring(0, 200).trim();

    if (mainFocus.length > 0) {
        localStorage.setItem('mainFocus', mainFocus);

        mainFocusInputUnmount();
        mainFocusMount();
    } else {
        toastNotifications.showInfo({
            title: await getLocalizedText('info'),
            text: await getLocalizedText('main-focus-limit'),
        });
    }
}

function updateCheckboxState() {
    const mainFocusCheckbox = document.querySelector('.main-focus__real-checkbox');

    const state = mainFocusCheckbox.checked ? 'checked' : 'unchecked';
    localStorage.setItem('checkboxState', state);
}

function editMainFocus() {
    const mainFocus = document.querySelector('.main-focus__text');

    mainFocus.setAttribute('contenteditable', true);
    mainFocus.focus();

    setFocusToEnd(mainFocus);

    mainFocus.addEventListener('blur', blurHandler);
    mainFocus.addEventListener('keydown', keydownHandler);
    mainFocus.addEventListener('input', limitHandler)
}

function setFocusToEnd(mainFocus) {
    const range = document.createRange();
        range.selectNodeContents(mainFocus);
        range.collapse(false);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
}

async function editMainFocusEnd() {
    const mainFocus = document.querySelector('.main-focus__text');
    const mainFocusTextLeangth = mainFocus.textContent.length;

    if (mainFocusTextLeangth) {
        mainFocus.setAttribute('contenteditable', false);
        localStorage.setItem('mainFocus', mainFocus.textContent.substring(0, 200).trim());
        mainFocus.textContent = localStorage.getItem('mainFocus');

        mainFocus.removeEventListener('blur', blurHandler);
        mainFocus.removeEventListener('keydown', keydownHandler);
        mainFocus.removeEventListener('input', limitHandler);

    } else {
        mainFocus.textContent = localStorage.getItem('mainFocus');

        toastNotifications.showInfo({
            title: await getLocalizedText('info'),
            text: await getLocalizedText('input-null'),
        });

        setFocusToEnd(mainFocus);
    }
}

function deleteMainFocus() {
    const mainFocusDropdown = document.querySelector('.dropdown__content');
    mainFocusDropdown.classList.remove("show");

    localStorage.removeItem('mainFocus');
    localStorage.removeItem('checkboxState');
    mainFocusUnmount();
    mainFocusInputMount();
}

async function checkInputLimit() {
    const mainFocus = document.querySelector('.main-focus__text');
    const maxLength = parseInt(mainFocus.getAttribute('maxlength'));
    const currentLength = mainFocus.textContent.length;

    if (currentLength >= maxLength) {
        toastNotifications.showInfo({
            title: await getLocalizedText('info'),
            text: await getLocalizedText('input-limit'),
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