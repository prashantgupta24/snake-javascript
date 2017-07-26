
$(function() {

  let p5Func = function (obj) {

    let numSegments = 5;
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

    // let x1 = 250;
    // let y1 = 250;
    //
    // let diff = 50;
    //
    // let x2 = x1 + diff;
    // let y2 = y1;

    let direction = 'right';

    function updateCordinates () {

      let diff = 20;
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
      //console.log('drawing');
      console.log('xCOR : ' + xCor);
      console.log('yCOR : ' + yCor);
      //goRight();
      // switch(direction){
      // case 'left' : goLeft();
      //   break;
      // case 'right' : goRight();
      //   break;
      // case 'up' : goUp();
      //   break;
      // case 'down' : goDown();
      //   break;
      // }
      obj.background(0);
      for(let i=0;i<numSegments-1;i++) {
        obj.line(xCor[i], yCor[i], xCor[i+1], yCor[i+1]);
      }
      updateCordinates();

    };

    // function goRight () {
    //   obj.background(0);
    //   obj.line(x1, y1, x2, y2);
    //   if(x2 > obj.width) {
    //     x1 = 0;
    //     x2 = diff;
    //   } else {
    //     x1=x1+5;
    //     x2=x2+5;
    //   }
    // }
    //
    // function goLeft () {
    //   obj.background(0);
    //   obj.line(x1, y1, x2, y2);
    //   if(x1 < 0) {
    //     x2 = obj.width;
    //     x1 = x2-diff;
    //   } else {
    //     x1=x1-5;
    //     x2=x2-5;
    //   }
    // }
    //
    // function goUp () {
    //   obj.background(0);
    //   obj.line(x1, y1, x2, y2);
    //   if(y1 < 0) {
    //     y2 = obj.length;
    //     y1 = y2-diff;
    //   } else {
    //     y1=y1-5;
    //     y2=y2-5;
    //   }
    // }
    //
    // function goDown () {
    //   obj.background(0);
    //   obj.line(x1, y1, x2, y2);
    //   if(y2 > obj.length) {
    //     y1 = 0;
    //     y2 = diff;
    //   } else {
    //     y1=y1+5;
    //     y2=y2+5;
    //   }
    // }



    obj.keyPressed = function () {

      if (obj.keyCode === obj.LEFT_ARROW) {
        console.log("left arrow");
        direction = 'left';

      } else if (obj.keyCode === obj.RIGHT_ARROW) {
        console.log("right arrow");
        direction = 'right';
        //updateCordinates();
      } else if (obj.keyCode === obj.UP_ARROW) {
         console.log("up arrow");
        direction = 'up';
        //updateCordinates();
      } else if (obj.keyCode === obj.DOWN_ARROW) {
         console.log("down arrow");
        direction = 'down';
      }

    };
  };



  let p5Obj = new p5(p5Func);

  let snakeGame = snake();
  snakeGame.start();

  function snake() {

    function _init() {

    }

    function start() {
      //draw();
    }

    function play() {

    }

    return {
      start
    };
  }
});
