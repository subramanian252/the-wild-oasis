import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export default function useCheckIn() {
  const { bookingId } = useParams();
  const queryClient = useQueryClient();

  const { isLoading: isCheckin, mutate: checkIn } = useMutation({
    mutationFn: ({ breakfast }) =>
      updateBooking(bookingId, {
        isPaid: true,
        status: "checked-in",
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`checked in Successfully for the ${data.id}`);
      queryClient.invalidateQueries({
        queryKey: ["booking"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCheckin, checkIn };
}
