function FirebaseDB() {
  this.userReference = new Firebase('https://gamebuzz.firebaseio.com/-JPbgRPRsqDJNz37rMVs/users')
}

FirebaseDB.prototype = {

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




  // setUserAvailabilityToFalse: function(newUserId) {
  //   var users
  //   var currentUser
  //   this.userReference.on('value', function(snapshot) {
  //     users = snapshot.val()
  //   });
  //   for (var user in users) {
  //     if (users.hasOwnProperty(user)) {
  //       if (users[user].userId === newUserId) {
  //         currentUser = users[user]
  //         currentUser.set({available: false})    
  //       }
  //     }
  //   }
  // },






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
