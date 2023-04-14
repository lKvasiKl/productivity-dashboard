import { fetchTranslations } from "../services/languageService";

let translations = {};

async function setLocale() {
    const locale = (navigator.language || navigator.systemLanguage || navigator.userLanguage).substr(0, 2).toLowerCase() || 'en';

    translations = await fetchTranslations(locale);

    translatePage();
}

function translatePage() {
    document.querySelectorAll('[localization-key]').forEach((element) => {
        let key = element.getAttribute('localization-key');
        let translation = translations[key];

        if (key.includes('greeting')) {
            translation += `, ${localStorage.getItem('userName')}.`;
        }

        if (key.includes('placeholder')) {
            element.placeholder = translation;
        }

        element.textContent = translation;
    });
}

async function getLocalizedText(key) {
    return translations[key];
}

export {
    setLocale,
    getLocalizedText,
    translations
}