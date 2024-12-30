import { FC, useState } from "react";
import { IProgressInfo } from "../../../types/interfaces/component-interfaces";
import { Box, Button, IconButton } from "@mui/material";
import { motion } from "motion/react";
import InfoIcon from "@mui/icons-material/Info";

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
    width: "10px",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};
const ProgressInfo: FC<IProgressInfo> = ({
  mcqs,
  activeQuestionId,
  setActiveQuestionId,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <motion.div
      variants={sidebarVariants}
      animate={isSidebarOpen ? "open" : "close"}
    >
      <Box sx={{ border: "1px solid black", p: 1, height: "100%" }}>
        <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)} sx={{border: '1px solid black'}}>
          <InfoIcon />
        </IconButton>
        {isSidebarOpen ? (
          <Box sx={{ display: "flex", gap: "5px" }}>
            {mcqs.map((_, index) => {
              return (
                <Button
                  variant={
                    activeQuestionId === index ? "contained" : "outlined"
                  }
                  onClick={() => setActiveQuestionId(index)}
                >
                  {index + 1}
                </Button>
              );
            })}
          </Box>
        ) : null}
      </Box>
    </motion.div>
  );
};

export default ProgressInfo;
