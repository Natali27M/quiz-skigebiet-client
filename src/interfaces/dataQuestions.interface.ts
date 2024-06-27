import { Data } from "./data.interface";

export interface DataQuestions {
  addLeadingZero: (number: number) => number;
  activeQuestion: number;
  questionColors: { [key: number]: string };
  myData: Data[];
  numberQuestion: number;
  onAnswerSelected: (answer: string) => void;
  getAnswerClass: (answer: string) => string;
}
