var seq =[]; //array of sequence pattern
var userInput = [];
var level = 1 ;
var start = false ;

var greenAudio = new Audio("sounds/green.mp3");
var redAudio = new Audio("sounds/red.mp3");
var yellowAudio = new Audio("sounds/yellow.mp3");
var blueAudio = new Audio("sounds/blue.mp3");
var wrongAudio = new Audio("sounds/wrong.mp3");

var audio = {
    "green" : greenAudio,
    "red" : redAudio,
    "yellow" : yellowAudio,
    "blue": blueAudio,
    "wrong": wrongAudio
}

var colors = ["green", "red", "yellow", "blue"];

if(isMobile()){
    $("h1").text("Tap to Start");
    $("h1").click(function(){
    if (!start) {
        generateSequence();
        start = true ;
    }
    });
}else{
    $(document).keypress(function(){
        if (!start) {
            generateSequence();
            start = true ;
        }
    });
}

$(".play-btn").click(function(event){
    targetBtn = $(this).attr("id");
    if(start){
        animate(targetBtn);
        userInput.push(targetBtn);
        checkAnswer(userInput.length-1);
    }
});


function checkAnswer(pressedLength){
    if(seq[pressedLength] === userInput[pressedLength]){
        if(seq.length === userInput.length){
            setTimeout(generateSequence,200);
        }
    }else{
        makeSound("wrong");
        startOver();
    }

}

function generateSequence(){
    userInput=[];
    $("h1").text("level " + level) ;
    level++;
    var randomColor = colors[Math.floor(Math.random()*4)];
    seq.push(randomColor);
    makeSound(randomColor);
    $("#"+randomColor).fadeIn(200).fadeOut(200).fadeIn(200); 
}

function startOver(){
    start = false ;
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },1000);
    level=1;
    seq=[];
    if(isMobile()){
        $("h1").text("Game Over, Tap to Restart");
    }else{
        $("h1").text("Game Over, Press Any Key to Restart");
    }
}

function makeSound(color){
    audio[color].play();
}

function animate(selector){
    $(selector).addClass("pressed");
    makeSound(selector);
    setTimeout(function(){
        $(selector).removeClass("pressed");
    }, 500);
}

function isMobile() {
    if (navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)) {
       return true ;
    } else {
       return false ;
    }
}
