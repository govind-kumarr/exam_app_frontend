import { Box, TextField, Typography } from "@mui/material";
import useQuestions from "./../../../context/useQuestions";
import { useEffect, useState } from "react";

const Answer = ({ rowNumber, colNumber }) => {
  const { dataset, addToRefs, focusNext, handleSetAnswer, answers } =
    useQuestions();
  const [input, setInput] = useState("");

  let actualAnswer = answers[`${rowNumber}${colNumber}`]?.actualAnswer;

  console.log({answers});

  const checkAnswer = () => {
    const currentAnswer = answers[`${rowNumber}${colNumber}`];
    if (currentAnswer && currentAnswer?.input) {
      return currentAnswer?.input === currentAnswer?.actualAnswer
        ? "success.main"
        : "error.main";
    }
    return "primary";
  };

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
        sx={{
          input: { textAlign: "center" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: checkAnswer(), // uses the theme success color
            },
            "&:hover fieldset": {
              borderColor: checkAnswer(), // darker color on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: checkAnswer(), // color when focused
            },
          },
        }}
        onChange={(e) => {
          setInput(e.target.value);
          if (actualAnswer === Number(e.target.value) && focusNext) {
            focusNext();
            handleSetAnswer(`${rowNumber}${colNumber}`, Number(e.target.value));
          }
        }}
        // disabled={sum === Number(input)}
        onBlur={(e) => {
          handleSetAnswer(`${rowNumber}${colNumber}`, Number(e.target.value));
        }}
        color={checkAnswer()}
      />
    </Box>
  ) : (
    <Box
      sx={{
        maxHeight: "150px",
        height: "100%",
        display: "flex",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6"></Typography>
      </Box>
    </Box>
  );
};

export default Answer;
