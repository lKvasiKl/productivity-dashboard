import { login, logout } from "../widgets/authorization/authorization";
import { createNode } from "./nodeCreateHelper";

const workingAreaContent = document.querySelector('.main');
const logoutNode = createNode('authorization-logout-template');

const loginHandler = () => login();
const logoutHandler = () => logout();

function loginMount() {
    const loginNode = createNode('authorization-login-template')
    const userNameInput = loginNode.querySelector('[data-authorization-input]');

    userNameInput.addEventListener('change', loginHandler);
    workingAreaContent.appendChild(loginNode);
}

function loginUnmount() {
    const userNameInput = document.querySelector('[data-authorization-input]');
    const loginNode = document.querySelector('[data-authorization]');

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