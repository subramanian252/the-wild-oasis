import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiLogin";

export default function useCurrent() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return { isLoading, isAuthenticated: user?.role === "authenticated", user };
}
