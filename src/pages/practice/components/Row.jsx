import React from "react";
import Question from "./Question";
import Answer from "./Answer";

const Row = ({ data, rowNumber }) => {
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
};

export default Row;
