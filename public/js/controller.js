function Controller(view, game, user, firebase) {
  this.view = view;
  this.game = game;
  this.user = user;
  this.firebase = firebase;
}
Controller.prototype = {
  bindListeners: function() {
    var getLogout = this.view.getLogout();
    var getLogin = this.view.getLogin();
    var getStart = this.view.getStart();
    getLogin.on('click', this.login.bind(this));
    getLogout.on('click', this.logout.bind(this));
    getStart.on('click', this.readyForGame.bind(this));
    this.firebase.getAvailableUsers();
    // firebase.makeActiveGameDbLink().on('child_added', this.getActiveGames.bind(this));
  },
  login: function() {
    this.user.authenticate();
    this.user.login(this.userLoggedIn.bind(this));
  },
  userLoggedIn: function() {
    this.view.userLoggedIn();
    this.view.displayStart()
  },
  logout: function() {
    this.user.logout();
    this.view.userLoggedOut();
  },
  setUserAvailabilityToTrue: function() {
    this.user.available = true
    this.firebase.setUserAvailabilityToTrue(this.user.userId)

  },
  setUserAvailabilityToFalse: function() {
    this.user.available = false
    this.firebase.setUserAvailabilityToFalse(this.user.userId)
  },
  readyForGame: function() {
    this.setUserAvailabilityToTrue()
    if (this.firebase.getAvailableUsers() >= this.game.numberOfPlayers) {
      var players = this.getAvailablePlayersForGame()
      this.game.questionSet = this.firebase.getQuizQuestions()
      // var triviaRound = this.firebase
    } else {
      this.view.displayMessage("waiting for players to join game")
    }
  },
  getAvailablePlayersForGame: function() {
    return this.firebase.addPlayersToGame(this.game.numberOfPlayers)
  },
  // amIPlaying: function(e) {
  //   if (this.user.current_user() && this.user.available) {
  //     var gameObjects = e.val();
  //     for (key in gameObjects) {
  //       var object = gameObjects[key];
  //       this.checkPlayerId(object);
  //     }
  //   }
  // },
//   checkPlayerId: function(game) {
//     if (game.player_1 === this.user.uid() || game.player_2 === this.user.uid()) {
//       this.game.removeProposedGame();
//       this.readyForGame();
//     }
//   },

//   getActiveGames: function() {
//     firebase.getActiveGameDbLink().once('value', this.amIPlaying.bind(this));
//   },

//   proposeGame: function() {
//     firebase.makeGameDbLink();
//     var message = this.game.proposeGame();
//     this.view.hideChallenge();
//     this.view.displayMessage(message);
//   },

//   prepForStartGame: function() {
//     this.game.make2PlayerGame();
//   },

/////////////GamePlay Logic//////////////////

//   startGame: function() {
//     this.user.setAvailability(false);
//     this.removeAnswerListeners();
//     this.view.hideStartButton();
//     this.view.hideScore();
//     this.game.resetScore();
//     this.view.displayQuizBox();
//     this.loadFirstQuestion();
//     this.view.displayTimer();
//   },

//   startQuestionTimer: function() {
//     this.view.setCountDownTime(20);
//     this.currentTimer = window.setInterval(this.countDownTimer.bind(this), 1000);
//   },

//   countDownTimer: function() {
//     var time = this.view.getCountDownTime();
//     this.deincrementTimer(time);
//   },

//   deincrementTimer: function(time) {
//     time --;
//     if (time < 0) {
//       this.timeRanOut();
//     } else {
//       this.view.setCountDownTime(time);
//     }
//   },

//   stopQuestionTimer: function(time) {
//     clearInterval(this.currentTimer);
//   },

//   loadFirstQuestion: function() {
//     var promise = this.game.loadQuestions();
//     var that = this;
//     promise.then(function(value) {
//       that.view.displayQuestion(that.game.currentQuestion(value));
//       that.view.displayAnswers(that.game.currentAnswers(value));
//       that.addAnswerListeners();
//       that.startQuestionTimer();
//     }, function(value) {
//       console.log('you suck more');
//     });
//   },

//   addAnswerListeners: function() {
//     this.view.getQuizBox().on('click', '.answer', this.checkAnswer.bind(this));
//   },

//   removeAnswerListeners: function() {
//     this.view.getQuizBox().unbind('click');
//   },

//   removeTextDecoration: function() {
//     this.view.getAnswers().css('text-decoration', 'none');
//   },

//   timeRanOut: function() {
//     this.removeAnswerListeners();
//     this.stopQuestionTimer();
//     this.view.makeCorrectAnswerGreen(this.view.getAnswers()[this.game.checkCorrectAnswer()]);
//     this.game.nextQuestionId();
//     setTimeout(this.loadQuestion.bind(this), 1500);
//   },

//   checkAnswer: function() {
//     this.removeAnswerListeners();
//     this.stopQuestionTimer();
//     if(this.game.checkCorrectAnswer() == event.target.dataset.id) {
//       this.view.makeCorrectAnswerGreen(event.target);
//       this.game.increaseScore();
//     } else {
//       this.view.makeIncorrectAnswerRed(event.target);
//       this.view.makeCorrectAnswerGreen(this.view.getAnswers()[this.game.checkCorrectAnswer()]);
//     }
//     this.game.nextQuestionId();
//     setTimeout(this.loadQuestion.bind(this), 1000);
//   },

//   loadQuestion: function() {
//     this.removeTextDecoration();
//     if ( this.game.gameOver() ) {
//       this.endGame();
//     } else {
//       this.startQuestionTimer();
//       this.view.displayQuestion(this.game.nextQuestion());
//       this.view.displayAnswers(this.game.nextAnswers());
//       this.addAnswerListeners();
//     }
//   },

//   endGame: function() {
//     this.view.endGame(this.game.displayScore());
//     this.stopQuestionTimer();
//     this.view.hideTimer();
//     this.game.resetQuestionId();
//     this.game.removeActiveGame();
//   },

};

