// import QuestionSlider from "./pages/practice/index.tsx";
import QuestionContextWrapper from "./context/Question";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme/theme";
// import AddMCQ from "./pages/mcq-test/add-mcq/index.tsx";
// import MCQPreview from "./pages/mcq-test/add-mcq/show-preview.tsx";
// import { sampleMCQ } from "./constants/index.tsx";
import SidebarLayout from "./components/sidebar/layout.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddMCQ from "./pages/mcq-test/add-mcq/index.tsx";
import MCQPreview from "./pages/mcq-test/add-mcq/show-preview.tsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <QuestionContextWrapper>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SidebarLayout />}>
                <Route index element={<></>} />
                <Route path="mcq">
                  <Route path="list" element={<MCQPreview />} />
                  <Route path="add" element={<AddMCQ />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
          {/* <SidebarLayout /> */}
          {/* <QuestionSlider /> */}
          {/* <AddMCQ /> */}
          {/* <MCQPreview mcqs={sampleMCQ} /> */}
          {/* </SidebarLayout> */}
        </QuestionContextWrapper>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
