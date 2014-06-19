function User() {
  this.username = ''
  this.location = ''
  this.userId = ''
  this.available = ''
  this.score = 0
  this.gameId = 1
  this.firebaseToken = ''
}
User.prototype = {
  authenticate: function() {
    var gameBuzz = new Firebase('https://gamebuzz.firebaseio.com');
    var that = this;
    this.auth = new FirebaseSimpleLogin(gameBuzz, function(error, user) {
      if (error) {
        alert(error);
      } else if (user) {
        return true;
      } else {
        return false;
      }
    });
  },
  login: function(callback) {
    var that = this;
    var promise = new RSVP.Promise(function(resolve, reject) {
      var loginResponse = that.auth.login('facebook');
      if (loginResponse !== undefined) {
        resolve(loginResponse);
      } else {
        reject(console.log('user authentication failed'));
      }
    });
    promise.then(function(value) {
      that.setUser(value);
      callback.call(this);
    }, function(value) {
      console.log('I can;t make users');
    });
  },
  setUser: function(value) {
    this.available = false;
    this.username = value.displayName;
    this.userId = value.id;
    this.authToken = value.firebaseAuthToken;
    this.create(this.username, 'location', this.available, this.userId);
  },
  logout: function() {
    this.authToken = null;
    this.destroy();
    this.auth.logout();
  },

  create: function(name, location, available, userId) {
    this.userData = new Firebase('https://gamebuzz.firebaseio.com/-JPbgRPRsqDJNz37rMVs/users/' + userId);
    this.userData.push({})
    this.userData.set({name: name, location: location, available: available});
    this.userData.onDisconnect().remove();
  },

  dbLink: function() {
    return new Firebase('https://gamebuzz.firebaseio.com/-JPbgRPRsqDJNz37rMVs');
  },

  updateLocation: function(location) {

  },

  destroy: function() {
    this.userData.remove();
  },

  uid: function() {
    return this.userId
  },

  current_user: function() {
    return this.authToken;
  },

  setAvailability: function(status) {
    this.available = true
  },

  available: function() {
    return this.available
  },
};