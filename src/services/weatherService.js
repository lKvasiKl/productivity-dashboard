import axios from "axios";

const OPENWEATHER_API_URL = process.env.OPENWEATHER_URL;

const getWeather = async (city) => {
    const locale = (navigator.language || navigator.systemLanguage || navigator.userLanguage).substr(0, 2).toLowerCase() || 'en';

    const OPENWEATHER_API_PARAMS = {
        q: `${city}`,
        units: 'metric',
        lang: `${locale}`,
        appid: `${process.env.OPENWEATHER_API_KEY}`,
    };

    try {
        const response = await axios.get(OPENWEATHER_API_URL, {
            params: OPENWEATHER_API_PARAMS,
        }).catch();

        const { data } = response;

        return {
            location: data.name,
            icon: data.weather[0].icon,
            temperature: Math.round(data.main.temp),
            description: data.weather[0].description,
            realFeelTemperature: Math.round(data.main.feels_like),
            recentRain: data.rain ? data.rain['1h'] : 0,
            wind: data.wind.speed,
        }
    } catch (error) {
    }
}

export {
    getWeather
}