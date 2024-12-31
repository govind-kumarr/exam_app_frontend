import { Box } from "@mui/material";
import { useState } from "react";
import Sidebar from ".";
import { Outlet } from "react-router-dom";

const SidebarLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <Box sx={{ width: "100vw", height: "100vh", display: "flex" }}>
      <Sidebar open={isSidebarOpen} setOpen={setIsSidebarOpen} />
      <Box sx={{ width: "100%" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default SidebarLayout;
