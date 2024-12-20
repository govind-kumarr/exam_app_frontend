import React, { useRef, useState } from "react";
import { STYLE_TYPES, textControls } from "../constants";
import { Box, IconButton, Typography } from "@mui/material";
import { Context, Node } from "react-mathjax2";
import TextField from "./form-elements/TextField/Index";

const EnhancedTextField2 = () => {
  const [textNodes, setTextNodes] = useState([]);
  const [showControls, setShowControls] = useState(false);
  const [activeControl, setActiveControl] = useState(STYLE_TYPES.NORMAL);
  const [text, setText] = useState("");

  const handleActiveControlClick = (control) => {
    // if (control === activeControl) return;
    if (text.length) {
      setTextNodes((prev) => [...prev, { value: text, style: activeControl }]);
      setText("");
    }

    if (activeControl === control) setActiveControl(STYLE_TYPES.NORMAL);
    else setActiveControl(control);
  };

  const nodesToShow = textNodes.map((node) => {
    if (node.style === STYLE_TYPES.NORMAL)
      return <Typography>{node.value}</Typography>;
    else if (node.style === STYLE_TYPES.MATH)
      return (
        <Context input="ascii">
          <Node>{node?.value || ""}</Node>
        </Context>
      );
    else if (node.style === STYLE_TYPES.BOLD)
      return <Typography fontWeight={500}>{node.value}</Typography>;
  });

  const getPreview = (control, text) => {
    if (control === STYLE_TYPES.MATH)
      return (
        <Context input="ascii">
          <Node>{text || ""}</Node>
        </Context>
      );
    else if (control === STYLE_TYPES.BOLD)
      return <Typography fontWeight={500}>{text}</Typography>;

    return null;
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
        {showControls &&
          textControls.map((control) => {
            const { icon, label } = control;
            return (
              <Box
                bgcolor={({ palette }) =>
                  activeControl === label ? palette.primary.main : ""
                }
                sx={{ borderRadius: 9999 }}
              >
                <IconButton
                  onClick={(e) => {
                    handleActiveControlClick(label);
                  }}
                >
                  {icon}
                </IconButton>
              </Box>
            );
          })}
      </Box>

      <Box sx={{ display: "flex", gap: "4px", whiteSpace: "nowrap" }}>
        {nodesToShow &&
          nodesToShow.length > 0 &&
          nodesToShow.map((node) => {
            return node;
          })}

        {/* {getPreview(activeControl, text)} */}

        <TextField
          focused
          placeholder="Enter question here..."
          sx={{
            width: "100%",
          }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => {
            setShowControls(true);
          }}
        />
      </Box>
    </Box>
  );
};

export default EnhancedTextField2;
