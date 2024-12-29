import FunctionsIcon from "@mui/icons-material/Functions";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import { textStyles } from "../types/interfaces/text-interfaces";
import { T_AddMCQForm } from "../schema/mcq-schema";

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

export const STYLE_TYPES: { [key: string]: textStyles } = {
  NORMAL: "NORMAL",
  BOLD: "BOLD",
  MATH: "MATH",
};

export const options = [
  {
    option: "A",
    optionAnswer: "answer 1",
  },
  {
    option: "B",
    optionAnswer: "answer 2",
  },
  {
    option: "C",
    optionAnswer: "answer 3",
  },
  {
    option: "D",
    optionAnswer: "answer 4",
  },
];

export const sampleMCQ: T_AddMCQForm[] = [
  {
    questionTitle: [
      {
        value: "A man bought some eggs of which ",
        style: "NORMAL",
      },
      {
        value: "10%",
        style: "MATH",
      },
      {
        value: "are rotten. He gives ",
        style: "NORMAL",
      },
      {
        value: "80% ",
        style: "MATH",
      },
      {
        value: "of the remainder to his neighbors. Now he is left out with ",
        style: "NORMAL",
      },
      {
        value: "36 ",
        style: "MATH",
      },
      {
        value: ".",
        style: "NORMAL",
      },
      {
        value: "How many eggs he bought? ",
        style: "NORMAL",
      },
    ],
    options: [
      {
        optionValue: [
          {
            value: "40",
            style: "MATH",
          },
        ],
      },
      {
        optionValue: [
          {
            value: "100",
            style: "MATH",
          },
        ],
      },
      {
        optionValue: [
          {
            value: "200",
            style: "MATH",
          },
        ],
      },
      {
        optionValue: [
          {
            value: "70",
            style: "MATH",
          },
        ],
      },
    ],
  },
  {
    questionTitle: [
      {
        value: "A man bought some eggs of which ",
        style: "NORMAL",
      },
      {
        value: "10%",
        style: "MATH",
      },
      {
        value: "are rotten. He gives ",
        style: "NORMAL",
      },
      {
        value: "80% ",
        style: "MATH",
      },
      {
        value: "of the remainder to his neighbors. Now he is left out with ",
        style: "NORMAL",
      },
      {
        value: "36 ",
        style: "MATH",
      },
      {
        value: ".",
        style: "NORMAL",
      },
      {
        value: "How many eggs he bought? ",
        style: "NORMAL",
      },
    ],
    options: [
      {
        optionValue: [
          {
            value: "40",
            style: "MATH",
          },
        ],
      },
      {
        optionValue: [
          {
            value: "100",
            style: "MATH",
          },
        ],
      },
      {
        optionValue: [
          {
            value: "200",
            style: "MATH",
          },
        ],
      },
      {
        optionValue: [
          {
            value: "72",
            style: "MATH",
          },
        ],
      },
    ],
  },
];
