import React, { useEffect, useRef, useState } from "react";
import { STYLE_TYPES, textControls } from "../constants";
import { Box, IconButton, Typography } from "@mui/material";
import { Context, Node } from "react-mathjax2";
import { listenForOutsideClicks } from "../utils/functions";

const EnhancedTextField2 = ({ getTextNodes, error = false }) => {
  const [textNodes, setTextNodes] = useState([]);
  const [showControls, setShowControls] = useState(false);
  const [activeControl, setActiveControl] = useState(STYLE_TYPES.NORMAL);
  const [text, setText] = useState("");

  const menuRef = useRef(null);
  const inputRef = useRef(null)
  const [listening, setListening] = useState(false);

  const addNode = () => {
    if (text.length) {
      setTextNodes((prev) => {
        getTextNodes([...prev, { value: text, style: activeControl }]);
        return [...prev, { value: text, style: activeControl }];
      });
      getTextNodes(textNodes);
      setText("");
    }
  };

  const handleActiveControlClick = (control) => {
    setShowControls(true);
    addNode();
    if (activeControl === control) setActiveControl(STYLE_TYPES.NORMAL);
    else setActiveControl(control);
  };

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

  const handleKeyDown = (e) => {};

  const getPreview = (control, text) => {
    if (control === STYLE_TYPES.MATH)
      return (
        <Box fontSize={14} sx={{ p: 0 }}>
          <Context input="ascii">
            <Node>{text || ""}</Node>
          </Context>
        </Box>
      );
    else if (control === STYLE_TYPES.BOLD)
      return (
        <Typography fontWeight={500} fontSize={14}>
          {text}
        </Typography>
      );

    return null;
  };

  useEffect(
    listenForOutsideClicks(listening, setListening, menuRef, setShowControls)
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "2px",
        width: "100%",
        height: "100%",
      }}
      onClick={() => {
        if(inputRef?.current) {
          inputRef?.current?.focus()
        }
      }}
      ref={menuRef}
    >
      {error && <Typography color="error" fontSize={14}>{error}</Typography>}
      <Box
        sx={{
          display: "flex",
          gap: "4px",
          whiteSpace: "nowrap",
          width: "100%",
          border: ({ palette }) =>
            `2px solid ${
              error
                ? palette.error.main
                : showControls
                ? palette.primary.main
                : palette.grey[500]
            }`,
          p: 1,
          borderRadius: "5px",
        }}
      >
        <Box sx={{ display: "flex", gap: "4px", alignItems: "center" }}>
          {nodesToShow &&
            nodesToShow.length > 0 &&
            nodesToShow.map((node) => {
              return node;
            })}
        </Box>

        {getPreview(activeControl, text)}

        <input
          type="text"
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => {
            setShowControls(true);
          }}
          style={{ border: "none", outline: "none", fontSize: "14px" }}
          onBlur={addNode}
          onKeyDown={(e) => {
            if (e.ctrlKey && e.key === "b") {
              e.preventDefault();
              handleActiveControlClick(STYLE_TYPES.BOLD);
            } else if (e.ctrlKey && e.key === "e") {
              e.preventDefault();
              handleActiveControlClick(STYLE_TYPES.MATH);
            } else if (e.key === "Backspace" && !text) {
              if (!text && textNodes.length) {
                const [lastNode] = textNodes.slice(-1);
                const { value, style } = lastNode;
                console.log({ value, style });

                setTextNodes(textNodes.slice(0, -1));
                setActiveControl(style);
                setText(value);
              }
            } else if (e.key == "Enter") {
              e.preventDefault();
            }
          }}
        />
      </Box>

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
                  sx={{ p: 0.5 }}
                >
                  {icon}
                </IconButton>
              </Box>
            );
          })}
      </Box>
    </Box>
  );
};

export default EnhancedTextField2;
