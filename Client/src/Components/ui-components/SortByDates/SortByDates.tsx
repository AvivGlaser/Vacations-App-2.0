import React, { useState } from "react";
import "./SortByDates.css";
import DatePicker from "react-datepicker";
import { Button, ButtonGroup, Checkbox ,Box, InputLabel } from "@mui/material";
import { sortByDatesAction } from "../../../Redux/AsyncActions/vacationActions";
import { FlightTakeoff, Clear } from "@mui/icons-material";
import useForm from "../../../Hooks/useForm";

export default function SortByDates() {
  const [state] = useState({
    departDate: new Date(),
    returnDate: new Date(),
    stops: false,
  });

  const { values, handleSubmit, handleCheckBox, handleDates } = useForm(
    state,
    sortByDatesAction
  );

  return (
    <div className="container">
      <Box className="sortByDatesForm" component={"form"} onSubmit={handleSubmit}>
        <h3>Search by dates:</h3>
        <label>Direct</label>
        <Checkbox
          color="success"
          name={"stops"}
          checked={values.stops}
          onClick={handleCheckBox}
        />
        <label>Economy</label>
        <Checkbox color="success" defaultChecked />
        <div className="datePickers">
          <InputLabel children="Depart:"/>
          <DatePicker
            minDate={new Date()}
            className="sortByDatesPicker"
            dateFormat={"dd/MM/yyyy"}
            selected={values.departDate}
            onChange={(e) => handleDates(e, "departDate")}
          />
          <InputLabel children="Return:"/> 
          <DatePicker
            disabled={!values.departDate ? true : false}
            minDate={values.departDate}
            maxDate={new Date("01-01-2024")}
            className="sortByDatesPicker"
            dateFormat={"dd/MM/yyyy"}
            selected={values.returnDate}
            onChange={(e) => handleDates(e, "returnDate")}
          />
        </div>
        <ButtonGroup variant="contained"  className="sortByDatesButton">
          <Button
            onClick={(e: any) => handleDates(new Date(), "departDate")}
            children={"Clear"}
            endIcon={<Clear />}
          />
          <Button
            type="submit"
            disabled={values.departDate >= values.returnDate ? true : false}
            color="secondary"
            children={
              values.departDate >= values.returnDate ? "Check Dates!" : "Go!"
            }
            endIcon={<FlightTakeoff />}
          />
        </ButtonGroup>
      </Box>
    </div>
  );
}
