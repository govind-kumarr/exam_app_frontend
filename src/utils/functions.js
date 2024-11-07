import _ from "lodash";

export const generateRandomNumber = (min = 10, max = 99) => {
  return _.random(min, max);
};

export const prepareData = (n, m) => {
  const matrix = [];

  for (let i = 0; i < n; i++) {
    matrix.push(new Array(m).fill(0));
  }

  let i = 0,
    j = 0;

  while (j < m) {
    if (i === 0 && j === 0) {
      j++;
      continue;
    }

    matrix[i][j] = generateRandomNumber();
    j++;
  }

  i = 0;
  j = 0;
  while (i < n) {
    if (i === 0 && j === 0) {
      i++;
      continue;
    }

    matrix[i][j] = generateRandomNumber();
    i++;
  }

  return matrix;
};

export const getFormattedTime = (timeInSeconds) => {
  let hours=0,
    minutes=0,
    seconds=0,
    remain = timeInSeconds;

  if (Math.floor(remain / 3600) > 0) {
    hours = Math.floor(remain / 3600);
    remain = remain % 3600;
  }
  if (Math.floor(remain / 60) > 0) {
    minutes = Math.floor(remain / 60);
    remain = remain % 60;
  }
  seconds = remain;
  return `${hours < 9 ? "0" : ""}${hours}:${minutes < 9 ? "0" : ""}${minutes}:${
    seconds < 9 ? "0" : ""
  }${seconds}`;
};
