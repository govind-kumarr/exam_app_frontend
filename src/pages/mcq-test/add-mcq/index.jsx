import {
  Box,
  Button,
  FormControl,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import MCQPreview from "./show-preview";
import EnhancedTextField from "../../../components/EnhancedTextField";
import EnhancedTextField2 from "../../../components/EnhancedTextField2";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { mcqSchema } from "../../../schema/mcq-schema";

const options = [
  {
    option: "A",
    optionAnswer: "answer 1",
  },
  {
    option: "B",
    optionAnswer: "answer 2",
  },
  {
    option: "C",
    optionAnswer: "answer 3",
  },
  {
    option: "D",
    optionAnswer: "answer 4",
  },
];

const AddMCQ = () => {
  const [mcqs, setMcqs] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  const {
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(mcqSchema),
    defaultValues: {
      questionTitle: [],
      options: [],
    },
  });

  const matches = useMediaQuery("(max-width:600px)");
  console.log({errors});
  

  const handleAddMCQ = (data) => {
    console.log({ errors, data });
    if (Object.keys(errors).length > 0) return;
    setMcqs((prev) => [...prev, data]);
    setShowPreview(true);
  };

  const getTextNodes = (key) => {
    return (value) => {
      setValue(key, value, { shouldValidate: true });
    };
  };

  return (
    <Box sx={{}}>
      {showPreview ? (
        <MCQPreview mcqs={mcqs} />
      ) : (
        <Box
          sx={{
            display: "flex",
            margin: "auto",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "900px",
            gap: "10px",
          }}
          component={"form"}
          onSubmit={handleSubmit(handleAddMCQ)}
        >
          <Box sx={{ width: "100%" }}>
            <FormControl
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <Typography variant="h5">Title</Typography>
              <EnhancedTextField2
                getTextNodes={getTextNodes("questionTitle")}
                error={errors?.questionTitle?.message || ""}
              />
              {/* <Controller
                name="questionTitle"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => {
                  return <EnhancedTextField2 />;
                }}
              /> */}
            </FormControl>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: matches ? "repeat(1,1fr)" : "repeat(2,1fr)",
              width: "100%",
              gap: matches ? 1 : 4,
            }}
          >
            {options.map((option, index) => (
              <Box
                key={`options.${index}`}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                  padding: "10px",
                  height: "100px",
                }}
              >
                <Box>
                  {!matches && <Typography>{option.option}.</Typography>}
                </Box>
                <EnhancedTextField2
                  getTextNodes={getTextNodes(`options.${index}.optionValue`)}
                />
                {/* <Controller
                  name={`options.${index}.optionValue`}
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        slotProps={{
                          input: {
                            startAdornment: matches ? (
                              <Typography variant="h6" position={"start"}>
                                {option.option}.
                              </Typography>
                            ) : null,
                          },
                        }}
                        error={errors?.options?.[index]?.optionValue}
                        helperText={
                          errors?.options?.[index]?.optionValue
                            ? "This field is required"
                            : ""
                        }
                      />
                    );
                  }}
                /> */}
              </Box>
            ))}
          </Box>
          <Box sx={{ width: "100%", paddingRight: "20px" }}>
            <FormControl
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: "10px",
              }}
            >
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </FormControl>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AddMCQ;
