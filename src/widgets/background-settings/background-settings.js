import { getImage } from "../../services/imageService.js";
import { toastNotifications } from "../../helper/toastHelper";

const workingArea = document.querySelector('.working-area');

async function changeBackgroundImage() {
    try {
        const imageInfo = await getImage();

        if (!imageInfo) {
            toastNotifications.showInfo({
                title: await getLocalizedText('info'),
                text: await getLocalizedText('background-limit'),
            });

            return;
        }

        localStorage.bgImageInfo = JSON.stringify(imageInfo);

        const info = JSON.parse(localStorage.bgImageInfo);

        workingArea.style.backgroundImage = `url(${info.url})`;
        updateBackgroundMetaInfo(info);
    } catch (error) {
        console.error(error);
    }

}

function updateBackgroundMetaInfo(info) {
    const imageMetaInfo = document.querySelector('.bg-image-settings__text');
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