function Controller(view, game) {
  this.view = view;
  this.game = game;
  this.authToken = "";
}

Controller.prototype = {
  bindListeners: function() {
    var getLogout = this.view.getLogout();
    var getStart = this.view.getStart();
    getStart.on('click', this.proposeGame.bind(this));
    getLogout.on('click', this.logout.bind(this));
    this.view.getLogin().on('click', this.login.bind(this));
  },

  proposeGame: function() {
    var that = this
    User.dbLink().on('child_changed', function(snaphsot) {
      that.startGame();
    });
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
        User.create(user.displayName, 'location');
        that.view.userLoggedIn();
      } else {
        that.view.userLoggedOut();
      }
    });
  },

  locationPromise: function(user) {
    console.log("locationPromise")
    var that = this;
    var promise = new RSVP.Promise(function(resolve, reject) {
      Location.getLocation('value', that.waitForLocation.bind(that, resolve, reject));
    });
    promise.then(function(value) {
      console.log('promise.then')
      User.create(user.displayName, value);
    }, function(value){
      console.log("location then was a reject");
    });
  },

  waitForLocation: function(resolve, reject, e) {
    if (e !== undefined) {
      console.log("waitForLocation")
      resolve(e);
    } else{
      reject( console.log("location never came"));
    }
  },

  logout: function() {
    User.destroy();
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