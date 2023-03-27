import { startClockTimer, stopClockTimer } from "../widgets/clock/clock";
import { updateGreeting } from "../widgets/greeeting/greeting";
import { createNode } from "./nodeCreateHelper";

const workingAreaContent = document.querySelector('.main');
const clockGreetingNode = createNode('clock-greeting-template');

function clockGreetingMount() {
    workingAreaContent.appendChild(clockGreetingNode);
    startClockTimer();
    updateGreeting();
}

function clockGreetingUnmount() {
    workingAreaContent.removeChild(clockGreetingNode);
    stopClockTimer();
}

export {
    clockGreetingMount,
    clockGreetingUnmount
}