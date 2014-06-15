function Game() {
  this.questions = null
  this.questionId = 0
  this.score = 0
}

Game.prototype = {
  loadQuestions: function() {
    var questionData = new Firebase('https://gb0jcnmd3fr.firebaseio-demo.com/');
    questionData.limit(1).once('value', function(e) {
    this.questions = e.val()
    this.questions = this.questions["-JPO-bDsvjRScHW9NP33"].questions
    });
  }
}