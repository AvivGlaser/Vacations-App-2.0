import React, { useEffect } from "react";
import "./Vacations.css";
import { Search } from "../../ui-components/Search/Search";
import Loader from "../../ui-components/Lodaer/Loader";
import { HeaderComponent } from "../../ui-components/Headers/HeaderComponent";
import { useAppSelector } from "../../../Redux/Store/hooks";
import { AddShoppingCart, Houseboat, Navigation } from "@mui/icons-material";
import getVacationsAction, {
  getCategoriesAction,
} from "../../../Redux/AsyncActions/vacationActions";
import { SortByCategory } from "../../ui-components/SortByCategory/SortByCategory";
import { StickyButton } from "../../ui-components/StickyButton/StickyButton";
import { useNavigate } from "react-router-dom";
import SortByDates from "../../ui-components/SortByDates/SortByDates";
import backToTop from "../../../Helpers/backToTop";
import { IVacations } from "../../../Helpers/interfaces";

export function Vacations() {
  const vacations: Array<IVacations> = useAppSelector(
    (state) => state?.vacations?.vacations
  );
  const orderedVacationsLength = useAppSelector(
    (state) => state?.vacations?.ordered?.length
  );
  const userInfo = useAppSelector((state) => state?.auth?.userInfo);
  const isLoading = useAppSelector((state) => state?.auth?.isLoading);
  const isAdmin: boolean = userInfo.is_admin ? true : false;
  const navigate = useNavigate();

  useEffect(() => {
    if (vacations.length === 0) {
      getCategoriesAction();
    }
    getVacationsAction();
  }, []);


  return (
    <div className="vacations-page">
      <Loader isLoading={isLoading} />
      <HeaderComponent
        header="Your dream vacation starts now..."
        subHeader="Happy travel!"
        btnText={isAdmin ? "Add Vacation" : null}
        btnPath={isAdmin ? "vacations/new" : null}
        btnIcon={isAdmin ? <AddShoppingCart /> : null}
      />
      <SortByDates />
      <SortByCategory />
      <Search state={vacations} />
      <StickyButton
        badgeContent={`${orderedVacationsLength}`}
        icon={<Houseboat />}
        event={() => navigate("/orders")}
        className={"vacations-sticky-btn"}
        tooltip={"My Orders"}
      />
      <StickyButton
        icon={<Navigation />}
        event={() => backToTop()}
        className={"back-to-top"}
        tooltip={"Back To Top"}
        placement={"bottom"}
      />
    </div>
  );
}
