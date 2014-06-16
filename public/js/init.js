$(document).ready(function() {
// CR move to view
  var domSelectors = {
    start: '.start',
    logout: '#logout',
    quizBox: '.quiz-box',
    questionField: '.question',
    answer: '.answer',
    gameOver: '.game-over',
    logout: '.logout',
    login: '.login',
  };

  var view = new View(domSelectors);
  var game = new Game();
  var controller = new Controller(view, game);
  controller.bindListeners();
});
