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
    var correctAnswerId = questions[this.game.questionId].correct_id
    var correct
    if(correctAnswerId == event.target.dataset.id) {
      event.target.style.background = '#00FF00';
      correct = true
    } else {
      event.target.style.background = '#FF0000';
      setTimeout(this.showCorrectAnswer.bind(this), 250)
      correct = false
    }
    this.increaseScore(correct)
    this.nextQuestion()
  },

  showCorrectAnswer: function() {
    var correctAnswerId = questions[this.game.questionId].correct_id
    var answers = this.view.getAnswers()
    answers[correctAnswerId].style.background = '#00FF00';
  },

  increaseScore: function(answerStatus) {
    answerStatus ? this.game.currentScore++ : this.game.currentScore;
    return this.game.currentScore
  },

  nextQuestion: function() {
    var nextQuestionId = this.game.nextQuestionId()
    setTimeout(this.view.removeLastQuestion(), 1000)
    this.loadQuestion()
  }
}