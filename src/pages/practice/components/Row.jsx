import React, { memo } from "react";
import Question from "./Question";
import Answer from "./Answer";

const Row = memo(({ data, rowNumber }) => {
  console.log("Row");

  return (
    <>
      {data.map((number, index) => {
        return number ? (
          <Question number={number} />
        ) : (
          <Answer colNumber={index} rowNumber={rowNumber} />
        );
      })}
    </>
  );
});

export default Row;
