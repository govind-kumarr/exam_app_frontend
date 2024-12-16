import React, { memo } from "react";
import Question from "./Question";
import Answer from "./Answer";
import TimerBox from "./TimerBox";

const Row = memo(({ data, rowNumber }) => {
  console.log("Row");

  const rows = rowNumber === 0 ? data.slice(1) : data;
  return (
    <>
      {rowNumber === 0 && <TimerBox />}
      {rows.map((number, index) => {
        return rowNumber === 0 || index === 0 ? (
          <Question number={number} />
        ) : (
          <Answer colNumber={index} rowNumber={rowNumber} />
        );
      })}
    </>
  );
});

export default Row;
