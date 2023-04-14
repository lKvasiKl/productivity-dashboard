import { getImage } from '../services/imageService';
import { mainFocusUnmount } from './mainFocusHelper';
import { mainFocusInputMount } from './mainFocusInputHelper';

const workingArea = document.querySelector('.working-area');

(async function () {
    const lastVisitDate = localStorage.getItem('lastVisitDate');
    const bgImageInfo = localStorage.getItem('bgImageInfo');
    const mainFocus = localStorage.getItem('mainFocus');

    const date = new Date();
    let currentDate = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;

    if (!lastVisitDate) {
        localStorage.setItem('lastVisitDate', currentDate);
    }

    if (!bgImageInfo || lastVisitDate < currentDate) {
        const imageInfo = await getImage() || {
            author_name: "Silas Baisch",
            location: null,
            url: "https://images.unsplash.com/photo-1560260240-c6ef90a163a4?crop=entropy&cs=srgb&fm=jpg&ixid=Mnw0MTkwNDF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODA1MTc4MjU&ixlib=rb-4.0.3&q=85"
        };

        localStorage.setItem('lastVisitDate', currentDate);
        localStorage.setItem('bgImageInfo', JSON.stringify(imageInfo));
    }

    if (mainFocus && lastVisitDate < currentDate) {
        localStorage.removeItem('mainFocus');
        localStorage.removeItem('checkboxState');
        mainFocusUnmount();
        mainFocusInputMount();
    }

    const info = JSON.parse(localStorage.bgImageInfo);
    workingArea.style.backgroundImage = `url(${info.url})`;
})();