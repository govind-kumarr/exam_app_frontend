import { Box, IconButton, TextField, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Node, Context } from "react-mathjax2";

const EnhancedTextField = ({ errors, field, textControls }) => {
  const [showControls, setShowControls] = useState(false);
  const [activeControl, setActiveControl] = useState("");

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
                <Tooltip
                  open={activeControl}
                  title={
                    <Context input="ascii">
                      <Node>{field?.value || ""}</Node>
                    </Context>
                  }
                >
                  <IconButton
                    onClick={(e) => {
                      setActiveControl(label);
                      handleClick(e);
                    }}
                  >
                    {icon}
                  </IconButton>
                </Tooltip>
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
        onBlur={() => {
          setShowControls(true);
          setActiveControl("");
        }}
      />
    </Box>
  );
};

export default EnhancedTextField;
