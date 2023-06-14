const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const highScoreArea = document.querySelector(".highScore");
const moles = document.querySelectorAll('.mole');
const levelSelect = document.querySelector("#level");
const timer = document.querySelector(".timer");
const message = document.querySelector(".message");
let start = document.querySelector(".startBtn");
let lastHole;
let point = 1;
let timeUp = false;
let score = 0;
let highScore = 0;

//create a function to make a random time for mole to pop from the hole
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}


function randomHole(holes) {
    const index = Math.floor(Math.random() * holes.length);
    const hole = holes[index];

    //prevent same hole from getting the same number
    if (hole === lastHole) {
        return randomHole(holes);
    }

    lastHole = hole;
    return hole;
}


let time;  //get a random time to determine how long mole should peep

function peep() {

    // Set level scores
    if (levelSelect.value == "Hard") {
        time = randomTime(400, 800);
        point = 5
    } else if (levelSelect.value == "Medium") {
        time = randomTime(800, 2500);
        point = 3
    } else if (levelSelect.value == "easy") {
        time = randomTime(1000, 3000);
        point = 2
    } else {
        time = randomTime(1200, 3500);
        point = 1
    }

    const hole = randomHole(holes); //get the random hole from the randomHole function
    hole.classList.add('up'); //add the CSS class so selected mole can "pop up"
    setTimeout(() => {
        hole.classList.remove('up'); //make the selected mole "pop down" after a random time
        if (!timeUp) {
            peep();
        }
    }, time);
}

function startTimer() {
    let timeLeft = 30;
    let interval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timer.innerHTML = `${timeLeft} Seconds left!`;
        } else {
            clearInterval(interval);

        }
    }, 1000)
}

function startGame() {
    message.innerHTML = "";
    levelSelect.setAttribute('disabled', '');

    start.setAttribute('disabled', "");
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();


    setTimeout(() => {
        timeUp = true;
        timer.innerHTML = `Times up! <br><br> Click             <input type="button" class="startBtn" value="start!">
        to play again`;
        start.removeAttribute('disabled');
        levelSelect.removeAttribute('disabled', '');


        if (score > highScore) {
            
            setTimeout(() => {
                message.innerHTML = "New Highscore! 🥳🥳";

            }, 1500)
            highScore = score;

        }

        highScoreArea.innerHTML = highScore;
    }, 30500) //show random moles for 15 seconds
}



function wack(e) {
    if (!e.isTrusted) return; //** new thing I learned */
    score = score + point;

    this.parentNode.classList.remove('up'); //this refers to item clicked
    scoreBoard.textContent = score;
}


moles.forEach(mole => mole.addEventListener('click', wack));

start.addEventListener("click", () => {
    if (levelSelect.value == "Select Level") {
        timer.innerHTML = "Please select level";
    }
    else {
        timer.innerHTML = `${30} Seconds left!`;
        message.innerHTML = "";

        startTimer();
        startGame();
    }
});