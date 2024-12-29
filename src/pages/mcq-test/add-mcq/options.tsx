import { Box, Button, useMediaQuery } from "@mui/material";
import React, { FC, useState } from "react";
import RenderTextNodes from "../../../components/custom/RenderTextNodes";
import { IOptions } from "../../../types/interfaces/component-interfaces";

const Options: FC<IOptions> = ({ options }) => {
  const matches = useMediaQuery("(max-width:600px)");
  const [selectedOption, setSelectedOption] = useState<string>("");

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: matches ? "repeat(1,1fr)" : "repeat(2,1fr)",
        width: "100%",
        gap: matches ? 1 : 4,
      }}
    >
      {options.map((option, index) => {
        const { optionValue } = option;
        return (
          <Button
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              padding: "10px",
            }}
            key={index}
            onClick={() => setSelectedOption(index + "")}
            variant={index + "" === selectedOption ? "contained" : "outlined"}
          >
            <RenderTextNodes textNodes={optionValue} />
          </Button>
        );
      })}
    </Box>
  );
};

export default Options;
