describe ("scoring", function() {
  beforeEach(function() {
    game = new Game();
  });
  it ("should know the current score of a user", function () {
    expect(game.currentScore).not.toBe(null);
  });
  it ("should display a score of 0 at the beginning of the game", function () {
    expect(game.currentScore).toEqual(0);
  });
  it ("should increase the score of the user if the correct answer was selected", function () {
    game.currentScore = 0;
    game.increaseScore();
    expect(game.currentScore).toEqual(1);
  });
  it ("should not increase the score if a user answers incorrectly", function () {
    game.currentScore = 1;
    game.increaseScore();
    expect(game.currentScore).toEqual(1);
  });
  it ("should display the current score to the user", function () {
    expect(game.displayScore()).toEqual(game.currentScore);
  });
});