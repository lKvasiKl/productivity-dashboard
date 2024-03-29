import { getCache, isCacheValid, saveCache } from '../../helper/cacheHelper';
import { getLocalizedText } from '../../helper/languageHelper';
import { toastNotifications } from '../../helper/toastHelper';
import { renderWeather } from '../../helper/weatherHelper';
import { getUserPosition } from '../../services/locationService';
import { getWeather } from '../../services/weatherService';

const CACHE_LIFETIME = +(process.env.CACHE_LIFETIME);
const locale = (navigator.language || navigator.systemLanguage || navigator.userLanguage).substr(0, 2).toLowerCase() || 'en';

let intervalId;
let currentCity;

async function getUserLocation() {
    let city = localStorage.getItem('currentLocation');

    if (city) {
        return city;
    }

    city = await getUserPosition();
    city = city.toLowerCase();

    localStorage.setItem('currentLocation', city);
}

async function updateWeatherData() {
    await getUserLocation();
    currentCity = localStorage.getItem('currentLocation');

    await updateWeather(currentCity);
    intervalId = setInterval(async () => {
        const newCity = await getUserLocation();
        if (newCity !== currentCity) {
            currentCity = newCity;
            stopWeatherTimer();
            await updateWeather(currentCity);
        } else {
            await updateWeather(currentCity);
        }
    }, 60000);
}

function stopWeatherTimer() {
    clearInterval(intervalId);
}

async function updateWeather(city) {
    showLoader();
    const cache = getCache('weatherCache');
    const cacheEntry = cache[`${city}`];

    if (cacheEntry && isCacheValid(cacheEntry) && cacheEntry.locale === locale) {
        hideLoader();
        renderWeather(cacheEntry.weather, city);
        return;
    }

    try {
        const weather = await getWeather(city);

        if (!weather) {
            const previousCity = localStorage.getItem('previousLocation');
            localStorage.setItem('currentLocation', previousCity);

            toastNotifications.showError({
                title: await getLocalizedText('error'),
                text: await getLocalizedText('location-no-result'),
            });

            hideLoader();

            return;
        }

        cache[`${city}`] = {
            locale: `${locale}`,
            weather: weather,
            expirationDate: new Date().getTime() + CACHE_LIFETIME,
        };

        saveCache('weatherCache', cache);
        hideLoader();
        renderWeather(weather, city);
    } catch (error) {
        console.error(error);
    }
}

function showLoader() {
    const weatherContainer = document.querySelector('.weather');
    const weather = weatherContainer.querySelector('.weather__container');
    const weatherLoader = weatherContainer.querySelector('.weather__loader');
    const loader = weatherContainer.querySelector('.loader');

    weatherLoader.classList.toggle('visible');
    loader.classList.toggle('visible');
    weather.classList.remove('visible');
}

function hideLoader() {
    const weatherContainer = document.querySelector('.weather');
    const weather = weatherContainer.querySelector('.weather__container');
    const weatherLoader = weatherContainer.querySelector('.weather__loader');
    const loader = weatherContainer.querySelector('.loader');

    weatherLoader.classList.toggle('visible');
    loader.classList.remove('visible');
    weather.classList.toggle('visible');
}

export {
    getUserLocation,
    updateWeatherData,
    stopWeatherTimer
};