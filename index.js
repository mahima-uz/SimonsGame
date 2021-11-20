var gamePattern=[];
var buttonColours=["red", "blue", "green", "yellow"];
var userClickedPattern=[];
var level=0;
var started=false;

$(document).keydown(function(){
  if(!started){
  $("h1").html("level "+level);
  nextSequence();
  started=true;
}
});

$(".btn").on("click",function(){
   var userChosenColour=$(this).attr("id");
   userClickedPattern.push(userChosenColour);
   playSound(userChosenColour);
   animatePress(userChosenColour);
   checkAnswer(userClickedPattern.length-1);
});


function nextSequence(){
  userClickedPattern=[];
  level++;
  $("h1").html("level "+level);

  var randomNumber=Math.random()*4;
var randomChosenColour=buttonColours[Math.floor(randomNumber)];
gamePattern.push(randomChosenColour);
console.log(gamePattern);

$("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);


}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){


        setTimeout(function () {
          nextSequence();
        }, 1000);

      }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
  }
}

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function() {
       $("#"+currentColour).removeClass("pressed");
   }, 100);
}

function startOver(){
  level=0;
  started=false;
  gamePattern=[];
}
