import React, { createContext, useEffect, useRef, useState } from "react";
import { Diff, prepareData } from "../utils/functions";
import useTimer from "../hooks/useTimer";

const QuestionContext = createContext({
  dataset: null,
  prepareDataset: null,
  changeStructure: null,
  answersRef: null,
  addToRefs: null,
  focusNext: null,
});

const Operator = {
  ADD: "+",
  SUBSTRACT: "-",
  MULTIPLY: "*",
  DIVIDE: "/",
};

const QuestionContextWrapper = ({ children }) => {
  const [dataset, setDataset] = useState(null);
  const [structure, setStructure] = useState({ rows: 4, cols: 4 });
  const [answers, setAnswers] = useState({});

  // const { time, startTimer, resetTimer } = useTimer();
  const answersRef = useRef(null);

  const prepareDataset = (structure) => {
    const {
      rows = 4,
      cols = 4,
      diff = Diff.EASY,
      digit = 2,
      operator = "+",
    } = structure;
    const newDataset = prepareData(rows, cols, digit, diff);

    setDataset(newDataset);
    answersRef.current = null;
    const answers = {};
    newDataset.map((row, rowIndex) => {
      row.map((col, columnIndex) => {
        if (rowIndex > 0 && columnIndex > 0) {
          let actualAnswer;
          switch (operator) {
            case Operator.ADD:
              actualAnswer =
                newDataset[rowIndex][0] + newDataset[0][columnIndex];
              break;
            case Operator.SUBSTRACT:
              actualAnswer = Math.abs(
                newDataset[rowIndex][0] - newDataset[0][columnIndex]
              );
              break;
            case Operator.MULTIPLY:
              actualAnswer = Math.floor(
                newDataset[0][columnIndex] * newDataset[rowIndex][0]
              );
              break;
            case Operator.DIVIDE:
              actualAnswer = Math.floor(
                newDataset[0][columnIndex] / newDataset[rowIndex][0]
              );
              break;
            default:
              actualAnswer =
                newDataset[rowIndex][0] + newDataset[0][columnIndex];
              break;
          }
          answers[rowIndex + "" + columnIndex] = {
            input: "",
            actualAnswer,
          };
        }
      });
    });
    setAnswers(answers);
    // resetTimer();
    // startTimer();
  };

  const handleSetAnswer = (key, input) => {
    const currentAnswer = answers[key];
    if (currentAnswer.input != input) {
      currentAnswer.input = input;
      setAnswers((prev) => ({ ...prev, key: currentAnswer }));
    }
  };

  const changeStructure = (structure) => {
    const {
      rows = 4,
      cols = 4,
      diff = Diff.EASY,
      digit = 2,
      operator = "+",
    } = structure;

    if (rows && cols) {
      setStructure({ rows, cols, diff, digit, operator });
    }
  };

  const addToRefs = (el) => {
    if (!answersRef?.current) {
      answersRef.current = [];
    }
    if (el && !answersRef.current.includes(el)) {
      answersRef.current.push(el);
    }
  };

  const checkAllAnswers = () => {};

  const focusNext = () => {
    if (answersRef?.current) {
      const currentIndex = answersRef.current.findIndex(
        (input) => input === document.activeElement
      );
      if (currentIndex !== -1 && currentIndex < answersRef.current.length - 1) {
        answersRef.current[currentIndex + 1]?.focus();
      }
    }
  };

  useEffect(() => {
    if (structure) {
      prepareDataset(structure);
    }
  }, [structure]);

  return (
    <QuestionContext.Provider
      value={{
        dataset,
        changeStructure,
        answersRef,
        addToRefs,
        focusNext,
        handleSetAnswer,
        answers,
        // time,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export { QuestionContext };

export default QuestionContextWrapper;
