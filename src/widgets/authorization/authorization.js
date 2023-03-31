import { pageMount, pageUnmount } from "../../helper/pageRenderHelper";
import { loginMount, loginUnmount } from "../../helper/authorizationHelper";
import { toastNotifications } from "../../helper/toastHelper";

async function login() {
    const userNameInput = document.querySelector('.authorization__input');
    const userName = userNameInput.value.trim();

    if (userName.length > 0) {
        localStorage.setItem('userName', userName);

        pageMount();
        loginUnmount();
    } else {
        toastNotifications.showInfo({
            title: await getLocalizedText('info'),
            text: await getLocalizedText('name-limit'),
        });
    }
}

function logout() {
    pageUnmount();
    loginMount();

    localStorage.removeItem('userName');
    localStorage.removeItem('mainFocus');
    localStorage.removeItem('checkboxState');
    localStorage.removeItem('quoteCache');
    localStorage.removeItem('currentLocation');
    localStorage.removeItem('weatherPermissionDenied');

}

export {
    login,
    logout
}