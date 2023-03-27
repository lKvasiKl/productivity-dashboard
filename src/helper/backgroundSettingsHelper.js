import { changeBackgroundImage } from "../widgets/background-settings/background-settings";
import { createNode } from "./nodeCreateHelper";

const workingAreaContent = document.querySelector('.main');
const settingsNode = createNode('background-settings-template');
const settingsButton = settingsNode.querySelector('[data-bg-settings-button]');

const settingsButtonHandler = () => changeBackgroundImage();

function settingsButtonMount() {
    settingsButton.addEventListener('click', settingsButtonHandler);
    workingAreaContent.appendChild(settingsNode);
}

function settingsButtonUnmount() {
    settingsButton.removeEventListener('click', settingsButtonHandler);
    workingAreaContent.removeChild(settingsNode);
}

export {
    settingsButtonMount,
    settingsButtonUnmount
}