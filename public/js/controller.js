function Controller(view, game) {
  this.view = view;
  this.game = game;
}

Controller.prototype = {
  bindListeners: function() {
    var getLogout = this.view.getLogout();
    var getStart = this.view.getStart();
    var getLogin = this.view.getLogin();
    var getChallenge = this.view.getChallenge();
    getLogin.on('click', this.login.bind(this));
    getLogout.on('click', this.logout.bind(this));
    getChallenge.on('click', this.proposeGame.bind(this));
    },

  login: function() {
    User.authenticate(this.enterGameEnvironment.bind(this));
    User.login()
  },

  enterGameEnvironment: function() {
    if (User.current_user) {
      this.view.userLoggedIn();
      this.game.checkForGames(this.showChallengeOrAccepButton.bind(this));
      //need promise here

    }
  },

  showChallengeOrAccepButton: function(status) {
    debugger
    if (status) {
      this.view.displayAccept();
    } else {
      this.view.displayChallenge();
    }
  },

  logout: function() {
    User.logout();
    this.view.userLoggedOut();
  },

  proposeGame: function() {
    firebase.makeGameDbLink()
    var message = this.game.proposeGame();
    this.view.hideChallenge();
    this.view.displayMessage(message)
  },

  startGame: function() {
    this.removeAnswerListeners();
    this.view.hideStartButton();
    this.view.hideScore();
    this.game.resetScore();
    this.view.displayQuizBox();
    this.loadFirstQuestion();
    this.view.displayTimer();
  },

  startQuestionTimer: function() {
    this.view.setCountDownTime(20);
    this.currentTimer = window.setInterval(this.countDownTimer.bind(this), 1000);
  },

  countDownTimer: function() {
    var time = this.view.getCountDownTime();
    this.deincrementTimer(time);
  },

  deincrementTimer: function(time) {
    time --;
    if (time < 0) {
      this.timeRanOut();
    } else {
      this.view.setCountDownTime(time);
    }
  },

  stopQuestionTimer: function(time) {
    clearInterval(this.currentTimer);
  },

  loadFirstQuestion: function() {
    var promise = this.game.loadQuestions();
    var that = this;
    promise.then(function(value) {
      that.view.displayQuestion(that.game.currentQuestion(value));
      that.view.displayAnswers(that.game.currentAnswers(value));
      that.addAnswerListeners();
      that.startQuestionTimer();
    }, function(value) {
      console.log('you suck more');
    });
  },

  addAnswerListeners: function() {
    this.view.getQuizBox().on('click', '.answer', this.checkAnswer.bind(this));
  },

  removeAnswerListeners: function() {
    this.view.getQuizBox().unbind('click');
  },

  removeTextDecoration: function() {
    this.view.getAnswers().css('text-decoration', 'none');
  },

  timeRanOut: function() {
    this.removeAnswerListeners();
    this.stopQuestionTimer();
    this.view.makeCorrectAnswerGreen(this.view.getAnswers()[this.game.checkCorrectAnswer()]);
    this.game.nextQuestionId();
    setTimeout(this.loadQuestion.bind(this), 1500);
  },

  checkAnswer: function() {
    this.removeAnswerListeners();
    this.stopQuestionTimer();
    if(this.game.checkCorrectAnswer() == event.target.dataset.id) {
      this.view.makeCorrectAnswerGreen(event.target);
      this.game.increaseScore();
    } else {
      this.view.makeIncorrectAnswerRed(event.target);
      this.view.makeCorrectAnswerGreen(this.view.getAnswers()[this.game.checkCorrectAnswer()]);
    }
    this.game.nextQuestionId();
    setTimeout(this.loadQuestion.bind(this), 1000);
  },

  loadQuestion: function() {
    this.removeTextDecoration();
    this.checkGameOver();
    this.startQuestionTimer();
    this.view.displayQuestion(this.game.nextQuestion());
    this.view.displayAnswers(this.game.nextAnswers());
    this.addAnswerListeners();
  },

  checkGameOver: function() {
    if (this.game.gameOver()) {
      this.view.endGame(this.game.displayScore());
      this.stopQuestionTimer();
      this.view.hideTimer();
      this.game.resetQuestionId();
    }
  },

};

// var promise = {
//   waitForMe: function(callback, args) {
//     var waiting = new RSVP.Promise(function(resolve, reject) {
//     debugger
//       var result = callback(args);
//       if (callback() !== undefined) {
//         resolve(result);
//       } else {
//         reject(console.log('there was an error in the promise module'));
//       }
//     });

//     waiting.then(function(value) {
//       return value;
//     }), (function(value) {
//       console.log('there was an error in the then function of the promise module');
//     })
//   }
// }