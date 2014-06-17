function Game() {
  this.questionSet = "";
  this.questionId = 0;
  this.currentScore = 0;
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
      reject( console.log("shit is messssssed up ERROR"));
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
};


//////////User Module////////////
var User = {
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
      that.username = value.displayName;
      that.authToken = value.firebaseAuthToken;
      that.create(that.username, 'location');
    }, function(value) {
      console.log('I can;t make users');
    });
  },

  logout: function() {
    this.authToken = null;
    User.destroy();
    this.auth.logout();
  },

  create: function(name, location) {
    this.userData = new Firebase('https://gamebuzz.firebaseio.com/-JPbgRPRsqDJNz37rMVs/users');
    this.user = this.userData.push({name: name, location: location, available: true});
  },

  dbLink: function() {
    return new Firebase('https://gamebuzz.firebaseio.com/-JPbgRPRsqDJNz37rMVs');
  },

  updateLocation: function(location) {

  },

  destroy: function() {
    this.user.remove();
  },

  current_user: function() {
    return this.authToken;
  }
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

  getGameDbLink: function() {
    return this.gameDbLink
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
