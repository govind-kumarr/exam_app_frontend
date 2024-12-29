import { Box } from "@mui/material";
import { IMCQPreview } from "../../../types/interfaces/component-interfaces";
import { FC, useState } from "react";
import MCQ from "./mcq";
import ProgressInfo from "./progress-info";

const MCQPreview: FC<IMCQPreview> = ({ mcqs = [] }) => {
  const [activeQuestion, setActiveQuestion] = useState(0);

  return (
    <Box
      sx={{
        border: "1px solid black",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ width: "100%" }}>
        {mcqs.length > 0 && <MCQ mcq={mcqs[activeQuestion]} />}
      </Box>
      <ProgressInfo
        mcqs={mcqs}
        activeQuestionId={activeQuestion}
        setActiveQuestionId={setActiveQuestion}
      />
    </Box>
  );
};

export default MCQPreview;
