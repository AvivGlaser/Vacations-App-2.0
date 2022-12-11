import { store } from "../Redux/Store/Store";
import popUpAlert from "./popUpAlert";
import { IOnDelete } from "./interfaces";
import { setVacations } from "../Redux/Reducers/vacationReducer";

export default function onDelete(props: IOnDelete) {
  const { array, id, stateName } = props;
  let filterdVacations = array?.filter((item: any) => {
    return item.id !== id;
  });
  // dynmaic on delete- setting new array in state name that was sent
  store.dispatch(
    setVacations({ array: filterdVacations, stateName: stateName })
    );
    popUpAlert({ icon: "error", title: "Vacation Deleted" });
}
