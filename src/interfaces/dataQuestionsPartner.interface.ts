import { Data } from "./data.interface";

export interface DataQuestionsPartner {
  addLeadingZeroPartner: (number: number) => number;
  activeQuestionPartner: number;
  questionColorsPartner: { [key: number]: string };
  partnerData: Data[];
  numberQuestionPartner: number;
  onAnswerSelectedPartner: (answer: string) => void;
  getAnswerClassPartner: (answer: string) => string;
}
