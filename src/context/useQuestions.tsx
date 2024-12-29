import { useContext } from "react";
import { QuestionContext } from "./Question";

const useQuestions = () => {
  const useQuestions = useContext(QuestionContext);

  return useQuestions;
};

export default useQuestions;
