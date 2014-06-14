var Firebase = require('firebase');
var myRootRef = new Firebase('https://gb0jcnmd3fr.firebaseio-demo.com')
myRootRef.push({
  question: "Why is this not working?", answer: "Dunno"
}, function(response){
  console.log(response)
  process.exit()
});