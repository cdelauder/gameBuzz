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
    this.view.hideStartButton()
    this.view.displayQuizBox()
    this.loadQuestion()
  },
  loadQuestion: function() {
    var question = this.game.loadQuestion()
    var answers = this.game.loadAnswers()
    this.view.displayQuestion(question)
    this.view.displayAnswers(answers)
    this.addAnswerListeners()
  },
  addAnswerListeners: function() {
    var answers = this.view.getAnswers()
    for(i=0;i<answers.length;i++) {
      answers[i].addEventListener('click', this.checkAnswer.bind(this), false);
    }
  },
  removeAnswerListeners: function() {
    var answers = this.view.getAnswers()
    for(i=0;i<answers.length;i++) {
      answers[i].removeEventListener('click', this.checkAnswer.bind(this), false);
    }
  },
  checkAnswer: function() {
    var correctAnswerId = this.game.correctAnswerId()
    if(correctAnswerId == event.target.dataset.id) {
      event.target.style.background = '#00FF00';
      this.game.currentScore++;
    } else {
      event.target.style.background = '#FF0000';
      var answers = this.view.getAnswers()
      answers[correctAnswerId].style.background = '#00FF00';
    }
    this.removeAnswerListeners()
    this.game.incrementQuestionId()
    setTimeout(this.loadQuestion.bind(this), 3000)
  }
}