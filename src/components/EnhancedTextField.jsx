import { Box, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Node, Context } from "react-mathjax2";

const STYLE_TYPES = {
  NORMAL: "NORMAL",
  BOLD: "BOLD",
  MATH: "MATH",
};

const EnhancedTextField = ({
  errors,
  field,
  textControls,
  setValue,
  form_key,
}) => {
  const [textNodes, setTextNodes] = useState([]);
  const [showControls, setShowControls] = useState(false);
  const [activeControl, setActiveControl] = useState(STYLE_TYPES.NORMAL);

  const handleActiveControlClick = (control) => {
    const currentText = field?.value || "";
    if (currentText.length) {
      setTextNodes((prev) => [
        ...prev,
        { value: currentText, style: activeControl },
      ]);
      setValue(form_key, "");
    }
    if (activeControl === control) {
      return setActiveControl(STYLE_TYPES.NORMAL);
    }

    setActiveControl(control);
  };

  console.log({ activeControl });

  const nodesToShow = textNodes.map((node) => {
    if (node.style === STYLE_TYPES.NORMAL) return <span>{node.value}</span>;
    else if (node.style === STYLE_TYPES.MATH)
      return (
        <Context input="ascii">
          <Node>{node?.value || ""}</Node>
        </Context>
      );
    else if (node.style === STYLE_TYPES.BOLD)
      return <Typography fontWeight={500}>{node.value}</Typography>;
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <Box>
        {nodesToShow &&
          nodesToShow.length > 0 &&
          nodesToShow.map((node) => {
            return node;
          })}
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
                >
                  {icon}
                </IconButton>
              </Box>
            );
          })}
      </Box>

      <TextField
        {...field}
        multiline
        focused
        maxRows={3}
        placeholder="Enter question here..."
        sx={{ width: "100%" }}
        error={errors[field?.name]}
        helperText={errors[field?.name] ? "This field is required" : ""}
        onFocus={() => {
          setShowControls(true);
        }}
        // onBlur={() => {
        //   setShowControls(true);
        // }}
      />
    </Box>
  );
};

export default EnhancedTextField;
