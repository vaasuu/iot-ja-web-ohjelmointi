const startTimerButton = document.getElementById("timerStartBtn");
const stopTimerButton = document.getElementById("timerStopBtn");
const resetTimerButton = document.getElementById("timerResetBtn");
const timerCounterDiv = document.getElementById("timercounter");

let counter = 0;

let isTimerStarted = false;


function handleTick() {
    if(isTimerStarted){
    // console.log("Tick")
    counter++;
}
    // console.log("counter:", counter)

    let date = new Date(null);
    date.setSeconds(counter); // specify value for SECONDS here
    let result = date.toISOString().substr(11, 8);
    timerCounterDiv.textContent = result;
}
window.setInterval(handleTick, 1000);

const handleTimerStartButtonClick = () => {
    isTimerStarted = true;
};

const handleTimerStopButtonClick = () => {
    isTimerStarted = false;
};

const handleTimerResetButtonClick = () => {
    isTimerStarted = false;
    counter = 0;
    handleTick();

};

startTimerButton.addEventListener("click", handleTimerStartButtonClick)

stopTimerButton.addEventListener("click", handleTimerStopButtonClick)

resetTimerButton.addEventListener("click", handleTimerResetButtonClick)


// var date = new Date(null);
// date.setSeconds(SECONDS); // specify value for SECONDS here
// var result = date.toISOString().substr(11, 8);
// https://stackoverflow.com/posts/25279340/timeline#comment_100042029