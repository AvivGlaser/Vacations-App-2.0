import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IVacationState, setVacationPayload } from "../../Helpers/interfaces";
import addOrRemoveAmount from "../../Helpers/addOrRemoveAmount";
import saveCartToLS from "../../Helpers/authHelpers";
import { IVacations } from "../../Helpers/interfaces";
import { calcTotalPrice } from "../../Helpers/calcTotalPrice";
import isItemInArray from "../../Helpers/isItemInArray";
import { saveFollowingToLS } from "../../Helpers/authHelpers";
import popUpAlert from "../../Helpers/popUpAlert";

const followedVacationsLS = JSON.parse(localStorage.getItem("followedVacations"));
const orderedVacationLS = JSON.parse(localStorage.getItem("orderedVacations"));

const initialState: IVacationState = {
  vacations: [],
  followed: followedVacationsLS? followedVacationsLS : [],
  ordered: orderedVacationLS? orderedVacationLS : [],
  orderedTotalPrice: calcTotalPrice(orderedVacationLS),
  categories: [""],
  followersData: [""],
};

const vacationSlice = createSlice({
  name: "vacations",
  initialState,
  reducers: {
      // dynamic vacation state setter
    setVacations: (
      state: IVacationState,
      action: PayloadAction<setVacationPayload>
    ) => {
      const { array, stateName } = action.payload;
      if (state.vacations.length !== array.length) {
        popUpAlert({
          title: `${array.length} Vacations were found.`,
          icon: "info",
        });
      }
      if (stateName === "vacations") {
        state.vacations = array;
      } else if (stateName === "followed") {
        state.followed = array;
      } else state.ordered = array;
      saveCartToLS(state.ordered);
      saveFollowingToLS(state.followed);
      state.orderedTotalPrice = calcTotalPrice(state.ordered);
    },
    setCategories: (
      state: IVacationState,
      action: PayloadAction<Array<any>>
    ) => {
      state.categories = action.payload;
    },
    setFollowersData: (state: IVacationState, action: PayloadAction<Array<any>>) => {
      state.followersData = action.payload;
    },
    addNewVacationRedex: (
      state: IVacationState,
      action: PayloadAction<IVacations>
    ) => {
      state.vacations.push(action.payload);
    },
    setFollowedVacations: (
      state: IVacationState,
      action: PayloadAction<Partial<IVacations>>
    ) => {
      const { id } = action.payload;
      // helper FN to check- user already follows vacation? return
      const isFollowing = isItemInArray(state.followed, id);
      if (isFollowing) return;
      // else, add to state
      else {
        state.followed.push(action.payload);
        saveFollowingToLS(state.followed);
      }
    },
    addToCart: (state: IVacationState, action: PayloadAction<any>) => {
      const { id } = action.payload;
      //is vacation in cart validation to avoid duplication
      const isVacationInCart: boolean = isItemInArray(state.ordered, id);
      // vacation already in cart? increase it's amount
      if (isVacationInCart) {
        addOrRemoveAmount({
          array: state.ordered,
          id: id,
          operator: true,
        });
      }
      // else add to cart
      else state.ordered.push(action.payload);
      //save changes
      saveCartToLS(state.ordered);
      state.orderedTotalPrice = calcTotalPrice(state.ordered);
    },
    handleAmount: (state: IVacationState, action: PayloadAction<any>) => {
      // increase tickets amount depending the operator
      const [id, operator] = action.payload;
      addOrRemoveAmount({
        array: state.ordered,
        id: id,
        operator: operator,
      });
      saveCartToLS(state.ordered);
      state.orderedTotalPrice = calcTotalPrice(state.ordered);
    },
  },
});

export const {
  setVacations,
  addToCart,
  addNewVacationRedex,
  setCategories,
  setFollowedVacations,
  handleAmount,
  setFollowersData,
} = vacationSlice.actions;
export default vacationSlice.reducer;
