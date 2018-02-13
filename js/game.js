var game;
$(function() {
  game = new Game();

  // submit button
  $('#submit').click(function(e) {
    var result = game.playersGuessSubmission(+$('#player-input').val());
    $('#player-input').val('');
    $('#tip').html(result);
    $('#tip:hidden').fadeIn();
    // display guess
    $('#guesses li:nth-child(' + game.pastGuesses.length + ')').text(game.pastGuesses[game.pastGuesses.length - 1]);
    diff = game.difference();
    offVal = setOffVal(game.playersGuess - game.winningNumber);
    if (game.isOver) { 
      $('#player-input, #submit, #hint').prop('disabled', true); 
      diff = DIFF;
    }
  });

  // 'enter' key does the same thing
  $('#player-input').keyup(function(e) {
    if (e.which == 13) { $('#submit').click(); }
  })

  // hint
  $('#hint').click(function() {
    let win = game.provideHint();
    let item = $('<p>The winning number is <b><em>' + win[0] + '</em></b>, <b><em>' + win[1] + '</em></b>, <b><em>' + win[2] + '</em></b>, <b><em>' + win[3] + '</em></b>, or <b><em>' + win[4] + '</em></b>.</p>').hide().fadeIn();
    $('#tip').append(item);
    $(this).prop('disabled', true);
    $('#tip:hidden').fadeIn();
  })

  // reset game
  $('#reset').click(function() {
    game = newGame();
    $('#player-input, #submit, #hint').prop('disabled', false);
    $('#guesses').find('li').text('-');
    $('#player-input').focus();
    $('#tip').text('');
    $('#tip').fadeOut();
    yoff = Math.random()*10;
    diff = DIFF;
    offVal = setOffVal(-DIFF);
  });
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
  var msg = '',
    resetM = "Press 'Reset' to play again!";
  if (this.playersGuess === this.winningNumber) {
    this.pastGuesses.push(this.playersGuess);
    msg = 'You Win!<br>' + resetM;
    this.isOver = true;
  } else if (this.pastGuesses.indexOf(this.playersGuess) > -1) {
    msg = 'You have already guessed that number.<br>' + this.isLower();
  } else {
    this.pastGuesses.push(this.playersGuess);
    if (this.pastGuesses.length >= 5) {
      msg = 'You Lose. <br>The winning number is <b><em>' + this.winningNumber + '</em></b>.<br>' + resetM;
      this.isOver = true;
    } else if (this.difference() < 10) {
      msg = 'You\'re burning up!<br>' + this.isLower();
    } else if (this.difference() < 25) {
      msg = 'You\'re lukewarm.<br>' + this.isLower();
    } else if (this.difference() < 50) {
      msg = 'You\'re a bit chilly.<br>' + this.isLower();
    } else if (this.difference() < 100) {
      msg = 'You\'re ice cold!<br>' + this.isLower();
    }
  }
  return msg;
};

Game.prototype.provideHint = function() {
  var hint = [this.winningNumber];
  for (var i = 0; i < 4; i++) {
    hint.push(generateWinningNumber());
  }
  return shuffle(hint);
};