import { getImage } from "../../services/imageService.js";
import {toastNotifications} from "../../helper/toastHelper";

const workingArea = document.querySelector('[data-working-area]');

async function changeBackgroundImage() {
    try {
        const imageInfo = await getImage();

        if (!imageInfo) {
            toastNotifications.showInfo({
                title: 'Bacground Limit!',
                text: `Sorry, but you can update the background 50 times per hour.`,
            });

            return;
        }

        localStorage.bgImageInfo = JSON.stringify(imageInfo);

        const info = JSON.parse(localStorage.bgImageInfo);

        workingArea.style.backgroundImage = `url(${info.url})`;
        updateBackgroundMetaInfo(info);
    } catch(error) {
        console.error(error);
    }
    
}

function updateBackgroundMetaInfo(info) {
    const imageMetaInfo = document.querySelector('[data-bg-settings-text]');
    const metaInfo = [];

    if (info.author_name) {
        metaInfo.push(info.author_name);
    }

    if (info.location) {
        metaInfo.push(info.location);
    }

    imageMetaInfo.textContent = metaInfo.join(', ').substring(0, 40);
}

export {
    changeBackgroundImage,
    updateBackgroundMetaInfo
}