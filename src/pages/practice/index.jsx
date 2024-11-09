import { Box, Button } from "@mui/material";
import Row from "./components/Row";
import useQuestions from "./../../context/useQuestions";
import { useEffect, useState } from "react";
import CountDown from "./components/CountDown";

const QuestionSlider = () => {
  const { dataset, changeStructure, answers } = useQuestions();

  const [structure, setStructure] = useState({ rows: 4, cols: 4 });

  console.log({ dataset });

  const checkAllAnswers = () => {
    let totalAnswers = 0;
    let correctAnswers = 0;
    Object.keys(answers).map((key) => {
      const currentAnswer = answers[key];

      currentAnswer.input === currentAnswer.actualAnswer
        ? correctAnswers++
        : null;
      totalAnswers++;
    });

    return correctAnswers != totalAnswers;
  };

  useEffect(() => {
    changeStructure(structure);
  }, []);

  return (
    <Box
      sx={{
        maxWidth: "90%",
        width: "500px",
        maxHeight: "90vh",
        height: "500px",
        margin: "auto",
        mt: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          sx={{
            m: "auto",
            display: "grid",
            gridTemplateColumns: `repeat(${structure.cols},1fr)`,
            width: "100%",
            gap: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {dataset &&
            dataset.map((row, ind) => <Row rowNumber={ind} data={row} />)}
          <Button
            variant="outlined"
            sx={{
              maxHeight: "150px",
              height: "50px",
              fontSize: 20,
              textTransform: "capitalize",
              gridColumn: "span 2",
            }}
            onClick={() => changeStructure(structure)}
          >
            refresh
          </Button>
          <Button
            variant="contained"
            sx={{
              maxHeight: "150px",
              height: "50px",
              fontSize: 20,
              textTransform: "capitalize",
              gridColumn: "span 2",
            }}
            onClick={() => changeStructure(structure)}
            disabled={checkAllAnswers()}
          >
            submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default QuestionSlider;
