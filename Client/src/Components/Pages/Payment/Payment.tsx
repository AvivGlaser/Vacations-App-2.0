import React from "react";
import "./Payment.css";
import CategoryIcon from "@mui/icons-material/Category";
import { HeaderComponent } from "../../ui-components/Headers/HeaderComponent";
import { useAppDispatch, useAppSelector } from "../../../Redux/Store/hooks";
import { useNavigate } from "react-router-dom";
import CreditCardForm from "./CreditCardForm";
import PopUpModal from "../../ui-components/PopUpModal/PopUpModal";
import Loader from "../../ui-components/Lodaer/Loader";
import { resetServerStatus } from "../../../Redux/Reducers/authReducer";

export default function Payment() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const serverStatus = useAppSelector((state) => state?.auth?.serverStatus);
  const userInfo = useAppSelector((state) => state?.auth?.userInfo);
  const isLoading = useAppSelector((state) => state?.auth?.isLoading);
  const userEmail: string = userInfo.user_name;

  return (
    <div className="payment-page">
      <HeaderComponent
        header="Payment"
        subHeader="All types of credit-cards are illegible!"
        btnText="Forgot Something?"
        btnPath="vacations"
        btnColor="secondary"
        btnIcon={<CategoryIcon />}
      />
      <Loader isLoading={isLoading}/>
      <CreditCardForm />
      {serverStatus === 203 ? (
            <PopUpModal
                header="Payment Confirmed ✔"
                message={`Thank you! `}
                description={`Tickets & order confirmation will be sent to: ${userEmail}`}
                btnText="OK"
                btnAction={() =>  dispatch(resetServerStatus()) && navigate("/") }
              />
      ) : null}
    </div>
  );
}
