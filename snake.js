// const canvas = $("#game");
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const ground = new Image();
ground.src = "img/ground.png"; // ячейки для еды 32px х 32px
const foodImg = new Image();
foodImg.src = "img/cookie.png";

let box = 32; // width height
let score = 0;

let foodTr = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box, //с учетом верхних полей
};

let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box,
};

document.addEventListener("keydown", direction);
let dir;

function direction(trxk) {
  //trxk = event
  if (trxk.keyCode == 37 && dir != "right") dir = "left";
  else if (trxk.keyCode == 38 && dir != "down") dir = "up";
  else if (trxk.keyCode == 39 && dir != "left") dir = "right";
  else if (trxk.keyCode == 40 && dir != "up") dir = "down";
}

function eatTail(head, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (head.x == arr[i].x && head.y == arr[i].y) {
      clearInterval(game);
      //  let change = document.getElementById("stack");
      //  change.innerHTML = score;
      let change = $("#stack");
      change.html(score);
      //alert(`Your score is: ${score},` + " GAME OVER!");
      window.location.reload();
    }
  }
}

function drawTr() {
  ctx.drawImage(ground, 0, 0);
  ctx.drawImage(foodImg, foodTr.x, foodTr.y);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "black" : "#a77948";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(" MR.THETR1XIK", box * 13, box * 1.5);
  ctx.fillText(`SCORE: ${score}`, box * 2, box * 1.5);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (snakeX == foodTr.x && snakeY == foodTr.y) {
    score++;
    foodTr = {
      x: Math.floor(Math.random() * 17 + 1) * box, // от 1 до 17
      y: Math.floor(Math.random() * 15 + 3) * box,
    };
  } else {
    snake.pop();
  }

  if (
    snakeX < box ||
    snakeX > box * 17 ||
    snakeY < 3 * box ||
    snakeY > box * 17
  ) {
    clearInterval(game);
    let change = $("#stack");
    change.html(score);
    //alert(change);
    //     change.innerHTML = score;

    //alert(`Your score is: ${score}` + " GAME OVER!");
    window.location.reload();
  }

  if (dir == "left") snakeX -= box;
  if (dir == "right") snakeX += box;
  if (dir == "up") snakeY -= box;
  if (dir == "down") snakeY += box;

  let newHead = {
    x: snakeX,
    y: snakeY,
  };
  eatTail(newHead, snake);

  snake.unshift(newHead);
}

let setSpeed = (speed) => {
  localStorage.setItem("speed", speed.toString());
};
let speed = Number(localStorage.getItem("speed"));
if (speed == null) {
  speed = 110;
}
$(document).ready(function () {
  alert("DOM Content loaded");
});
let game = setInterval(drawTr, speed);
