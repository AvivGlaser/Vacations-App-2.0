import React from "react";
import "./CreateOrder.css";
import { ImageComponent } from "../../../ui-components/ImageComponent/ImageComponent";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../Redux/Store/hooks";
import { AddCircle, RemoveCircle, Backspace } from "@mui/icons-material";
import PopUpModal from "../../../ui-components/PopUpModal/PopUpModal";
import popUpAlert from "../../../../Helpers/popUpAlert";
import Moment from "react-moment";
import onDelete from "../../../../Helpers/onDelete";
import { handleAmount } from "../../../../Redux/Reducers/vacationReducer";
import { IVacations } from "../../../../Helpers/interfaces";

export default function CreateOrder(props: IVacations) {
  const orderedVacations = useAppSelector((state) => state.vacations.ordered);
  const dispatch = useAppDispatch();
  const {
    price,
    image,
    id,
    index,
    destination,
    amount = 1,
    departDate,
    returnDate,
  } = props;

  return (
    <div className="create-vacation">
      {amount === 0 ? (
        <PopUpModal
          header="Remove Vacation"
          message="Are you sure?"
          severity="error"
          btnText="Yes"
          btnColor="success"
          btnAction={() =>
            onDelete({ array: orderedVacations, id: id, stateName: "ordered" })
          }
          secondBtnText="Cancel"
          secondBtnAction={() => dispatch(handleAmount([id, true]))}
        />
      ) : (
        <>
          <span className="vacations-number">
            <p>{`${index}|`}</p>
          </span>
          <Button
            children={<Backspace />}
            className="delete-btn"
            onClick={() =>
              onDelete({
                array: orderedVacations,
                id: id,
                stateName: "ordered",
              })
            }
          />
          <div className="vacation-title">
            <h4>{destination}</h4>
          </div>
          <div className="vacation-image">
            <ImageComponent src={image} width={"100%"} height={200} />
          </div>
          <div className="vacation-details">
            <b>Ticket Price:</b> ${price?.toFixed(2)}
            <br />
            <b>Tickets:</b> {amount}
            <Button
              children={<AddCircle />}
              onClick={() =>
                dispatch(handleAmount([id, true])) &&
                popUpAlert({
                  icon: "success",
                  title: "Ticket Added!",
                })
              }
            />
            {!amount ? null : (
              <Button
                children={<RemoveCircle />}
                onClick={() =>
                  dispatch(handleAmount([id, false])) &&
                  popUpAlert({
                    icon: "error",
                    title: "Ticket Removed",
                  })
                }
              />
            )}
            <br />
            <b>Total Tickets Price:</b> ${(amount * price).toFixed(2)}
          </div>
          <div className="vacation-dates">
            <b>Depart: </b>
            <Moment format="DD/MM/YYYY">{departDate}</Moment>
            <div className="to-date">
              <b>Return: </b>
              <Moment format="DD/MM/YYYY">{returnDate}</Moment>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
