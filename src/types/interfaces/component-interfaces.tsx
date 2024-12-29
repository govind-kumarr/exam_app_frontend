import { T_AddMCQForm } from "../../schema/mcq-schema";
import { ITextNode } from "./text-interfaces";

interface IEhancedTextField {
  getTextNodes: (textNode: ITextNode[]) => void;
  error: boolean;
  helperText: string;
}

interface IRenderTextNodes {
  textNodes: ITextNode[];
}

interface IMCQPreview {
  mcqs: T_AddMCQForm[];
}

interface IMCQ {
  mcq: T_AddMCQForm;
  questionId: number;
  optionId?: number | undefined;
  setOptionId: (questionId: number, optionId: number) => void;
}

interface IOption {
  optionValue: ITextNode[];
}

interface IOptions {
  options: IOption[];
  questionId: number;
  optionId: number | undefined;
  setOptionId: (questionId: number, optionId: number) => void;
}

interface ISidebar {
  open: boolean;
  setOpen: (open: boolean) => void;
  // sidebarItems:
}

interface IProgressInfo {
  mcqs: T_AddMCQForm[];
  activeQuestionId: number;
  setActiveQuestionId: (questionId: number) => void;
}

export type {
  IEhancedTextField,
  IRenderTextNodes,
  IMCQPreview,
  IMCQ,
  IOption,
  IOptions,
  ISidebar,
  IProgressInfo,
};
