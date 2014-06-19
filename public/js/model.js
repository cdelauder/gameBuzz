function Game() {
  this.questionSet = "";
  this.questionId = 0;
  this.currentScore = 0;
  this.activeGame = undefined
}
Game.prototype = {
    loadQuestions: function() {
    var questionData = new Firebase('https://gamebuzz.firebaseio.com/');
    var that = this;
    var promise = new RSVP.Promise(function(resolve, reject) {
      questionData.limit(1).once('value', that.checkIt.bind(that, resolve, reject));
    });
    // this is sent to the controller which will then fire off the promise.then function which will decide what to do when the data comes back from firebase
    return promise;
  },

  checkIt: function(resolve, reject, e) {
    if (e !== undefined) {
      this.questionSet = e.val()["-JPbgRPRsqDJNz37rMVs"].questions;
      resolve( e.val()["-JPbgRPRsqDJNz37rMVs"].questions );
    }
    else
    {
      reject( console.log("your questions were never returned"));
    }
  },

  currentQuestion: function(value) {
    return value[this.questionId].question;
  },
  currentAnswers: function(value) {
    return value[this.questionId].answers;
  },
  nextQuestionId: function() {
    this.questionId++;
  },
  nextQuestion: function() {
    return this.questionSet[this.questionId].question;
  },
  nextAnswers: function() {
    return this.questionSet[this.questionId].answers;
  },
  checkCorrectAnswer: function() {
    return this.questionSet[this.questionId].correct_id;
  },
  increaseScore: function() {
    this.currentScore++;
  },
  gameOver: function() {
    return this.questionSet.length === this.questionId;
  },
  displayScore: function() {
    return this.currentScore;
  },
  resetScore: function() {
    this.currentScore = 0;
  },
  resetQuestionId: function() {
    this.questionId = 0;
  },

  checkForGames: function(callback) {
    var that = this;
    var link = firebase.makeGameDbLink();
    link.once('value', function(snapshot) {
      var gamesAvailable = that.gamesAvailable( snapshot.val());
      callback.call(this, gamesAvailable)
    });
  },

  gamesAvailable: function(games) {
    if (games === null) {
      return false;
    } else {
      return true;
    }
  },

  proposeGame: function() {
    this.proposedGame = firebase.makeGameDbLink().push({user_id: User.uid()});
    this.proposedGame.onDisconnect().remove()
    return 'waiting for opponent';
  },

  make2PlayerGame: function() {
    firebase.makeGameDbLink()
    var proposedGame = firebase.getGameDbLink().startAt().limit(1);
    var opponentId
    var opponent = proposedGame.once('value', function(snapshot) {
      var hashObject = snapshot.val();
      for (key in hashObject) {
        var object = hashObject[key];
        opponentId = object.user_id;
        this.activeGame = firebase.getActiveGameDbLink().push({player_1: opponentId, player_2: User.uid()});
        this.activeGame.onDisconnect().remove()
      }
    });
  },

  removeProposedGame: function() {
    if (this.proposedGame) {
      this.proposedGame.remove()
    }
  },

  removeActiveGame: function() {
    debugger
    if (this.activeGame) {
      this.activeGame.remove();
    }
  }

};


//////////User Module////////////
var User = {
  authenticate: function(callback) {
    var gameBuzz = new Firebase('https://gamebuzz.firebaseio.com');
    var that = this;
    this.auth = new FirebaseSimpleLogin(gameBuzz, function(error, user) {
      if (error) {
        alert(error);
      } else if (user) {
        callback.call(this);
        return true;
      } else {
        return false;
      }
    });
  },

  login: function() {
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
      User.setUser(value);
    }, function(value) {
      console.log('I can;t make users');
    });
  },


  setUser: function(value) {
    this.available = true;
    this.username = value.displayName;
    this.userId = value.id;
    this.authToken = value.firebaseAuthToken;
    this.create(this.username);

    // placer.getLocation()
    // var userLocation = placer.userLocation
  },

  logout: function() {
    this.authToken = null;
    this.destroy();
    this.auth.logout();
  },

  create: function(name) {
    this.userData = new Firebase('https://gamebuzz.firebaseio.com/-JPbgRPRsqDJNz37rMVs/users');
    this.user = this.userData.push({name: name, available: true});
    this.user.onDisconnect().remove();
  },

  dbLink: function() {
    return new Firebase('https://gamebuzz.firebaseio.com/-JPbgRPRsqDJNz37rMVs');
  },

  updateLocation: function(location) {
    this.user.update(location)
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

//////////////firebase module

var firebase = {
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
