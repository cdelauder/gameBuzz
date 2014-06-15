function Controller(view, game) {
  this.view = view
  this.game = game
}

Controller.prototype = {
  bindListeners: function() {
    var getLogout = this.view.getLogout();
    var getStart = this.view.getStart();
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
    var promise = this.game.loadQuestions()
    var that = this
    promise.then(function(value) {
      console.log("hello");
    // debugger
      that.view.displayQuestion(that.game.currentQuestion(value))
    }, function(value) {
      console.log('you suck more');
    });


    // this.view.displayAnswers(this.game.currentAnswers())
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
    var correct = 0
    if(correctAnswerId == event.target.dataset.id) {
      event.target.style.background = '#00FF00';
      this.currentScore = this.currentScore + 1;
    } else {
      event.target.style.background = '#FF0000';
      var answers = this.view.getAnswers()
      answers[correctAnswerId].style.background = '#00FF00';
    }
    this.game.nextQuestionId()
    setTimeout(this.loadQuestion.bind(this), 3000)
  },
}