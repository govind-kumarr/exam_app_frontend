import { Typography, TypographyProps } from "@mui/material";

const CustomText = ({ sx = {}, children, ...props }: TypographyProps) => {
  return (
    <Typography
      fontSize={14}
      {...props}
      sx={{
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};

export default CustomText;
