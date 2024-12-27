import { Box, TextField, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import RenderTextNodes from "../../../components/custom/RenderTextNodes";

const MCQPreview = ({ mcqs = [] }) => {
  const matches = useMediaQuery("(max-width:600px)");

  return (
    <Box>
      {mcqs.length > 0 &&
        mcqs.map((mcq) => {
          const { questionTitle, options } = mcq;
          return (
            <Box
              sx={{
                display: "flex",
                margin: "auto",
                flexDirection: "column",
                alignItems: "center",
                maxWidth: "900px",
                gap: "10px",
              }}
            >
              <Box sx={{ width: "100%" }}>
                <RenderTextNodes textNodes={questionTitle} />
              </Box>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: matches
                    ? "repeat(1,1fr)"
                    : "repeat(2,1fr)",
                  width: "100%",
                  gap: matches ? 1 : 4,
                }}
              >
                {options.map((option, index) => {
                  const { optionValue } = option;
                  return (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                        padding: "10px",
                      }}
                      key={index}
                    >
                      <RenderTextNodes textNodes={optionValue} />
                      {/* <TextField
                        value={optionValue}
                        slotProps={{
                          input: {
                            readOnly: true,
                          },
                        }}
                      /> */}
                    </Box>
                  );
                })}
              </Box>
            </Box>
          );
        })}
    </Box>
  );
};

export default MCQPreview;
