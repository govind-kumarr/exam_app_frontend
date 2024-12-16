import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  TextField,
  Typography,
  useFormControl,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import MCQPreview from "./show-preview";
import FunctionsIcon from "@mui/icons-material/Functions";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import EnhancedTextField from "../../../components/EnhancedTextField";

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
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      questionTitle: "",
      options: [
        {
          optionValue: "",
        },
      ],
    },
  });

  const textControls = useMemo(
    () => [
      {
        label: "Expression",
        icon: <FunctionsIcon width={10} height={10} />,
        onClick: () => {
          console.log("On Click");
        },
      },
      {
        label: "Bold",
        icon: <FormatBoldIcon width={10} height={10} />,
        onClick: () => {
          console.log("On Click");
        },
      },
    ],
    []
  );

  console.log(errors);

  const matches = useMediaQuery("(max-width:600px)");

  const handleAddMCQ = (data) => {
    setMcqs((prev) => [...prev, data]);
    setShowPreview(true);
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
              <Controller
                name="questionTitle"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => {
                  console.log({ field });

                  return (
                    <EnhancedTextField
                      field={field}
                      errors={errors}
                      textControls={textControls}
                    />
                  );
                }}
              />
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
                }}
              >
                <Box>
                  {!matches && <Typography>{option.option}.</Typography>}
                </Box>
                <Controller
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
                />
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
