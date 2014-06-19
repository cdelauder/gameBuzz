describe ("scoring", function() {
  var game
  beforeEach(function() {
    game = new Game()
  })

  it ("should know the current score of a user", function () {
    expect(game.currentScore).not.toBe(null)
  })

  it ("should display a score of 0 at the beginning of the game", function () {
    expect(game.currentScore).toEqual(0)
  })

  it ("should increase the score of the user if the correct answer was selected", function () {
    game.currentScore = 0
    game.increaseScore()
    expect(game.currentScore).toEqual(1)
  })

  it ("should display the current score to the user", function () {
    expect(game.displayScore()).toEqual(game.currentScore)
  })
})

describe ('questions', function() {
  beforeEach(function() {
    game = new Game()
    value = [object={question:'question', answers: ['1','2','3','4'], correct_id: 1}, object1={question:'question1', answers: ['1','2','3','4'], correct_id: 2}]
  })

  describe('questionSet', function() {
    it ('should be empty at the beginning of the game', function() {
      expect(game.questionSet).toEqual("")
    })
  })

  describe('questionId', function() {
    it ('should begin the game set to 0', function() {
      expect(game.questionId).toEqual(0)
    })
  })

  describe('currentQuestion', function() {
    it ('should return the question string for a specific question from a set of questions', function() {
      expect(game.currentQuestion(value)).toBe('question')
    })
  })

  describe('currentAnswers', function() {
    it ('should return an array of answers for a specific question from a set of questinos', function() {
      expect(game.currentAnswers(value)).toEqual(['1','2','3','4'])
    })
  })

  describe('nextQuestionId', function() {
    it ('should increment the questionId by 1', function() {
      game.questionId = 0
      game.nextQuestionId()
      expect(game.questionId).toBe(1)
    })
  })

  describe('nextQuestion', function() {
    it ('should return a question when given a specific question id', function() {
      game.questionId = 1
      game.questionSet = value
      question = game.nextQuestion()
      expect(question).toEqual('question1')
    })
  })

  describe('nextAnswers', function() {
    it ('should return a question when given a specific question id', function() {
      game.questionId = 1
      game.questionSet = value
      answers = game.nextAnswers()
      expect(answers).toEqual(['1','2','3','4'])
    })
  })

  describe('checkCorrectAnswer', function() {
    it ('should return the id of the correct answer to the question', function() {
      game.questionId = 0
      game.questionSet = value
      correct_id = game.checkCorrectAnswer()
      expect(correct_id).toBe(value[0].correct_id)
    })
  })

  describe('')
})
