import * as yup from "yup";


const mcqSchema = yup.object({
  questionTitle: yup
    .array()
    .of(
      yup.object({
        value: yup.string().required("Question title value is required"),
        style: yup
          .string()
          .oneOf(["NORMAL", "MATH"], "Invalid style for question title")
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
                .oneOf(["NORMAL", "MATH"], "Invalid style for option value")
                .required("Style for option value is required"),
            })
          )
          .required("Option value is required")
          .min(1, "Option must have at least one value"),
      })
    )
    .required("Options are required")
    .min(1, "There must be at least one option"),
});

export { mcqSchema };
