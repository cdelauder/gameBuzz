// function statusChangeCallback(response) {
//   console.log('statusChangeCallback');
//   console.log(response);

//   if (response.status === 'connected') {

//     testAPI();
//   } else if (response.status === 'not_authorized') {

//     document.getElementById('status').innerHTML = 'Please log ' +
//       'into this app.';
//   } else {

//     document.getElementById('status').innerHTML = 'Please log ' +
//       'into Facebook.';
//   }
// }

// function checkLoginState() {
//   FB.getLoginStatus(function(response) {
//     statusChangeCallback(response);
//   });
// }

// window.fbAsyncInit = function() {
//   FB.init({
//     appId      : '820828704603161',
//     cookie     : true,
//     xfbml      : true,
//     version    : 'v2.0'
//   });

//   FB.getLoginStatus(function(response) {
//     statusChangeCallback(response);
//   });

// };

//   (function(d, s, id) {
//     var js, fjs = d.getElementsByTagName(s)[0];
//     if (d.getElementById(id)) return;
//     js = d.createElement(s); js.id = id;
//     js.src = "//connect.facebook.net/en_US/sdk.js";
//     fjs.parentNode.insertBefore(js, fjs);
//   }(document, 'script', 'facebook-jssdk'));

// function testAPI() {
//   console.log('Welcome!  Fetching your information.... ');
//   FB.api('/me', function(response) {
//     console.log('Successful login for: ' + response.name);
//     document.getElementById('status').innerHTML =
//       'Thanks for logging in, ' + response.name + '!';
//   });
// }


////this errors out????
// FB.login(function(response) {
//   if (response.status === 'connected') {
//     // Logged into your app and Facebook.
//   } else if (response.status === 'not_authorized') {
//     // The person is logged into Facebook, but not your app.
//   } else {
//     // The person is not logged into Facebook, so we're not sure if
//     // they are logged into this app or not.
//   }
// });

// FB.getLoginStatus(function(response) {
//   if (response.status === 'connected') {
//     console.log(response.authResponse.accessToken);
//   }
// });