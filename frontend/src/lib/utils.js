import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
//helper function for shad cn to safely combine tailwind class names when classes conditional or conflicting
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
