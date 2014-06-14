describe ("scoring", function() {
  it ("should know the current score of a user", function () {
    expect(currentScore).not.toBe(null)
  })
  it ("should display a score of 0 at the beginning of the game", function () {
    expect(currentScore).toBe(0)
  })
  it ("should increase the score of the user if the correct answer was selected", function () {
    var currentScore = 0
    increaseScore(true)
    expect(currentScore).toBe(1)
  })
  it ("should not increase the score if a user answers incorrectly", function () {
    var currentScore = 1
    increaseScore(false)
    expect(currentScore).toBe(1)
  })
})