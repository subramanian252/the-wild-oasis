import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDarkModeContext } from "../../context/DarkModeContext";
import { eachDayOfInterval } from "date-fns/eachDayOfInterval";
import { format, isSameDay, subDays } from "date-fns";
import Heading from "../../ui/Heading";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

export default function SalesChart({ recentBookings, numDays }) {
  const { darkMode } = useDarkModeContext();
  const colors = darkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  const allDays = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDays.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: recentBookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, curr) => curr.totalPrice + acc, 0),
      extrasSales: recentBookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, curr) => curr.extrasPrice + acc, 0),
    };
  });

  return (
    <StyledSalesChart>
      <Heading as="h2">
        Sales from {format(allDays[0], "MMM dd yyyy")} &mdash;{" "}
        {format(allDays.at(-1), "MMM dd yyyy")}
      </Heading>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.stroke }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.stroke }}
          />
          <CartesianGrid strokeDasharray={"4"} />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey={"totalSales"}
            type={"monotone"}
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total Sales"
            unit="$"
          />
          <Area
            dataKey={"extrasSales"}
            type={"monotone"}
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="Extra Sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}
