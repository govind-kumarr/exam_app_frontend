import { Box } from "@mui/material";
import { FC } from "react";
import RenderTextNodes from "../../../components/custom/RenderTextNodes";
import { IMCQ } from "../../../types/interfaces/component-interfaces";
import Options from "./options";

const MCQ: FC<IMCQ> = ({ mcq, optionId, questionId, setOptionId }) => {
  const { questionTitle, options } = mcq;

  return (
    <Box
      sx={{
        display: "flex",
        margin: "auto",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "900px",
        gap: "10px",
        border: "1px solid black",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <RenderTextNodes textNodes={questionTitle} />
      </Box>
      <Options
        options={options}
        questionId={questionId}
        setOptionId={setOptionId}
        optionId={optionId}
      />
    </Box>
  );
};

export default MCQ;
