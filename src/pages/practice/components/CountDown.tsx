import { Box, Button, Typography } from "@mui/material";
import React from "react";
import useTimer from "../../../hooks/useTimer";

const CountDown = () => {
  const { time, startTimer, stopTimer, resetTimer } = useTimer();

  return (
    <Box sx={{ display: "flex", gap: "5px", p: 1 }}>
      <Button variant="contained" onClick={startTimer}>
        Start
      </Button>
      <Button variant="outlined" onClick={stopTimer}>
        Stop
      </Button>
      <Button variant="contained" onClick={resetTimer}>
        Reset
      </Button>
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

export default CountDown;
