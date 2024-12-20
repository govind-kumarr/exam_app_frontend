import React from "react";
import { TextField as MUITextField } from "@mui/material";

const TextField = (props) => {
  return (
    <MUITextField
      {...props}
      slotProps={{
        ...(props?.slotProps || {}),
        htmlInput: {
          style: {
            padding: "0px",
          },
        },
      }}
    />
  );
};

export default TextField;
