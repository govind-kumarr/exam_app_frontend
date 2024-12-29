import React, { FC } from "react";
import { ISidebar } from "../../types/interfaces/component-interfaces";
import { Box, Button } from "@mui/material";

const Sidebar: FC<ISidebar> = ({ open, setOpen }) => {
  return (
    <Box
      sx={{
        width: open ? "200px" : "50px",
        height: "100%",
      }}
    >
      <Button onClick={() => setOpen(!open)}>{open ? "Close" : "Open"}</Button>
    </Box>
  );
};

export default Sidebar;
