const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let balls = [{
  x: canvas.width / 2,
  y: canvas.height / 2,
  dx: 2,
  dy: -2,
  radius: 10,
  color: "#0095DD",
  speed: 1
}];

let score = 0;
let level = 1;

canvas.addEventListener('mousedown', function(event) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;
  balls.forEach(function(ball, index) {
    if (mouseX >= ball.x - ball.radius && mouseX <= ball.x + ball.radius && mouseY >= ball.y - ball.radius && mouseY <= ball.y + ball.radius) {
      score++;
      ball.radius = 20;
      ball.color = "red";
      setTimeout(function() {
        ball.radius = 10;
        ball.color = "#0095DD";
        ball.x = Math.random() * canvas.width;
        ball.y = Math.random() * canvas.height;
        ball.speed += 0.2;
      }, 500);
      if (score % 5 === 0) {
        level++;
      }
    }
  });
  if (score === 5 && balls.length === 1) {
    balls.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      dx: 2,
      dy: -2,
      radius: 10,
      color: "#FFA500",
      speed: 1
    });
    level++;
  }
});

function drawBalls() {
  balls.forEach(function(ball) {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
  });
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Aciertos: " + score, 8, 20);
}

function drawLevel() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Nivel: " + Math.floor(score/5) + 1, canvas.width - 80, 20);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawScore();
  drawLevel();
  drawBalls();
  balls.forEach(function(ball) {
    ball.x += ball.dx * ball.speed;
    ball.y += ball.dy * ball.speed;
    if (ball.x + ball.dx > canvas.width-ball.radius || ball.x + ball.dx < ball.radius) {
      ball.dx = -ball.dx;
    }
    if (ball.y + ball.dy > canvas.height-ball.radius || ball.y + ball.dy < ball.radius) {
      ball.dy = -ball.dy;
    }
  });
}

setInterval(draw, 10);
