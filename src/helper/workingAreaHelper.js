import { getImage } from '../services/imageService';
import { mainFocusUnmount } from './mainFocusHelper';
import { mainFocusInputMount } from './mainFocusInputHelper';

const workingArea = document.querySelector('[data-working-area]');

(async function () {
    const lastVisitDate = localStorage.getItem('lastVisitDate');
    const bgImageInfo = localStorage.getItem('bgImageInfo');
    const mainFocus = localStorage.getItem('mainFocus');

    const date = new Date();

    if (!lastVisitDate) {
        localStorage.setItem('lastVisitDate', date.getDate());
    }

    if (!bgImageInfo || lastVisitDate < date.getDate()) {
        const imageInfo = await getImage();
        localStorage.setItem('lastVisitDate', date.getDate());
        localStorage.setItem('bgImageInfo', JSON.stringify(imageInfo));
    }

    if (mainFocus && lastVisitDate < date.getDate()) {
        localStorage.removeItem('mainFocus');
        mainFocusUnmount();
        mainFocusInputMount();
    }

    const info = JSON.parse(localStorage.bgImageInfo);
    workingArea.style.backgroundImage = `url(${info.url})`;
})();