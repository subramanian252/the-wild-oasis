import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";

export default function useCheckOut() {
  const queryClient = useQueryClient();

  const { isLoading: isCheckOut, mutate: checkOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`checked out Successfully for the ${data.id}`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCheckOut, checkOut };
}
