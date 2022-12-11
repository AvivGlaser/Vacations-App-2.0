import React from "react";
import "./VacationsDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import { HeaderComponent } from "../../../ui-components/Headers/HeaderComponent";
import { useAppSelector } from "../../../../Redux/Store/hooks";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { useEffect } from "react";
import { returnItemInArray } from "../../../../Helpers/isItemInArray";
import popUpAlert from "../../../../Helpers/popUpAlert";
import { CreateVacationCard } from "../../Vacations/CreateVacationCard/CreateVacationCard";

export default function VacationDetails() {
  const vacations = useAppSelector((state) => state?.vacations?.vacations);
  const params: any = useParams();
  const vacationID: number = +params.vacationID;
  const navigate = useNavigate();
  //check if vacationID sent is in vacations array
  let matchedVacation = returnItemInArray(vacations, vacationID);

  useEffect(() => {
    if (matchedVacation.id === undefined || null) {
      popUpAlert({
        title: "More details isn't available at the moment.",
        icon: "error",
      });
      navigate(-1);
    }
  }, [matchedVacation]);

  return (
    <>
      <HeaderComponent
        header="More Info"
        btnText="Back"
        btnPath="vacations"
        btnIcon={<ArrowLeftIcon />}
      />
      {matchedVacation === undefined ? null : (
        <div className="more-info">
          <CreateVacationCard
            {...matchedVacation}
            moreInfo={true}
            amount={0}
            departDate={matchedVacation.depart_date}
            returnDate={matchedVacation.return_date}
          />
        </div>
      )}
    </>
  );
}
