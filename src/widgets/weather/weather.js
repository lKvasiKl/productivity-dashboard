import {getCache, isCacheValid, saveCache} from '../../helper/cacheHelper';
import {toastNotifications} from '../../helper/toastHelper';
import {renderWeather} from '../../helper/weatherHelper';
import {getUserPosition} from '../../services/locationService';
import {getWeather} from '../../services/weatherService';

const CACHE_LIFETIME = +(process.env.CACHE_LIFETIME);

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

    return city;
}

async function updateWeatherData() {
    currentCity = await getUserLocation();

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
    const cache = getCache();
    const cacheEntry = cache[`${city}`];

    if (cacheEntry && isCacheValid(cacheEntry)) {
        return;
    }

    try {
        const weather = await getWeather(city);

        if (!weather) {
            const previousCity = localStorage.getItem('previousLocation');
            localStorage.setItem('currentLocation', previousCity);

            toastNotifications.showError({
                title: 'Error!',
                text: `No result for location: ${city}. Please check your input and try again.`,
            });

            return;
        }

        cache[`${city}`] = {
            weather: weather,
            expirationDate: new Date().getTime() + CACHE_LIFETIME,
        };
        saveCache(cache);
        renderWeather(weather, city);
    } catch (error) {
        console.error(error);
    }
}

export {
    updateWeatherData,
    stopWeatherTimer
};