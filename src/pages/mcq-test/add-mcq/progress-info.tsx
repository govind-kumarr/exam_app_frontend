import React, { FC } from "react";
import { IProgressInfo } from "../../../types/interfaces/component-interfaces";
import { Box, Button } from "@mui/material";

const ProgressInfo: FC<IProgressInfo> = ({
  mcqs,
  activeQuestionId,
  setActiveQuestionId,
}) => {
  return (
    <Box sx={{ width: "300px", border: "1px solid black", p: 1 }}>
      <Box sx={{ display: "flex", gap: "5px" }}>
        {mcqs.map((_, index) => {
          return (
            <Button
              variant={activeQuestionId === index ? "contained" : "outlined"}
              onClick={() => setActiveQuestionId(index)}
            >
              {index + 1}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};

export default ProgressInfo;
