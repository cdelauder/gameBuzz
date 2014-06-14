describe ("scoring", function() {
  it ("should know the current score of a user", function () {
    expect(currentScore).not.toBe(null)
  })
  it ("should display a score of 0 at the beginning of the game", function () {
    expect(currentScore).toEqual(0)
  })
  it ("should increase the score of the user if the correct answer was selected", function () {
    currentScore = 0
    increaseScore(true)
    expect(currentScore).toEqual(1)
  })
  it ("should not increase the score if a user answers incorrectly", function () {
    currentScore = 1
    increaseScore(false)
    expect(currentScore).toEqual(1)
  })
  it ("should display the current score to the user", function () {
    expect(displayScore()).toEqual(currentScore)
  })
})