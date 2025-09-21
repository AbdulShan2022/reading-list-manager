import apiClient from "./client";
import type { User } from "../types";

export const userService = {
  getUser: async (id: string): Promise<User> => {
    const response = await apiClient.get<User>(`/users/${id}`);
    return response.data;
  },
};
