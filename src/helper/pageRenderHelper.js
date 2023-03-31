import { linksSearchMount, linksSearchUnmount } from "./linksSearchHelper";
import { settingsButtonMount, settingsButtonUnmount } from "./backgroundSettingsHelper";
import { updateBackgroundMetaInfo } from "../widgets/background-settings/background-settings";
import { clockGreetingMount, clockGreetingUnmount } from "./clockGreetingHelper";
import { quoteMount, quoteUnmount } from "./quoteHelper";
import { mainFocusInputMount, mainFocusInputUnmount } from "./mainFocusInputHelper";
import { logoutMount, logoutUnmount } from "./authorizationHelper";
import { mainFocusMount, mainFocusUnmount } from "./mainFocusHelper";
import { weatherMount, weatherUnmount } from "./weatherHelper";
import { getUserLocation } from "../widgets/weather/weather";
import { toastNotifications } from "../helper/toastHelper";
import { getLocalizedText, setLocale } from "./languageHelper";

async function pageMount() {
    linksSearchMount();

    const info = JSON.parse(localStorage.bgImageInfo);
    settingsButtonMount();
    updateBackgroundMetaInfo(info);

    const focus = localStorage.getItem('mainFocus');
    if (focus) {
        mainFocusMount();
    } else {
        mainFocusInputMount();
    }

    quoteMount();

    navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
        handlePermission(result);
        result.onchange = () => handlePermission(result);;
    });

    logoutMount();

    clockGreetingMount();

    let city = localStorage.getItem('currentLocation');

    if (!city) {
        await getUserLocation();
    }

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

    if (document.querySelector('.weather')) {
        weatherUnmount();
    }

    logoutUnmount();
}

async function handlePermission(permissionStatus) {
    if (permissionStatus.state === 'granted') {
        weatherMount();
    } else if (permissionStatus.state === 'denied') {
        if (document.querySelector('.weather')) {
            localStorage.removeItem('weatherPermissionDenied');
            weatherUnmount();
        }

        const permissionDenied = localStorage.getItem('weatherPermissionDenied');

        if (!permissionDenied) {
            localStorage.setItem('weatherPermissionDenied', true);

            toastNotifications.showInfo({
                title: await getLocalizedText('info'),
                text: await getLocalizedText('weather-geolocation'),
            });
        }
    }
}

export {
    pageMount,
    pageUnmount
}