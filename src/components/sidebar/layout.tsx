import { Box } from "@mui/material";
import { useState } from "react";
import Sidebar from ".";

const SidebarLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <Box sx={{ width: "100vw", height: "100vh", display: "flex" }}>
      <Sidebar open={isSidebarOpen} setOpen={setIsSidebarOpen} />
      <Box sx={{ width: "100%" }}>{children}</Box>
    </Box>
  );
};

export default SidebarLayout;
