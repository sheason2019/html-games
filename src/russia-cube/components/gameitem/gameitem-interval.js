const intervalArray = [];

let interval = null;

const AddInterval = (func) => {
  intervalArray.push(func);
  if (interval === null) {
    StartInterval();
  }
};

const StartInterval = () => {
  if (interval !== null) {
    clearInterval(interval);
  }
  interval = setInterval(() => {
    for (const func of intervalArray) {
      func();
    }
  }, 1000 / 60);
};

const ClearInterval = () => {
  clearInterval(interval);
};

export { AddInterval, StartInterval, ClearInterval };
