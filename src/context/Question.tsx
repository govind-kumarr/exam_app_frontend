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
  console.log("QuestionContextWrapper");

  const [dataset, setDataset] = useState(null);
  const [structure, setStructure] = useState({ rows: 4, cols: 4 });
  const [answers, setAnswers] = useState({});
  const [startTimer, setTimer] = useState(false);
  const [allAnswersCorrect, setAllAnswersCorrect] = useState(false);

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
    handleTimer(false);
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

  const handleTimer = (val) => {
    if (val != startTimer) setTimer(val);
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

  const checkAllAnswers = () => {
    let totalAnswers = 0;
    let correctAnswers = 0;
    Object.keys(answers).map((key) => {
      const currentAnswer = answers[key];

      currentAnswer.input === currentAnswer.actualAnswer
        ? correctAnswers++
        : null;
      totalAnswers++;
    });

    return correctAnswers === totalAnswers;
  };

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

  useEffect(() => {
    const answersCorrect = checkAllAnswers();
    if (answersCorrect) {
      handleTimer(false);
    }
    if (answersCorrect != allAnswersCorrect)
      setAllAnswersCorrect(answersCorrect);
  }, [answers]);

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
        handleTimer,
        startTimer,
        allAnswersCorrect,
        // time,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export { QuestionContext };

export default QuestionContextWrapper;
