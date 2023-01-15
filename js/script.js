// selectors
const startGame = document.querySelector(".start");
const tryAgain = document.querySelector(".re-start");
const timerOnPage = document.getElementById("showTimer");
const box1 = document.getElementById("box1");
const box2 = document.getElementById("box2");
const box3 = document.getElementById("box3");
const box4 = document.getElementById("box4");
const box5 = document.getElementById("box5");

// counters 
let countDown = 30;

// arrays
const boxes = [box1, box2, box3, box4, box5];

// functions (independent)
function generateNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// functions (dependent)
function addNumberToBoxes() {
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].innerHTML = `<h2>${generateNumber(1 , 100)}</h2>`;
  }
}

function simonSays() {
  tryAgain.disabled = true;
  setTimeout(function(){
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].querySelector("h2").classList.add("hidden");
    }
    setTimeout(function(){
      for (let i = 0; i < boxes.length; i++) {
        let num = parseInt(prompt("What was the number in box " + (i+1) + "?"));
        if (num == parseInt(boxes[i].querySelector("h2").textContent)) {
          boxes[i].classList.add("my-bg-green");
        } else {
          boxes[i].classList.add("my-bg-red");
        }
        boxes[i].innerHTML += `<span">Your number: ${num}</span>`;
        boxes[i].querySelector("h2").classList.remove("hidden");
      }
    }, 1);
    tryAgain.disabled = false;  
  }, 31400);
  
  startGame.style.display = "none";
  tryAgain.style.display = "inline";
}

function resetBoxes() {
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].innerHTML = "";
    boxes[i].classList.remove("my-bg-green", "my-bg-red");
  }
}

function myCountdown () {
  const timer = setInterval(function() {
    if (countDown == 0) {
      clearInterval(timer);
      timerOnPage.innerHTML = "";
      countDown = 30;
    } else {
      timerOnPage.innerHTML = `<h2>Timer: ${countDown}</h2>`;
      countDown--;
    }
  },1000)
}

// events
startGame.addEventListener("click", function() {
  addNumberToBoxes();
  myCountdown();
  simonSays();

});

tryAgain.addEventListener("click", function(){
  resetBoxes();
  addNumberToBoxes();
  myCountdown();
  simonSays();
});


// BUGS ???
// 1: if i minimeze the browser tab while im waiting for the timer to finish, the numbers dont disappear from the boxes
// 2: the countdown has a 1.5 second delay before showing up on screen. cant figure this out so i just increased the timeout from 30 seconds to 31.5 seconds