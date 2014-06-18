function User() {
  this.username = ''
  this.location = ''
  this.userId = ''
  this.available = ''
  this.gameId = 0
}

User.prototype = {
  authenticate: function() {
    var gameBuzz = new Firebase('https://gamebuzz.firebaseio.com');
    var that = this;
    this.auth = new FirebaseSimpleLogin(gameBuzz, function(error, user) {
      if (error) {
        alert(error);
      } else if (user) {
        // callback.call(this);
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
    this.available = true;
    this.username = value.displayName;
    this.userId = value.id;
    this.authToken = value.firebaseAuthToken;
    this.create(this.username, 'location');
  },

  logout: function() {
    this.authToken = null;
    this.destroy();
    this.auth.logout();
  },

  create: function(name, location) {
    this.userData = new Firebase('https://gamebuzz.firebaseio.com/-JPbgRPRsqDJNz37rMVs/users');
    this.user = this.userData.push({name: name, location: location, available: true});
    this.user.onDisconnect().remove();
  },

  dbLink: function() {
    return new Firebase('https://gamebuzz.firebaseio.com/-JPbgRPRsqDJNz37rMVs');
  },

  updateLocation: function(location) {

  },

  destroy: function() {
    this.user.remove();
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