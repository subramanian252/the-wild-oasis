import { getCabins } from "../../services/apiCabins";
import { useQuery } from "@tanstack/react-query";

export default function useCabin() {
  const {
    isLoading,
    error,
    data: cabins,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { isLoading, error, cabins };
}
