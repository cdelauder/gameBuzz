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
    this.loadQuestion();
  },
  loadQuestion: function() {
    var question = this.game.loadQuestion()
    var answers = this.game.loadAnswers()
    this.view.displayQuestion(question)
    this.view.displayAnswers(answers)
    this.addAnswerListeners()
  },
  addAnswerListeners: function() {
    $('.quiz-box').on('click', '.answer', this.checkAnswer.bind(this))

    // var answers = this.view.getAnswers()
    // for(i=0;i<answers.length;i++) {
    //   console.log(i)
    //   answers[i].addEventListener('click', this.checkAnswer.bind(this), false);
    // }
  },
  removeAnswerListeners: function(event) {
    // $('.quiz-box').undelegate('.answer', 'click', this.test)
    $('.quiz-box').unbind('click');
    // var answers = this.view.getAnswers()
    // for(i=0;i<answers.length;i++) {
    //   answers[i].removeEventListener('click', this.checkAnswer.bind(this), false);
    // }
  },

  checkAnswer: function(event) {
    this.removeAnswerListeners()
    var correctAnswerId = this.game.correctAnswerId()
    if(correctAnswerId == event.target.dataset.id) {
      console.log('in the if')
      event.target.style.background = '#00FF00';
      this.game.currentScore++;
    } else {
      console.log('in the else')
      event.target.style.background = '#FF0000';
      var answers = this.view.getAnswers()
      answers[correctAnswerId].style.background = '#00FF00';
    }
    this.game.incrementQuestionId()
    setTimeout(this.loadQuestion.bind(this), 3000)
  }
}