const pwm = require('./pwm');

// Maps value from range [-1:1] to range [0:1]
const normalizePosition = pos => (pos + 1.0) / 2.0;

/**
 * @param pwmChannel Integer - [0:15]
 * @param range Integer - servo range in degrees (0-180]
 * @param center Integer - [range:4095-range]
 */
const servo = ({ pwmChannel, range, center }) => {
  const min = center - range;
  const max = center + range;

  // Maps value from range [0:1] to range [min:max]
  const mapScale = pos => Math.round(min + (max - min) * normalizePosition(pos));

  /**
   * Move servo to the specific position
   * @param pos Float - [-1:1]
   */
  const moveTo = pos => {
    pwm.setPwm(pwmChannel, 0, mapScale(pos));
  };

  return {
    moveTo,
    moveLeft: () => moveTo(-1),
    moveRight: () => moveTo(1),
    reset: () => moveTo(0),
  }
};

module.exports = servo;
