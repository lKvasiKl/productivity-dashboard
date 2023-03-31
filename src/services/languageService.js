import axios from 'axios';

const langURL = 'lang/';

async function fetchTranslations(locale) {
    const response = await axios.get(`${langURL}${locale}.json`);

    return response.data;
}

export {
    fetchTranslations
}