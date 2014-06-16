$(document).ready(function() {
  var domSelectors = {
    start: '.start',
    logout: '#logout',
    quizBox: '.quiz-box',
    questionField: '.question',
    answer: '.answer',
    gameOver: '.game-over',
    logout: '.logout',
    login: '.login'
  };

  // var gameBuzz = new Firebase('https://gamebuzz.firebaseio.com');

  // auth = new FirebaseSimpleLogin(gameBuzz, function(error, user) {
  //   if (error) {
  //     // an error occurred while attempting login
  //     // code: 'INVALID_PASSWORD',
  //     // message: 'The specified password is incorrect.'
  //     alert(error);
  //   } else if (user) {
  //     console.log('User ID: ' + user.uid + ', Provider: ' + user.provider);
  //   } else {
  //     auth.login('facebook');
  //   }
  // });

  var view = new View(domSelectors);
  var game = new Game();
  var controller = new Controller(view, game);
  controller.bindListeners();
  // controller.game.loadQuestions()
});