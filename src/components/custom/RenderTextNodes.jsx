import { Box, Typography } from "@mui/material";
import React from "react";
import { Context, Node } from "react-mathjax2";
import { STYLE_TYPES } from "../../constants";

const RenderTextNodes = ({ textNodes = [] }) => {
  const nodesToShow = textNodes.map((node) => {
    if (node.style === STYLE_TYPES.NORMAL)
      return <Typography fontSize={14}>{node.value}</Typography>;
    else if (node.style === STYLE_TYPES.MATH)
      return (
        <Typography fontSize={14}>
          <Context input="ascii">
            <Node>{node?.value || ""}</Node>
          </Context>
        </Typography>
      );
    else if (node.style === STYLE_TYPES.BOLD)
      return (
        <Typography fontWeight={500} fontSize={14}>
          {node.value}
        </Typography>
      );
  });
  return (
    <Box sx={{ display: "flex", gap: "4px", alignItems: "center" }}>
      {nodesToShow &&
        nodesToShow.length > 0 &&
        nodesToShow.map((node) => {
          return node;
        })}
    </Box>
  );
};

export default RenderTextNodes;
