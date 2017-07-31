$(function() {

  const SNAKE_GAME = function(snake) {

    // the snake is divided into small segments, which are drawn and edited on each 'draw' call
    let numSegments = 10;
    let direction = 'right';

    const SNAKE_XSTART = 250; //starting x coordinate for snake
    const SNAKE_YSTART = 250; //starting y coordinate for snake
    const DIFF = 10;

    const X_COR = [];
    const Y_COR = [];

    let xFruit = 0;
    let yFruit = 0;
    const SCORE = $('#score');

    snake.setup = function() {
      //console.log('started');
      const CANVAS = snake.createCanvas(500, 500);
      CANVAS.parent('snakeCanvas');
      snake.frameRate(15);
      snake.stroke(255);
      snake.strokeWeight(10);
      SCORE.html(0);
      updateFruitCoordinates();

      for (let i = 0; i < numSegments; i++) {
        X_COR.push(SNAKE_XSTART + (i * DIFF));
        Y_COR.push(SNAKE_YSTART);
      }
    };

    snake.draw = function() {
      // console.log('xCOR : ' + X_COR);
      // console.log('yCOR : ' + Y_COR);
      snake.background(0);
      for (let i = 0; i < numSegments - 1; i++) {
        snake.line(X_COR[i], Y_COR[i], X_COR[i + 1], Y_COR[i + 1]);
      }
      updateSnakeCoordinates();
      checkGameStatus();
      checkForFruit();
    };

    /*
     The snake segments are updated based on the direction of the snake.
     All segments from 0 to n-1 are just copied over to 1 till n, i.e. segment 0
     gets the value of segment 1, segment 1 gets the value of segment 2, and so on,
     and this results in the movement of the snake.

     The last segment is added based on the direction in which the snake is going,
     if it's going left or right, the last segment's x coordinate is increased by a
     predefined value 'DIFF' than its second to last segment. And if it's going up
     or down, the segment's y coordinate is affected.
    */
    function updateSnakeCoordinates() {

      for (let i = 0; i < numSegments - 1; i++) {
        X_COR[i] = X_COR[i + 1];
        Y_COR[i] = Y_COR[i + 1];
      }
      switch (direction) {
        case 'right':
          X_COR[numSegments - 1] = X_COR[numSegments - 2] + DIFF;
          Y_COR[numSegments - 1] = Y_COR[numSegments - 2];
          break;
        case 'up':
          X_COR[numSegments - 1] = X_COR[numSegments - 2];
          Y_COR[numSegments - 1] = Y_COR[numSegments - 2] - DIFF;
          break;
        case 'left':
          X_COR[numSegments - 1] = X_COR[numSegments - 2] - DIFF;
          Y_COR[numSegments - 1] = Y_COR[numSegments - 2];
          break;
        case 'down':
          X_COR[numSegments - 1] = X_COR[numSegments - 2];
          Y_COR[numSegments - 1] = Y_COR[numSegments - 2] + DIFF;
          break;
        }
    }

    /*
     I always check the snake's head position X_COR[X_COR.length - 1] and
     Y_COR[Y_COR.length - 1] to see if it touches the game's boundaries
     or if the snake hits itself.
    */
    function checkGameStatus() {
      if (X_COR[X_COR.length - 1] > snake.width ||
          X_COR[X_COR.length - 1] < 0 ||
          Y_COR[Y_COR.length - 1] > snake.height ||
          Y_COR[Y_COR.length - 1] < 0 ||
          checkSnakeCollision()) {
        snake.noLoop();
        const SCORE_VAL = SCORE.html();
        SCORE.html('Game ended! Your score was : ' + SCORE_VAL);
      }
    }

    /*
     If the snake hits itself, that means the snake head's (x,y) coordinate
     has to be the same as one of its own segment's (x,y) coordinate.
    */
    function checkSnakeCollision () {
      const SNAKE_HEAD_X = X_COR[X_COR.length - 1];
      const SNAKE_HEAD_Y = Y_COR[Y_COR.length - 1];
      for(let i=0;i<X_COR.length-1;i++){
        if(X_COR[i] === SNAKE_HEAD_X && Y_COR[i] === SNAKE_HEAD_Y) {
          return true;
        }
      }
    }

    /*
     Whenever the snake consumes a fruit, I increment the number of segments,
     and just insert the tail segment again at the start of the array (basically
     I add the last segment again at the tail, thereby extending the tail)
    */
    function checkForFruit() {
      snake.point(xFruit, yFruit);
      if (X_COR[X_COR.length - 1] === xFruit && Y_COR[Y_COR.length - 1] === yFruit) {
        const PREV_SCORE = parseInt(SCORE.html());
        SCORE.html((PREV_SCORE + 1));
        X_COR.unshift(X_COR[0]);
        Y_COR.unshift(Y_COR[0]);
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
      xFruit = snake.floor(snake.random(10,(snake.width-100)/10))*10;
      yFruit = snake.floor(snake.random(10,(snake.height-100)/10))*10;
      //console.log("x - " + xFruit);
      //console.log("y - " + yFruit);
    }

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

  const SNAKE_GAME_OBJ = new p5(SNAKE_GAME);

});
