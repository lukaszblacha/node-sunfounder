const servo = require('./modules/servo');
const motor = require('./modules/motor');

const config = require('./config');
const testServo = require('./test/test-servo');
const testMotor = require('./test/test-motor');

const turnServo = servo(config.turnServo);
const camOXServo = servo(config.camOXServo);
const camOYServo = servo(config.camOYServo);
const motor0 = motor(config.motor0);
const motor1 = motor(config.motor1);

module.exports = {
  turnServo,
  camOXServo,
  camOYServo,
  motor0,
  motor1
};
