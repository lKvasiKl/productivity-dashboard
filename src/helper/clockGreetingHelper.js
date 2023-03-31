import { startClockTimer, stopClockTimer } from "../widgets/clock/clock";
import { updateGreeting } from "../widgets/greeeting/greeting";
import { createNode } from "./nodeCreateHelper";
import { setLocale } from "./languageHelper";

const workingAreaContent = document.querySelector('.main');
const clockGreetingNode = createNode('clock-greeting-template');

async function clockGreetingMount() {
    workingAreaContent.appendChild(clockGreetingNode);
    startClockTimer();
    updateGreeting();

    await setLocale();
}

function clockGreetingUnmount() {
    workingAreaContent.removeChild(clockGreetingNode);
    stopClockTimer();
}

export {
    clockGreetingMount,
    clockGreetingUnmount
}