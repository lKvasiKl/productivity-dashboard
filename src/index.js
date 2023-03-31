import './index.scss';
import './helper/workingAreaHelper';
import './widgets/authorization/authorization';
import './widgets/background-settings/background-settings';
import './widgets/clock/clock';
import './widgets/quote/quote';
import './widgets/main-focus/main-focus';

import { pageMount } from "./helper/pageRenderHelper";
import { loginMount } from "./helper/authorizationHelper";

const user = localStorage.getItem('userName');

if (user) {
    pageMount();
} else {
    loginMount();
}