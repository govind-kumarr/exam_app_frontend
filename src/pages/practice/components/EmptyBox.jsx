import { Box } from "@mui/material";
import React from "react";

const EmptyBox = () => {
  return (
    <Box
      sx={{
        border: "1px solid red",
        maxHeight: "150px",
        height: "50px",
      }}
    ></Box>
  );
};

export default EmptyBox;
