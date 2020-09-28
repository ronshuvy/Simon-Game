/* Initialize Global Varibales */
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [], userClickedPattern = [];
var level = 0;

/* Event Listeners*/
$(document).on("keyword taphold", handleKeyPressed);

/* Functions */

function handleKeyPressed() {
  $("#level-title").text("Level " + level);
  nextSequence();

  $(".btn").click(handleButtonClick);
  $(this).off("keydown taphold");
}

function handleButtonClick() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
}

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut().fadeIn();
  playSound(randomChosenColor);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function () {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000)
    }

  } else {

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    $(".btn").off("click");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  $(document).on("keyword taphold", handleKeyPressed);
}