export const themes = ["ucll", "latte", "mocha"] as const;
export type Theme = (typeof themes)[number];
