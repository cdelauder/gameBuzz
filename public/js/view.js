function View(opts) {
  this.startButton = opts['start'];
  this.logout = opts['logout'];
  this.quizBox = opts['quizBox'];
  this.questionField = opts['questionField'];
  this.answers = opts['answer'];
}

View.prototype = {
  getStart: function() {
    return $(this.startButton);
  },

  getLogout: function() {
    return $(this.logout);
  },

  getQuizBox: function() {
    return $(this.quizBox);
  },

  getQuestionField: function() {
    return $(this.questionField);
  },

  getAnswers: function() {
    return $(this.answers);
  },

  hideStartButton: function() {
    this.getStart().css('display', 'none');
  },

  displayQuizBox: function() {
    this.getQuizBox().css('display', 'block');
  },

  displayQuestion: function(question) {
    this.getQuestionField().text(question);
  },

  displayAnswers: function(answers) {
    var answerFields = this.getAnswers();
    for(i=0;i<answers.length;i++) {
      answerFields[i].innerHTML = answers[i];
      answerFields[i].style.background = '#000';
    }
  },

  makeIncorrectAnswerRed: function(target) {
    target.style.background = "#FF0000";
  },

  makeCorrectAnswerGreen: function(target) {
    target.style.background = '#00FF00';
  }


};