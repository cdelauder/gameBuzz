var fburl = new Firebase("https://flickering-fire-8809.firebaseIO.com")
fburl.set({ question: "Who is playing in the Stanley Cup Finals?", answer1: "Kings", answer2: "Blackhawks" })
document.append(fburl)