// import QuestionSlider from "./pages/practice/index.tsx";
import QuestionContextWrapper from "./context/Question";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme/theme";
// import AddMCQ from "./pages/mcq-test/add-mcq/index.tsx";
import MCQPreview from "./pages/mcq-test/add-mcq/show-preview.tsx";
import { sampleMCQ } from "./constants/index.tsx";
import SidebarLayout from "./components/sidebar/layout.tsx";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QuestionContextWrapper>
        <SidebarLayout>
          {/* <QuestionSlider /> */}
          {/* <AddMCQ /> */}
          <MCQPreview mcqs={sampleMCQ} />
        </SidebarLayout>
      </QuestionContextWrapper>
    </ThemeProvider>
  );
}

export default App;
