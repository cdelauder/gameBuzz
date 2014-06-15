function View(opts) {
  this.startButton = opts['start']
  this.logout = opts['logout']
  this.quizBox = opts['quizBox']
  this.questionField = opts['questionField']
  this.answers = opts['answer']
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
    return document.querySelectorAll(this.answers)
  },
  hideStartButton: function() {
    var startButton = this.getStart()
    startButton.style.display = 'none'
  },
  displayQuizBox: function() {
    var quizBox = this.getQuizBox()
    quizBox.style.display = 'block'
  },
  displayQuestion: function(question) {
    var questionField = this.getQuestionField()
    questionField.innerHTML = question
  },
  displayAnswers: function(answers) {
    var answerFields = this.getAnswers()
    for(i=0;i<answers.length;i++) {
      answerFields[i].innerHTML = answers[i]
    }
  },
  removeLastQuestion: function() {
    this.getQuestionField.innerHTML = ""
    this.getAnswers.innerHTML = ""
    this.getAnswers.style = ''
  }
}