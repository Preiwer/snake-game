var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
var box = 10;

//Snake
var snake = [];

var dir = "right";
var maxCell = 10;
var can = canvas.getBoundingClientRect();
var px = Math.floor(canvas.width / 2 / 10) * 10;
var py = Math.floor(canvas.height / 2 / 10) * 10;

//Apple
var ax = Math.floor((Math.random() * ~~(canvas.width / box)) / 10) * 10;
var ay = Math.floor((Math.random() * ~~(canvas.height / box)) / 10) * 10;

var loop = setInterval(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  Elems();
}, 1000 / 40);

document.addEventListener("keydown", function (e) {
  if (e.keyCode === 37 && dir !== "right") {
    dir = "left";
    //console.log('left')
  } else if (e.keyCode === 38 && dir !== "down") {
    dir = "up";
    //console.log('up')
  } else if (e.keyCode === 39 && dir !== "left") {
    dir = "right";
    //console.log('right')
  } else if (e.keyCode === 40 && dir !== "up") {
    dir = "down";
    //console.log('down')
  }
});

function direction() {
  if (dir == "right") {
    px += box;
  } else if (dir == "left") {
    px -= box;
  } else if (dir == "up") {
    py -= box;
  } else if (dir == "down") {
    py += box;
  }
}

//Closure )))
function Elems() {
  function Apple() {
    ctx.fillStyle = "green";
    ctx.fillRect(ax, ay, box, box);
  }

  //! Spawn snake
  function Snake() {
    direction();
    if (px >= canvas.width) {
      px = 0;
    }
    if (px + box < 0) {
      px = canvas.width;
    }
    if (py >= canvas.height) {
      py = 0;
    }
    if (py + box < 0) {
      py = canvas.height;
    }
    var head = {
      x: px,
      y: py,
    };
    snake.unshift(head);

    snake.forEach(function (elem, index) {
      ctx.fillStyle = `red`;
      ctx.fillRect(elem.x, elem.y, box, box);
    });
    if (head.x == ax && head.y == ay) {
      maxCell += 1;
      ax = Math.floor(Math.random() * ~~(canvas.width / box)) * 10;
      ay = Math.floor(Math.random() * ~~(canvas.height / box)) * 10;
    }

    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        maxCell = 10;
        px = Math.floor(canvas.width / 2 / 10) * 10;
        py = Math.floor(canvas.height / 2 / 10) * 10;
        clearInterval(loop);
        alert("Game Over:(")
      }
    }
    if (snake.length < maxCell) {
      snake.push({ x: px, y: py });
    }
    snake.pop();
  }

  Snake();
  Apple();
}
