import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { logout } from "../../services/apiLogin";
import { useNavigate } from "react-router-dom";

export default function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading: isLogggingOut, mutate: logoutMutate } = useMutation({
    mutationFn: logout,
    onSuccess: (data) => {
      toast.success(`User logged out in Successfully`);
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
    onError: (err) => toast.error("User Could not be logged out"),
  });

  return { isLogggingOut, logoutMutate };
}
