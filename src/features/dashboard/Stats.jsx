import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

export default function Stats({
  recentBookings,
  numDays,
  cabinsLength,
  confirmedStays,
}) {
  const numBookings = recentBookings.length;

  const sales = recentBookings.reduce((acc, curr) => acc + curr.totalPrice, 0);

  const checkins = confirmedStays.length;

  const occupation =
    confirmedStays.reduce((acc, curr) => acc + curr.numNights, 0) /
    (numDays * cabinsLength);
  return (
    <>
      <Stat
        title={"Bookings"}
        color={"blue"}
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title={"Bookings"}
        color={"green"}
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title={"CheckIns"}
        color={"indigo"}
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title={"Bookings"}
        color={"yellow"}
        icon={<HiOutlineChartBar />}
        value={`${Math.round(occupation * 100, 2)}%`}
      />
    </>
  );
}
