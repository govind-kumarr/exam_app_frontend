import {
  Box,
  Button,
  FormControl,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import EnhancedTextField from "../../../components/EnhancedTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { AllPaths, mcqSchema, T_AddMCQForm } from "../../../schema/mcq-schema";
import { ITextNode } from "../../../types/interfaces/text-interfaces";
import { options as dummyOptions } from "../../../constants";
import { useMutation } from "react-query";
import { addMcqs } from "../../../services/actions";
import MCQ from "./mcq";

const AddMCQ = () => {
  const [mcqs, setMcqs] = useState<T_AddMCQForm[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const {
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(mcqSchema),
    defaultValues: {
      questionTitle: [],
      options: [],
    },
  });

  const [options] = watch(["options"]);

  const matches = useMediaQuery("(max-width:600px)");

  const {
    mutate: addMcqsMutate,
    isLoading: addMcqPending,
    reset,
  } = useMutation({
    mutationKey: "addMcqs",
    mutationFn: addMcqs,
    onSuccess: (response) => {
      console.log(response);

      reset();
      setShowPreview(false);
    },
  });

  const handleAddMCQ = (data: T_AddMCQForm) => {
    console.log({ errors, data });
    if (Object.keys(errors).length > 0) return;
    setMcqs((prev) => [...prev, data]);
    setShowPreview(true);
  };

  const getTextNodes = (key: AllPaths) => {
    return (value: ITextNode[]) => {
      setValue(key, value, { shouldValidate: true });
    };
  };

  const markCorrect = (optionIndex: number) => {
    if (optionIndex === undefined || optionIndex === null) return;

    if (options.length > 0) {
      options.map((_, index) => {
        if (index === optionIndex)
          setValue(`options.${optionIndex}.isCorrect`, true);
        else setValue(`options.${index}.isCorrect`, false);
      });
    }
  };

  const saveMcq = () => {
    if (options.filter((val) => val.isCorrect).length) {
      addMcqsMutate({ mcqs: [watch()] });
    }
  };

  return (
    <Box sx={{}}>
      {showPreview ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
            maxWidth: "900px",
            gap: "10px",
            width: "100%",
            m: "auto",
          }}
        >
          <MCQ
            mcq={mcqs[0]}
            questionId={0}
            optionId={watch('options').findIndex(o => o.isCorrect)}
            markCorrect={markCorrect}
          />
          <Button
            onClick={saveMcq}
            disabled={
              !options.filter((val) => val.isCorrect).length || addMcqPending
            }
          >
            {addMcqPending ? "adding..." : "Add"}
          </Button>
        </Box>
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
              <EnhancedTextField
                getTextNodes={getTextNodes("questionTitle")}
                error={Boolean(errors?.questionTitle?.message)}
                helperText={errors?.questionTitle?.message || ""}
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
            {dummyOptions.map((option, index) => (
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
                <EnhancedTextField
                  getTextNodes={getTextNodes(`options.${index}.optionValue`)}
                  error={Boolean(
                    errors?.options?.[index]?.optionValue?.message
                  )}
                  helperText={
                    errors?.options?.[index]?.optionValue?.message || ""
                  }
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
