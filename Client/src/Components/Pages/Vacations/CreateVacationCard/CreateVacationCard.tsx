import React from "react";
import "./CreateVacationCard.css";
import { useNavigate } from "react-router-dom";
import { IVacations } from "../../../../Helpers/interfaces";
import { ImageComponent } from "../../../ui-components/ImageComponent/ImageComponent";
import { Likes } from "../../../ui-components/Likes/Likes";
import { Card, Typography } from "@mui/material";
import Moment from "react-moment";
import CreateVacationIcons from "../CreateVacationIcons/CreateVacationIcons";

export function CreateVacationCard(props: IVacations) {
  const navigate = useNavigate();
  
  return (
    <Card className="single-vacation">
      <CreateVacationIcons {...props} />
      <Typography variant="h6">{props.destination}</Typography>
      <div className="vacation-img-container">
        <ImageComponent
          src={props.image}
          width={props.moreInfo ? 400 : "100%"}
          height={props.moreInfo ? 200 : 200}
        />
        <div className="vacation-img-middle">
          {props.moreInfo ? null : (
            <div
              children={"More Details..."}
              className="vacation-img-text"
              onClick={() => navigate(`/vacations/details/${props.id}`)}
            />
          )}
        </div>
      </div>
      <Typography className="vacations-details" component={"span"}>
        <p>
          <b>Depart Date:</b>{" "}
          <Moment format="DD/MM/YYYY">{props.departDate}</Moment>
        </p>
        <p>
          <b>Return Date:</b>{" "}
          <Moment format="DD/MM/YYYY">{props.returnDate}</Moment>
        </p>
        <p>
          <b>Price:</b> ${props.price}
        </p>
        <p>
          <b>Airport:</b> {props.airport}
        </p>
        <p>
          <b>Category:</b> {props.category}
        </p>
        <p>
          <b>Stops: </b>
          {props.stops
            ? `1 Stop. Duration: ${Math.floor(Math.random() * 12) + 1} Hours`
            : "Direct"}{" "}
        </p>
        {props.moreInfo ? (
          <>
            <p>
              <b>Description:</b> {props.description}
            </p>
            <p>
              <b>Created:</b>{" "}
              <Moment format="DD/MM/YYYY">{props.createdAt}</Moment>
            </p>
          </>
        ) : null}
        <Likes />
      </Typography>
    </Card>
  );
}
