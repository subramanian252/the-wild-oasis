import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signUp } from "../../services/apiLogin";

export default function useSignUp() {
  const { isLoading: isSignning, mutate: signUpMutate } = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      console.log(data);
      toast.success(`User signned in Successfully`);
    },
    onError: (err) => toast.error("User Could not be logged in"),
  });

  return { isSignning, signUpMutate };
}
