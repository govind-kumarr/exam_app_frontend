import  { FC } from "react";
import { ISidebar } from "../../types/interfaces/component-interfaces";
import { Box, Button } from "@mui/material";
import { motion } from "motion/react";

const Sidebar: FC<ISidebar> = ({ open, setOpen }) => {
  const sidebarVariants = {
    open: {
      width: '200px',
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      width: '50px',
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  return (
    <motion.div variants={sidebarVariants} animate={open ? "open" : "close"}>
      <Box
        sx={{
          height: "100%",
        }}
      >
        <Button onClick={() => setOpen(!open)}>
          {open ? "Close" : "Open"}
        </Button>
      </Box>
    </motion.div>
  );
};

export default Sidebar;
