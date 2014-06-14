$(document).ready(function() {
  var gameBuzz = new Firebase('https://gamebuzz.firebaseio.com');

  auth = new FirebaseSimpleLogin(gameBuzz, function(error, user) {
    if (error) {
      // an error occurred while attempting login
      // code: 'INVALID_PASSWORD',
      // message: 'The specified password is incorrect.'
      alert(error);
    } else if (user) {
      console.log('User ID: ' + user.uid + ', Provider: ' + user.provider);
    } else {
      auth.login('facebook')
    }
  });
    bindEventListeners()

});

function bindEventListeners() {
  $('#logout').on('click', facebookAdios)
  $('.start').on('click', startGame)
}

function facebookAdios() {
  console.log('hitting Adios!!!!')
  // FB.logout(function(response) {
  //     // Person is now logged out
  // });
  auth.logout()

}

//=================================================
//Start game functionality
//=================================================

function startGame() {
  $('.start').hide()
  $('.quiz-box').show()
}

var currentScore = 0

var UpdateScore