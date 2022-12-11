import React, { useEffect } from "react";
import "./Login.css";
import { AppRegistration } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import popUpAlert from "../../../Helpers/popUpAlert";
import { useAppSelector } from "../../../Redux/Store/hooks";
import { HeaderComponent } from "../../ui-components/Headers/HeaderComponent";
import { getTokenLS } from "../../../Helpers/authHelpers";
import LoginForm from "./LoginForm";
import NotFound from "../../Pages/NotFound/NotFound";

export default function Login() {
  const token = getTokenLS();
  const navigate = useNavigate();
  const serverStatus = useAppSelector((state) => state?.auth?.serverStatus);
  const userInfo = useAppSelector((state) => state?.auth?.userInfo);
  const firstName = !userInfo ? "Guest" : userInfo.first_name;

  useEffect(() => {
    if (serverStatus === 0) return;
    if (serverStatus === 200) {
      popUpAlert({
        icon: "success",
        title: `Welcome ${firstName}!`,
      });
      navigate("/vacations");
    }
  }, [serverStatus]);

  return (
    <div className="login">
      {/*user redirects '/login' from browser when already logged?- present NotFound */}
      {token ? <NotFound /> : (
        <>
          <HeaderComponent
            header="Login"
            subHeader="Don't have an account yet?"
            btnText="Register Now"
            btnPath="Register"
            btnIcon={<AppRegistration />}
            btnColor="secondary"
          />
          <LoginForm />
        </>
      )}
    </div>
  );
}
