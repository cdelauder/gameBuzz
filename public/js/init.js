$(document).ready(function() {
  var view = new View();
  var game = new Game();
  var controller = new Controller(view, game);
  controller.bindListeners();
});