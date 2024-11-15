import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import useTimer from "../../../hooks/useTimer";
import useQuestions from "../../../context/useQuestions";

const TimerBox = () => {
  const { startTimer } = useQuestions();
  const {
    startTimer: startTimerFn,
    stopTimer,
    resetTimer,
    time,
    isTimerActive,
  } = useTimer();
  console.log('TimerBox');
  useEffect(() => {
    if (startTimer && !isTimerActive) {
      startTimerFn();
    } else if (startTimer) {
      resetTimer();
      startTimerFn();
    } else {
      if (isTimerActive) {
        stopTimer();
      }
    }
  }, [startTimer]);
  return (
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
        <Typography variant="h6">{time}</Typography>
      </Box>
    </Box>
  );
};

export default TimerBox;
