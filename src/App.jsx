import "./App.css";
import QuestionSlider from "./pages/practice";
import QuestionContextWrapper from "./context/Question";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme/theme";
import AddMCQ from "./pages/mcq-test/add-mcq";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QuestionContextWrapper>
        {/* <QuestionSlider /> */}
        <AddMCQ />
      </QuestionContextWrapper>
    </ThemeProvider>
  );
}

export default App;
