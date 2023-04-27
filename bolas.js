let aciertos = 0;
let level = 1;
let speed = 3;
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let balls = [{ x: 50, y: 50, r: 10 }];

function drawBall(ball) {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI);
  ctx.fillStyle = 'blue';
  ctx.fill();
  ctx.closePath();
}

function updateBall() {
  balls.forEach(ball => {
    ball.x += ball.dx;
    ball.y += ball.dy;
    if (ball.x + ball.r > canvas.width || ball.x - ball.r < 0) ball.dx = -ball.dx;
    if (ball.y + ball.r > canvas.height || ball.y - ball.r < 0) ball.dy = -ball.dy;
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  balls.forEach(drawBall);
  updateBall();
  requestAnimationFrame(draw);
}

canvas.addEventListener('click', e => {
  balls.forEach(ball => {
    if (Math.sqrt(Math.pow(ball.x - e.offsetX, 2) + Math.pow(ball.y - e.offsetY, 2)) <= ball.r) {
      balls.splice(balls.indexOf(ball), 1);
      aciertos++;
      if (aciertos % 5 === 0) {
        level++;
        for (let i = 0; i < level; i++) {
          balls.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: 10, dx: Math.random() * speed, dy: Math.random() * speed });
        }
      }
      speed += 0.5;
    }
  });
});

draw();
