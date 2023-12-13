import axios from "axios";

const QUOTES_API_URL = '/api/forismatic/?'; //process.env.FORISMATIC_URL; 

const getQuote = async () => {
    const locale = (navigator.language || navigator.systemLanguage || navigator.userLanguage).substr(0, 2).toLowerCase() || 'en';

    const QOUTE_API_PARAMS = `method=getQuote&key=&format=json&lang=${locale}`;

    try {
        const response = await axios.get(`${QUOTES_API_URL}${QOUTE_API_PARAMS}`).catch();

        const { data } = response;

        return data.quoteText;
    } catch (error) {
    }
}

export {
    getQuote
}