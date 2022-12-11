import React, { useEffect } from "react";
import "./Orders.css";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../Redux/Store/hooks";
import { useNavigate } from "react-router-dom";
import { IVacations } from "../../../Helpers/interfaces";
import { DeleteForever,HolidayVillage, ShoppingCart} from "@mui/icons-material";
import Swal from "sweetalert2";
import { HeaderComponent } from "../../ui-components/Headers/HeaderComponent";
import { setVacations } from "../../../Redux/Reducers/vacationReducer";
import CreateOrder from "./CreateOrder/CreateOrder";
import { store } from "../../../Redux/Store/Store";

export default function Orders() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const orderedVacations: Array<IVacations> = useAppSelector(
    (state) => state?.vacations?.ordered
  );
  const totalPrice: number = useAppSelector(
    (state) => state?.vacations?.orderedTotalPrice
  );
    
  useEffect(() => {
    const orderedVacationsLS: string | null  = localStorage.getItem("orderedVacations");
    if(orderedVacationsLS !== null){
      const parsedOrderedLS: Array<any> = JSON.parse(orderedVacationsLS);
      store.dispatch(
        setVacations({ array: parsedOrderedLS, stateName: "ordered" })
        )}
  }, [])
  


  return (
    <div className="orders-container">
      <HeaderComponent
        header="Ordered Vacations"
        subHeader={orderedVacations.length > 0? "Great picks!" : null}
      />
      {orderedVacations?.length === 0 ? (
        <>
          <p className="no-orders-header">You don't have any orders...</p>
          <Button
            children={"Back to vacations"}
            endIcon={<HolidayVillage />}
            variant="contained"
            color="secondary"
            onClick={() => navigate("/vacations")}
          />
        </>
      ) : (
        <>
          {orderedVacations?.map((p: IVacations, index: number) => {
            const {
              id,
              image,
              destination,
              description,
              price,
              departDate,
              returnDate,
              amount,
            } = p;
            return (
              <CreateOrder
                id={id}
                image={image}
                destination={destination}
                description={description}
                price={price}
                departDate={departDate}
                returnDate={returnDate}
                index={++index}
                amount={amount}
                key={id}
              />
            );
          })}
          <div className="vacation-total-price">
            <p><b>Total Price:</b> ${totalPrice.toFixed(2)}</p> 
            <Button
              children="Checkout"
              variant="contained"
              color="secondary"
              endIcon={<ShoppingCart />}
              onClick={() => navigate("/payment")}
            />
            <Button
              children="Clear Cart"
              variant="contained"
              color="error"
              endIcon={<DeleteForever />}
              onClick={() =>
                Swal.fire({
                  title: "Are you sure?",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: "Clear all vacations",
                }).then((result) => {
                  if (result.isConfirmed) {
                    dispatch(setVacations({array: [], stateName: "ordered"}));
                  }
                })
              }
            />
            <div />
          </div>
        </>
      )}
    </div>
  );
}
