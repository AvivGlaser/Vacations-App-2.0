import React, { useState } from "react";
import { Button, Input, Tooltip } from "@mui/material";
import { ImageComponent } from "../../ui-components/ImageComponent/ImageComponent";
import { Visibility, VpnKey, Person } from "@mui/icons-material";
import useToggler from "../../../Helpers/useToggler";
import loginAction from "../../../Redux/AsyncActions/authActions";
//@ts-ignore
import loginImg from "../../../Assets/Images/login-img.png";
import useForm from "../../../Hooks/useForm";

export default function LoginForm() {
  const [passwordShown, setPasswordShown] = useToggler(false);
  const [state] = useState({
    userName: "",
    password: "",
  });
  const { handleChange, values, handleSubmit, fastLogin } = useForm(state, loginAction);

  return (
    <>
      <div className="login-subHeader"></div>
      <div className="fadeIn first">
        <ImageComponent src={loginImg} width={120} height={120} />
      </div>
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <Input
          autoComplete={"true"}
            name="userName"
            required
            onChange={handleChange}
            value={values.userName}
            className="fadeIn second"
            type={"email"}
            placeholder="User name:"
            endAdornment={<Person />}
          />
          <Input
          autoComplete={"true"}
            name="password"
            required
            onChange={handleChange}
            value={values.password}
            className="fadeIn third"
            type={passwordShown ? "text" : "password"}
            placeholder="Password:"
            endAdornment={
              <Tooltip title="Show Password" placement="right">
                <Visibility onClick={setPasswordShown} className="eye-icon" />
              </Tooltip>
            }
          />
          <Button
          color="success"
            children="Login"
            variant="contained"
            type="submit"
            className="login-btn"
            endIcon={<VpnKey />}
          />
          <Button
            name="fastLogin"
            children={values.password === "user"? "As Admin" : "As User"}
            color="info"
            variant="contained"
            endIcon={<Person />}
            onClick={() => fastLogin(values.password === "user"? "admin" : "user")}
          />
        </form>
      </div>
    </>
  );
}
