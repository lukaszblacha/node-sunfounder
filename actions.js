const controls = require('./controls');

const commands = {
  CAMX: 'CAMX',
  CAMY: 'CAMY',
  TURN: 'TURN',
  SPEED: 'SPEED'
};

const setSpeed = (val = 0) => {
  const speed = Math.abs(Math.round(val * 4000));
  if (val > 0) {
    controls.motor0.forwardWithSpeed(speed);
    controls.motor1.forwardWithSpeed(speed);
  } else {
    controls.motor0.backwardWithSpeed(speed);
    controls.motor1.backwardWithSpeed(speed);
  }
};

const actions = {
  [commands.CAMX]: ({ value }) => controls.camOXServo.moveTo(value),
  [commands.CAMY]: ({ value }) => controls.camOYServo.moveTo(value),
  [commands.TURN]: ({ value }) => controls.turnServo.moveTo(value),
  [commands.SPEED]: ({ value }) => setSpeed(value)
};

module.exports = actions;