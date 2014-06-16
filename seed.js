var Firebase = require('firebase');
var myRootRef = new Firebase('https://gamebuzz.firebaseio.com')
myRootRef.push({
  questions:
   [{question: 'Studio albums of what funny musical act include “We Are All Flower People,” “Shark Sandwich,” and “Smell the Glove”?', answers: ["Tenacious D","Spinal Tap","Weird Al","Presidents of the United States of America"], correct_id: 1
}, { question: 'What Asian island is formerly named “Formosa” by Portuguese sailors?', answers: ['Fiji','Macau','Singapore','Taiwan'], correct_id: 3
}, { question: 'What author’s novella about a prison featured a poster of Rita Hayworth as a major plot device?', answers: ['Kurt Vonnegut','Mario Pucci','Stephen King','Michael Crichton'], correct_id: 2
}, { question: 'In professional basketball, the top the rim is exactly how many feet above the court?', answers: [10,11,12,13], correct_id: 0
}, { question: 'What toy’s name comes from the Ilokano language (Philippines) expression for “come”?', answers: ['Boomerang','Pog','Yo-yo','Furby'], correct_id: 2
}, { question: "After a passionate student vote in 1986, the Banana Slug officially became which university’s mascot?", answers: ['UC Santa Cruz','Baylor university','University Hawaii','UC Santa Barbara'], correct_id: 0
}, { question: 'The Belgian Waffle actually originated from what country?', answers: ['Belgium','USA','France','China'], correct_id: 0
}, { question: 'The word “snarge” usually describes the unfortunate combination of what two things?', answers: ['Car + Snail','Car + Squirrel','Plane + Bird','Boat + Dolphin'], correct_id: 2
}, { question:"But behind that fair facade, we’re afraid she’s rather odd. Which Disney princess is “very different from the rest of us”?", answers: ['Merida','Ariel','Belle','Jasmine'], correct_id: 2
}, { question: 'Which Friends character was an only child?', answers: ['Joey','Rachel','Chandler','Phoebe'], correct_id: 2
}, { question: "Juicy Fruit gum, Pabst Blue Ribbon beer, Aunt Jemimia pancake mix all debuted together in what city’s world fair?", answers: ['New York','Chicago','St. Louis','London'], correct_id: 1
}, { question:"Blue Ribbon Sports, started in Oregon, is the original name of what American company?", answers: ['Foot Locker','Champion','Wilson','Nike'], correct_id: 3
}, { question: "Blepharoplasty is becoming an extremely popular type of plastic surgery. What part of the body does it focus on?", answers: ['Buttocks','Eyelid','Calf','Brow Bone'], correct_id: 1
}],
  users:['user1']
},
  function(response){
  console.log(response)
  process.exit()
});


//var questions
//myDataRef.limit(1).once('value', function(e) { questions = e.val()})
//questions["-JPNssV_a9jVo1QygXzb"]