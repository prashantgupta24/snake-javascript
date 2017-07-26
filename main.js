
$(function() {

  let snakeGame = function (snake) {

    let numSegments = 4;
    let direction = 'right';
    let playing = true;

    let xStart = 250; //starting x coordinate for snake
    let yStart = 250; //starting y coordinate for snake
    let diff = 20;

    let xCor = [];
    let yCor = [];

    function initialize () {
      snake.createCanvas(500, 500);
      snake.frameRate(5);
      snake.stroke(255);
      snake.strokeWeight(10);

      for(let i=0;i<numSegments;i++) {
        xCor.push(xStart+(i*diff));
        yCor.push(yStart);
      }
    }

    function updateCordinates () {

      for(let i=0;i<numSegments-1;i++) {
        xCor[i]=xCor[i+1];
        yCor[i]=yCor[i+1];
      }
      switch(direction){
      case 'right' : xCor[numSegments-1] = xCor[numSegments-2] + diff;
        yCor[numSegments-1] = yCor[numSegments-2];
        break;
      case 'up' : xCor[numSegments-1] = xCor[numSegments-2];
        yCor[numSegments-1] = yCor[numSegments-2] - diff;
        break;
      case 'left' : xCor[numSegments-1] = xCor[numSegments-2] - diff;
        yCor[numSegments-1] = yCor[numSegments-2];
        break;
      case 'down' : xCor[numSegments-1] = xCor[numSegments-2];
        yCor[numSegments-1] = yCor[numSegments-2] + diff;
        break;
      }
    }

    function checkGameStatus () {
      if(xCor[xCor.length-1] > snake.width ||
         xCor[xCor.length-1] < 0 ||
         yCor[yCor.length-1] > snake.height ||
         yCor[yCor.length-1] < 0 ) {
        playing = false;
      }
    }

    snake.setup = function () {
      console.log('started');
      initialize();
    };

    snake.draw = function () {
      // console.log('xCOR : ' + xCor);
      // console.log('yCOR : ' + yCor);
      if(playing) {
        snake.background(0);
        for(let i=0;i<numSegments-1;i++) {
          snake.line(xCor[i], yCor[i], xCor[i+1], yCor[i+1]);
        }
        updateCordinates();
        checkGameStatus();
      }
    };

    snake.keyPressed = function () {
      switch(snake.keyCode) {
      case snake.LEFT_ARROW : direction = 'left';
        break;
      case snake.RIGHT_ARROW : direction = 'right';
        break;
      case snake.UP_ARROW : direction = 'up';
        break;
      case snake.DOWN_ARROW : direction = 'down';
        break;
      }
    };
  };

  let snakeGameObj = new p5(snakeGame);

});
