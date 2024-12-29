import { Box } from "@mui/material";
import { IMCQPreview } from "../../../types/interfaces/component-interfaces";
import { FC, useState } from "react";
import MCQ from "./mcq";
import ProgressInfo from "./progress-info";
import { useForm } from "react-hook-form";

const MCQPreview: FC<IMCQPreview> = ({ mcqs = [] }) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const { setValue, watch } = useForm({
    defaultValues: {
      result: [
        {
          questionId: -1,
          optionId: -1,
        },
      ],
    },
  });

  const setOptionId = (questionId: number, optionId: number) => {
    setValue(`result.${questionId}.optionId`, optionId);
  };

  return (
    <Box
      sx={{
        border: "1px solid black",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ width: "100%" }}>
        {mcqs.length > 0 && (
          <MCQ
            mcq={mcqs[activeQuestion]}
            questionId={activeQuestion}
            optionId={watch(`result.${activeQuestion}.optionId`)}
            setOptionId={setOptionId}
          />
        )}
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
