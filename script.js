let canvas = document.getElementById("gameBoard");
let ctx = canvas.getContext("2d");

let counter = document.getElementById("counter");


const cellWidth = 29; 
const cellHeight = 29;
const gridCol = 20;
const gridRow = 12;

let gameSpeed = 400;

const grid = [];

for (let y = 0; y < gridRow; y++){
  grid[y] = [];
  for (let x = 0; x < gridCol; x++){
    grid[y][x] = 0;
  }
}

function drawGrid() {
  for (let y = 0; y < gridRow; y++) {
    for (let x = 0; x < gridCol; x++) {
      const cellX = x * cellWidth;
      const cellY = y * cellHeight;
      // ctx.fillStyle = "rgba(210, 209, 209, 0.6)";
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)"
      ctx.fillRect(cellX, cellY, cellWidth, cellHeight);
      ctx.strokeStyle = "greenyellow";
      ctx.strokeRect(cellX, cellY, cellWidth, cellHeight);

      if (grid[y][x] === 1) {
        ctx.fillStyle = "blue";
        ctx.fillRect(cellX, cellY, cellWidth, cellHeight);
      }
    }
  }
}



let snakeWidth = 26;
let snakeHeight = 26;
let snakeDirection = "right";

let snakeBody = [
  { x: 12, y: 6 },
  { x: 11, y: 6 },
  { x: 10, y: 6 }
]

console.log(snakeBody);

let snakeGrows = false;

let food = {
  x: 0,
  y: 0,
  size: 20
};

// function feedTheBeast() {
//   if (snakeBody.some(part => part.x === food.x && part.y === food.y)) {
//   }
//   food.x = Math.floor(Math.random() * gridCol);
//   food.y = Math.floor(Math.random() * gridRow);
//   makeFood();
// }

function feedTheBeast() {
  while (true) {
    food.x = Math.floor(Math.random() * gridCol);
    food.y = Math.floor(Math.random() * gridRow);
    
    let check = false;
    for (let i = 0; i < snakeBody.length; i++) {
      if (food.x === snakeBody[i].x && food.y === snakeBody[i].y) {
        check = true;
        break;
      }
    }
    if (!check) {
      makeFood();
      break;
    }
  }
}

function makeFood() {
  ctx.fillStyle = "red";
  // ctx.fillRect(food.x * cellWidth, food.y * cellHeight, food.size, food.size);
  ctx.fillRect(food.x * cellWidth + cellWidth / 2 - food.size / 2, food.y * cellHeight + cellHeight / 2 - food.size / 2, food.size, food.size);
}

function initializeGame() {
  feedTheBeast();
  gameLoop();
}

function drawSnake() {
  ctx.fillStyle = "black";
  for (let i = 0; i < snakeBody.length; i++){
    const { x, y } = snakeBody[i];
    ctx.fillRect(x * cellWidth + cellWidth / 2 - snakeWidth / 2 , y * cellHeight + cellHeight / 2 - snakeHeight / 2, snakeWidth, snakeHeight);
  }
}


document.addEventListener("keydown", function (moveEvent) {
  if (moveEvent.key === "ArrowLeft" && snakeDirection !== "right") {
    snakeDirection = "left";
    console.log(snakeDirection);
  } else if (moveEvent.key === "ArrowRight" && snakeDirection !== "left") {
    snakeDirection = "right";
    console.log(snakeDirection);
  } else if (moveEvent.key === "ArrowUp" && snakeDirection !== "down") {
    snakeDirection = "up";
    console.log(snakeDirection);
  } else if (moveEvent.key === "ArrowDown" && snakeDirection !== "up") {
    snakeDirection = "down";
    console.log(snakeDirection);
  }
});


function moveSnake() {

  let head = { x: snakeBody[0].x, y: snakeBody[0].y };

  switch (snakeDirection) {
    case "left":
      head.x -= 1;
      break;
    case "up":
      head.y -= 1;
      break;
    case "right":
      head.x += 1;
      break;
    case "down":
      head.y += 1;
      break;
  }
  snakeBody.unshift(head);

  gameOver();

  feedTouch();

}


let count = 0;

function feedTouch() {
  if (snakeBody[0].x === food.x && snakeBody[0].y === food.y) {
    snakeBody.push({ x: snakeBody.x, y: snakeBody.y });
    snakeBody.pop();
    feedTheBeast();
    count += 1;
    counter.value = count;
    if (count % 6 === 0 && gameSpeed > 150) {
      gameSpeed -= 50;
    }
    console.log(snakeBody);
    } else snakeBody.pop();
}
  
let isGameOver = false;


// function gameOver() {
//   let insideCheck = false;

//   const headX = snakeBody[0].x;
//   const headY = snakeBody[0].y;

//   if (headX < 0 || headX >= gridCol || headY >= gridRow || headY < 0) {
//     insideCheck = true;
//     isGameOver = true;
//     console.log("játék vége");
//     cancelAnimationFrame(gameLoop);
    
//     ctx.fillStyle="black";
//     ctx.font="50px verdana";
//     ctx.fillText("Game Over! ", canvas.height / 6.5, canvas.height / 2);
    
//   }
// }

function gameOver() {
  let insideCheck = false;

  const headX = snakeBody[0].x;
  const headY = snakeBody[0].y;

  if (headX < 0 || headX >= gridCol || headY >= gridRow || headY < 0) {
    insideCheck = true;
    isGameOver = true;
  }

  for (let i = 1; i < snakeBody.length; i++){
    if (snakeBody[i].x === snakeBody[0].x && snakeBody[i].y === snakeBody[0].y) {
      insideCheck = true;
      isGameOver = true;
    }
  }
    
    if (insideCheck) {
      console.log("játék vége");
      cancelAnimationFrame(gameLoop);
    
      ctx.fillStyle = "white";
      ctx.font = "50px verdana";
      ctx.fillText("Game Over! ", canvas.height / 6.5, canvas.height / 2);
    }
  }


// function feedTheBeast() {
//   food.x = Math.floor(Math.random() * gridCol);
//   food.y = Math.floor(Math.random() * gridRow);
//   makeFood();
// }


// function feedTouch() {
//   return snakeBody[0].x === food.x && snakeBody[0].y === food.y;
// }


// function gameLoop() {
//   moveSnake();

//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   drawGrid();

//   drawSnake();
 

  
//   setTimeout(() => {
//     requestAnimationFrame(gameLoop);
//   }, 500);
// }

function gameLoop() {
  if (isGameOver) return;


  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  moveSnake();
  
  /* Draw gameboard, generate the snake and food */
  drawSnake();
  drawGrid();
  makeFood();
  /* Section end */

  gameOver();
  


  if (!isGameOver) {
    setTimeout(() => {
      requestAnimationFrame(gameLoop);
    }, gameSpeed);
  }
}

initializeGame();