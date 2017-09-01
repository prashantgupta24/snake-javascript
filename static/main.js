$(function() {

  // $('#restart').on('click', function() {
  //   window.location.reload();
  // });

  if (Cookies.get('username')) {
    //console.log('Welcome back ' + Cookies.get('username'));
    //initializeSnakeGame();
  } else {
    // $('#gameDiv').hide();
    // $('#playerName').focus();
    //
    // $(document).on('keypress', function(event) {
    //   if (event.keyCode === 13) {
    //     setupGame();
    //   }
    // });

    // $('#startGame').on('click', function() {
    //   setupGame();
    // });
  }


  // function setupGame() {
  //   const playerName = $('#playerName').val();
  //   if (playerName.length < 3 ||
  //     playerName.length > 10) {
  //     //$('#error').html('3-10 characters only please');
  //   } else {
  //     Cookies.set('username', playerName);
  //     $('#gameDiv').show();
  //     $(document).unbind('keypress');
  //     initializeSnakeGame();
  //   }
  // }

  // function initializeSnakeGame() {
  //   $('#initialDiv').hide();
  //   $('#restart').hide();
  //
  // }
});

angular.module('snakeGame', [])
  .controller('MainCtrl', MainCtrl);

function MainCtrl() {
  this.score = 1;
  this.usernameSet = false;

  if (Cookies.get('username')) {
    this.usernameSet = true;
    this.username = Cookies.get('username');
    this.initializeSnakeGame();
  }

  this.initializeSnakeGame = function() {
    document.body.scrollTop = 0; // For Chrome, Safari and Opera
    document.documentElement.scrollTop = 0; // For IE and Firefox
    const SNAKE_GAME_OBJ = new p5(SNAKE_GAME.SNAKE_GAME_FUNCTION);
  }

  this.startGame = function() {
    // var promise = this.checkGame();
    // promise.then(this.initializeSnakeGame());

    let promise = new Promise((resolve, reject) => {
      if (this.checkGame()) {
        resolve('Success!');
      } else {
        reject('Oops... something went wrong');
      }
    });

    promise.then(data => {
      console.log(data);
      this.initializeSnakeGame();
    });
  };

  this.checkGame = function() {

    console.log('started game');
    this.usernameSet = true;
    return true;
    //this.initializeSnakeGame();
    //Cookies.set('username', this.username);
  };

}
