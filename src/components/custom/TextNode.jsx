import { Box, Typography } from "@mui/material";
import React from "react";
import { Context, Node } from "react-mathjax2";
import { STYLE_TYPES } from "../../constants";

const TextNode = ({ style, text }) => {
  if (style === STYLE_TYPES.MATH)
    return (
      <Box fontSize={14} sx={{ p: 0 }}>
        <Context input="ascii">
          <Node>{text || ""}</Node>
        </Context>
      </Box>
    );
  else if (style === STYLE_TYPES.BOLD)
    return (
      <Typography fontWeight={500} fontSize={14}>
        {text}
      </Typography>
    );

  return <Typography fontSize={14}>{text}</Typography>;
};

export default TextNode;
