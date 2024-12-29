import { Box, TextField, Typography } from "@mui/material";
import useQuestions from "../../../context/useQuestions";
import { useEffect, useState } from "react";
import TimerBox from "./TimerBox";

const Answer = ({ rowNumber, colNumber }) => {
  console.log("Answer");

  const {
    dataset,
    addToRefs,
    focusNext,
    handleSetAnswer,
    answers,
    handleTimer,
    startTimer,
  } = useQuestions();
  const [input, setInput] = useState("");

  let actualAnswer = answers[`${rowNumber}${colNumber}`]?.actualAnswer;

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

  return (
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
          !startTimer ? handleTimer(true) : null;
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
  );
};

export default Answer;
