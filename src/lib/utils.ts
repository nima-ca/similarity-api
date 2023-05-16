import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const isSystemThemeDark = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;
