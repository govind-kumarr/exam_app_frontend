type textStyles = "NORMAL" | "BOLD" | "MATH";

interface ITextNode {
  value: string;
  style: textStyles;
}

export type { ITextNode, textStyles };
