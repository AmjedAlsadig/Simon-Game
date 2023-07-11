var seq =[]; //array of sequence pattern
var userInput = [];
var level = 1 ;
var start = false ;

var colors = ["green", "red", "yellow", "blue"];

$(document).keypress(function(){
    if (!start) {
        level = 1;
        generateSequence(level,seq);
        $("h1").text("level " + level) ;
        start = true ;
    }
});

$(".play-btn").click(function(event){
    targetBtn = $(this).attr("id");
    if(start){
        animate(targetBtn);
        userInput.push(targetBtn);
        checkAnswer(userInput.length-1);
    }
});

function generateSequence(lev, arr){
    console.log(arr);
    var randomColor = colors[Math.floor(Math.random()*4)];
    arr.push(randomColor);
    makeSound(randomColor);
    $("#"+randomColor).fadeIn(200).fadeOut(200).fadeIn(200); 
    console.log(arr);
}
function checkAnswer(pressedLength){
    if(seq[pressedLength] === userInput[pressedLength]){
        if(seq.length === userInput.length){
            setTimeout(nextLevel,1000);
        }
    }else{
        makeSound("wrong");
        startOver();
    }

}


function makeSound(color){
        var sound = new Audio("sounds/"+color+".mp3");
        sound.play();
}

function nextLevel(){
    // update ...
    level++;
    userInput=[];
    generateSequence(level,seq)
    $("h1").text("level " + level) ;
    return ;
}
function startOver(){
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    userInput=[];
    seq=[];
    start = false ;
}

function animate(selector){
    $(selector).addClass("pressed");
    makeSound(selector);
    setTimeout(function(){
        $(selector).removeClass("pressed");
    }, 1000);
}
/* Notes
    1. animate the pattern .
    2. pressing a key to continue .
    3.loading -preceeding to- the next level 
    4. styling the game .
*/