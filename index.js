let workTime = 25*60*1000;
let restTime = 5*60*1000;
let intervalCount = 4;
let numberWorkIntervals = intervalCount;
let currentMode = "Work";
let time = workTime;


let interval;

const timer = document.getElementById('timer');
const dataPercent = document.querySelectorAll('.data-percent');
const modeEl = document.getElementById('mode');

updateCountdown(time);
countdown(time);

function countdown(pTime){
    interval = setInterval(() => {
        pTime -= 1000;
        // time = pTime;
        if (pTime <= 0) {
            clearInterval(interval);
            numberWorkIntervals = currentMode == "Work" ? numberWorkIntervals - 1 : numberWorkIntervals;
            if (numberWorkIntervals > 0){
                swapMode();
            }
        }

        updateCountdown(pTime);


    }, 1000)
}

function swapMode() {
    currentMode = currentMode == "Work" ? "Rest" : "Work";
    time = currentMode == "Work" ? workTime : restTime;
    updateCountdown(time); 
    countdown(time);
}

function updateCountdown(pTime) {

    if (numberWorkIntervals <= 0) {
        dataPercent[0].style.setProperty('--angle', '360deg');
        dataPercent[0].style.setProperty('--color', 'red');
        timer.innerText = "00:00";
        modeEl.innerText = "END";

    }
    
    else if (pTime <= 0) {
        dataPercent[0].style.setProperty('--angle', '360deg');
        // dataPercent[0].style.setProperty('--color', 'red');
        // timer.innerText = "00:00";
    } else {
        let color = currentMode == "Work" ? "blue" : "red";
        let angle = (pTime / (currentMode == "Work" ? workTime : restTime) * 360 ) + 'deg';
        dataPercent[0].style.setProperty('--angle', angle);
        dataPercent[0].style.setProperty('--color', color);

        let minutes = Math.floor(pTime / 60 / 1000).toString().padStart(2, "0"); 
        let seconds = ((pTime / 1000) % 60).toString().padStart(2,"0")
        timer.innerText = minutes + ":" + seconds;
        modeEl.innerText = currentMode + ` ${numberWorkIntervals}`;
    }
}

function play() {
    clearInterval(interval);
    countdown(time);
    document.getElementsByClassName('pause')[0].classList.remove('d-none');
    document.getElementsByClassName('play')[0].classList.add('d-none');
}

function pause() {
    clearInterval(interval);
    console.log(numberWorkIntervals);
    let [minutes, seconds] = timer.innerText.split(":");
    time = ((minutes * 60 ) + seconds * 1) * 1000;
    document.getElementsByClassName('play')[0].classList.remove('d-none');
    document.getElementsByClassName('pause')[0].classList.add('d-none');
}

function reset() {
    currentMode = "Work";
    numberWorkIntervals = intervalCount;
    time = workTime;

    
    document.getElementsByClassName('pause')[0].classList.remove('d-none');
    document.getElementsByClassName('play')[0].classList.add('d-none');

    clearInterval(interval);
    updateCountdown(time);
    countdown(time);

}

function applyNewTimes() {
    let workTimeInputMinutes = document.getElementById('work-time-minutes').value; 
    let workTimeInputSeconds = document.getElementById('work-time-seconds').value; 
    let workIntervalInputs = document.getElementById('work-time-intervals').value; 
    let restTimeInputMinutes = document.getElementById('rest-time-minutes').value; 
    let restTimeInputSeconds = document.getElementById('rest-time-seconds').value; 

    workTime = workTimeInputMinutes*60*1000 + workTimeInputSeconds*1000;
    restTime = restTimeInputMinutes*60*1000 + restTimeInputSeconds*1000;
    intervalCount = workIntervalInputs;

    numberWorkIntervals = intervalCount;
    currentMode = "Work";
    time = workTime;

    console.log(workTime, restTime, intervalCount)

    clearInterval(interval);
    updateCountdown(time);
    countdown(time);

}

function closeSettings() {
    let settingsList = document.querySelectorAll('.settings-list')[0]; 
    settingsList.style.right = "-100%";
}
function openSettings() {
    let settingsList = document.querySelectorAll('.settings-list')[0]; 
    settingsList.style.right = "0";
}