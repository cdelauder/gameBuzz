function View(opts) {
  this.startButton = opts['start'];
  this.logout = opts['logout'];
  this.quizBox = opts['quizBox'];
  this.questionField = opts['questionField'];
  this.answers = opts['answer'];
  this.gameOver = opts['gameOver'];
  this.login = opts['login'];
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

  getGameOver: function() {
    return $(this.gameOver);
  },

  getLogin: function() {
    return $(this.login);
  },

  userLoggedIn: function() {
    this.hideLoginButton();
    this.displayLogout();
    this.displayStart();
  },

  userLoggedOut: function() {
    this.hideLogoutButton();
    this.hideScore();
    this.hideQuizBox();
    this.displayLogin();
  },

  hideQuizBox: function() {
    this.getQuizBox().css('display', 'none');
  },

  hideStartButton: function() {
    this.getStart().css('display', 'none');
  },

  hideLoginButton: function() {
    this.getLogin.css('display', 'none');
  },

  hideLogoutButton: function() {
    this.getLogout().css('display', 'none');
  },

  displayLogin: function() {
    this.getLogin().css('display', 'block');
  },

  displayLogout: function() {
    this.getLogout().css('display', 'block');
  },

  displayQuizBox: function() {
    this.getQuizBox().css('display', 'block');
  },

  displayQuestion: function(question) {
    this.getQuestionField().text(question);
  },

  displayStart: function() {
    this.getStart.css('display', 'block');
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
  },

  endGame: function(score) {
    this.getQuizBox().css('display', 'none');
    this.getGameOver().css('display', 'block').text('You got ' + score + ' correct');
    this.getStart().css('display', 'block');
  },

  hideScore: function() {
    this.getGameOver().css('display', 'none')
  },
};