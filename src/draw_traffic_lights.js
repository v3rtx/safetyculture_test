let controller;

function redraw() {
  for (let i = 0; i < controller.position.length; ++i) {
    let lightsElem = document.getElementsByClassName(controller.position[i].toLowerCase())[0];
    let children = lightsElem.children;
    for (let j = 0; j < children.length; ++j) {
      if (children[j].classList.contains(controller.currentColors[i]))
        children[j].classList.add('active');
      else
        children[j].classList.remove('active');
    }
  }
}

function iterate() {
  if (controller.iterate()) {
    setCurrentTime();
    redraw();
  }
  else {
    alert('Time is up!');
  }
}

function setCurrentTime() {
  document.getElementById('time').textContent = `Current time: ${controller.currentMinutes}m ` +
  `${controller.currentSeconds}s`;
}

function start() {
  let length = document.getElementById('duration').value;
  controller = new TrafficLightsController(0, parseInt(length));
  document.getElementById('iterate').removeAttribute('disabled');
  setCurrentTime();
  redraw();
}
