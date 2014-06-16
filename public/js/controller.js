function Controller(view, game) {
  this.view = view
  this.game = game
}
Controller.prototype = {
  bindListeners: function() {
    var getLogout = this.view.getLogout()
    var getStart = this.view.getStart()
    getStart.addEventListener('click', this.startGame.bind(this), false);
  },
  logout: function() {
    //WE NEED TO ADD THIS FUNCTIONALITY
    //this.currentUser = nil
  },
  startGame: function() {
    this.view.hideStartButton();
    this.view.displayQuizBox();
    this.displayQuestion();
    this.addAnswerListeners()
  },
  displayQuestion: function() {
    var question = this.game.loadQuestion()
    var answers = this.game.loadAnswers()
    this.view.displayQuestion(question)
    this.view.displayAnswers(answers)
  },
  addAnswerListeners: function() {
    var answers = this.view.getAnswers()
    for(i=0;i<answers.length;i++) {
      answers[i].addEventListener('click', this.checkAnswer.bind(this), false);
    }
  },
  checkAnswer: function() {
    var userSelectionId = event.target.dataset.id
    var correctAnswerId = this.game.correctAnswerId()
    this.displayResponse(userSelectionId, correctAnswerId)
  },
  displayResponse: function(userSelectionId, correctAnswerId) {
    this.view.removeQuestion()
    this.displayQuestion()
    var answers = this.view.getAnswers()
    answers[correctAnswerId].style.background = '#00FF00'
    if(userSelectionId == correctAnswerId) {
      this.game.currentScore++;
    } else {
      answers[userSelectionId].style.background = '#FF0000'
    }
    setTimeout(this.nextQuestion.bind(this), 3000)
  },
  nextQuestion: function() {
    this.game.incrementQuestionId()
    this.view.removeQuestion()
    this.displayQuestion()
    this.addAnswerListeners()
  }
}
