describe('TrafficLight', function() {
  it('should work', function () {
    expect(true).toBe(true);
  });

  it('should accept correct input', function () {
    expect(function () { new TrafficLight(0, 'G'); }).not.toThrow();
  });

  it('should throw with incorrect input', function () {
    let incorrectInputs = [
      { startTime: -1, NS: 'G' },
      { startTime: 'A', NS: 'G' },
      { startTime: 2.2, NS: 'G' },
      { startTime: -1, NS: 'NG' },
      { startTime: 'A', NS: 1 },
      { startTime: 2.2, NS: 2.2 },
    ];
    incorrectInputs.forEach(function (input) {
      expect(function () { new TrafficLight(input.startTime, input.NS); }).toThrowError(RangeError)
    })
  });
});
