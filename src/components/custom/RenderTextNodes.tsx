import { Box } from "@mui/material";
import { FC } from "react";
import { IRenderTextNodes } from "../../types/interfaces/component-interfaces";
import TextNode from "./TextNode";

const RenderTextNodes: FC<IRenderTextNodes> = ({ textNodes = [] }) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "4px",
        height: "100%",
        flexWrap: "wrap",
      }}
    >
      {textNodes &&
        textNodes.length > 0 &&
        textNodes.map((node) => <TextNode {...node} />)}
    </Box>
  );
};

export default RenderTextNodes;
