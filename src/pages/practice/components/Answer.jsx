import { Box, TextField } from "@mui/material";
import useQuestions from "./../../../context/useQuestions";
import { useEffect, useState } from "react";

const Answer = ({ rowNumber, colNumber }) => {
  const { dataset, addToRefs, focusNext } = useQuestions();
  const [input, setInput] = useState("");

  let sum;

  if (dataset) sum = dataset[rowNumber][0] + dataset[0][colNumber];

  useEffect(() => {
    setInput("");
  }, [dataset]);

  return rowNumber && colNumber ? (
    <Box
      sx={{
        maxHeight: "150px",
        height: "100%",
        display: "flex",
        textAlign: "center",
        p: 0,
      }}
    >
      <TextField
        value={input}
        inputRef={addToRefs}
        sx={{ input: { textAlign: "center" } }}
        onChange={(e) => {
          setInput(e.target.value);
          if (sum === Number(e.target.value) && focusNext) {
            focusNext();
          }
        }}
        disabled={sum === Number(input)}
      />
    </Box>
  ) : (
    <Box
      sx={{
        maxHeight: "150px",
        height: "100%",
        display: "flex",
      }}
    ></Box>
  );
};

export default Answer;
