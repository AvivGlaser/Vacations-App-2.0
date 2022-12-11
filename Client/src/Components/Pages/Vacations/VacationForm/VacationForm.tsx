import React, { useState } from "react";
import "./VacationForm.css";
import {
  Button,
  TextField,
  Checkbox,
  InputLabel,
  Box,
  FormControlLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AddTask, Image } from "@mui/icons-material";
import useForm from "../../../../Hooks/useForm";
import getVacationsAction, {
  addVacationAction,
  editVacationAction,
} from "../../../../Redux/AsyncActions/vacationActions";
import { addNewVacationRedex } from "../../../../Redux/Reducers/vacationReducer";
import popUpAlert from "../../../../Helpers/popUpAlert";
import PopUpModal from "../../../ui-components/PopUpModal/PopUpModal";
import Loader from "../../../ui-components/Lodaer/Loader";
import { textBoxPattern } from "../../../../Helpers/formPatterns";
import { setLoader } from "../../../../Redux/Reducers/authReducer";
import { CreateVacationCard } from "../CreateVacationCard/CreateVacationCard";
import { useAppDispatch, useAppSelector } from "../../../../Redux/Store/hooks";
import useToggler from "../../../../Helpers/useToggler";
import { IVacations } from "../../../../Helpers/interfaces";
import objComparison from "../../../../Helpers/objComparison";

export default function VacationForm(props: IVacations) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector((state) => state?.auth?.isLoading);
  const [isChanged, setIsChanged] = useToggler(true);
  const [state] = useState({
    ...props,
  });

  const {
    handleChange,
    handleCheckBox,
    values,
    handleDates,
    handleSubmit,
    handleOpenWidget,
  } = useForm(state, submitVacationForm);

  function submitVacationForm(e) {
    // before editing, changes were made?
    if (props.operator === "edit") {
      const noChanges: boolean = objComparison(values, props);
      if (noChanges) return setIsChanged();
      // else edit
      editVacationAction(values);
      getVacationsAction();
      //close pop up
      if (props.event) props.event();
    } else {
      // if !edit operator- add new vacation to DB & global state
      addVacationAction(values);
      dispatch(addNewVacationRedex(values));
    }
    popUpAlert({
      title: !props.operator ? "Vacation Added!" : "Changes Saved!",
      icon: "info",
    });
    navigate("/vacations");
  }

  return (
    <>
      {values.departDate >= values.returnDate || !isChanged ? (
        <PopUpModal
          header="Oops..."
          message="Something went wrong"
          description="Check if changes were made or dates picked."
          btnText="OK"
        />
      ) : null}
      <Loader isLoading={isLoading} />
      <Box
        onSubmit={handleSubmit}
        className="vacation-form"
        component="form"
        sx={{ "& .MuiTextField-root": { m: 1 } }}
      >
        <h6>Create Your Vacation:</h6>
        <TextField
          name="destination"
          required
          value={values.destination}
          label="Destination:"
          inputProps={textBoxPattern}
          onChange={handleChange}
        />
        <InputLabel children="Depart Date:" />
        <DatePicker
          minDate={new Date()}
          className="date-picker"
          dateFormat={"dd/MM/yyyy"}
          selected={values.departDate}
          onChange={(e) => handleDates(e, "departDate")}
        />
        <InputLabel children="Return Date:" />
        <DatePicker
          disabled={!values.departDate ? true : false}
          minDate={values.departDate}
          maxDate={new Date("01-01-2024")}
          className="date-picker"
          dateFormat={"dd/MM/yyyy"}
          selected={values.returnDate}
          onChange={(e) => handleDates(e, "returnDate")}
        />
        <TextField
          name="price"
          required
          inputProps={{
            min: 25,
            step: 5,
          }}
          value={values.price}
          label="Price:"
          type="number"
          onChange={handleChange}
        />
        <TextField
          name="airport"
          required
          value={values.airport}
          label="Airport:"
          onChange={handleChange}
        />
        <TextField
          name="category"
          required
          value={values.category}
          label="Category:"
          onChange={handleChange}
          inputProps={textBoxPattern}
        />
        <TextField
          name="description"
          required
          value={values.description}
          label="Description:"
          inputProps={{ maxLength: 250 }}
          onChange={handleChange}
        />
        <InputLabel children="Image:" />
        <Button
          className="vacation-form-btn"
          variant="contained"
          color="warning"
          id={"upload-widget"}
          onClick={() => {
            dispatch(setLoader(true));
            handleOpenWidget();
          }}
          children={"Upload"}
          endIcon={<Image />}
        />
        <FormControlLabel
          control={
            <Checkbox
              name={"stops"}
              checked={values.stops}
              color="success"
              onChange={handleCheckBox}
            />
          }
          label="Stops"
        />
        <Button
          className="vacation-form-btn"
          variant="contained"
          type="submit"
          disabled={values.departDate >= values.returnDate ? true : false}
          children={
            values.departDate >= values.returnDate ? "Check Dates!" : "Save"
          }
          endIcon={<AddTask />}
        />
      </Box>
      <div className="vacation-preview">
        <p>Preview:</p>
        <CreateVacationCard {...values} moreInfo={!values.moreInfo} />
      </div>
    </>
  );
}
