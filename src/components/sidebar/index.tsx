import { FC } from "react";
import { ISidebar } from "../../types/interfaces/component-interfaces";
import { Box, Button, Typography } from "@mui/material";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const Sidebar: FC<ISidebar> = ({ open, setOpen }) => {
  const sidebarVariants = {
    open: {
      width: "200px",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      width: "50px",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const sidebarItems = [
    {
      id: "1",
      label: "Add MCQ",
      path: "/mcq/add",
    },
    {
      id: "2",
      label: "Show MCQs",
      path: "/mcq/list",
    },
  ];

  return (
    <motion.div variants={sidebarVariants} animate={open ? "open" : "close"}>
      <Box
        sx={{
          height: "100%",
          border: "1px solid black",
          // width: '100%'
        }}
      >
        <Button onClick={() => setOpen(!open)}>
          {open ? "Close" : "Open"}
        </Button>
        {open && (
          <Box
            sx={{
              border: "1px solid black",
              pl: 2,
            }}
          >
            {sidebarItems &&
              sidebarItems.length > 0 &&
              sidebarItems.map((item) => {
                const { label, path, id } = item;
                return (
                  <Box textAlign={"left"}>
                    <Link
                      key={id}
                      to={path}
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      <Typography>{label}</Typography>
                    </Link>
                  </Box>
                );
              })}
          </Box>
        )}
      </Box>
    </motion.div>
  );
};

export default Sidebar;
