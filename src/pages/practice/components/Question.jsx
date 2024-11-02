import { Button } from "@mui/material";
import React from "react";

const Question = ({ number }) => {
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
};

export default Question;
