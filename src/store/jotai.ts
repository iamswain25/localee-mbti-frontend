import { atom } from "jotai";
import { Result } from "../@types/Result";
export const loadingAtom = atom(false);
export const resultAtom = atom<Result>({});
export const filesAtom = atom<F[]>([]);
export const profileAtom = atom<Profile>({ name: undefined, link: undefined });
export type Profile = { name?: string; link?: string };
export interface F extends File {
  preview: string;
}
