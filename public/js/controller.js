function Controller(view, game) {
  this.view = view
  this.game = game
}

Controller.prototype = {
  bindListeners: function() {
    var getLogout = this.view.getLogout()
    getLogout.addEventListener('click', this.logout.bind(this), false);
    var getStart = this.view.getStart()
    getStart.addEventListener('click', this.startGame.bind(this), false);
    var getAnswer = this.view.getAnswer()
    getAnswer.addEventListener('click', this.checkAnswer.bind(this), false);
  },

  logout: function() {
    //WE NEED TO ADD THIS FUNCTIONALITY
    //this.currentUser = nil
  },
  startGame: function() {
    console.log('Start Game Triggers')
  },
  checkAnswer: function() {

  }
}