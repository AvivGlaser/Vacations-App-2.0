import React from "react";
import "./AddNewVacation.css";
//@ts-ignore
import defaultIMG from "../../../../Assets/Images/default-img-vacation.jpg";
import { IVacations } from "../../../../Helpers/interfaces";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { HeaderComponent } from "../../../ui-components/Headers/HeaderComponent";
import "react-datepicker/dist/react-datepicker.css";
import VacationForm from "../VacationForm/VacationForm";

const initialState: IVacations = {
  id: 31,
  key: 31,
  image: defaultIMG,
  departDate: new Date(),
  returnDate: new Date().setDate(31),
  description: "Description",
  price: 25,
  destination: "Destination",
  category: "Category",
  airport: "Airport",
  stops: false,
};

export default function AddNewVacation() {
  const {
    image,
    departDate,
    returnDate,
    description,
    price,
    destination,
    category,
    id,
    stops,
    airport,
  } = initialState;
  const fixedDepartDate = new Date(departDate);
  const fixedReturnDate = new Date(returnDate);

  return (
    <div className="add-vacation">
      <HeaderComponent
        header="Add Vacation"
        btnText="Back"
        btnPath="Vacations"
        btnColor="info"
        btnIcon={<ArrowLeftIcon />}
      />
      <VacationForm
        id={new Date().getMilliseconds() * price}
        key={id}
        destination={destination}
        price={price}
        departDate={fixedDepartDate}
        returnDate={fixedReturnDate}
        description={description}
        image={image}
        category={category}
        airport={airport}
        stops={stops}
        moreInfo={false}
        isFollowing={false}
      />
    </div>
  );
}
