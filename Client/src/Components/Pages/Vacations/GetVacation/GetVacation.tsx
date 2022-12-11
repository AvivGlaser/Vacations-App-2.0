import React from "react";
import { IGetVacation } from "../../../../Helpers/interfaces";
import { CreateVacationCard } from "../CreateVacationCard/CreateVacationCard";

export default function GetVacation(props: IGetVacation) {
  const { state } = props;
  return (
    <div className="get-vacations">
      {state.map((vacation: any) => {
        // formatting some keys & values so they'll fit my frontend needs
        return (
          <CreateVacationCard
            key={vacation.id}
            departDate={vacation.depart_date}
            returnDate={vacation.return_date}
            isFollowing={vacation.is_following === 1 ? true : false}
            stops={vacation.stops === 1 ? true : false}
            amount={1}
            moreInfo={false}
            {...vacation}
          />
        );
      })}
    </div>
  );
}
