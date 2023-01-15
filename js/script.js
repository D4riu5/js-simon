// selectors
const startGame = document.querySelector(".start");
const tryAgain = document.querySelector(".re-start");
const box1 = document.getElementById("box1");
const box2 = document.getElementById("box2");
const box3 = document.getElementById("box3");
const box4 = document.getElementById("box4");
const box5 = document.getElementById("box5");

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
  }, 30000);
  
  startGame.style.display = "none";
  tryAgain.style.display = "inline";
}

// events
startGame.addEventListener("click", function() {
  addNumberToBoxes();
  simonSays();

});

// resetting the game
  tryAgain.addEventListener("click", function(){

    for (let i = 0; i < boxes.length; i++) {
      boxes[i].innerHTML = "";
      boxes[i].classList.remove("my-bg-green", "my-bg-red");
    }
    addNumberToBoxes();
    simonSays();
  });

