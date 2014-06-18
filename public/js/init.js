$(document).ready(function() {
  var view = new View();
  var user = new User();
  var game = new Game(user);
  var firebase = new FirebaseDB();
  var controller = new Controller(view, game, user, firebase);
  controller.bindListeners();
});