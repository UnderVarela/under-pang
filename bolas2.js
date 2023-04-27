let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let score = 0;
let level = 1;
let ballCount = 1;
let balls = [];

function init() {
  for (let i = 0; i < ballCount; i++) {
    balls.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: 10,
      color: "#0095DD",
      speed: 1,
      dx: Math.random() < 0.5 ? -1 : 1,
      dy: Math.random() < 0.5 ? -1 : 1
    });
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score, 8, 20);
  ctx.fillText("Level: " + level, canvas.width - 70, 20);

  balls.forEach(function(ball, index) {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();

    ball.x += ball.speed * ball.dx;
    ball.y += ball.speed * ball.dy;

    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
      ball.dx = -ball.dx;
    }
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
      ball.dy = -ball.dy;
    }
  });

  balls.forEach(function(ball, index) {
    if (mouseX >= ball.x - ball.radius && mouseX <= ball.x + ball.radius && mouseY >= ball.y - ball.radius && mouseY <= ball.y + ball.radius) {
      score++;
      ball.radius = 30;
      ball.color = "red";
      setTimeout(function() {
        ball.radius = 10;
        ball.color = "#0095DD";
        ball.x = Math.random() * canvas.width;
        ball.y = Math.random() * canvas.height;
        ball.speed += 0.1 * level; // increase speed by 0.1 times current level
      }, 500);
      if (score % 5 === 0) {
        level++;
        ballCount++; // add another ball when score is a multiple of 5
        for (let i = 0; i < ballCount; i++) {
          balls.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: 10,
            color: "#0095DD",
            speed: 1 + 0.1 * level, // increase speed by 0.1 times current level
            dx: Math.random() < 0.5 ? -1 : 1,
            dy: Math.random() < 0.5 ? -1 : 1
          });
        }
      }
    }
  });

  requestAnimationFrame(draw);
}

init();
draw();
