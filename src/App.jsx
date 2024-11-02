import "./App.css";
import QuestionSlider from "./pages/practice";
import QuestionContextWrapper from "./context/Question";

function App() {
  return (
    <QuestionContextWrapper>
      <QuestionSlider />;
    </QuestionContextWrapper>
  );
}

export default App;
