var score = document.getElementById("score");
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
var cell = 10;
var grid = {
  x: ~~(canvas.width / 2 / cell),
  y: ~~(canvas.height / 2 / cell),
};

//Snake
var snake = {
  x: grid.x * cell,
  y: grid.y * cell,
  box: [],
  count: 10,
  direction: "right",
};

//Apple
var apple = {
  x: ~~(Math.random() * grid.x) * cell,
  y: ~~(Math.random() * grid.y) * cell,
};

function move() {
  switch (snake.direction) {
    case "up":
      snake.y -= cell;
      break;
    case "down":
      snake.y += cell;
      break;
    case "right":
      snake.x += cell;
      break;
    case "left":
      snake.x -= cell;
      break;
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key == "ArrowUp" && snake.direction != "down") {
    snake.direction = "up";
  }
  if (e.key == "ArrowDown" && snake.direction != "up") {
    snake.direction = "down";
  }
  if (e.key == "ArrowLeft" && snake.direction != "right") {
    snake.direction = "left";
  }
  if (e.key == "ArrowRight" && snake.direction != "left") {
    snake.direction = "right";
  }
});

setInterval(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //Draw the apple
  function The_Apple() {
    ctx.fillStyle = "red";
    ctx.fillRect(apple.x, apple.y, cell, cell);
  }

  //Draw the snake
  function The_Snake() {
    //Move the snake
    move();

    //Portal
    if (snake.x < 0) {
      snake.x = canvas.width - cell;
    } else if (snake.x > canvas.width - cell) {
      snake.x = 0;
    }
    if (snake.y > canvas.height - cell) {
      snake.y = 0;
    } else if (snake.y < 0) {
      snake.y = canvas.height - cell;
    }

    //Draw the head of the snake
    var head = {
      x: snake.x,
      y: snake.y,
    };
    snake.box.unshift(head);

    //Draw the boxes of sneak
    snake.box.forEach((elem) => {
      ctx.fillStyle = "green";
      ctx.fillRect(elem.x, elem.y, cell, cell);
    });

    if (snake.x == apple.x && snake.y == apple.y) {
      apple.x = ~~(Math.random() * grid.x) * cell;
      apple.y = ~~(Math.random() * grid.y) * cell;
      snake.count++;
      score.innerHTML++;
    }
    for (let i = 1; i < snake.box.length; i++) {
      if (head.x == snake.box[i].x && head.y == snake.box[i].y) {
        snake.count = 5;
        score.innerHTML = "0";
      }
    }

    if (snake.box.length < snake.count) {
      snake.box.push({ x: snake.x, y: snake.y });
    } else if (snake.box.length > snake.count) {
      snake.box.pop();
    }
    snake.box.pop();
  }
  The_Apple();
  The_Snake();
}, 1000 / 25);
