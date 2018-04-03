// setup canvas
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

ctx.fillStyle = "rgb(255, 255, 255)";
ctx.fillRect(0, 0, width, height);


// function to generate random number
function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

function Ball(x, y, vx, vy, color, r){
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.color = color;
  this.r = r;

}

Ball.prototype.draw = function() { 
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
  ctx.fill();
}

Ball.prototype.move = function() { 
  if (this.x+this.vx >= width || this.x +this.vx <=  0){
    this.vx *= -1;
  }
  if (this.y+this.vy >= height || this.y+this.vy <= 0){
    this.vy *= -1;
  }

  this.x += this.vx;
  this.y += this.vy;  
}

Ball.prototype.checkCollision = function(i) { 
  for (let b = 0; b < i; b++){
    var dist = Math.sqrt(Math.pow((this.x-balls[b].x),2) + Math.pow((this.y - balls[b].y),2));
    var dd = this.r+ balls[b].r;
    
    if (dist <= dd){
      this.vx *= -1;
      this.vy *= -1;
      balls[b].vx *= -1;
      balls[b].vy *= -1;
      this.x += 5;
      this.y += 5;
    } 
  }
}

var score = 0; // eat ball +5, every second-1
var eat_ball = 0;
Ball.prototype.checkEat = function(i) { 
  for (let b = 0; b <= i; b++){
    var dist = Math.sqrt(Math.pow((this.x-balls[b].x),2) + Math.pow((this.y - balls[b].y),2));
    var dd = this.r+ balls[b].r;
    
    if (dist <= dd){
      balls[b].color ="rgb(0,0,0)";
      balls[b].x = -10000000;
      balls[b].y = -10000000;
      balls[b].vx =0;
      balls[b].vy =0;
      score += 5;
      eat_ball++;
      
      //document.getElementById("time").innerHTML = "Used Time: " + tt + "s";
    } 
  }
}

var c=0;
var t;
function timedCount()
{
  document.getElementById('txt').innerHTML = "Used Time: " +c+ " s";
  if(score < 10){
      document.getElementById("score").innerHTML = "Score: 0" + score;
  }
  else if (eat_ball === ballnum){
      var final_score = score;
      var total_time = c;
      document.getElementById('txt').innerHTML = "Used Time: " +total_time+ " s";
      document.getElementById("score").innerHTML = "Score: " + final_score + "<br>"+"Completed!";
      return;
  }
  else {
    document.getElementById("score").innerHTML = "Score: " + score;
  }
  c=c+1;
  score -= 1;
  t=setTimeout("timedCount()",1000);
}

timedCount();


// regBalls ----------------------------------------------
var ballnum = 30;
var balls = [];
for (let i = 0; i < ballnum; i++){
  var ball = new Ball(random(0,width), random(0,height), random(-10,10), random(-10,10),
  "rgb("+random(30, 255)+", " +random(30, 255)+", "+random(30, 255)+")",
  random(7,30)
  );
  balls[i] = ball;
}

// EVILball ----------------------------------------------
var EVILball = new Ball(
  random(0,width), random(0,height), 
  0,0,
  "rgb(255,255,255)",
  60
);


function loop(){
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0,0,width,height);
  for (let i = 0; i < ballnum; i++){
    balls[i].draw();
    balls[i].move();
    balls[i].checkCollision(i);
    EVILball.checkEat(i);
  }
  requestAnimationFrame(loop);
  EVILball.draw();
  EVILball.move();
}

loop();


// User Move EVILballs with 37-40
var SPD=10;

document.onkeydown=function (e){
  var bvx=0;
  var bvy=0;
  if (e.keyCode == "37"){
    EVILball.vx = -SPD;
    EVILball.vy =0;
  }
  if (e.keyCode == "38"){
    EVILball.vx = 0;
    EVILball.vy = -SPD;
  }
  if (e.keyCode == "39"){
    EVILball.vx = +SPD;
    EVILball.vy = 0;
  }
  if (e.keyCode == "40"){
    EVILball.vx = 0;
    EVILball.vy = +SPD;
  }
}
