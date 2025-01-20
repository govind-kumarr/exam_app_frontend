/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty */
import _ from "lodash";
import { position } from "../types/interfaces/component-interfaces";

export const generateRandomNumber = (min = 10, max = 99) => {
  return _.random(min, max);
};

export const Diff = {
  EASY: "EASY",
  MED: "MEDIUM",
  HARD: "HARD",
};

export const prepareData = (n, m, digit, difficulty) => {
  const matrix: any[] = [];
  const maxDigitNumber = 10 ** digit - 1;
  let minDigitNumber = 10;

  if (difficulty === Diff.EASY) {
  }
  if (difficulty === Diff.MED) {
    minDigitNumber = Math.floor(maxDigitNumber / 3);
  }
  if (difficulty === Diff.HARD) {
    minDigitNumber = Math.floor(maxDigitNumber / 2);
  }

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

    matrix[i][j] = generateRandomNumber(minDigitNumber, maxDigitNumber);
    j++;
  }

  i = 0;
  j = 0;
  while (i < n) {
    if (i === 0 && j === 0) {
      i++;
      continue;
    }

    matrix[i][j] = generateRandomNumber(minDigitNumber, maxDigitNumber);
    i++;
  }

  return matrix;
};

export const getFormattedTime = (timeInSeconds) => {
  let hours = 0,
    minutes = 0,
    seconds = 0,
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

export function listenForOutsideClicks(
  listening,
  setListening,
  menuRef,
  setIsOpen
) {
  return () => {
    if (listening) return;
    if (!menuRef.current) return;
    setListening(true);
    [`click`, `touchstart`].forEach(() => {
      document.addEventListener(`click`, (evt) => {
        if (menuRef?.current?.contains(evt.target)) return;
        setIsOpen(false);
      });
    });
  };
}

export const canEat = (foodPos: position, snakePos: position) => {
  console.log({ foodPos, snakePos });
  if (foodPos && snakePos) {
    return foodPos.top === snakePos.top && foodPos.left === snakePos.left;
  }
  return false;
};

const getNumber = () => {
  const num = Math.random() * 100;
  if (num === 0) return num + 1;
  return Math.floor(num);
};

export const getRandomNumber = (): position => {
  return { top: getNumber(), left: getNumber() };
};
