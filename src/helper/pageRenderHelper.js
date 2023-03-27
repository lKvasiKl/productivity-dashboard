import { linksSearchMount, linksSearchUnmount } from "./linksSearchHelper";
import { settingsButtonMount, settingsButtonUnmount } from "./backgroundSettingsHelper";
import { updateBackgroundMetaInfo } from "../widgets/background-settings/background-settings";
import { clockGreetingMount, clockGreetingUnmount } from "./clockGreetingHelper";
import { quoteMount, quoteUnmount } from "./quoteHelper";
import { mainFocusInputMount, mainFocusInputUnmount } from "./mainFocusInputHelper";
import { logoutMount, logoutUnmount } from "./authorizationHelper";
import { mainFocusMount, mainFocusUnmount } from "./mainFocusHelper";
import { weatherMount, weatherUnmount } from "./weatherHelper";

function pageMount() {
    linksSearchMount();

    const info = JSON.parse(localStorage.bgImageInfo);
    settingsButtonMount();
    updateBackgroundMetaInfo(info);

    clockGreetingMount();

    const focus = localStorage.getItem('mainFocus');
    if (focus) {
        mainFocusMount();
    } else {
        mainFocusInputMount();
    }

    quoteMount();

    weatherMount();

    logoutMount();

}

function pageUnmount() {
    linksSearchUnmount();

    settingsButtonUnmount();

    clockGreetingUnmount();

    const focus = localStorage.getItem('mainFocus');
    if (focus) {
        mainFocusUnmount();
    } else {
        mainFocusInputUnmount();
    }

    quoteUnmount();

    weatherUnmount();

    logoutUnmount();
}

export {
    pageMount,
    pageUnmount
}