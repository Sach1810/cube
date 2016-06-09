var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/computer', function(req, res, next){
  res.render('computer');
});

router.get('/phone', function(req, res, next){
  res.render('phone');
});

router.get('/games', function(req, res, next){
  res.render('games');
});

router.get('/rotating-cubes', function(req, res, next){
  res.render('rotatingCubesIntro');
});

router.get('/rotating-cubes/play', function(req, res, next){
  res.render('rotatingCubes');
});

router.get('/rotating-cubes-phone', function(req, res, next){
  res.render('rotatingCubesPhone');
});

router.get('/rotating-cubes/player1', function(req, res, next){
  res.render('rotatingCubesPlayer1');
});

router.get('/rotating-cubes-phone/player1-phone', function(req, res, next){
  res.render('rotatingCubesPhonePlayer1');
});

router.get('/rotating-cubes/player2', function(req, res, next){
  res.render('rotatingCubesPlayer2');
});

router.get('/rotating-cubes-phone/player2-phone', function(req, res, next){
  res.render('rotatingCubesPhonePlayer2');
});

module.exports = router;
