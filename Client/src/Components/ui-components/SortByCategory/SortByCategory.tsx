import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";
import "./SortByCategory.css";
import { sortByCategoryAction } from "../../../Redux/AsyncActions/vacationActions";
import { useAppSelector } from "../../../Redux/Store/hooks";

export function SortByCategory() {
  const [selectedCategory, setSelectedCategory] = React.useState("Sort By:");
  const categories: Array<string> = useAppSelector(
    (state) => state?.vacations?.categories
  );

  function handleChange(event: SelectChangeEvent) {
    setSelectedCategory(event.target.value as string);
  }

  return (
    <>
      <Select
        className="sort-by-category"
        onChange={handleChange}
        value={`${selectedCategory}`}
      >
        <MenuItem value={`Sort By:`} disabled children="Sort By:" />
        {categories?.map((category: string) => {
          return (
            <MenuItem
              key={`${category}`}
              children={`${category}`}
              value={`${category}`}
              onClick={() => sortByCategoryAction(`${category}`)}
            />
          );
        })}
        ;
      </Select>
    </>
  );
}
