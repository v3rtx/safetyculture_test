class TrafficLightsController {
  get GREEN() { return 'green' }
  get YELLOW() { return 'yellow' }
  get RED() {return 'red'}

  get SECONDS_IN_MINUTE() { return 60 }
  get RED_INTERVAL() { return 5 * this.SECONDS_IN_MINUTE }
  get YELLOW_INTERVAL() { return 0.5 * this.SECONDS_IN_MINUTE }
  get GREEN_INTERVAL() { return this.RED_INTERVAL - this.YELLOW_INTERVAL }

  isNonNegativeInteger (integer){
    return Number.isInteger(integer) && integer >= 0 && integer <= 1000000000
  }

  constructor (startTime = 0, length = 30) {
    if (!this.isNonNegativeInteger(startTime) || !this.isNonNegativeInteger(length)){
      throw new RangeError("Start time and length must be in interval from 0 to 1000000000");
    }

    // store currentTime and endTime as seconds
    this.currentTime = startTime * this.SECONDS_IN_MINUTE;
    this.endTime = (startTime + length) * this.SECONDS_IN_MINUTE;;

    // we will store colors in clockwise order starting form North
    this.currentColors = [this.GREEN, this.RED, this.GREEN, this.RED];
    this.position = ['North', 'East', 'South', 'West'];

    // init first step as not step with yellow lights
    this.isYellowOn = false;
    this.nextInterval = this.GREEN_INTERVAL;
  }

  writeIntro () {
    console.log(`This is the traffic light simulation programm.
    Starting from:
      Start time: ${this.startTime / this.SECONDS_IN_MINUTE} minutes
      End time: ${this.endTime / this.SECONDS_IN_MINUTE} minutes
      Nort and South traffic lights just switched to Greeen
      East and West traffic lights just switched to Red`);
  }


  simulate () {
    this.writeIntro()
    while (this.currentTime + this.nextInterval <= this.endTime) {
      this.currentTime += this.nextInterval
      if (this.isYellowOn) {
        this.isYellowOn = false;
        this.nextInterval = this.GREEN_INTERVAL;
        this.switchLight(this.RED, this.GREEN);
        this.switchLight(this.YELLOW, this.RED);
      }
      else {
        this.isYellowOn = true;
        this.nextInterval = this.YELLOW_INTERVAL;
        this.switchLight(this.GREEN, this.YELLOW);
      }
    }
  }

  switchLight (fromLight, toLight) {
    let directionsToSwitch = [];
    for (let i = 0; i < this.currentColors.length; ++i) {
      if (this.currentColors[i] === fromLight) {
        directionsToSwitch.push(this.position[i]);
        this.currentColors[i] = toLight;
      }
    };
    this.writeSwitchInfo(directionsToSwitch, fromLight, toLight);
  }

  // TODO: change if we will switch not 2 directions at once
  writeSwitchInfo (directionsToSwitch, fromLight, toLight) {
    console.log(`Time: ${this.currentTime / this.SECONDS_IN_MINUTE}m ${this.currentTime % this.SECONDS_IN_MINUTE}s.`+
      ` Switching ${directionsToSwitch[0]} and ${directionsToSwitch[1]} from ${fromLight} to ${toLight}.`);
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    TrafficLightsController: TrafficLightsController
  };
};
