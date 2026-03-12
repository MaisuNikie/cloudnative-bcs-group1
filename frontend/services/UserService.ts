import { AuthenticationRequest, User } from "@types";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL is not defined");

const handleResponse = async (response: Response): Promise<void> => {
  if (!response.ok) {
    throw new Error(response.status.toString());
  }
};

export const loginRequest = async (authRequest: AuthenticationRequest): Promise<User> => {
  try {
    const response = await fetch(`${apiUrl}/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authRequest),
      credentials: "include",
    });
    await handleResponse(response);
    return response.json();
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "network");
  }
};

export const logoutRequest = async (): Promise<void> => {
  try {
    const response = await fetch(`${apiUrl}/api/users/logout`, {
      method: "POST",
      credentials: "include",
    });
    await handleResponse(response);
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "network");
  }
};
