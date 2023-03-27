import axios from "axios";

const QUOTES_API_URL = process.env.NINJAS_URL;
const QUOTES_API_AUTH = {
  'X-Api-Key': process.env.NINJAS_API_KEY,
};

const getQuote = async () => {
    try {
        const response = await axios.get(QUOTES_API_URL, {
            headers: QUOTES_API_AUTH,
        });

        const { data } = response;

        return data[0].quote;
    } catch (error) {
        console.error(error);
    }
}

export {
    getQuote
}