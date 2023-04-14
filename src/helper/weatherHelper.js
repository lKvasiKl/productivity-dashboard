import { getUserPosition } from "../services/locationService";
import { stopWeatherTimer, updateWeatherData } from "../widgets/weather/weather";
import { createNode } from "./nodeCreateHelper";
import { getLocalizedText, setLocale } from "./languageHelper";

const workingAreaContent = document.querySelector('.main');

const weatherOpenDropdownHandler = () => showWeatherDropdown();
const weatherCloseDropdownHandler = (event) => closeWeatherDropdown(event);
const locationOpenDropdownHandler = () => showLocationDropdown();
const locationCloseDropdownHandler = (event) => closeLocationDropdown(event);
const currentLocationHandler = () => getCurrentLocation();
const resetLocationInputHandler = () => clearLocationInput();
const locationEnterKeydownHandler = async (event) => {
    if (event.key === 'Enter') {
        await updateLocation();
    }
}

const imageUrl = 'images/';
let isLocationDropdownOpen = false;

async function weatherMount() {
    const weatherNode = createNode('weather-template');
    const weatherDropdownBtn = weatherNode.querySelector('.weather__container');
    const weatherLocationBtn = weatherNode.querySelector('.weather__button');
    const locationInput = weatherNode.querySelector('.input_type_location');
    const currentLocationBtn = weatherNode.querySelector('.button_type_current-location');
    const locationInputResetBtn = weatherNode.querySelector('.button_type_reset');

    workingAreaContent.appendChild(weatherNode);
    await setLocale();

    weatherDropdownBtn.addEventListener('click', weatherOpenDropdownHandler);
    weatherLocationBtn.addEventListener('click', locationOpenDropdownHandler);
    window.addEventListener('click', weatherCloseDropdownHandler, true);
    window.addEventListener('click', locationCloseDropdownHandler, true);

    currentLocationBtn.addEventListener('click', currentLocationHandler);
    locationInputResetBtn.addEventListener('click', resetLocationInputHandler);
    locationInput.addEventListener('keydown', locationEnterKeydownHandler);

    await updateWeatherData();
}

function weatherUnmount() {
    const weatherElement = workingAreaContent.querySelector('.weather');
    const weatherDropdownBtn = weatherElement.querySelector('.weather__container');
    const weatherLocationBtn = weatherElement.querySelector('.weather__button');
    const locationInput = weatherElement.querySelector('.input_type_location');
    const currentLocationBtn = weatherElement.querySelector('.button_type_current-location');
    const locationInputResetBtn = weatherElement.querySelector('.button_type_reset');

    weatherDropdownBtn.removeEventListener('click', weatherOpenDropdownHandler);
    weatherLocationBtn.removeEventListener('click', locationOpenDropdownHandler);
    window.removeEventListener('click', weatherCloseDropdownHandler, true);
    window.removeEventListener('click', locationCloseDropdownHandler, true);

    currentLocationBtn.removeEventListener('click', currentLocationHandler);
    locationInputResetBtn.removeEventListener('click', resetLocationInputHandler);
    locationInput.removeEventListener('keydown', locationEnterKeydownHandler);

    workingAreaContent.removeChild(weatherElement);
    stopWeatherTimer();
}

function showWeatherDropdown() {
    const weatherDropdown = document.querySelectorAll('.weather__dropdown');

    weatherDropdown.forEach((el) => {
        el.classList.toggle("show");
    });
}

function hideWeatherDropdown() {
    const weatherDropdown = document.querySelectorAll('.weather__dropdown');

    weatherDropdown.forEach((el) => {
        el.classList.remove("show");
    });
}

function showLocationDropdown() {
    const locationDropdown = document.querySelector('.weather__location-input-container');

    isLocationDropdownOpen = true;
    locationDropdown.classList.toggle("show-location")

    locationInput.focus();
}

function hideLocationDropdown() {
    const locationDropdown = document.querySelector('.weather__location-input-container');
    
    isLocationDropdownOpen = false;
    locationDropdown.classList.remove("show-location");
}

function closeWeatherDropdown(event) {
    const isWeatherElement = event.target.closest('.weather__container');
    const isWeatherDropdownElement = event.target.closest('.weather__dropdown');

    if (isWeatherElement || isWeatherDropdownElement || isLocationDropdownOpen) {
        return;
    }

    hideWeatherDropdown();
}

function closeLocationDropdown(event) {
    const isLocationElement = event.target.closest('.weather__location-input-container');

    if (isLocationElement) {
        return;
    }

    clearLocationInput();
    hideLocationDropdown();
}

async function updateLocation() {
    localStorage.setItem('previousLocation', localStorage.getItem('currentLocation'));
    localStorage.setItem('currentLocation', locationInput.value.toLowerCase());

    hideLocationDropdown();
    hideWeatherDropdown();
    await updateWeatherData();
}

async function getCurrentLocation() {
    const city = await getUserPosition();
    localStorage.setItem("currentLocation", city);

    hideLocationDropdown();
    hideWeatherDropdown();
    await updateWeatherData();
}

function clearLocationInput() {
    const locationInput = document.querySelector('.input_type_location');

    locationInput.value = '';
}

async function renderWeather(weather) {
    const weatherIcons = document.querySelectorAll('.weather__icon');
    const weatherTemperatures = document.querySelectorAll('.weather__real-temperature');
    const weatherFeelTemperature = document.querySelector('.weather__feel-temperature');
    const weatherRecentRain = document.querySelector('.weather__recent-rain');
    const weatherWind = document.querySelector('.weather__wind');
    const weatherLocations = document.querySelectorAll('.text_type_location');
    const weatherDescription = document.querySelector('.weather__text_type_description');

    weatherIcons.forEach((icon) => {
        icon.src = `${imageUrl}${weather.icon}.svg`;
    });

    weatherTemperatures.forEach((temp) => {
        temp.textContent = `${weather.temperature}°`;
    });

    weatherFeelTemperature.textContent = `${weather.realFeelTemperature}°`;
    weatherRecentRain.textContent = `${weather.recentRain} ${await getLocalizedText('mm')}`;
    weatherWind.textContent = `${weather.wind} ${await getLocalizedText('m/s')}`;

    weatherLocations.forEach((location) => {
        location.textContent = weather.location;
    });

    weatherDescription.textContent = weather.description;
}

export {
    weatherMount,
    weatherUnmount,
    renderWeather
}
