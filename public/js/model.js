function Game() {
  var questions
  this.questionId = 0
  this.currentScore = 0
}

Game.prototype = {
  loadQuestions: function() {
    var questionData = new Firebase('https://gb0jcnmd3fr.firebaseio-demo.com/');
    questionData.limit(1).once('value', function(e) {
    questions = e.val()
    questions = questions["-JPO-bDsvjRScHW9NP33"].questions
    });
  },

  nextQuestionId: function() {
    return this.questionId++
  }
}