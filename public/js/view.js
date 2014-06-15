function View(opts) {
    this.startButton = opts['start']
    this.logout = opts['logout']
    this.quizBox = opts['quizBox']
    this.questionBox = opts['questionBox']
    this.answer = opts['answer']
    this.answer0 = opts['answer0']
    this.answer1 = opts['answer1']
    this.answer2 = opts['answer2']
    this.answer3 = opts['answer3']
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
    getQuestionBox: function() {
      return document.querySelector(this.questionBox)
    },
    getAnswer: function() {
      return document.querySelector(this.answer)
    },
    getAnswer0: function() {
      return document.querySelector(this.answer0)
    },
    getAnswer1: function() {
      return document.querySelector(this.answer1)
    },
    getAnswer2: function() {
      return document.querySelector(this.answer2)
    },
    getAnswer3: function() {
      return document.querySelector(this.answer3)
    }
  }