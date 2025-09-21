import { useQuery } from "@tanstack/react-query";
import { userService } from "../services/userService";
import type { User } from "../types";

export const useUser = (userId: string = "1") => {
  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useQuery<User, Error>({
    queryKey: ["user", userId],
    queryFn: () => userService.getUser(userId),
    retry: 1,
    retryDelay: 1000,
    staleTime: 1000 * 60 * 5,
  });

  return { user, isLoading, error, refetch };
};
