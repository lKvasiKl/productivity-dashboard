import { pageMount, pageUnmount } from "../../helper/pageRenderHelper";
import { loginMount, loginUnmount } from "../../helper/authorizationHelper";

function login() {
    const userNameInput = document.querySelector('[data-authorization-input]');

    localStorage.setItem('userName', userNameInput.value);

    pageMount();
    loginUnmount();
}

function logout() {
    localStorage.removeItem('userName');
    pageUnmount();
    
    localStorage.removeItem('mainFocus');
    localStorage.removeItem('checkboxState');
    loginMount();
}

export {
    login,
    logout
}