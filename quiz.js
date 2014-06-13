var fb = new Firebase("https://flickering-fire-8809.firebaseIO.com")
fb.set({ question: "Who is playing in the Stanley Cup Finals?" })
question1.on('value', function(q) {
  var q = question.val() ?  q.val().question : "";
  alert(q))
})