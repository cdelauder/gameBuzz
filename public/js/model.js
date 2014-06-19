function Game() {
  this.questionSet = "";
  this.questionId = 0;
  this.currentScore = 0;
  this.player1 = ""
  this.player2 = ""
  this.numberOfPlayers = 2
}

Game.prototype = {
  currentQuestion: function() {
    return this.questionSet[this.questionId].question
  },
  currentAnswers: function() {
    return this.questionSet[this.questionId].answers
  },
  checkCorrectAnswer: function() {
    return this.questionSet[this.questionId].correct_id;
  },
  incrementQuestionId: function() {
    this.questionId++;
  },
  increaseScore: function() {
    this.currentScore++;
  },
  displayScore: function() {
    return this.currentScore;
  },
  gameOver: function() {
    return this.questionSet.length === this.questionId;
  },
  resetScore: function() {
    this.currentScore = 0;
  },
  resetQuestionId: function() {
    this.questionId = 0;
  },
};
