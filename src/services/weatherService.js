import axios from "axios";

const OPENWEATHER_API_URL = process.env.OPENWEATHER_URL;

const getWeather = async (city) => {
    const OPENWEATHER_API_PARAMS = {
        q: `${city}`,
        units: 'metric',
        appid: `${process.env.OPENWEATHER_API_KEY}`,
    };

    try {
        const response = await axios.get(OPENWEATHER_API_URL, {
            params: OPENWEATHER_API_PARAMS,
        });

        const { data } = response;

        return {
            icon: data.weather[0].icon,
            temperature: Math.round(data.main.temp),
            description: data.weather[0].description,
            realFeelTemperature: Math.round(data.main.feels_like),
            recentRain: data.rain ? data.rain['1h'] : 0,
            wind: data.wind.speed,
        }
    } catch (error) {
        console.error(error);
    }
}

export {
    getWeather
}