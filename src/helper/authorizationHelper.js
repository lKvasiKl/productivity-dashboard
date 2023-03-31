import { login, logout } from "../widgets/authorization/authorization";
import { createNode } from "./nodeCreateHelper";
import { setLocale } from "./languageHelper";

const workingAreaContent = document.querySelector('.main');
const logoutNode = createNode('authorization-logout-template');

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
    const loginNode = document.querySelector('.authorization');

    userNameInput.removeEventListener('change', loginHandler);
    workingAreaContent.removeChild(loginNode);
}

function logoutMount() {
    logoutNode.addEventListener('click', logoutHandler);
    workingAreaContent.appendChild(logoutNode);
}

function logoutUnmount() {
    logoutNode.removeEventListener('click', logoutHandler);
    workingAreaContent.removeChild(logoutNode);
}

export {
    loginMount,
    loginUnmount,
    logoutMount,
    logoutUnmount
}