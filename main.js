$(function() {

  let snakeGame = function(snake) {

    let numSegments = 5;
    let direction = 'right';
    let playing = true;

    let xStart = 250; //starting x coordinate for snake
    let yStart = 250; //starting y coordinate for snake
    let diff = 10;

    let xCor = [];
    let yCor = [];

    let xFruit = 0;
    let yFruit = 0;
    let score = $('#score');

    function initialize() {
      let canvas = snake.createCanvas(500, 500);
      canvas.parent('snakeCanvas');
      snake.frameRate(15);
      snake.stroke(255);
      snake.strokeWeight(10);
      score.html(0);
      updateFruitCoordinates();

      for (let i = 0; i < numSegments; i++) {
        xCor.push(xStart + (i * diff));
        yCor.push(yStart);
      }
    }

    function updateSnakeCoordinates() {

      for (let i = 0; i < numSegments - 1; i++) {
        xCor[i] = xCor[i + 1];
        yCor[i] = yCor[i + 1];
      }
      switch (direction) {
      case 'right':
        xCor[numSegments - 1] = xCor[numSegments - 2] + diff;
        yCor[numSegments - 1] = yCor[numSegments - 2];
        break;
      case 'up':
        xCor[numSegments - 1] = xCor[numSegments - 2];
        yCor[numSegments - 1] = yCor[numSegments - 2] - diff;
        break;
      case 'left':
        xCor[numSegments - 1] = xCor[numSegments - 2] - diff;
        yCor[numSegments - 1] = yCor[numSegments - 2];
        break;
      case 'down':
        xCor[numSegments - 1] = xCor[numSegments - 2];
        yCor[numSegments - 1] = yCor[numSegments - 2] + diff;
        break;
      }
    }

    function checkGameStatus() {
      if (xCor[xCor.length - 1] > snake.width ||
        xCor[xCor.length - 1] < 0 ||
        yCor[yCor.length - 1] > snake.height ||
        yCor[yCor.length - 1] < 0) {
        alert('Game ended! Your score was : ' + score.html());
        playing = false;
      }
    }

    function checkForFruit() {
      snake.point(xFruit, yFruit);
      if (xCor[xCor.length - 1] === xFruit && yCor[yCor.length - 1] === yFruit) {
        let prevScore = parseInt(score.html());
        score.html((prevScore + 1));
        xCor.unshift(xCor[0]);
        yCor.unshift(yCor[0]);
        numSegments++;
        updateFruitCoordinates();
      }
    }

    function updateFruitCoordinates() {
      /*
        The complex math logic is because I wanted the point to lie
        in between 100 and width-100, and be rounded off to the nearest
        number divisible by 10, since I move the snake in multiples of 10.
      */
      xFruit = (Math.floor((Math.random() * ((snake.width - 200) / 10)) + 10) * 10);
      yFruit = (Math.floor((Math.random() * ((snake.height - 200) / 10)) + 10) * 10);
      //console.log("x - " + xFruit);
      //console.log("y - " + yFruit);
    }

    snake.setup = function() {
      console.log('started');
      initialize();
    };

    snake.draw = function() {
      // console.log('xCOR : ' + xCor);
      // console.log('yCOR : ' + yCor);
      if (playing) {
        snake.background(0);
        for (let i = 0; i < numSegments - 1; i++) {
          snake.line(xCor[i], yCor[i], xCor[i + 1], yCor[i + 1]);
        }
        updateSnakeCoordinates();
        checkGameStatus();
        checkForFruit();
      }
    };

    snake.keyPressed = function() {
      switch (snake.keyCode) {
      case snake.LEFT_ARROW:
        if (direction != 'right') {
          direction = 'left';
        }
        break;
      case snake.RIGHT_ARROW:
        if (direction != 'left') {
          direction = 'right';
        }
        break;
      case snake.UP_ARROW:
        if (direction != 'down') {
          direction = 'up';
        }
        break;
      case snake.DOWN_ARROW:
        if (direction != 'up') {
          direction = 'down';
        }
        break;
      }
    };
  };

  let snakeGameObj = new p5(snakeGame);

});
