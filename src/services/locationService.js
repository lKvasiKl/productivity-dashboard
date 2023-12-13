import axios from "axios";

const GOOGLE_GEOCODING_URL = process.env.GOOGLE_GEOCODING_URL;

const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

const getCityFromGeocodingAPI = async (lat, lng) => {
    try {
        const response = await axios.get(GOOGLE_GEOCODING_URL, {
            params: {
                language: 'en',
                latlng: `${lat},${lng}`,
                key: `${process.env.GOOGLE_API_KEY}`,
            },
        });

        return (response.data.results[0].address_components.find(component => component.types.includes('locality')).long_name).toLowerCase();
    } catch (error) { 
    }
};

async function getUserPosition() {
    try {
        const position = await getCurrentPosition();
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        return await getCityFromGeocodingAPI(lat, lng);
    } catch (error) {
    }
}

export {
    getUserPosition
};