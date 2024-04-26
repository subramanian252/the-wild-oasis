import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUser } from "../../services/apiLogin";

export default function useUpdateUser() {
  const queryClient = useQueryClient();
  const { isLoading: isUploading, mutate: updateMutate } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success("user updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUploading, updateMutate };
}
