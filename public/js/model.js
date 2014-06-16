function Game() {
  this.questionSet = "";
  this.questionId = 0;
  this.currentScore = 0;
}
Game.prototype = {
    loadQuestions: function() {
    var questionData = new Firebase('https://gamebuzz.firebaseio.com/');
    var that = this;
    var promise = new RSVP.Promise(function(resolve, reject) {
      questionData.limit(1).once('value', that.checkIt.bind(that, resolve, reject));
    });
    // this is sent to the controller which will then fire off the promise.then function which will decide what to do when the data comes back from firebase
    return promise;
  },

  checkIt: function(resolve, reject, e) {
    if (e !== undefined) {
      this.questionSet = e.val()["-JP_sSrn17fov4_11ey_"].questions;
      resolve( e.val()["-JP_sSrn17fov4_11ey_"].questions );
    }
    else
    {
      reject( console.log("shit is messssssed up ERROR"));
    }
  },

  currentQuestion: function(value) {
    return value[this.questionId].question;
  },
  currentAnswers: function(value) {
    return value[this.questionId].answers;
  },
  nextQuestionId: function() {
    this.questionId++;
  },
  nextQuestion: function() {
    return this.questionSet[this.questionId].question;
  },
  nextAnswers: function() {
    return this.questionSet[this.questionId].answers;
  },
  checkCorrectAnswer: function() {
    return this.questionSet[this.questionId].correct_id;
  },
  increaseScore: function() {
    this.currentScore++;
  },
  gameOver: function() {
    return this.questionSet.length === this.questionId;
  },
  displayScore: function() {
    return this.currentScore;
  },
  resetScore: function() {
    this.currentScore = 0;
  },
  resetQuestionId: function() {
    this.questionId = 0;
  },
};

var User = {
  create: function(name, location) {
    var userData = new Firebase('https://gamebuzz.firebaseio.com/-JP_sSrn17fov4_11ey_/users');
    userData.push({name: name, location: location, available: true});
  },

  updateLocation: function(location) {

  },
};

