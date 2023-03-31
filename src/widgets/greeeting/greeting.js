async function updateGreeting() {
    const greetingText = document.querySelector('.text__greeting');

    const date = new Date();
    const time = date.getHours();

    if (time > 5 && time < 12) {
        greetingText.setAttribute("localization-key", "morning-greeting");
    } else if (time >= 12 && time <= 18) {
        greetingText.setAttribute("localization-key", "afternoon-greeting");
    } else {
        greetingText.setAttribute("localization-key", "evening-greeting");
    }
}

export {
    updateGreeting
}