function FirebaseDB() {
  this.userReference = new Firebase('https://gamebuzz.firebaseio.com/-JPbgRPRsqDJNz37rMVs/users')
  this.quizReference = new Firebase('https://gamebuzz.firebaseio.com/-JPbgRPRsqDJNz37rMVs/questions')
  this.gameReference = new Firebase('https://gamebuzz.firebaseio.com/-JPbgRPRsqDJNz37rMVs/trivaRound')
  this.gameSetQuestions = ''
}

FirebaseDB.prototype = {

  getQuizQuestions: function() {
    var that = this
    this.quizReference.on('value', function(snapshot) {
      that.gameSetQuestions = (snapshot.val())
    });
  },
  getAvailableUsers: function() {
    var users
    var userCount = 0
    this.userReference.on('value', function(snapshot) {
      users = snapshot.val()
    });
    for (var user in users) {
      if (users.hasOwnProperty(user)) {
        if (users[user].available === true) {
          userCount++
        }
      }
    }
    return userCount
  },
  setUserAvailabilityToTrue: function(userId) {
    newReference = new Firebase('https://gamebuzz.firebaseio.com/-JPbgRPRsqDJNz37rMVs/users/' + userId)
    newReference.update({available: true})
  },
  setUserAvailabilityToFalse: function(userId) {
    newReference = new Firebase('https://gamebuzz.firebaseio.com/-JPbgRPRsqDJNz37rMVs/users/' + userId)
    newReference.update({available: false})
  },
  addPlayersToGame: function(numberOfPlayers) {
    var players
    var playersAdded = []
    this.userReference.on('value', function(snapshot) {
      players = snapshot.val()
    });
    for (var player in players) {
      if (playersAdded.length < numberOfPlayers) {
        if (players.hasOwnProperty(player)) {
          if (players[player].available === true) {
            playersAdded.push(players[player])
          }
        }
      }
    }
    return playersAdded
  },
  makeTriviaRound: function(players, quiz) {
    this.trivaRound = this.gameReference;
    this.trivaRound.push({});
    this.trivaRound.set({players: players, quiz: quiz});
    this.trivaRound.onDisconnect().remove();
  },

  deleteTriviaRound: function() {
    this.trivaRound.remove();
  },

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
