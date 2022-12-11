import React, { useState } from "react";
import "./CreditCardForm.css";
import "react-credit-cards/es/styles-compiled.css";
import Cards from "react-credit-cards";
import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import validateInfo, { months, years } from "./validateInfo";
import { useAppSelector } from "../../../Redux/Store/hooks";
import useForm from "../../../Hooks/useForm";
import PopUpModal from "../../ui-components/PopUpModal/PopUpModal";
import {
  creditCardNumberPattern,
  cvcPattern,
  longNamePattern,
  expDatePattern,
} from "../../../Helpers/formPatterns";

export default function CreditCardForm() {
  const totalPrice = useAppSelector((state) => state?.vacations?.orderedTotalPrice);

  const [state] = useState({
    number: "",
    name: "",
    expiryMonth: "MM",
    expiryYear: "YY",
    cvc: "",
    focus: "",
  });
  const { handleChange, handleFocus, values, handleSubmit } = useForm(
    state,
    validateInfo
  );
  return (
    <div className="container">
      <div className="box justify-content-center align-items-center">
        <div className="formDiv">
          <h5>Please fill your Credit Card credentials:</h5>
          <div className="creditCard">
            <Cards
              number={values.number}
              name={values.name}
              expiry={values.expiryMonth + values.expiryYear}
              cvc={values.cvc}
              focused={values.focus}
            />
          </div>
          {totalPrice === 0 ? (
            <PopUpModal
              header="Oops"
              message="You got nothing to pay for."
              description="Order a ticket first."
              btnText="OK"
              btnColor={"error"}
            />
          ) : (
              <Box
              onSubmit={handleSubmit}
                component="form"
                sx={{ "& .MuiTextField-root": { m: 1, width: "70%" } }}
              >
                <TextField
                  required
                  value={values.number}
                  label="Credit Card Number:"
                  name="number"
                  inputProps={creditCardNumberPattern}
                  onChange={handleChange}
                  onFocus={handleFocus}
                />
                <TextField
                  required
                  value={values.name}
                  name="name"
                  inputProps={longNamePattern}
                  label="Card Holder Name:"
                  onChange={handleChange}
                  onFocus={handleFocus}
                />
                <Select
                  sx={{ width: 147, marginRight: 1.2}}
                  required
                  inputProps={expDatePattern}
                  value={`${values.expiryMonth}`}
                  label="Month"
                  name={"expiryMonth"}
                  onChange={handleChange}
                  onFocus={handleFocus}
                >
                  <MenuItem disabled value={`MM`} children="MM" />
                  {months?.map((m: any) => {
                    const { month, value } = m;
                    return (
                      <MenuItem
                        key={`${month}`}
                        children={`${month}`}
                        value={`${value}`}
                      />
                    );
                  })}
                </Select>
                <Select
                  sx={{ width: 147}}
                  required
                  inputProps={expDatePattern}
                  value={`${values.expiryYear}`}
                  label="Year"
                  name={"expiryYear"}
                  onChange={handleChange}
                  onFocus={handleFocus}
                >
                  <MenuItem value={`YY`} disabled children="YY" />
                  {years?.map((y: any) => {
                    const { year, value } = y;
                    return (
                      <MenuItem
                        key={`${year}`}
                        children={`${year}`}
                        value={`${value}`}
                      />
                    );
                  })}
                </Select>
                <TextField
                  required
                  inputProps={cvcPattern}
                  name="cvc"
                  label="CVC:"
                  onChange={handleChange}
                  onFocus={handleFocus}
                />
              <div className="payment-total-price">
                <p>
                  <b>Total Price:</b> ${totalPrice}
                </p>
              </div>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                children={
                  totalPrice <= 0 ? "Youv'e got nothing to pay for." : "Pay"
                }
                disabled={totalPrice <= 0 ? true : false}
              />
                </Box>
          )}
        </div>
      </div>
    </div>
  );
}
