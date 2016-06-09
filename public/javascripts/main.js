//Run socket.io
var socket = io();

var phoneLink = "https://hec.herokuapp.com/rotating-cubes-phone"
var phoneLinkPlayer1 = "https://hec.herokuapp.com/rotating-cubes-phone/player1-phone"
var phoneLinkPlayer2 = "https://hec.herokuapp.com/rotating-cubes-phone/player2-phone"

var playerAmount;

var id;
var computerId;
var phoneId;

var countInterval = 1;
var startTime = 4
var countdownTime = startTime;

var gameDuration = 3;
var totalPlayingTime = gameDuration;

var squareChangeSpeed = 1000;
var inPlay = false;

var score = 0;
var right = 0;
var wrong = 0;


$("#webAddress").html(phoneLink);

$('#qrcode').qrcode({
  "size": 100,
  "color": "#3a3",
  "text": phoneLink});

$('#qrcode1').qrcode({
  "size": 100,
  "color": "#3a3",
  "text": phoneLinkPlayer1});

$('#qrcode2').qrcode({
  "size": 100,
  "color": "#3a3",
  "text": phoneLinkPlayer2});

var players = function(players){
  playerAmount = players;
  console.log(playerAmount);
}

var gameOne = function(){
  $(".title").addClass("hide");
  $("#countdown").removeClass("hide");

socket.on('moved', function(id){
  phoneId = id;
  var maxPoints = 0;
  
  if (inPlay) {
    if (computerId === phoneId && maxPoints === 0) {
      maxPoints ++;
      score ++;
      right ++;

      $("#right").html(right);
    } else {
      score -= 0.5;
      wrong ++;
      $("#wrong").html(wrong);
    };
    $("#score").html(score);
  }

});

socket.on('phoneData', function(coordinates){

  document.getElementById('cubeOne').style.webkitTransform = 
    document.getElementById('cubeOne').style.transform =
      'rotateX(' + coordinates.az + 'deg) ' +
      'rotateY(' + coordinates.gy + 'deg) ' +
      'rotateZ(' + coordinates.bx + 'deg)';


  document.getElementById('cubeTwo').style.webkitTransform = 
    document.getElementById('cubeTwo').style.transform =
      'rotateX(' + coordinates.az + 'deg) ' +
      'rotateY(' + coordinates.gy + 'deg) ' +
      'rotateZ(' + coordinates.bx + 'deg)';

  document.getElementById('cubeThree').style.webkitTransform = 
    document.getElementById('cubeThree').style.transform =
      'rotateX(' + coordinates.az + 'deg) ' +
      'rotateY(' + coordinates.gy + 'deg) ' +
      'rotateZ(' + coordinates.bx + 'deg)';

  document.getElementById('cubeFour').style.webkitTransform = 
    document.getElementById('cubeFour').style.transform =
      'rotateX(' + coordinates.az + 'deg) ' +
      'rotateY(' + coordinates.gy + 'deg) ' +
      'rotateZ(' + coordinates.bx + 'deg)';

  document.getElementById('cubeFive').style.webkitTransform = 
    document.getElementById('cubeFive').style.transform =
      'rotateX(' + coordinates.az + 'deg) ' +
      'rotateY(' + coordinates.gy + 'deg) ' +
      'rotateZ(' + coordinates.bx + 'deg)';

  document.getElementById('cubeSix').style.webkitTransform = 
    document.getElementById('cubeSix').style.transform =
      'rotateX(' + coordinates.az + 'deg) ' +
      'rotateY(' + coordinates.gy + 'deg) ' +
      'rotateZ(' + coordinates.bx + 'deg)';
});

  inPlay = true;
  countdown();
};

var countdown = function(){
  var timeTillStart = setInterval(function(){
    countdownTime -= countInterval;
    $("#countdown").html(countdownTime);

    if (countdownTime === 0) {
      $("#openingScreen").addClass('hide');
      $("#countdown").addClass('hide');
      $("#do-results").removeClass('hide');
      $("#gameEnd").removeClass('hide');
      
      clearInterval(timeTillStart);
      
      startGameOne();
    };

  },1000); 
};
    
var startGameOne = function() {
  inPlay = true;
  gameTime();

  var changeSquares = setInterval(function(){
    var randomNumber = Math.floor(Math.random() * 6) + 1;

    if (randomNumber == 1) {
      id = "cubeOne";
    } else if (randomNumber == 2) {
      id = "cubeTwo";
    } else if (randomNumber == 3) {
      id = "cubeThree";
    } else if (randomNumber == 4) {
      id = "cubeFour";
    } else if (randomNumber == 5) {
      id = "cubeFive";
    } else if (randomNumber == 6) {
      id = "cubeSix";
    };

    computerId = id;

    $("#" + id).css('background-color', 'green');

    setTimeout(function(){
      $("#" + id).css('background-color', 'black');
    }, squareChangeSpeed -100);

  }, squareChangeSpeed);

  setTimeout(function(){
    clearInterval(changeSquares);
    $("#do-results").addClass('hide');
    $("#openingScreen").removeClass('hide');
    $(".gameEnd").removeClass('hide');
    
    reset();

  }, totalPlayingTime * 1000);
};
  
var gameTime = function(){
  
  var countdownGameTime = setInterval(function(){
    totalPlayingTime -= countInterval;
    
    $("#gameTime").html(totalPlayingTime);

    if (totalPlayingTime === 0) {
      clearInterval(countdownGameTime);
      inPlay = false;
    };
  }, 1000);
};

var reset = function(){
  socket.disconnect();
  inPlay = false;
  countdownTime = startTime;
  totalPlayingTime = gameDuration;

  $("#gameTime").html(" ");
  $("#countdown").html(" ");


};

