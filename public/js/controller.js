function Controller(view, game) {
  this.view = view
  this.game = game
}

Controller.prototype = {
  bindListeners: function() {
    var getLogout = this.view.getLogout()
    getLogout.addEventListener('click', this.logout.bind(this), false);
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
    var currentQuestion = questions[this.game.questionId].question
    var currentAnswers = questions[this.game.questionId].answers
    this.view.displayQuestion(currentQuestion)
    this.view.displayAnswers(currentAnswers)
    this.addAnswerListeners()
  },
  addAnswerListeners: function() {
    var answers = this.view.getAnswers()
    for(i=0;i<answers.length;i++) {
      answers[i].addEventListener('click', this.checkAnswer.bind(this), false);
    }
  },
  removeAnswerListeners: function() {

  },
  checkAnswer: function() {
    var correctAnswer = questions[this.game.questionId].correct_id
    if(correctAnswer == event.target.dataset.id) {
      event.target.style.background = '#00FF00';
    } else {
      event.target.style.background = '#FF0000';
      var answers = this.view.getAnswers()
      answers[correctAnswer].style.background = '#00FF00';
    }
  }
}