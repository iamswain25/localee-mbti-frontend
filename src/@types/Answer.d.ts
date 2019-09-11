export type Answer = {
  a?: string;
  E?: number;
  I?: number;
  S?: number;
  N?: number;
  J?: number;
  P?: number;
  "T(M)"?: number;
  "T(F)"?: number;
  "F(M)"?: number;
  "F(F)"?: number;
  checked?: boolean;
  id?: string;
  [id: string]: any;
};

export type Question = {
  index: number;
  question?: string;
  checked?: boolean;
  answers: Answer[];
  score?: Answer;
};

export interface MBTI_result {
  E: number;
  I: number;
  S: number;
  N: number;
  J: number;
  P: number;
  T: number;
  F: number;
}
export type MBTIKey = "E" | "I" | "S" | "N" | "J" | "P" | "T" | "F";
export interface NumberType {
  [key: MBTIKey]: number;
}
