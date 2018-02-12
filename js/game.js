$(function() {
  var game = new Game();

  // submit button
  $('#submit').click(function(e) {
    var result = game.playersGuessSubmission(+$('#player-input').val());
    $('#player-input').val('');
    $('#tipL div').first().html(result[0]);
    $('#tipR').text(result[1]);
    // display guess
    $('#guesses li:nth-child(' + game.pastGuesses.length + ')').text(game.pastGuesses[game.pastGuesses.length-1]);
    if(game.isOver) $('#player-input, #submit, #hint').prop('disabled', true);
    addTip();
  });

  // 'enter' key does the same thing
  $('#player-input').keyup(function(e) {
    if (e.which == 13) { $('#submit').click(); }
  })

  // hint
  $('#hint').click(function() {
    let win = game.provideHint();
    $('#tipL div').last().text('The winning number is ' + win[0] + ', ' + win[1] + ', or ' + win[2]);
    $(this).prop('disabled', true);
    addTip();
  })

  // reset game
  $('#reset').click(function() {
    game = newGame();
    $('#player-input, #submit, #hint').prop('disabled', false);
    $('#guesses').find('li').text('-');
    $('#main').find('#tipL > div, #tipR').text('');
    $('#player-input').focus();
    $('#tipL, #tipR').removeClass('tip');
  });

  function addTip() {
    if(!$('#tipL, #tipR').hasClass('tip')) $('#tipL, #tipR').addClass('tip');
  }
})

//****** FUNCTIONS ********//

function generateWinningNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

function shuffle(arr) {
  var len = arr.length,
    i, temp;
  while (len) {
    i = Math.floor(Math.random() * len--);
    temp = arr[len];
    arr[len] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

function newGame() {
  return new Game();
}

function Game() {
  this.playersGuess = null;
  this.pastGuesses = [];
  this.winningNumber = generateWinningNumber();
  this.isOver = false;
}

Game.prototype.difference = function() {
  return Math.abs(this.playersGuess - this.winningNumber);
};

Game.prototype.isLower = function() {
  return this.playersGuess < this.winningNumber ? 'Guess Higher!' : 'Guess Lower!';
};

Game.prototype.playersGuessSubmission = function(guess) {
  if (!Number.isInteger(guess) || guess < 1 || guess > 100) {
    throw 'That is an invalid guess.';
  } else {
    this.playersGuess = guess;
    return this.checkGuess();
  }
};

Game.prototype.checkGuess = function() {
  var msg = [], resetM = "Press 'Reset' to play again!";
  if (this.playersGuess === this.winningNumber) {
    msg = ['You Win!', resetM];
    this.isOver = true;
  } else if (this.pastGuesses.indexOf(this.playersGuess) > -1) {
    msg = ['You have already guessed that number.', this.isLower()];
  } else {
    this.pastGuesses.push(this.playersGuess);
    if (this.pastGuesses.length >= 5) {
      msg = ['You Lose. <br>The winning number is ' + this.winningNumber + '.', resetM];
      this.isOver = true;
    } else if (this.difference() < 10) {
      msg = ['You\'re burning up!', this.isLower()];
    } else if (this.difference() < 25) {
      msg = ['You\'re lukewarm.', this.isLower()];
    } else if (this.difference() < 50) {
      msg = ['You\'re a bit chilly.', this.isLower()];
    } else if (this.difference() < 100) {
      msg = ['You\'re ice cold!', this.isLower()];
    }
  }
  return msg;
};

Game.prototype.provideHint = function() {
  var hint = [this.winningNumber];
  for (var i = 0; i < 2; i++) {
    hint.push(generateWinningNumber());
  }
  return shuffle(hint);
};