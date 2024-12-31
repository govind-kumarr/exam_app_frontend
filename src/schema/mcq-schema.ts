import * as yup from "yup";
import { InferType } from "yup";
import { STYLE_TYPES } from "../constants";

const mcqSchema = yup.object({
  questionTitle: yup
    .array()
    .of(
      yup.object({
        value: yup.string().required("Question title value is required"),
        style: yup
          .string()
          .oneOf(Object.values(STYLE_TYPES))
          .required("Style for question title is required"),
      })
    )
    .required("Question title is required")
    .min(1, "Question title must have at least one element"),

  options: yup
    .array()
    .of(
      yup.object({
        optionValue: yup
          .array()
          .of(
            yup.object({
              value: yup.string().required("Option value is required"),
              style: yup
                .string()
                .oneOf(Object.values(STYLE_TYPES))
                .required("Style for option value is required"),
            })
          )
          .required("Option value is required")
          .min(1, "Option must have at least one value"),
        isCorrect: yup
          .boolean()
          .default(false)
          .required("Tick Whether option is correct or not"),
      })
    )
    .required("Options are required")
    .min(1, "There must be at least one option"),
});

export type T_AddMCQForm = InferType<typeof mcqSchema>;

type QuestionTitlePaths =
  | "questionTitle"
  | `questionTitle.${number}`
  | `questionTitle.${number}.value`
  | `questionTitle.${number}.style`;

type OptionPaths =
  | "options"
  | `options.${number}`
  | `options.${number}.optionValue`
  | `options.${number}.optionValue.${number}`
  | `options.${number}.optionValue.${number}.value`;

export type AllPaths = QuestionTitlePaths | OptionPaths;

export { mcqSchema };
