import FunctionsIcon from "@mui/icons-material/Functions";
import FormatBoldIcon from "@mui/icons-material/FormatBold";

export const textControls = [
  {
    label: "MATH",
    icon: (
      <FunctionsIcon
        sx={{
          fontSize: 18,
        }}
      />
    ),
    onClick: () => {
      console.log("On Click");
    },
    shortKey: ["CTRL", "E"],
  },
  {
    label: "BOLD",
    icon: (
      <FormatBoldIcon
        sx={{
          fontSize: 18,
        }}
      />
    ),
    onClick: () => {
      console.log("On Click");
    },
    shortKey: ["CTRL", "B"],
  },
];

export const STYLE_TYPES = {
  NORMAL: "NORMAL",
  BOLD: "BOLD",
  MATH: "MATH",
};
