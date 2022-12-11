import React, { useState } from "react";
import "./RegsitrationForm.css";
import { NotListedLocation, Visibility, HowToReg } from "@mui/icons-material";
import { Button, Tooltip, TextField, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { registerAction } from "../../../Redux/AsyncActions/authActions";
import useToggler from "../../../Helpers/useToggler";
import { StickyButton } from "../../ui-components/StickyButton/StickyButton";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { getTokenLS } from "../../../Helpers/authHelpers";
import useForm from "../../../Hooks/useForm";
import { emailAddressPattern, helperTitles, passwordPattern, simpleTextBoxPattern, } from "../../../Helpers/formPatterns";

export default function RegistrationForm() {
  const token = getTokenLS();
  const [passwordShown, setPasswordShown]: any = useToggler(false);
  const navigate = useNavigate();
  const [state] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    passwordConfirm: "",
  });

  const { handleChange, values, handleSubmit } = useForm(state, registerAction);

  return (
    <>
      <header className="register-header">
        <h3>Registration</h3>
      </header>
      <main>
        <div className="register-form">
          <Box onSubmit={handleSubmit}   className="registration-form"   component="form"
                sx={{ "& .MuiTextField-root": { m: 1} }}
              >
        <h5>Please fill your information bellow:</h5>
            <TextField
              required
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
              name="userName"
              label="User Name:"
              required
              value={values.userName}
              type={"email"}
              variant="standard"
              onChange={handleChange}
              inputProps={emailAddressPattern}
              InputProps={{
                endAdornment: (
                  <Tooltip
                    title={helperTitles.email}
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
              name="password"
              value={values.password}
              type={passwordShown ? "text" : "password"}
              label="Password:"
              variant="standard"
              onChange={handleChange}
              inputProps={passwordPattern}
              InputProps={{
                startAdornment: (
                  <Tooltip
                    title={"Show password"}
                    placement={"left"}
                    arrow={true}
                  >
                    <Visibility
                      onClick={setPasswordShown}
                      className="eye-icon"
                    />
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
              name="passwordConfirm"
              value={values.passwordConfirm}
              type={passwordShown ? "text" : "password"}
              onChange={handleChange}
              label="Password confirm:"
              variant="standard"
            />
            <Button
              type="submit"
              children="Register"
              variant="contained"
              endIcon={<HowToReg />}
            />
          </Box>
        </div>
        {token ? null : (
          <div className="already-have-account">
            <label>Already have an account?</label>
            <StickyButton
              tooltip="Login"
              event={() => navigate("/login")}
              icon={<VpnKeyIcon />}
              className="registeration-sticky-btn"
            />
          </div>
        )}
      </main>
      <i className="wave"></i>
    </>
  );
}
