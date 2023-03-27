import { getUserPosition } from "../services/locationService";
import { stopWeatherTimer, updateWeatherData } from "../widgets/weather/weather";
import { createNode } from "./nodeCreateHelper";

const workingAreaContent = document.querySelector('.main');
const weatherNode = createNode('weather-template');
const weatherDropdownBtn = weatherNode.querySelector('[data-weather]');
const weatherDropdown = weatherNode.querySelectorAll('[data-weather-dropdown]');
const weatherLocationBtn = weatherNode.querySelector('[data-location-dropdown-button]');
const locationDropdown = weatherNode.querySelector('[data-location-dropdown]');
const locationInput = weatherNode.querySelector('[data-location-input]');
const curretLocationBtn = weatherNode.querySelector('[data-current-location-button]');
const locationInputResetBtn = weatherNode.querySelector('[data-reset-button]');

const weatherOpenDropdownHandler = () => showWeatherDropdown();
const weatherCloseDropdawnHandler = (event) => closeWeatherDropdown(event);
const locationOpenDropdownHandler = () => showLocationDropdown();
const locationCloseDropdownHandler = (event) => closeLocationDropdown(event);
const currentLocationHandler = () => getCurrentLocation();
const resetLocationInputHandler = () => clearLocationInput();
const locationEnterKeydownHandler = (event) => {
    if (event.key === 'Enter') {
        updateLocation();
    }
}

const imageUrl = '../../images/weatherIcons/';
let isLocationDropdownOpen = false;

function weatherMount() {
    workingAreaContent.appendChild(weatherNode);

    weatherDropdownBtn.addEventListener('click', weatherOpenDropdownHandler);
    weatherLocationBtn.addEventListener('click', locationOpenDropdownHandler);
    window.addEventListener('click', weatherCloseDropdawnHandler, true);
    window.addEventListener('click', locationCloseDropdownHandler, true);

    curretLocationBtn.addEventListener('click', currentLocationHandler);
    locationInputResetBtn.addEventListener('click', resetLocationInputHandler);
    locationInput.addEventListener('keydown', locationEnterKeydownHandler);

    updateWeatherData();
}

function weatherUnmount() {
    weatherDropdownBtn.removeEventListener('click', weatherOpenDropdownHandler);
    weatherLocationBtn.removeEventListener('click', locationOpenDropdownHandler);
    window.removeEventListener('click', weatherCloseDropdawnHandler, true);
    window.removeEventListener('click', locationCloseDropdownHandler, true);

    curretLocationBtn.removeEventListener('click', currentLocationHandler);
    locationInputResetBtn.removeEventListener('click', resetLocationInputHandler);
    locationInput.removeEventListener('keydown', locationEnterKeydownHandler);

    workingAreaContent.removeChild(weatherNode);
    stopWeatherTimer();
}

function showWeatherDropdown() {
    weatherDropdown.forEach((el) => {
        el.classList.toggle("show");
    });
}

function hideWeatherDropdown() {
    weatherDropdown.forEach((el) => {
        el.classList.remove("show");
    });
}

function showLocationDropdown() {
    isLocationDropdownOpen = true;
    locationDropdown.classList.toggle("show-location")

    locationInput.focus();
}

function hideLocationDropdown() {
    isLocationDropdownOpen = false;
    locationDropdown.classList.remove("show-location")
}

function closeWeatherDropdown(event) {
    const isWeatherElement = event.target.closest('[data-weather]');
    const isWeatherDropdownElement = event.target.closest('[data-weather-dropdown]');

    if (isWeatherElement || isWeatherDropdownElement || isLocationDropdownOpen) {
        return;
    }

    hideWeatherDropdown();
}

function closeLocationDropdown(event) {
    const isLocationElement = event.target.closest('[data-location-dropdown]');

    if (isLocationElement) {
        return;
    }

    clearLocationInput();
    hideLocationDropdown();
}

function updateLocation() {
    localStorage.setItem('previousLocation', localStorage.getItem('currentLocation'));
    localStorage.setItem('currentLocation', locationInput.value.toLowerCase());
    
    hideLocationDropdown();
    hideWeatherDropdown();
    updateWeatherData();
}

async function getCurrentLocation() {
    const city = await getUserPosition();
    localStorage.setItem("currentLocation", city);
    
    hideLocationDropdown();
    hideWeatherDropdown();
    updateWeatherData();
}

function clearLocationInput() {
    locationInput.value = '';
}

function renderWeather(weather, city) {
    const weatherIcons = document.querySelectorAll('[data-weather-icon]');
    const weatherTemperatures = document.querySelectorAll('[data-weather-temperature]');
    const weatherFeelTemperature = document.querySelector('[data-weather-feel-temperature]');
    const weatherRecentRain = document.querySelector('[data-weather-recent-rain]');
    const weatherWind = document.querySelector('[data-weather-wind]');
    const weatherLocations = document.querySelectorAll('[data-weather-location]');
    const weatherDescription = document.querySelector('[data-weather-description]');

    weatherIcons.forEach((icon) => {
        icon.src = `${imageUrl}${weather.icon}.svg`;
    });

    weatherTemperatures.forEach((temp) => {
        temp.textContent = `${weather.temperature}°`;
    });

    weatherFeelTemperature.textContent = `${weather.realFeelTemperature}°`;
    weatherRecentRain.textContent = `${weather.recentRain} mm`;
    weatherWind.textContent = `${weather.wind} m/s`;

    weatherLocations.forEach((location) => {
        location.textContent = city;
    });

    weatherDescription.textContent = weather.description;
}

export {
    weatherMount,
    weatherUnmount,
    renderWeather
}
