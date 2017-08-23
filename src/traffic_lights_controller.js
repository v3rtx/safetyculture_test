class TrafficLightsController {
  get maxValue() { return 1000000000 }

  get GREEN() { return 'green' }
  get YELLOW() { return 'yellow' }
  get RED() {return 'red'}

  get SECONDS_IN_MINUTE() { return 60 }
  get RED_INTERVAL() { return 5 * this.SECONDS_IN_MINUTE }
  get YELLOW_INTERVAL() { return 0.5 * this.SECONDS_IN_MINUTE }
  get GREEN_INTERVAL() { return this.RED_INTERVAL - this.YELLOW_INTERVAL }

  get currentMinutes() { return Math.floor(this.currentTime / this.SECONDS_IN_MINUTE) }
  get currentSeconds() { return this.currentTime % this.SECONDS_IN_MINUTE }

  constructor (startTime = 0, length = 30) {
    if (!this.isNonNegativeInteger(startTime) || !this.isNonNegativeInteger(length)){
      throw new RangeError("Start time and length must be in interval from 0 to " + this.maxValue);
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

  isNonNegativeInteger (integer){
    return Number.isInteger(integer) && integer >= 0 && integer <= this.maxValue
  }

  writeIntro () {
    console.log(`This is the traffic light simulation programm.
    Starting from:
      Start time: ${this.currentMinutes} minutes
      End time: ${Math.floor(this.endTime / this.SECONDS_IN_MINUTE)} minutes
      Nort and South traffic lights just switched to Greeen
      East and West traffic lights just switched to Red`);
  }

  simulate () {
    this.writeIntro();
    while (this.iterate());
  }

  iterate () {
    if (this.currentTime + this.nextInterval > this.endTime)
      return false;

    this.currentTime += this.nextInterval;

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

    return true;
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
    console.log(`Time: ${this.currentMinutes}m ${this.currentSeconds}s.`+
      ` Switching ${directionsToSwitch[0]} and ${directionsToSwitch[1]} from ${fromLight} to ${toLight}.`);
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    TrafficLightsController: TrafficLightsController
  };
};
