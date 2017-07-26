
$(function() {

  let snakeGame = function (obj) {

    let numSegments = 5;
    let direction = 'right';
    let diff = 20;

    let xCor = [];
    let yCor = [];

    xCor.push(250);
    xCor.push(270);
    xCor.push(290);
    xCor.push(310);
    xCor.push(330);

    yCor.push(250);
    yCor.push(250);
    yCor.push(250);
    yCor.push(250);
    yCor.push(250);

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

    obj.setup = function () {
      console.log('started');
      obj.createCanvas(500, 500);
      obj.frameRate(5);
      obj.stroke(255);
      obj.strokeWeight(10);
    };

    obj.draw = function () {
      // console.log('xCOR : ' + xCor);
      // console.log('yCOR : ' + yCor);
      obj.background(0);
      for(let i=0;i<numSegments-1;i++) {
        obj.line(xCor[i], yCor[i], xCor[i+1], yCor[i+1]);
      }
      updateCordinates();
    };

    obj.keyPressed = function () {
      switch(obj.keyCode) {
      case obj.LEFT_ARROW : direction = 'left';
        break;
      case obj.RIGHT_ARROW : direction = 'right';
        break;
      case obj.UP_ARROW : direction = 'up';
        break;
      case obj.DOWN_ARROW : direction = 'down';
        break;
      }
    };
  };

  let snakeGameObj = new p5(snakeGame);

});
