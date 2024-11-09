import React, { createContext, useEffect, useRef, useState } from "react";
import { prepareData } from "../utils/functions";
import useTimer from "../hooks/useTimer";

const QuestionContext = createContext({
  dataset: null,
  prepareDataset: null,
  changeStructure: null,
  answersRef: null,
  addToRefs: null,
  focusNext: null,
});

const QuestionContextWrapper = ({ children }) => {
  const [dataset, setDataset] = useState(null);
  const [structure, setStructure] = useState({ rows: 4, cols: 4 });
  const [answers, setAnswers] = useState({});

  // const { time, startTimer, resetTimer } = useTimer();
  const answersRef = useRef(null);

  const prepareDataset = (rows, cols) => {
    const newDataset = prepareData(rows, cols);
    setDataset(newDataset);
    answersRef.current = null;
    const answers = {};
    newDataset.map((row, rowIndex) => {
      row.map((col, columnIndex) => {
        if (rowIndex > 0 && columnIndex > 0) {
          answers[rowIndex + "" + columnIndex] = {
            input: "",
            actualAnswer: newDataset[rowIndex][0] + newDataset[0][columnIndex],
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
    const { rows, cols } = structure;
    if (rows && cols) {
      setStructure({ rows, cols });
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
      const { rows, cols } = structure;
      prepareDataset(rows, cols);
    }
  }, [structure]);

  return (
    <QuestionContext.Provider
      value={{
        dataset,
        prepareDataset,
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
