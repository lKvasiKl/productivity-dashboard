import {assignFocus} from "../widgets/main-focus/main-focus";
import { getLocalizedText } from "./languageHelper";
import {createNode} from "./nodeCreateHelper";
import {toastNotifications} from "./toastHelper";

const workingAreaContent = document.querySelector('.main');
const questionInputNode = createNode('main-focus-input-template');
const mainFocusInput = questionInputNode.querySelector('.main-focus-input__input');

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