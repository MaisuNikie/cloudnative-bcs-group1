export type AuthContextType = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
};

export type User = {
  firstName?: string;
  lastName?: string;
  fullname?: string;
  email?: string;
  username?: string;
  password?: string;
  role?: string;
  token?: string;
};

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
