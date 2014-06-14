// $(document).ready(function() {
//   // This is called after the document has loaded in its entirety
//   // This guarantees that any elements we bind to will exist on the page
//   // when we try to bind to them

//   // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
// });

var gameBuzz = new Firebase('https://gamebuzz.firebaseio.com');

var auth = new FirebaseSimpleLogin(gameBuzz, function(error, user) {
    if (error) {
      // an error occurred while attempting login
      // code: 'INVALID_PASSWORD',
      // message: 'The specified password is incorrect.'
      alert(error);
    } else if (user) {
      // user authenticated with Firebase
      alert('User ID: ' + user.uid + ', Provider: ' + user.provider);
    } else {
      // user is logged out
    }
  });

  auth.login('facebook', {
    rememberMe: true,
    scope: 'email,user_likes'
  });

  auth.logout();
