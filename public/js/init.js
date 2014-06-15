$(document).ready(function() {
  var domSelectors = {
    start: '.start',
    logout: '#logout',
    quizBox: '.quiz-box',
    questionBox: '.question',
    answer: '.answer',
    answer0: '#0',
    answer1: '#1',
    answer2: '#2',
    answer3: '#3'
  };

  var view = new View(domSelectors)
  var game = new Game()
  var controller = new Controller(view, game)
  controller.bindListeners()
  this.game.loadQuestions()
})