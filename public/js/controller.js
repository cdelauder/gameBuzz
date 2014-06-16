function Controller(view, game) {
  this.view = view;
  this.game = game;
  this.authToken = "";
}

Controller.prototype = {
  bindListeners: function() {
    var getLogout = this.view.getLogout();
    var getStart = this.view.getStart();
    getStart.on('click', this.startGame.bind(this));
    getLogout.on('click', this.logout.bind(this));
    this.view.getLogin().on('click', this.login.bind(this));
  },

  login: function() {
    this.makeAuthObject();
    this.auth.login('facebook');
  },

  makeAuthObject: function() {
    var gameBuzz = new Firebase('https://gamebuzz.firebaseio.com');
    var that = this;
    this.auth = new FirebaseSimpleLogin(gameBuzz, function(error, user) {
      if (error) {
        alert(error);
      } else if (user) {
        that.view.userLoggedIn();
      } else {
        that.view.userLoggedOut();
      }
    });
  },

  logout: function() {
    this.auth.logout();
  },

  startGame: function() {
    this.removeAnswerListeners();
    this.view.hideStartButton();
    this.view.hideScore();
    this.game.resetScore();
    this.view.displayQuizBox();
    this.loadFirstQuestion();
  },

  loadFirstQuestion: function() {
    var promise = this.game.loadQuestions();
    var that = this;
    promise.then(function(value) {
      that.view.displayQuestion(that.game.currentQuestion(value));
      that.view.displayAnswers(that.game.currentAnswers(value));
      that.addAnswerListeners();
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

  checkAnswer: function() {
    this.removeAnswerListeners();
    if(this.game.checkCorrectAnswer() == event.target.dataset.id) {
      this.view.makeCorrectAnswerGreen(event.target);
      this.game.increaseScore();
    } else {
      this.view.makeIncorrectAnswerRed(event.target);
      this.view.makeCorrectAnswerGreen(this.view.getAnswers()[this.game.checkCorrectAnswer()]);
    }
    this.game.nextQuestionId();
    setTimeout(this.loadQuestion.bind(this), 500);
  },

  loadQuestion: function() {
    this.removeTextDecoration();
    this.checkGameOver();
    this.view.displayQuestion(this.game.nextQuestion());
    this.view.displayAnswers(this.game.nextAnswers());
    this.addAnswerListeners();
  },

  checkGameOver: function() {
    if (this.game.gameOver()) {
      this.view.endGame(this.game.displayScore());
      this.game.resetQuestionId();
    }
  }

};