$(document).ready(function() {
  var view = new View();
  var user = new User();
  var game = new Game(user);
  var controller = new Controller(view, game, user);
  controller.bindListeners();
});