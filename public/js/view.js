function View() {
  this.startButton = '.start';
  this.logout = '.logout';
  this.quizBox = '.quiz-box';
  this.questionField = '.question';
  this.answers = '.answer';
  this.gameOver = '.game-over';
  this.login = '.login';
  this.timer = '.timer';
  this.accept = '.accept';
  this.challenge = '.challenge';
}

View.prototype = {
  getStart: function() {
    return $(this.startButton);
  },

  getChallenge: function() {
    return $(this.challenge);
  },

  getAccept: function() {
    return $(this.accept);
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

  getTimer: function() {
    return $(this.timer);
  },

  getCountDownTime: function() {
    return this.getTimer().text();
  },

  setCountDownTime: function(countDownTime) {
    return this.getTimer().text(countDownTime);
  },

  userLoggedIn: function() {
    this.hideLoginButton();
    this.displayLogout();
  },

  userLoggedOut: function() {
    this.hideLogoutButton();
    this.hideStartButton();
    this.hideScore();
    this.hideQuizBox();
    this.displayLogin();
  },

  showChallengeMade: function(message) {
    this.hideChallenge();
    this.displayMessage(message);
  },

  hideQuizBox: function() {
    this.getQuizBox().css('display', 'none');
  },

  hideStartButton: function() {
    this.getStart().css('display', 'none');
  },

  hideLoginButton: function() {
    this.getLogin().css('display', 'none');
  },

  hideLogoutButton: function() {
    this.getLogout().css('display', 'none');
  },

  hideTimer: function() {
    this.getTimer().css('display', 'none');
  },

  hideChallenge: function() {
    this.getChallenge().css('display', 'none');
  },

  hideAccept: function() {
    this.getAccept().css('display', 'none');
  },

  displayLogin: function() {
    this.getLogin().css('display', 'block');
  },

  displayChallenge: function() {
    this.getChallenge().css('display', 'block');
  },

  displayAccept: function() {
    this.getAccept().css('display', 'block');
  },

  displayLogout: function() {
    this.getLogout().css('display', 'block');
  },

  displayTimer: function() {
    this.getTimer().css('display', 'block');
  },

  displayQuizBox: function() {
    this.getQuizBox().css('display', 'block');
  },

  displayQuestion: function(question) {
    this.getQuestionField().text(question);
  },

  displayStart: function() {
    this.getStart().css('display', 'block');
  },

  displayAnswers: function(answers) {
    var answerFields = this.getAnswers();
    for(i=0;i<answers.length;i++) {
      answerFields[i].innerHTML = answers[i];
      answerFields[i].style.background = '#1A31A6';
    }
  },

  strikeIncorrectAnswer: function(target) {
    target.style.background = "#594505";
    target.style.textDecoration = 'line-through';
  },

  highlightCorrectAnswer: function(target) {
    target.style.background = '#C49400';
  },

  endGame: function(score) {
    this.getQuizBox().css('display', 'none');
    this.getGameOver().css('display', 'block').text('You got ' + score + ' correct');
  },

  hideScore: function() {
    this.getGameOver().css('display', 'none')
  },

  hideMessage: function() {
    $('.message').hide()
  },

  displayMessage: function(message) {
    var container = document.querySelector('.container')
    var newMessage = document.createElement('div')
    newMessage.innerHTML = message
    newMessage.className = 'message'
    container.appendChild(newMessage)
  },

  makeGameDisplay: function() {
    this.hideMessage();
    this.hideStartButton();
    this.hideScore();
    this.displayQuizBox();
    this.displayTimer();
  },

  removeAnswerDecoration: function() {
    this.getAnswers().css('text-decoration', 'none')
  },

  updateScore: function(score) {
    $('.current-user-info p').text(score)
  },

  gameAvailable: function() {
    this.displayAccept();
    this.hideChallenge();
  },

  noGameAvailable: function() {
    this.displayChallenge();
    this.hideAccept();
  },

};