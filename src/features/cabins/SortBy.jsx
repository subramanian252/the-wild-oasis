import { useSearchParams } from "react-router-dom";
import Select from "../../ui/Select";

export default function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const value = searchParams.get("SortBy") || "";

  function onChange(e) {
    searchParams.set("SortBy", e.target.value);
    setSearchParams(searchParams);
  }
  return <Select options={options} onChange={onChange} value={value}></Select>;
}
