describe ("timer", function() {
  var controller
  var view

  beforeEach(function() {
    view = new View()
    controller = new Controller(view)
  })

  afterEach(function() {
    clearInterval(controller.currentTimer)
  })

  describe ("startQuestionTimer", function() {
    it ("should begin counting down from 20", function() {
      spyOn(controller.view, 'setCountDownTime')
      controller.startQuestionTimer()
      expect(controller.view.setCountDownTime).toHaveBeenCalledWith(20)
    });

    it ("should cause a timer to be created", function() {
      spyOn(controller, 'makeTimer')
      controller.startQuestionTimer()
      expect(controller.makeTimer).toHaveBeenCalled()
    })
  });

  describe ("makeTimer", function() {
    it ("should create a timer when the game begins", function() {
      controller.makeTimer()
      expect(controller.currentTimer).toBeDefined()
    });
  })

  describe ("countDownTimer", function() {
    it ("should request the current value of the time from the view", function() {
      spyOn(controller.view, 'getCountDownTime')
      controller.countDownTimer()
      expect(controller.view.getCountDownTime).toHaveBeenCalled()
    })

    it ("should get the current value of time", function() {
      spyOn(controller.view, 'getCountDownTime').and.returnValue(5)
      controller.countDownTimer()
      var time = controller.view.getCountDownTime()
      expect(time).toBe(5)
    })

    it ("should decrease the timer by 1", function() {
      spyOn(controller, 'decrementTimer')
      controller.countDownTimer()
      expect(controller.decrementTimer).toHaveBeenCalled()
    })
  })

  describe ('decrementTimer', function() {
    it ("should not decrease the time if the counter has run out and has a value of 0", function() {
      spyOn(controller, 'timeRanOut')
      controller.decrementTimer(0)
      expect(controller.timeRanOut).toHaveBeenCalled()
    })

    it('should set the counter in the view to the current value', function() {
      spyOn(controller.view, 'setCountDownTime')
      controller.decrementTimer(5)
      expect(controller.view.setCountDownTime).toHaveBeenCalledWith(4)
    })
  })

  describe ('stopQuestionTimer', function() {
    it ('should destroy the current timer', function() {
      spyOn(window, "clearInterval")
      timer = window.setInterval(function() {}, 500)
      controller.currentTimer = timer
      controller.stopQuestionTimer()
      expect(window.clearInterval).toHaveBeenCalledWith(timer)
      expect(controller.currentTimer).toBe(undefined)
    })

  })

  describe ('timeRanOut', function() {
    it ('should destroy the current timer and show the next question', function() {
      spyOn(controller, 'cleanTimer')
      spyOn(controller, 'nextQuestion')
      controller.timeRanOut()
      expect(controller.cleanTimer).toHaveBeenCalled()
      expect(controller.nextQuestion).toHaveBeenCalled()
    })
  })

  describe ('cleanTimer', function() {
    it ('should destroy the current timer and prevent the user from further input', function() {
      spyOn(controller, 'stopQuestionTimer')
      spyOn(controller, 'removeAnswerListeners')
      controller.cleanTimer()
      expect(controller.removeAnswerListeners).toHaveBeenCalled()
      expect(controller.stopQuestionTimer).toHaveBeenCalled()
    })
  })
})