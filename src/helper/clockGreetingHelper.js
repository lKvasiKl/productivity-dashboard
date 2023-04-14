import { startClockTimer, stopClockTimer } from "../widgets/clock/clock";
import { updateGreeting } from "../widgets/greeeting/greeting";
import { createNode } from "./nodeCreateHelper";
import { setLocale } from "./languageHelper";

const workingAreaContent = document.querySelector('.main');

async function clockGreetingMount() {
    const clockGreetingNode = createNode('clock-greeting-template');
    workingAreaContent.appendChild(clockGreetingNode);
    startClockTimer();
    updateGreeting();

    await setLocale();
}

function clockGreetingUnmount() {
    const clockGreetingElement = workingAreaContent.querySelector('.clock-greeting');

    workingAreaContent.removeChild(clockGreetingElement);
    stopClockTimer();
}

export {
    clockGreetingMount,
    clockGreetingUnmount
}