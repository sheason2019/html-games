let score = 0;

const initScore = () => {
  score = 0;
};
const eliminateScore = (num) => {
  if (num === 0)  return;
  score += 100 * 2 ** (num - 1);
};
const mergeScore = (num) => {
  score += 10 * num;
};
const getScore = () => {
  return score;
};

export { initScore, eliminateScore, mergeScore, getScore };