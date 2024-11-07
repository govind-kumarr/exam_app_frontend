import React, { useEffect, useRef, useState } from "react";
import { getFormattedTime } from "../utils/functions";

const useTimer = () => {
  const [timeInSec, setTimeInSec] = useState(0);
  let intervalRef = useRef(null);

  const _startTimer = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setTimeInSec((prev) => prev + 1);
    }, 1000);
  };

  const _stopTimer = () => {
    const intervalId = intervalRef.current;
    console.log({ intervalId });
    intervalId && clearInterval(intervalId);
  };

  const _resetTimer = () => {
    const intervalId = intervalRef.current;
    setTimeInSec(0);
    intervalId && clearInterval(intervalId);
    intervalRef.current = null;
  };

  useEffect(() => {
    return () => _resetTimer();
  }, []);

  return {
    time: getFormattedTime(timeInSec),
    startTimer: _startTimer,
    stopTimer: _stopTimer,
    resetTimer: _resetTimer,
  };
};

export default useTimer;
