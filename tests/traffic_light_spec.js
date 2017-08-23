describe('TrafficLight', function() {
  it('should accept correct input', function () {
    expect(function () { new TrafficLightsController(0, 20); }).not.toThrow();
  });

  it('should throw with incorrect input', function () {
    let incorrectInputs = [
      { startTime: -1, length: 10 },
      { startTime: 'A', length: 10 },
      { startTime: 2.2, length: 10 },
      { startTime: 0, length: -1 },
      { startTime: 0, length: 'AA' },
      { startTime: 0, length: 33.3 },
      { startTime: Infinity, length: 1},
      { startTime: -Infinity, length: 1},
      { startTime: 0, length: Infinity},
      { startTime: 0, length: -Infinity},
      { startTime: 2000000000, length: 0},
      { startTime: 0, length: 2000000000}
    ];
    incorrectInputs.forEach(function (input) {
      expect(function () { new TrafficLightsController(input.startTime, input.length); }).toThrowError(
        RangeError, "Start time and length must be in interval from 0 to 1000000000"
      );
    });
  });

  it('should not throw during simulation', function () {
    let correctInputs = [
      { startTime: 0, length: 0 },
      { startTime: 100, length: 0 },
      { startTime: 0, length: 100 },
      { startTime: 100, length: 100 },
      { startTime: 1000000000, length: 1000 },
      { startTime: 99, length: 99 },
    ];

    correctInputs.forEach(function (input) {
      let lt;
      expect(function () { tl = new TrafficLightsController(input.startTime, input.length); }).not.toThrow();
      expect(function () { tl.simulate() }).not.toThrow();
    });
  });

  describe('testing correct outputs', function () {
    let tl;
    function createTrafficLigtControllerAndSimulate(startTime, length) {
      spyOn(console, 'log');
      tl = new TrafficLightsController(startTime, length);
      tl.simulate();
    }

    it('should not iterate if length is less than 4.5 min and log in console only once', function () {
      createTrafficLigtControllerAndSimulate(0, 0)
      expect(tl.currentTime).toEqual(0);
      expect(console.log.calls.count()).toEqual(1);
    });

    it('should show switches for 4.5 min and 5 min if length is 5 min', function () {
      createTrafficLigtControllerAndSimulate(0, 5);
      expect(tl.currentTime).toEqual(5*60);
      let outputs = [
        'Time: 4.5m 30s. Switching North and South from green to yellow.',
        'Time: 5m 0s. Switching East and West from red to green.',
        'Time: 5m 0s. Switching North and South from yellow to red.'
      ];
      outputs.forEach(function(output) {
        expect(console.log).toHaveBeenCalledWith(output);
      });
    });

    it('should return to original colors after 10 minutes, switched 6 times, and increase currentTime', function () {
      spyOn(console, 'log');
      tl = new TrafficLightsController(0, 10);
      let startColours = ['green', 'red', 'green', 'red'];
      expect(tl.currentTime).toEqual(0);
      expect(tl.currentColors).toEqual(startColours);
      tl.simulate();
      expect(tl.currentColors).toEqual(startColours);
      expect(tl.currentTime).toEqual(10*60);
      expect(console.log.calls.count()).toEqual(7);
      expect(console.log.calls.mostRecent().args[0]).toEqual('Time: 10m 0s. Switching East and West from yellow to red.')
    })
  });
});
