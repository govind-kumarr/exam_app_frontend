import { Button } from "@mui/material";
import React, { memo } from "react";

const Question = memo(({ number }) => {
  console.log("Question");
  return (
    <Button
      variant="contained"
      sx={{
        maxHeight: "150px",
        height: "50px",
        fontSize: 20,
        cursor: "default",
      }}
    >
      {number}
    </Button>
  );
});

export default Question;
