describe("Game", function() {
  beforeEach(function() {
    game = new Game();
  });

  it ("should know the current score of a user", function() {
    expect(game.currentScore).not.toBe(null);
  });

  it ("should have a score of 0 at the beginning of the game", function() {
    expect(game.currentScore).toEqual(0);
  });

  it ("should have a question id of 0 at the beginning of the game",  function() {
      expect(game.questionId).toEqual(0);
  });

  it ("should display a question after the game begins", function(){

  });

 it ("should display answers to a question after the game begins", function() {

  });

  describe("#nextQuestionId", function() {
    it ("should increase the questionId number", function() {
      game.questionId = 0;
      game.nextQuestionId();
      expect(game.questionId).toEqual(1);
    });
  });

  it ("should increase the score of the user if the correct answer was selected", function() {
    game.currentScore = 0;
    game.increaseScore();
    expect(game.currentScore).toEqual(1);
  });

  it ("should display the current score to the user", function() {
    expect(game.displayScore()).toEqual(game.currentScore);
  });
});