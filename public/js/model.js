function Game() {
  this.questionSet = "";
  this.questionId = 0;
  this.currentScore = 0;
}

Game.prototype = {
  loadQuestions: function() {
    var questionData = new Firebase('https://gb0jcnmd3fr.firebaseio-demo.com/');
    var that = this
    var promise = new RSVP.Promise(function(resolve, reject) {
      questionData.limit(1).once('value', function(e) {
        if (e !== undefined) {
          that.questionSet = e.val()["-JPO-bDsvjRScHW9NP33"].questions
          resolve( e.val()["-JPO-bDsvjRScHW9NP33"].questions );
        }
        else
        {
          reject( console.log("shit is messssssed up ERROR"));
        }
      });
    });
    // this is sent to the controller which will then fire off the promise.then function which will decide what to do when the data comes back from firebase
    return promise
  },

    currentQuestion: function(value) {
      debugger
    return value[this.questionId].question
  },

  currentAnswers: function(value) {
    return value[this.questionId].answers
  },

  nextQuestionId: function() {
    this.questionId = this.questionId + 1;
  },
  nextQuestion: function() {
    return questionSet[this.questionId].question
  },
  nextAnswers: function() {
    return questionSet[this.questionId].answers
  },


}