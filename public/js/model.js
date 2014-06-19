function Game() {
  this.questionSet = "";
  this.questionId = 0;
  this.currentScore = 0;
  this.player1 = ""
  this.player2 = ""
  this.numberOfPlayers = 2
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
}
  // checkForGames: function(callback) {
  //   var that = this;
  //   var link = firebase.makeGameDbLink();
  //   link.once('value', function(snapshot) {
  //     var gamesAvailable = that.gamesAvailable( snapshot.val());
  //     callback.call(this, gamesAvailable)
  //   });
  // },

  // gamesAvailable: function(games) {
  //   if (games === null) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // },

  // proposeGame: function() {
  //   this.proposedGame = firebase.makeGameDbLink().push({user_id: User.uid()});
  //   this.proposedGame.onDisconnect().remove()
  //   return 'waiting for opponent';
  // },

  // make2PlayerGame: function() {
  //   firebase.makeGameDbLink()
  //   var proposedGame = firebase.getGameDbLink().startAt().limit(1);
  //   var opponentId
  //   var opponent = proposedGame.once('value', function(snapshot) {
  //     var hashObject = snapshot.val();
  //     for (key in hashObject) {
  //       var object = hashObject[key];
  //       opponentId = object.user_id;
  //       this.activeGame = firebase.getActiveGameDbLink().push({player_1: opponentId, player_2: User.uid()});
  //       this.activeGame.onDisconnect().remove()
  //     }
  //   });
  // },

  // removeProposedGame: function() {
  //   if (this.proposedGame) {
  //     this.proposedGame.remove()
  //   }
  // },

//   removeActiveGame: function() {
//     this.activeGame.remove();
//   }
// };