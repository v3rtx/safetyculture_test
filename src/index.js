let trafficLib = require("./traffic_lights_controller.js");

let readline = require('readline');
let rl = readline.createInterface(process.stdin, process.stdout);

console.log(trafficLib);
let trafficLight = new trafficLib.TrafficLightsController();
trafficLight.simulate();
process.exit(0);
