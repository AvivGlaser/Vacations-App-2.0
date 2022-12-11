import React, { useState } from "react";
import "./SettingsForm.css";
import { Tooltip, TextField, Button, Box } from "@mui/material";
import { Save, NotListedLocation, Visibility } from "@mui/icons-material";
import useToggler from "../../../Helpers/useToggler";
import useForm from "../../../Hooks/useForm";
import { changeInfoAction } from "../../../Redux/AsyncActions/authActions";
import {
  helperTitles,
  passwordPattern,
  simpleTextBoxPattern,
} from "../../../Helpers/formPatterns";

export default function SettingsForm() {
  const [passwordShown, setPasswordShown]: any = useToggler(false);
  const [state] = useState({
    firstName: "",
    lastName: "",
    password: "",
    newPassword: "",
    passwordConfirm: "",
  });

  const { handleChange, values, handleSubmit } = useForm(
    state,
    changeInfoAction
  );

  return (
    <div className="container">
        <Box
        className="settings-form"
          onSubmit={handleSubmit}
          component="form"
          sx={{ "& .MuiTextField-root": { m: 1 } }}
        >
          <h5>Update your personal info:</h5>
          <TextField
            name="firstName"
            value={values.firstName}
            label="First Name:"
            variant="standard"
            inputProps={simpleTextBoxPattern}
            onChange={handleChange}
          />
          <TextField
            name="lastName"
            label="Last Name:"
            value={values.lastName}
            variant="standard"
            inputProps={simpleTextBoxPattern}
            onChange={handleChange}
          />
          <TextField
            required
            name="password"
            value={values.password}
            type={passwordShown ? "text" : "password"}
            label="Current Password:"
            variant="standard"
            onChange={handleChange}
            inputProps={passwordPattern}
            InputProps={{
              startAdornment: (
                <Tooltip title={"Show password"} placement="right">
                  <Visibility onClick={setPasswordShown} className="eye-icon" />
                </Tooltip>
              ),
              endAdornment: (
                <Tooltip
                  title={helperTitles.password}
                  placement="right"
                  arrow={true}
                >
                  <NotListedLocation />
                </Tooltip>
              ),
            }}
          />
          <TextField
            required
            name="newPassword"
            value={values.newPassword}
            type={passwordShown ? "text" : "password"}
            label="New Password:"
            variant="standard"
            onChange={handleChange}
            inputProps={passwordPattern}
          />
          <TextField
            required
            name="passwordConfirm"
            value={values.passwordConfirm}
            type={passwordShown ? "text" : "password"}
            label="New Password Confirm:"
            variant="standard"
            onChange={handleChange}
            aria-describedby="outlined-weight-helper-text"
          />
          <Button type="submit" children={<Save />} variant="contained" />
        </Box>
    </div>
  );
}
