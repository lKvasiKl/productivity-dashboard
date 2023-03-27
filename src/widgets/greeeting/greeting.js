function updateGreeting() {
    const greetingText = document.querySelector('[data-greeting]');
    const userName = localStorage.getItem('userName');

    const date = new Date();
    const time = date.getHours();

    let phrase;

    if (time > 5 && time < 12) {
        phrase = 'Good morning';
    } else if (time >= 12 && time <= 18) {
        phrase = 'Good afternoon';
    } else {
        phrase = 'Good evening';
    }

    greetingText.textContent = `${phrase}, ${userName}.`.substring(0, 30);
}

export {
    updateGreeting
}