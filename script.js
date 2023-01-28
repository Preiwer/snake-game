var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
var cell = 10;

//Snake
var snake = [];
var count = 10;
var pX = ~~(canvas.width / 2 / cell) * cell;
var pY = ~~(canvas.height / 2 / cell) * cell;
var direction = "right";

//Apple
var aX = ~~(Math.random() * (canvas.width / 2 / cell)) * cell;
var aY = ~~(Math.random() * (canvas.height / 2 / cell)) * cell;

function move() {
  if (direction == "right") {
    pX += cell;
  } else if (direction == "left") {
    pX -= cell;
  } else if (direction == "up") {
    pY -= cell;
  } else if (direction == "down") {
    pY += cell;
  }
}

function loop() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  function Apple() {
    context.fillRect(aX, aY, cell, cell);
  }
  //Spawn the Snake
  function Snake() {
    move();
    //Portal
    if (pX < 0) {
      pX = canvas.width;
    } else if (pX > canvas.width) {
      pX = 0;
    }
    if (pY > canvas.height) {
      pY = 0;
    } else if (pY < 0) {
      pY = canvas.height;
    }
    //Sneak's head
    var head = {
      x: pX,
      y: pY,
    };
    snake.unshift(head); //we will add the head on the top of the snake

    //Draw all of the snake boxes
    snake.forEach((elem) => {
      context.fillRect(elem.x, elem.y, cell, cell);
    });
    for (let i = 1; i < snake.length; i++) {
      //if snak's head hits with snakes body
      if (head.x == snake[i].x && head.y == snake[i].y) {
        count = 3;
      }
    }
    // bind the length of the snake to count's value
    if (snake.length < count) {
      snake.push({ x: pX, y: pY });
    } else if (snake.length > count) {
      //if snake's length more than count
      snake.pop(); //pop()
    }

    if (head.x == aX && head.y == aY) {
      aX = ~~(Math.random() * (canvas.width / 2 / cell)) * cell;
      aY = ~~(Math.random() * (canvas.height / 2 / cell)) * cell;
      count += 1;
    }
    snake.pop(); //avoid of the infinity drawing the snake:)
  }
  Apple();
  Snake();
}

//Secret

document.addEventListener("keydown", (e) => {
  console.log(e.key);
  if (e.key == "ArrowUp" && direction != "down") {
    return (direction = "up");
  } else if (e.key == "ArrowDown" && direction != "up") {
    return (direction = "down");
  } else if (e.key == "ArrowLeft" && direction != "right") {
    return (direction = "left");
  } else if (e.key == "ArrowRight" && direction != "left") {
    return (direction = "right");
  }
});

setInterval(loop, 1000 / 20);
