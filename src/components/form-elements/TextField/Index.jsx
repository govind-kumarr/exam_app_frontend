import React from "react";
import { TextField as MUITextField } from "@mui/material";

const TextField = (props) => {
  return (
    <MUITextField
      {...props}
      sx={{ border: "none" }}
      slotProps={{
        ...(props?.slotProps || {}),
        htmlInput: {
          style: {
            padding: "5px",
          },
        },
      }}
    />
  );
};

export default TextField;
