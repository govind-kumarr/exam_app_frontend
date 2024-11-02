import React, {
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { prepareData } from "../utils/functions";

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
  const answersRef = useRef(null);
  const correctAnswerCountRef = useRef(0);

  const prepareDataset = (rows, cols) => {
    setDataset(prepareData(rows, cols));
  };

  const changeStructure = (rows, cols) => {
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

  const checkAllAnswers = () => {
    if (answersRef?.current) {
      const answerCount = answersRef?.current.length;
      const correctAnswerCount = correctAnswerCountRef?.current || 0;

      if (correctAnswerCount === answerCount) {
        answersRef.current = [];
        prepareDataset(structure.rows, structure.cols);
        correctAnswerCountRef.current = 0;
      }
    }
  };

  const focusNext = () => {
    if (answersRef?.current) {
      const currentIndex = answersRef.current.findIndex(
        (input) => input === document.activeElement
      );
      if (currentIndex !== -1 && currentIndex < answersRef.current.length - 1) {
        answersRef.current[currentIndex + 1]?.focus();
        correctAnswerCountRef.current += 1;
        checkAllAnswers();
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
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export { QuestionContext };

export default QuestionContextWrapper;
