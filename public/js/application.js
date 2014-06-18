var myDataRef = new Firebase('https://gb0jcnmd3fr.firebaseio-demo.com/');
var questions
var questionId = 1

$(document).ready(function() {
  myDataRef.limit(1).once('value', function(e) {
    questions = e.val()
    questions = questions["-JPbgRPRsqDJNz37rMVs"].questions
  });

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
  $('.answer').on('click', checkAnswer)
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
  $('.question').text(questions[questionId].question)
  $('#0').text(questions[questionId].answers[0])
  $('#1').text(questions[questionId].answers[1])
  $('#2').text(questions[questionId].answers[2])
  $('#3').text(questions[questionId].answers[3])
}

function checkAnswer() {
  //this checks if the tapped answer is the
  //correct answer or not
  console.log(event.target.id)
  if(questions[questionId].correct_id == event.target.id) {
    console.log('Correct Answer')
  } else {
    console.log('Incorrect Answer')
  }
}

var currentScore = 0

var increaseScore = function(answerStatus) {
  answerStatus ? currentScore++ : currentScore;
  return currentScore
}

var displayScore = function() {
  return currentScore
}
