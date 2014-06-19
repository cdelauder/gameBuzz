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
    $('.test').on('click', this.test.bind(this));

    this.firebase.getAvailableUsers();
    this.firebase.getQuizQuestions();
    this.firebase.gameReference.on('child_added', this.startGame.bind(this));
  },

  test: function() {
    debugger
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
    if (this.currentTimer) {this.stopQuestionTimer}
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

  startGame: function() {
    this.removeAnswerListeners();
    this.view.hideStartButton();
    this.view.hideScore();
    this.game.resetScore();
    this.loadFirstQuestion();
    this.view.displayTimer();
    this.view.displayQuizBox();
  },

  readyForGame: function() {
    this.setUserAvailabilityToTrue()
    this.game.questionSet = this.firebase.gameSetQuestions
    if (this.firebase.getAvailableUsers() >= this.game.numberOfPlayers) {
      var players = this.getAvailablePlayersForGame()
      this.firebase.makeTriviaRound(players, this.firebase.gameSetQuestions)
    } else {
      this.view.displayMessage("waiting for players to join game")
    }
  },

  getAvailablePlayersForGame: function() {
    return this.firebase.addPlayersToGame(this.game.numberOfPlayers)
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
    this.currentTimer = undefined;
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
    if ( this.game.gameOver() ) {
      this.endGame();
    } else {
      this.startQuestionTimer();
      this.view.displayQuestion(this.game.nextQuestion());
      this.view.displayAnswers(this.game.nextAnswers());
      this.addAnswerListeners();
    }
  },

  endGame: function() {
    this.view.endGame(this.game.displayScore());
    this.removeAnswerListeners();
    this.stopQuestionTimer();
    this.view.hideTimer();
    this.game.resetQuestionId();
    this.game.removeActiveGame();
  },

};

