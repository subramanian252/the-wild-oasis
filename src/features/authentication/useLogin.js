import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { login } from "../../services/apiLogin";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading: islogging, mutate: loginMutate } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      toast.success(`User logged in Successfully`);
      queryClient.setQueryData(["user"], data.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => toast.error("User Could not be logged in"),
  });

  return { islogging, loginMutate };
}
