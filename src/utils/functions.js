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

