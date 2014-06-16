function View(opts) {
  this.startButton = opts['start']
  this.logout = opts['logout']
  this.quizBox = opts['quizBox']
  this.questionField = opts['questionField']
  this.answerField = opts['answer']
}

View.prototype = {
  getStart: function() {
    return document.querySelector(this.startButton)
  },
  getLogout: function() {
    return document.querySelector(this.logout)
  },
  getQuizBox: function() {
    return document.querySelector(this.quizBox)
  },
  getQuestionField: function() {
    return document.querySelector(this.questionField)
  },
  getAnswers: function() {
    return document.querySelectorAll(this.answerField)
  },
  hideStartButton: function() {
    this.getStart().style.display = 'none'
  },
  displayQuizBox: function() {
    this.getQuizBox().style.display = 'block'
  },
  displayQuestion: function(question) {
    var newQuestion = document.createElement('div')
    newQuestion.className = 'question'
    newQuestion.innerHTML = question
    var quizBox = this.getQuizBox()
    quizBox.appendChild(newQuestion)
  },
  displayAnswers: function(answers) {
    for(i=0;i<answers.length;i++) {
      var newAnswer = document.createElement('div')
      newAnswer.className = 'answer'
      newAnswer.setAttribute('dataset-id', i)
      newAnswer.innerHTML = answers[i]
      var question = this.getQuestionField()
      question.appendChild(newAnswer)
    }
  },
  removeQuestion: function() {
    var quizBox = this.getQuizBox()
    var question = this.getQuestionField()
    while (question.firstChild) {
      question.removeChild(question.firstChild)
    }
    quizBox.removeChild(question)
  }
}