
$(function() {

  let p5Func = function (obj) {

    let x1 = 250;
    let y1 = 250;

    let diff = 30;

    let x2 = x1 + diff;
    let y2 = y1;

    obj.setup = function () {
      console.log('started');
      obj.createCanvas(500, 500);
      //obj.frameRate(1000);
      obj.stroke(255);
      obj.strokeWeight(10);
    };

    obj.draw = function () {
      //console.log('starting');
      obj.background(0);
      obj.line(x1, y1, x2, y2);
      if(x2 > obj.width) {
        x1 = 0;
        x2 = diff;
      } else {
        x1++;
        x2++;
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
