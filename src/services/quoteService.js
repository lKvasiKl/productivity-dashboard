import axios from "axios";

const QUOTES_API_URL = process.env.FORISMATIC_URL;

const getQuote = async () => {
    const locale = (navigator.language || navigator.systemLanguage || navigator.userLanguage).substr(0, 2).toLowerCase() || 'en';

    const QOUTE_API_PARAMS = `method=getQuote&format=json&key=&lang=${locale}&jsonp=?`;

    try {
        const response = await axios.get(`https://cors-anywhere.herokuapp.com/${QUOTES_API_URL}?${QOUTE_API_PARAMS}`).catch();

        const { data } = response;

        return data.quoteText;
    } catch (error) {
    }
}

export {
    getQuote
}