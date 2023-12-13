import { login, logout } from "../widgets/authorization/authorization";
import { createNode } from "./nodeCreateHelper";
import { setLocale } from "./languageHelper";

const workingAreaContent = document.querySelector('.main');

const loginHandler = () => login();
const logoutHandler = () => logout();

async function loginMount() {
    const loginNode = createNode('authorization-login-template')
    const userNameInput = loginNode.querySelector('.authorization__input');
    
    userNameInput.addEventListener('change', loginHandler);
    workingAreaContent.appendChild(loginNode);
    await setLocale();
}

function loginUnmount() {
    const userNameInput = document.querySelector('.authorization__input');
    const loginElement = document.querySelector('.authorization');

    userNameInput.removeEventListener('change', loginHandler);
    workingAreaContent.removeChild(loginElement);
}

function logoutMount() {
    const logoutNode = createNode('authorization-logout-template');

    logoutNode.addEventListener('click', logoutHandler);
    workingAreaContent.appendChild(logoutNode);
}

function logoutUnmount() {
    const logoutElement = workingAreaContent.querySelector('.user-actions');
    logoutElement.removeEventListener('click', logoutHandler);
    workingAreaContent.removeChild(logoutElement);
}

export {
    loginMount,
    loginUnmount,
    logoutMount,
    logoutUnmount
}