import { useContext } from "react";
import { QuestionContext } from "./../context/question-context";

const useQuestions = () => {
  const useQuestions = useContext(QuestionContext);

  return useQuestions;
};

export default useQuestions;
