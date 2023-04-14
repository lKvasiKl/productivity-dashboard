import { assignFocus } from "../widgets/main-focus/main-focus";
import { getLocalizedText } from "./languageHelper";
import { createNode } from "./nodeCreateHelper";
import { toastNotifications } from "./toastHelper";

const workingAreaContent = document.querySelector('.main');

const inputHandler = () => assignFocus();
const limitHandler = (event) => checkInputLimit(event);

async function mainFocusInputMount() {
    const questionInputNode = createNode('main-focus-input-template');
    const mainFocusText = questionInputNode.querySelector('.main-focus-input__text');
    const mainFocusInput = questionInputNode.querySelector('.main-focus-input__input');

    mainFocusText.textContent = await getLocalizedText('main-focus');
    mainFocusInput.addEventListener('change', inputHandler);
    mainFocusInput.addEventListener('input', limitHandler);
    workingAreaContent.appendChild(questionInputNode);
}

function mainFocusInputUnmount() {
    const mainFocusInputElement = workingAreaContent.querySelector('.main-focus-input');
    const mainFocusInput = mainFocusInputElement.querySelector('.main-focus-input__input');

    mainFocusInput.removeEventListener('change', inputHandler);
    mainFocusInput.removeEventListener('input', limitHandler);
    mainFocusInput.value = '';
    workingAreaContent.removeChild(mainFocusInputElement);
}

async function checkInputLimit(event) {
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
    mainFocusInputMount,
    mainFocusInputUnmount
}