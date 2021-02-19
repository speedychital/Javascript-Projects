let countdown;
const displayLeft  = document.querySelector('.display__time-left');
const displayEnd = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('.timer__button');
const form = document.querySelector('[name="customForm"]');
const stop = document.querySelector('.stop');
const audio = document.querySelector('audio');
function time(seconds) {
    stop.style.display = 'block';

    clearInterval(countdown);
    speechSynthesis.speak(new SpeechSynthesisUtterance("Your break starts now"));
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayAfterTime(then);
   countdown =  setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        if(secondsLeft < 0) {
            clearInterval(countdown);
            audio.play();
            audio.loop = true;
            return;
        }

        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {

    const minutes = Math.floor(seconds/60);
    const remainSeconds = seconds % 60;

    const displayValue = `${minutes}:${remainSeconds < 10 ? '0' : ''}${remainSeconds}`;
    document.title  =displayValue;
    displayLeft.innerHTML = displayValue;


}

function displayAfterTime(seconds) {


    const afterTime = new Date(seconds); // because its in seconds elapsed from 1 june 1990
    const hour = afterTime.getHours();
    const minutes = afterTime.getMinutes();

    const displayValue = `${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? '0':''}${minutes}`;
    displayEnd.innerHTML = `Be back at ${displayValue}`;

}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    time(seconds);
}
buttons.forEach(button => button.addEventListener('click', startTimer));

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if(Number.isNaN(parseInt(this.minutes.value))) {
        alert("not a number");
        return;
    }
    else {
        const min = this.minutes.value;
        this.reset();
        time(min*60);
    }
});

stop.addEventListener('click', function() {

    clearInterval(countdown);
    displayLeft.innerHTML = "";
    displayEnd.innerHTML = "";
    audio.pause();
    document.title = "Countdown timer";
    stop.style.display = 'none';
})