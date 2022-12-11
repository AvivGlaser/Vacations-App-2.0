import React  from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../Redux/Store/hooks";
import RegistrationForm from "./RegistrationForm";
import logoutAction from "../../../Helpers/logoutAction";
import Loader from "../../ui-components/Lodaer/Loader";
import PopUpModal from "../../ui-components/PopUpModal/PopUpModal";
import { resetServerStatus } from "../../../Redux/Reducers/authReducer";

export default function Register() {
  const serverStatus = useAppSelector((state) => state?.auth?.serverStatus);
  const isLoading = useAppSelector((state) => state?.auth?.isLoading);
  const token = useAppSelector((state) => state?.auth?.token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <section className="register-page">
      <Loader isLoading={isLoading} />
      <RegistrationForm />
      {serverStatus === 201 ? (
        <PopUpModal
          header="Registration Complete ✔"
          message={`Please login to continue... `}
          btnText="OK"
          btnAction={() => dispatch(resetServerStatus()) && token? logoutAction() : navigate("/login")}
        />
      ) : null}
    </section>
  );
}
