import { Button, Input, InputLabel } from "@mui/material";
import React, {  useState } from "react";
import "./Search.css";
import getVacationsAction from "../../../Redux/AsyncActions/vacationActions";
import popUpAlert from "../../../Helpers/popUpAlert";
import { IGetVacation, IVacations } from "../../../Helpers/interfaces";
import GetVacation from "../../Pages/Vacations/GetVacation/GetVacation";

export function Search(props: IGetVacation) {
  const { state } = props;
  const [filteredState, setFilteredState]: any = useState([]);

  function handleSearch(e) {
    let { value } = e.target;
    let lowerCaseValue = value.toLowerCase();
    const filtered = state.filter((vacation: IVacations) =>
      vacation?.destination?.toLowerCase()?.includes(lowerCaseValue)
    );
    if (filtered.length >= 1) {
      setFilteredState(filtered);
    } else {
      return popUpAlert({title: "Vacations were not found.", icon: "info"})
    }
  }

  return (
    <>
      <InputLabel
        className="search-input-label"
        children={"Where do you wanna go?..."}
      />
      <Input
        onBlur={(e) => {setFilteredState([]); e.target.value = ""}}
        onChange={handleSearch}
        className="search-input"
        placeholder="Search by destination..."
      />
      <Button color="info" variant="contained" children="All Vacations" onClick={() => getVacationsAction()} />
      <GetVacation state={filteredState.length === 0 ? state : filteredState} />
    </>
  );
}
