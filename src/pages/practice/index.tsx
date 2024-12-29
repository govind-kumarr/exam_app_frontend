import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Row from "./components/Row";
import useQuestions from "./../../context/useQuestions";
import { useEffect, useState } from "react";
import CountDown from "./components/CountDown";
import { Controller, useForm } from "react-hook-form";
import { Diff } from "../../utils/functions";

const operatorValues = [
  {
    label: "Add",
    value: "+",
  },
  {
    label: "Substract",
    value: "-",
  },
  {
    label: "Multiply",
    value: "*",
  },
  {
    label: "Divide",
    value: "/",
  },
];
const difficultyValues = Object.values(Diff);
const digitValues = [
  {
    label: "2",
    value: 2,
  },
  {
    label: "3",
    value: 3,
  },
  {
    label: "4",
    value: 4,
  },
];

const structure = { rows: 4, cols: 4 };

const QuestionSlider = () => {
  console.log("QuestionSlider");
  const { dataset, changeStructure, allAnswersCorrect } = useQuestions();
  const { handleSubmit, setValue, watch, reset, control } = useForm({
    defaultValues: {
      diff: Diff.EASY,
      operator: {
        label: "Add",
        value: "+",
      },
      digit: {
        label: "2",
        value: 2,
      },
    },
  });

  const onSubmit = (data) => {
    console.log({ data });
    const { diff, digit, operator } = data;

    if (diff && digit && operator)
      changeStructure({
        rows: 4,
        cols: 4,
        diff: diff,
        digit: digit.value,
        operator: operator.value,
      });
  };

  const [digit, diff, operator] = watch(["digit", "diff", "operator"]);

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
            gridTemplateColumns: `repeat(auto-fill, minmax(150px, 1fr))`,
            width: "100%",
            gap: 1,
            // border: "1px solid black",
            px: 1,
            py: 1,
          }}
          component={"form"}
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormControl>
            <InputLabel
              sx={{
                color: ({ palette }) => palette.primary.main,
              }}
            >
              Digit
            </InputLabel>
            <Controller
              name="digit"
              control={control}
              render={(renderValue) => {
                const { field } = renderValue;
                return (
                  <Select
                    {...field}
                    renderValue={(selected) =>
                      selected.label ? selected.label : ""
                    }
                    label="Digit"
                  >
                    {digitValues.map((option) => {
                      return (
                        <MenuItem value={option}>
                          {option?.label || ""}
                        </MenuItem>
                      );
                    })}
                  </Select>
                );
              }}
            />
          </FormControl>
          <FormControl>
            <InputLabel>Operator</InputLabel>
            <Controller
              name="operator"
              control={control}
              render={(renderValue) => {
                const { field } = renderValue;
                return (
                  <Select
                    {...field}
                    renderValue={(selected) =>
                      selected.label ? selected.label : ""
                    }
                    label="Operator"
                  >
                    {operatorValues.map((option) => {
                      return (
                        <MenuItem value={option}>
                          {option?.label || ""}
                        </MenuItem>
                      );
                    })}
                  </Select>
                );
              }}
            />
          </FormControl>
          <FormControl>
            <InputLabel>Difficulty</InputLabel>
            <Controller
              name="diff"
              control={control}
              render={(renderValue) => {
                const { field } = renderValue;
                return (
                  <Select {...field} label="Difficulty">
                    {difficultyValues.map((value) => {
                      return <MenuItem value={value}>{value}</MenuItem>;
                    })}
                  </Select>
                );
              }}
            />
          </FormControl>

          <Button type="submit">Apply</Button>
        </Box>
        <Box
          sx={{
            // border: "1px solid black",
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
            disabled={!allAnswersCorrect}
          >
            submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default QuestionSlider;
