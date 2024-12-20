import FunctionsIcon from "@mui/icons-material/Functions";
import FormatBoldIcon from "@mui/icons-material/FormatBold";

export const textControls = [
  {
    label: "MATH",
    icon: <FunctionsIcon />,
    onClick: () => {
      console.log("On Click");
    },
  },
  {
    label: "BOLD",
    icon: <FormatBoldIcon />,
    onClick: () => {
      console.log("On Click");
    },
  },
];

export const STYLE_TYPES = {
  NORMAL: "NORMAL",
  BOLD: "BOLD",
  MATH: "MATH",
};
