const workTime = 30*1000;
const restTime = 10*1000;
let time = workTime;

const timer = document.getElementById('timer');
const dataPercent = document.querySelectorAll('.data-percent');

updateCountdown(time);
countdown(time);

function countdown(pTime){
    let interval = setInterval(() => {
        pTime -= 1000;
        if (pTime <= 0) {
            clearInterval(interval);
        }

        updateCountdown(pTime);


    }, 1000)
}

function updateCountdown(pTime) {
    
    if (pTime <= 0) {
        dataPercent[0].style.setProperty('--angle', '360deg');
        dataPercent[0].style.setProperty('--color', 'red');
        timer.innerText = "00:00";
    } else {
        let angle = (pTime / time * 360 ) + 'deg';
        console.log(angle);
        dataPercent[0].style.setProperty('--angle', angle);

        let minutes = Math.floor(pTime / 60 / 1000).toString().padStart(2, "0"); 
        let seconds = ((pTime / 1000) % 60).toString().padStart(2,"0")
        timer.innerText = minutes + ":" + seconds;
    }
}