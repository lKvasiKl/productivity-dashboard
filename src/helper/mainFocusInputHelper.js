import { assignFocus } from "../widgets/main-focus/main-focus";
import { createNode } from "./nodeCreateHelper";

const workingAreaContent = document.querySelector('.main');
const questionInputNode = createNode('main-focus-input-template');
const mainFocusInput = questionInputNode.querySelector('[data-main-focus-input]');

const inputHandler = () => assignFocus();
const limitHandler = (event) => checkInputLimit(event);

function mainFocusInputMount() {
    mainFocusInput.addEventListener('change', inputHandler);
    mainFocusInput.addEventListener('input', limitHandler);
    workingAreaContent.appendChild(questionInputNode);
}

function mainFocusInputUnmount() {
    mainFocusInput.removeEventListener('change', inputHandler);
    mainFocusInput.removeEventListener('input', limitHandler);
    mainFocusInput.value = '';
    workingAreaContent.removeChild(questionInputNode);
}

function checkInputLimit(event) {
    const maxLength = parseInt(event.target.getAttribute('maxlength'));
    const currentLength = event.target.value.length;

    if (currentLength === maxLength) {
        toastNotifications.showInfo({
            title: 'Input limit!',
            text: `Maximum length for text input ${maxLength}.`,
        });
    }
}

export {
    mainFocusInputMount,
    mainFocusInputUnmount
}