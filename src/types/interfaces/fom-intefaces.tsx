import { ITextNode } from "./text-interfaces";


interface AddMCQForm {
  questionTitle: ITextNode[];
  options: { optionTitle: ITextNode[] }[];
}

export type { AddMCQForm };
