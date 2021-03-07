//buttons
var startButton = document.getElementById('start-button');
var resetButton = document.getElementById('reset-button');

//hours/minutes/seconds//
var hours = document.getElementById('hours');
var minutes = document.getElementById('minutes');
var seconds = document.getElementById('seconds');

//will be inited by setInterval()
//needed for clearInterval()
var startTimer = -1;

//decrement hours/minutes/seconds values accordingly
function timer(){
    //prevent negative numbers
    if(hours.value == 0 && minutes.value == 0 && seconds.value == 0){
        hours.value = 0;
        minutes.value = 0;
        seconds.value = 0;
        startButton.innerHTML = "START";
        clearInterval(startTimer);
        startTimer = -1;
    }
    else if(seconds.value != 0){
        seconds.value--;
    }
    else if(minutes.value != 0 && seconds.value == 0){
        minutes.value--;
        seconds.value = 59;
    }
    else if(hours.value != 0 && minutes.value == 0){
        hours.value--;
        minutes.value = 59;
        seconds.value = 59;
    }
    return;
}

//reset values to 0
function resetTimer(){
    hours.value = 0;
    minutes.value = 0;
    seconds.value = 0;
    clearInterval(startTimer)
}

function startPauseInterval(){
    //setInterval() calls a function to be executed every 1000 ms
    //start
    if(startTimer == -1){
        startButton.innerHTML = "PAUSE";
        startTimer = setInterval(timer, 1000);
    }
    //pause 
    else{
        startButton.innerHTML = "START";
        clearInterval(startTimer);
        startTimer = -1;
    }
    
}

//adding event listener to startButton/resetButton to do a function when clicked
startButton.addEventListener('click', startPauseInterval)
resetButton.addEventListener('click', resetTimer)