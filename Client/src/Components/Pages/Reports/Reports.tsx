import React, { useEffect } from "react";
import "./Reports.css";
import { getFollowersAction } from "../../../Redux/AsyncActions/vacationActions";
import Loader from "../../ui-components/Lodaer/Loader";
import { HeaderComponent } from "../../ui-components/Headers/HeaderComponent";
import { Chart } from "react-google-charts";
import { chartOptions } from "../../../Helpers/chartOptions";
import { useAppSelector } from "../../../Redux/Store/hooks";

export default function Reports() {
  const isLoading = useAppSelector((state) => state?.auth?.isLoading);
  const followersData = useAppSelector(
    (state) => state?.vacations?.followersData
  );

  useEffect(() => {
    // get data everytime page renders to display optional changes
    getFollowersAction();
  }, []);

  return (
    <>
      <HeaderComponent
        header="Reports & Stats"
        subHeader={"Site best sellers"}
      />
      <Loader isLoading={isLoading} />
      <div className="reportsDiv">
      <Chart
        className="followers-chart"
        chartType="PieChart"
        data={followersData}
        options={chartOptions}
        width={"100%"}
        height={"600px"}
      />
      </div>
    </>
  );
}
