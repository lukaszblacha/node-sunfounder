const testServo = (servo) => {
  let start = Promise.resolve(0);

  const doAndWait = (fn, delay) => {
    start = start.then((val) => {
      const newVal = fn(val);
      return new Promise((res) => {
        setTimeout(() => res(newVal), delay);
      });
    });
  };

  doAndWait(servo.reset, 1000);
  doAndWait(servo.moveLeft, 1000);
  doAndWait(servo.moveRight, 1000);

  doAndWait(servo.reset, 1000);
  return start;
};

module.exports = testServo;
