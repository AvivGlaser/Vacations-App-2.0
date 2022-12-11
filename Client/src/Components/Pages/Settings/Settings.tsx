import React from "react";
import "./Settings.css";
import { HeaderComponent } from "../../ui-components/Headers/HeaderComponent";
import PopUpModal from "../../ui-components/PopUpModal/PopUpModal";
import SettingsForm from "./SettingsForm";
import { useAppSelector } from "../../../Redux/Store/hooks";
import logoutAction from "../../../Helpers/logoutAction";
import Loader from "../../ui-components/Lodaer/Loader";

export default function Settings() {
  const serverStatus = useAppSelector((state) => state?.auth?.serverStatus);
  const isLoading = useAppSelector((state) => state?.auth?.isLoading);

  return (
    <div className="settings-page">
      <HeaderComponent header="Settings" subHeader="Time for a change?" />
      <SettingsForm />
      <Loader isLoading={isLoading} />
      {serverStatus === 202 ? (
          <PopUpModal
            header="Changes Saved ✔"
            message="Login to continue..."
            btnText="OK"
            btnAction={logoutAction}
          />
      ) : null}
    </div>


  );
}
