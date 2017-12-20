const pwm = require('./pwm');
const gpio = require('rpi-gpio');

/**
 * @param gpioPin0 - first pin index
 * @param gpioPin1 - second pin index
 * @param pwmChannel - 0-15
 * @param invert
 */
const motor = ({ gpioPin0, gpioPin1, pwmChannel, invert = false }) => {
  const setSpeed = speed => pwm.setPwm(pwmChannel, 0, speed);

  const forward = () => {
    gpio.write(gpioPin0, 1);
    gpio.write(gpioPin1, 0);
  };

  const backward = () => {
    gpio.write(gpioPin0, 0);
    gpio.write(gpioPin1, 1);
  };

  const forwardWithSpeed = (speed) => {
    setSpeed(speed);
    forward();
  };

  const backwardWithSpeed = (speed) => {
    setSpeed(speed);
    backward();
  };

  const stop = () => {
    gpio.write(gpioPin0, 0);
    gpio.write(gpioPin1, 0);
  };

  // Setup pins
  gpio.setup(gpioPin0, gpio.DIR_OUT);
  gpio.setup(gpioPin1, gpio.DIR_OUT);

  // Destroy on exit
  const destroy = () => {
    try {
      gpio.destroy();
    } catch (err) {}
    process.exit(0);
  };

  process.on('SIGINT', destroy);
  process.on('SIGHUP', destroy);
  process.on('exit', destroy);

  return ({
    setSpeed,
    forward: invert ? backward : forward,
    backward: invert ? forward : backward,
    forwardWithSpeed,
    backwardWithSpeed,
    stop
  });
};

module.exports = motor;
