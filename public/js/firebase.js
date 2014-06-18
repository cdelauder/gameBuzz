function FirebaseDB() {
  this.users = []
  this.games = []
  this.questions = []
}

FirebaseDB.prototype = {
  makeLink: function() {
    return this.dbLink = new Firebase('https://gamebuzz.firebaseio.com')
  },

  GetDbLink: function() {
    return this.dbLink
  },

  makeUserLink: function() {
    return this.userDbLink = new Firebase('https://gamebuzz.firebaseio.com/-JPbgRPRsqDJNz37rMVs/users')
  },

  getUserDbLink: function() {
    return this.getUserDbLink
  },

  makeQuestionDbLink: function() {
    return this.questionDbLink = new Firebase('https://gamebuzz.firebaseio.com/-JPbgRPRsqDJNz37rMVs/questions')
  },

  getQuestionDbLink: function() {
    return this.questionDbLink
  },

  makeGameDbLink: function() {
    return this.gameDbLink = new Firebase('https://gamebuzz.firebaseio.com/-JPbgRPRsqDJNz37rMVs/games')
  },

  makeActiveGameDbLink: function() {
    return this.activeGameDbLink = new Firebase('https://gamebuzz.firebaseio.com/-JPbgRPRsqDJNz37rMVs/active_games')
  },

  getActiveGameDbLink: function() {
    return this.activeGameDbLink
  },

  getGameDbLink: function() {
    return this.gameDbLink
  },

  makeConnectedRef: function() {
    return this.connectedRef = new Firebase('https://gamebuzz.firebaseio.com/disconnectmessage')
  },

  authenticate: function() {
    var that = this;
    this.auth = new FirebaseSimpleLogin(that.dbLink, function(error, user) {
      if (error) {
        alert(error);
      } else if (user) {
        return true;
      } else {
        return false;
      }
    });
  },

  login: function() {
    this.auth.login('facebook')
  },

  logout: function() {
    this.auth.logout()
  },
};
