import { valdi } from "./valdi";

export interface Token {
  key: string;
  alias: string;
}

interface Tokens {
  [key: string]: Token[]
}

export const tokens: Tokens = {
  valdi
};