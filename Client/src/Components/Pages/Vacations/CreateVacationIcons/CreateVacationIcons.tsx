import React from "react";
import "./CreateVacationIcons.css";
import { Button, CardActions, Tooltip } from "@mui/material";
import { Delete, FollowTheSigns, Flight, SaveAs } from "@mui/icons-material";
import onDelete from "../../../../Helpers/onDelete";
import {
  addToCart,
  setFollowedVacations,
} from "../../../../Redux/Reducers/vacationReducer";
import getVacationsAction, {
  deleteVactionAction,
  handleFollowersAction,
} from "../../../../Redux/AsyncActions/vacationActions";
import popUpAlert from "../../../../Helpers/popUpAlert";
import { useAppDispatch, useAppSelector } from "../../../../Redux/Store/hooks";
import { ICardIcons, IVacations } from "../../../../Helpers/interfaces";
import PopUpModal from "../../../ui-components/PopUpModal/PopUpModal";
import useToggler from "../../../../Helpers/useToggler";
import VacationForm from "../VacationForm/VacationForm";

export default function CreateVacationIcons(props: IVacations) {
  const vacations: Array<IVacations> = useAppSelector(
    (state) => state?.vacations?.vacations
  );
  const [editVacation, setEditVacation] = useToggler(false);
  const {
    id,
    destination,
    departDate,
    returnDate,
    price,
    image,
    followers,
    amount,
    moreInfo,
    isFollowing,
  } = props;

  const userInfo = useAppSelector((state) => state?.auth?.userInfo);
  const dispatch = useAppDispatch();
  const isAdmin: boolean = userInfo.is_admin ? true : false;
  //creating card icons array to map over and save code
  const cardIcons: Array<ICardIcons> = [
    {
      tooltip: "Order Vacation",
      icon: <Flight color="success" />,
      event: () =>
        dispatch(
          addToCart({
            price,
            destination,
            id,
            image,
            amount,
            returnDate,
            departDate,
            followers,
          })
        ) && popUpAlert({ title: "Vacation Added!", icon: "success" }),
    },
  ];
  if (isFollowing === false) {
    cardIcons.push({
      tooltip: "Follow Vacation",
      icon: <FollowTheSigns />,
      event: () => {
        dispatch(
          setFollowedVacations({
            id,
            followers,
            destination,
            image,
            isFollowing,
          })
        );
        // add to DB
        handleFollowersAction({ id, operator: "+" });
        // getVacations again so changes will render in browser
        getVacationsAction();
        popUpAlert({ title: "Following Vacation!", icon: "info" });
      },
    });
  }
  if (isAdmin && !moreInfo) {
    cardIcons.push(
      {
        tooltip: "Edit Vacation",
        icon: <SaveAs color="error" />,
        event: () => setEditVacation(),
      },
      {
        tooltip: "Delete Vacation",
        icon: <Delete color="error" />,
        event: () => {
          onDelete({
            array: vacations,
            id: id,
            stateName: "vacations",
          });
          deleteVactionAction(id);
        },
      }
    );
  }
  const fixedDepartDate = new Date(departDate);
  const fixedReturnDate = new Date(returnDate);
  return (
    <>
      {editVacation ? (
        <PopUpModal
          btnAction={() => setEditVacation()}
          btnColor={"error"}
          btnText="Back"
          header="Edit"
          message={
            <VacationForm
              {...props}
              stops={false}
              departDate={fixedDepartDate}
              returnDate={fixedReturnDate}
              operator={"edit"}
              event={setEditVacation}
            />
          }
        />
      ) : null}
      <CardActions>
        {cardIcons.map((i: ICardIcons) => {
          const { tooltip, icon, event } = i;
          return (
            <Tooltip title={tooltip} placement="top" key={tooltip}>
              <Button startIcon={icon} onClick={event} />
            </Tooltip>
          );
        })}
      </CardActions>
    </>
  );
}
