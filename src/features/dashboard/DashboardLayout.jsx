import styled from "styled-components";
import useRecentBookings from "./useRecentBookings";
import useRecentStays from "./useRecentStays";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import useCabin from "../cabins/useCabin";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { isLoading, recentBookings } = useRecentBookings();
  const { isLoadingStays, recentStays, confirmedStays, numDays } =
    useRecentStays();

  const { isLoading: isLoading3, cabins } = useCabin();

  if (isLoading || isLoadingStays || isLoading3) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        recentBookings={recentBookings}
        confirmedStays={confirmedStays}
        recentStays={recentStays}
        numDays={numDays}
        cabinsLength={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart recentBookings={recentBookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}
