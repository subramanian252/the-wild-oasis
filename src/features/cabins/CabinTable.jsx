import React from "react";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabin from "./useCabin";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

export default function CabinTable() {
  const [searchParams] = useSearchParams();
  const { isLoading, cabins } = useCabin();

  if (isLoading) return <Spinner />;
  const activeField = searchParams.get("discount") || "all";

  if (!cabins.length) return <Empty resource={"cabins"} />;

  let filteredCabins = [];
  if (activeField === "all") filteredCabins = cabins;
  if (activeField === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  if (activeField === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);

  const sortBy = searchParams.get("SortBy") || "name-asc";

  const [field, direction] = sortBy.split("-");

  const modifier = direction === "asc" ? 1 : -1;

  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}
