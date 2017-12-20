const testMotors = (m1, m2) => {
  let start = Promise.resolve(0);

  const doAndWait = (fn, delay) => {
    start = start.then((val) => {
      const newVal = fn(val);
      return new Promise((res) => {
        setTimeout(() => res(newVal), delay);
      });
    });
  };

  doAndWait(() => 'init', 1000);

  doAndWait((val) => {
    console.log(val);
    m1.forwardWithSpeed(1000);
    m2.forwardWithSpeed(1000);
    return 'forward slow';
  }, 1000);

  doAndWait((val) => {
    console.log(val);
    m1.backwardWithSpeed(1000);
    m2.backwardWithSpeed(1000);
    return 'backward slow';
  }, 1000);

  doAndWait((val) => {
    console.log(val);
    m1.forwardWithSpeed(2000);
    m2.forwardWithSpeed(2000);
    return 'forward fast';
  }, 500);

  doAndWait((val) => {
    console.log(val);
    m1.backwardWithSpeed(2000);
    m2.backwardWithSpeed(2000);
    return 'backward fast';
  }, 500);

  doAndWait((val) => {
    console.log(val);
    m1.stop();
    m2.stop();
    return 'stop';
  }, 100);

  doAndWait(val => console.log(val));

  start.catch(err => {
    console.error(err);
  });

  return start;
};

module.exports = testMotors;
