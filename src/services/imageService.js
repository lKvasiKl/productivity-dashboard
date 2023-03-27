import axios from "axios";

const UNSPLASH_API_URL = process.env.UNSPLASH_URL;
const UNSPLASH_API_PARAMS = {
    query: 'wallpaper',
    orientation: 'landscape',
};
const UNSPLASH_API_AUTH = {
    Authorization: `Client-ID ${process.env.UNSPLASH_API_KEY}`,
};

const getImage = async () => {
    try {
        const response = await axios.get(UNSPLASH_API_URL, {
            params: UNSPLASH_API_PARAMS,
            headers: UNSPLASH_API_AUTH,
        });

        const { data } = response;

        return {
            url: data.urls.regular,
            author_name: data.user.name,
            location: data.location.city,
        };
    } catch (error) {
        console.error(error);
    }
}

export {
    getImage
}