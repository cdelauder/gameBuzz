function Controller(view, game) {
  this.view = view;
  this.game = game;
}

Controller.prototype = {
  bindListeners: function() {
    var getLogout = this.view.getLogout();
    var getLogin = this.view.getLogin();
    var getChallenge = this.view.getChallenge();
    var getAccept = this.view.getAccept();

    getLogin.on('click', this.login.bind(this));
    getLogout.on('click', this.logout.bind(this));
    getChallenge.on('click', this.proposeGame.bind(this));
    getAccept.on('click', this.prepForStartGame.bind(this));
    firebase.makeActiveGameDbLink().on('child_added', this.getActiveGames.bind(this));
    },

  amIPlaying: function(e) {
    if (User.current_user() && User.available) {
      var gameObjects = e.val();
      for (key in gameObjects) {
        var object = gameObjects[key];
        this.checkPlayerId(object);
      }
    }
  },

  checkPlayerId: function(game) {
    if (game.player_1 === User.uid() || game.player_2 === User.uid()) {
      this.game.activeGame = game
      this.game.removeProposedGame(game);
      this.startGame();
    }
  },

  getActiveGames: function() {
    firebase.getActiveGameDbLink().once('value', this.amIPlaying.bind(this));
  },

  login: function() {
    User.authenticate(this.enterGameEnvironment.bind(this));
    User.login();
  },

  enterGameEnvironment: function() {
    if (User.current_user) {
      this.view.userLoggedIn();
      this.game.checkForGames(this.showChallengeOrAccepButton.bind(this));
    }
  },

  showChallengeOrAccepButton: function(status) {
    if (status) {
      this.view.gameAvailable();
    } else {
      this.view.noGameAvailable();
    }
  },

  logout: function() {
    if (this.currentTimer) {this.cleanTimer()}
    this.game.removeGames();
    User.logout();
    this.view.userLoggedOut();
  },

  proposeGame: function() {
    firebase.makeGameDbLink();
    var message = this.game.proposeGame();
    this.view.showChallengeMade(message);
  },

  prepForStartGame: function() {
    this.game.make2PlayerGame();
  },

  startGame: function() {
    this.game.startGame()
    this.makeScoreListener()
    User.setAvailability(false);
    this.view.makeGameDisplay();
    this.removeAnswerListeners();
    this.loadFirstQuestion();
  },

  makeScoreListener: function() {
    // debugger
    this.getActiveGame().on('child_changed', this.updateOpponentScore.bind(this))
  },

  updateOpponentScore: function(change) {
    this.view.updateOpponentScore(change.player_2_score)
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
      alert('There was an error loading the first question please refresh your browser.');
    });
  },

  addAnswerListeners: function() {
    this.view.getQuizBox().on('click', '.answer', this.checkAnswer.bind(this));
  },

  startQuestionTimer: function() {
    this.view.setCountDownTime(20);
    this.makeTimer()
  },

  makeTimer: function() {
    this.currentTimer = window.setInterval(this.countDownTimer.bind(this), 1000);
  },

  countDownTimer: function() {
    var time = this.view.getCountDownTime();
    this.decrementTimer(time);
  },

  decrementTimer: function(time) {
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

  removeAnswerListeners: function() {
    this.view.getQuizBox().unbind('click');
  },

  timeRanOut: function() {
    this.cleanTimer();
    this.nextQuestion();
  },

  nextQuestion: function() {
    this.showCorrectAnswer();
    this.game.nextQuestionId();
    setTimeout(this.loadQuestion.bind(this), 1500);
  },

  showCorrectAnswer: function() {
    this.view.makeCorrectAnswerGreen(this.view.getAnswers()[this.game.checkCorrectAnswer()]);
  },

  checkAnswer: function() {
    this.cleanTimer();
    this.evaluateAnswer(event);
    this.game.nextQuestionId();
    this.view.updateScore(this.game.displayScore());
    setTimeout(this.loadQuestion.bind(this), 1000);
  },

  evaluateAnswer: function(event) {
    if(this.game.checkCorrectAnswer() == event.target.dataset.id) {
      this.view.highlightCorrectAnswer(event.target);
      this.game.increaseScore();
    } else {
      this.view.strikeIncorrectAnswer(event.target);
      this.view.highlightCorrectAnswer(this.view.getAnswers()[this.game.checkCorrectAnswer()]);
    }
  },

  loadQuestion: function() {
    this.view.removeAnswerDecoration();
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
    this.cleanTimer();
    this.view.hideTimer();
    this.game.resetQuestionId();
    this.game.removeActiveGame();
    this.nextGame();
  },

  nextGame: function() {
    this.game.checkForGames(this.showChallengeOrAccepButton.bind(this));
  },

  cleanTimer: function() {
    this.removeAnswerListeners();
    this.stopQuestionTimer();
  },

};

