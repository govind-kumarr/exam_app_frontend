import { TextField as MUITextField, TextFieldProps } from "@mui/material";

const TextField = ({ sx = {}, slotProps = {}, ...props }: TextFieldProps) => {
  return (
    <MUITextField
      {...props}
      sx={{ border: "none", ...sx }}
      slotProps={{
        ...slotProps,
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
