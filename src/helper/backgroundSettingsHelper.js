import { changeBackgroundImage } from "../widgets/background-settings/background-settings";
import { createNode } from "./nodeCreateHelper";

const workingAreaContent = document.querySelector('.main');

const settingsButtonHandler = () => changeBackgroundImage();

function settingsButtonMount() {
    const settingsNode = createNode('background-settings-template');
    const settingsButton = settingsNode.querySelector('.bg-image-settings__button');

    settingsButton.addEventListener('click', settingsButtonHandler);
    workingAreaContent.appendChild(settingsNode);
}

function settingsButtonUnmount() {
    const settingsElement = workingAreaContent.querySelector('.bg-image-settings');
    const settingsButton = settingsElement.querySelector('.bg-image-settings__button');
    settingsButton.removeEventListener('click', settingsButtonHandler);
    workingAreaContent.removeChild(settingsElement);
}

export {
    settingsButtonMount,
    settingsButtonUnmount
}