const pwmConfig = require('../config').pwmConfig;
const pwm = require("adafruit-pca9685")(pwmConfig);

const stop = (code = 0) => {
  try {
    pwm.stop();
  } catch (err) {}
  process.exit(code);
};

process.on('SIGINT', stop);
process.on('SIGHUP', stop);
process.on('exit', stop);

module.exports = pwm;
