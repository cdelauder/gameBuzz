function Game() {
  this.questionSet = "";
  this.questionId = 0;
  this.currentScore = 0;
}
Game.prototype = {
  loadQuestions: function() {
    var questionData = new Firebase('https://gb0jcnmd3fr.firebaseio-demo.com/');
    var that = this;
    var promise = new RSVP.Promise(function(resolve, reject) {
      questionData.limit(1).once('value', function(e) {
        if (e !== undefined) {
          that.questionSet = e.val()["-JPO-bDsvjRScHW9NP33"].questions;
          resolve( e.val()["-JPO-bDsvjRScHW9NP33"].questions );
        }
        else
        {
          reject( console.log("shit is messssssed up ERROR"));
        }
      });
    });
    return promise;
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
    this.currentScore = 0
  },
  resetQuestionId: function() {
    this.questionId = 0
  },
};