import React from "react";
import "./HeaderComponent.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IHeader } from "../../../Helpers/interfaces";

HeaderComponent.defaultProps = {
  defaultMainHeader: "Your header goes here!",
};

export function HeaderComponent(props: IHeader) {
  const navigate = useNavigate();
  const {
    header,
    subHeader,
    text,
    btnPath,
    btnText,
    btnIcon,
    btnColor = "info",
  } = props;
  const defaultMainHeader: any = HeaderComponent.defaultProps;

  return (
    <div className="headers-component">
      <div className="overlay">
        <div className="hover">
          <h1>{header ? header : defaultMainHeader}</h1>
        </div>
        <h3>{subHeader}</h3>
        <p>{text}</p>
        {btnPath && (
          <Button
            variant="contained"
            children={btnText}
            endIcon={btnIcon}
            onClick={() => navigate(`/${btnPath}`)}
            color={btnColor}
          />
        )}
      </div>
    </div>
  );
}
