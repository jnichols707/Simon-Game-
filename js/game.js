var level = 0;
var game_started = false;
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var game_over = false;

//Wait for user to press key to start game
$(document).keypress(function() {
  if (game_started == false) {
    if(game_over == true){
      $("body").removeClass("game-over");
      game_over = false;
    }
    game_started = true;
    nextSequence();
  }
})

function nextSequence() {
  //update level on page
  $("h2").text("Level " + level);
  //reset userChosenColor
  userPattern = [];
  //generate random number between 0 and 3
  var randomNumber = Math.floor(Math.random() * 4);
  //select random color from array using random number
  var randomChosenColor = buttonColors[randomNumber];
  //create empty array and push the color on
  gamePattern.push(randomChosenColor);
  //play corresponding color sound
  playSound(randomChosenColor);
  //animate corresponding color button to flash, signal to player that color has been added to the array
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  //increment Level
  level++;
}

//handle clicks
$(".btn").click(function() {
  playSound(this.id);
  animatePress(this.id);
  userPattern.push(this.id);
  checkAnswer(userPattern.length - 1);
})

//function to play audio based on color input
function playSound(sound) {
  var buttonSFX = new Audio("./sounds/" + sound + ".mp3")
  buttonSFX.play();
}

//function to animate button when user presses it
function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function() {
    $("#" + color).removeClass("pressed");
  }, 100);
}

//function to check user input against gamePattern
function checkAnswer(current_level) {
  if (gamePattern[current_level] === userPattern[current_level]) {
    if (gamePattern.length === userPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    gameOver();
  }
}

function gameOver(){
  $("h2").text("Game Over :( Press any Key to Restart");
  $("body").addClass("game-over");
  game_started = false;
  game_over = true;
  level = 0;
  gamePattern = [];
  userPattern = [];
}
