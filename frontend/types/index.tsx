export type StatusMessage = {
  message: string;
  type: "error" | "success";
};

export type exerciseTemplate = {
  name: string;
  description: string;
  expectedReps: number;
  expectedSets: number;
  expectedWeight: number;
};

export type exerciseInstance = {
  reps: number;
  sets: number;
  weight: number;
};
