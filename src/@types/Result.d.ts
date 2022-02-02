import { MBTI_result } from "./Answer";
export interface Result {
  profile?: { name: string; link: string };
  total?: { counter: number; mbti: string; detail: MBTI_result };
  mine?: { mbti: string; detail: MBTI_result };
  date?: string;
}
