import { Typography } from "@mui/material";
import { Context, Node } from "react-mathjax2";
import { STYLE_TYPES } from "../../constants";
import { FC } from "react";
import { ITextNode } from "../../types/interfaces/text-interfaces";

const TextNode: FC<ITextNode> = ({ style, value = "" }) => {
  if (style === STYLE_TYPES.MATH)
    return (
      <Typography fontSize={14} sx={{ p: 0 }}>
        <Context input="ascii">
          <Node>{value || ""}</Node>
        </Context>
      </Typography>
    );
  else if (style === STYLE_TYPES.BOLD)
    return (
      <Typography fontWeight={500} fontSize={14}>
        {value}
      </Typography>
    );

  return <Typography fontSize={14}>{value}</Typography>;
};

export default TextNode;
