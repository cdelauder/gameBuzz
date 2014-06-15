function Game() {
  this.questionSet = "";
  this.questionId = 0;
  this.currentScore = 0;
}

Game.prototype = {
  loadQuestions: function() {
    var questionData = new Firebase('https://gb0jcnmd3fr.firebaseio-demo.com/');

    var promise = new RSVP.Promise(function(resolve, reject) {

      questionData.limit(1).once('value', function(e) {
        if (e !== undefined) {
        console.log('work');

          resolve( e.val()["-JPO-bDsvjRScHW9NP33"].questions );
        }
        else
        {
        console.log('should');

          reject( console.log("shit is messssssed up ERROR"));
        }
      });
    });
    // this is sent to the controller which will then fire off the promise.then function which will decide what to do when the data comes back from firebase
    return promise
  },

    currentQuestion: function(value) {
    // debugger
    // this.questionSet = this.loadQuestions()
    return value[this.questionId].question
  },

  currentAnswers: function() {
    return this.questionSet[this.questionId].answers
  },

  nextQuestionId: function() {
    this.questionId = this.questionId + 1;
  },


}