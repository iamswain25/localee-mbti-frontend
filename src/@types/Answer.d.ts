export type Answer = {
  a?: String;
  E?: Number;
  I?: Number;
  S?: Number;
  N?: Number;
  J?: Number;
  P?: Number;
  "T(M)"?: Number;
  "T(F)"?: Number;
  "F(M)"?: Number;
  "F(F)"?: Number;
  checked?: boolean;
  id?: string;
  [id: string]: any;
};

export type Question = {
  index: Number;
  question?: String;
  checked?: boolean;
  answers: Answer[];
  score?: Answer;
};
