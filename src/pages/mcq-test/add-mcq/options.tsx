import { Box, Button, useMediaQuery } from "@mui/material";
import { FC } from "react";
import RenderTextNodes from "../../../components/custom/RenderTextNodes";
import { IOptions } from "../../../types/interfaces/component-interfaces";

const Options: FC<IOptions> = ({
  options,
  optionId,
  questionId,
  setOptionId,
  markCorrect
}) => {
  const matches = useMediaQuery("(max-width:600px)");

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: matches ? "repeat(1,1fr)" : "repeat(2,1fr)",
        width: "100%",
        gap: matches ? 1 : 4,
      }}
    >
      {options.map((option, index) => {
        const { optionValue } = option;
        return (
          <Button
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              padding: "10px",
            }}
            key={index}
            onClick={() => {
              // setSelectedOption(index + "");
              setOptionId(questionId, index);
              markCorrect(index)
            }}
            variant={index === optionId ? "contained" : "outlined"}
          >
            <RenderTextNodes textNodes={optionValue} />
          </Button>
        );
      })}
    </Box>
  );
};

export default Options;
