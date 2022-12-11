import React from "react";
import "./FollowedVacation.css";
import { Button, Card, CardHeader, CardContent, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setVacations } from "../../../Redux/Reducers/vacationReducer";
import { StickyButton } from "../../ui-components/StickyButton/StickyButton";
import onDelete from "../../../Helpers/onDelete";
import { handleFollowersAction } from "../../../Redux/AsyncActions/vacationActions";
import popUpAlert from "../../../Helpers/popUpAlert";
import { ImageComponent } from "../../ui-components/ImageComponent/ImageComponent";
import { Remove, RemoveCircle, HolidayVillage } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../Redux/Store/hooks";
import { HeaderComponent } from "../../ui-components/Headers/HeaderComponent";

export default function FollowedVacation() {
  const followedVacations = useAppSelector(
    (state) => state?.vacations?.followed
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className="my-vacations-container">
      <HeaderComponent
        header="Followed Vacations"
        subHeader={
          followedVacations.length < 1
            ? null
            : "Heads up! You'll get notified for special deals on these vacations"
        }
      />
      {followedVacations?.length === 0 ? (
        <>
          <p className="no-orders-header">You don't follow any vacations...</p>
          <Button
            children={"Back to vacations"}
            endIcon={<HolidayVillage />}
            variant="contained"
            onClick={() => navigate("/vacations")}
          />
        </>
      ) : (
        <>
          <StickyButton
            icon={<Remove color="error" />}
            event={() => {
              dispatch(setVacations({ array: [], stateName: "followed" }));
              handleFollowersAction({ operator: "all" });
            }}
            tooltip={"Remove All"}
            className={"followers-sticky-button "}
            placement="bottom"
          />
          {followedVacations?.map((p) => {
            const { id, destination, image } = p;
            return (
              <Card className="followed-vacations" key={id}>
                <Tooltip title="Unfollow Vacation" placement="top">
                  <Button
                    endIcon={<RemoveCircle />}
                    onClick={() => {
                      // removing from state & DB as well
                      onDelete({
                        array: followedVacations,
                        id: id,
                        stateName: "followed",
                      });
                      handleFollowersAction({ id, operator: "-" });
                      popUpAlert({
                        icon: "info",
                        title: "Vacation Unfollowed",
                      });
                    }}
                  />
                </Tooltip>
                <CardHeader subheader={destination} />
                <ImageComponent src={image} />
                <CardContent>
                  <p>
                    <b>Vacation ID: </b>
                    {id}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </>
      )}
    </div>
  );
}
