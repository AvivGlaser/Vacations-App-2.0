import React from "react";
import "./Loader.css";
import { ILoader } from "../../../Helpers/interfaces";

export default function Loader(props: ILoader) {
  const { isLoading } = props;
  return <>{isLoading ? <div className="loading"> </div> : null}</>;
}
