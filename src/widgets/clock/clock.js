let intervalId;

function startClockTimer() {
    const clock = document.querySelector('[data-clock]');

    function updateTime() {
        const date = new Date();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        clock.textContent = `${hours}:${minutes}`;
    }

    updateTime();
    intervalId = setInterval(updateTime, 1000);
}

function stopClockTimer() {
    clearInterval(intervalId);
}

export {
    startClockTimer,
    stopClockTimer
}