import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export default function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleteing, mutate: deleteBookingMutate } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      toast.success("booking deleted");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleteing, deleteBookingMutate };
}
