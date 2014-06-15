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
  incrementQuestionId: function() {
    this.questionId++;
  },
  loadQuestion: function() {
    return questions[this.questionId].question
  },
  loadAnswers: function() {
    return questions[this.questionId].answers
  },
  correctAnswerId: function() {
    return questions[this.questionId].correct_id
  }
}