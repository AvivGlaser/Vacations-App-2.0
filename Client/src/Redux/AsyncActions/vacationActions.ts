import { store } from "../Store/Store";
import getVacationsService, {
  addVacationService,
  deleteVactionService,
  editVacationService,
  handleFollowersService,
  getFollowersService,
  getCategoriesService,
  sortByCategoryService,
  sortByDatesService,
} from "../Services/vacationService";
import { ISortByDatesPayload, IVacations } from "../../Helpers/interfaces";
import { setCategories, setFollowersData, setVacations } from "../Reducers/vacationReducer";
import { serverError, setLoader } from "../Reducers/authReducer";

export default async function getVacationsAction() {
  try {
    store.dispatch(setLoader(true));
    const vacationsResult: Array<IVacations> = await getVacationsService();
    store.dispatch(
      setVacations({ array: vacationsResult, stateName: "vacations" })
    );
    store.dispatch(setLoader(false));
  } catch (err: any) {
    console.log(err?.message);
    store.dispatch(setLoader(false));
    store.dispatch(serverError(err));
  }
}
export async function addVacationAction(payload: IVacations) {
  try {
    await addVacationService(payload);
  } catch (err: any) {
    console.log(err?.message);
    store.dispatch(serverError(err));
  }
}
export async function getFollowersAction() {
  try {
  store.dispatch(setLoader(true));
  //formatting data so it'll fit 'react-google-charts' format
    let tableHeaders = ["destination", "followers"];
    let initialData: any = await getFollowersService()
    let dataFormat = initialData?.data?.map((d) => {
      return Object.values(d);
    });
    let data = [tableHeaders].concat(dataFormat); 
    //store formatted data in specified global state 
    store.dispatch(setFollowersData(data))
    store.dispatch(setLoader(false))
  } catch (err: any) {
    store.dispatch(setLoader(false));
    console.log(err?.message);
    store.dispatch(serverError(err));
  }
}

export async function getCategoriesAction() {
  try {
    const categoriesResponse: any = await getCategoriesService();
    const categories = categoriesResponse?.data;
    store.dispatch(setCategories(categories));
  } catch (err: any) {
    console.log(err?.message);
    store.dispatch(serverError(err));
  }
}
export async function sortByCategoryAction(category: string) {
  try {
    store.dispatch(setLoader(true));
    const sortByResponse: any = await sortByCategoryService(category);
    store.dispatch(
      setVacations({ array: sortByResponse, stateName: "vacations" })
    );
    store.dispatch(setLoader(false));
  } catch (err: any) {
    store.dispatch(setLoader(false));
    console.log(err?.message);
    store.dispatch(serverError(err));
  }
}
export async function sortByDatesAction(payload: ISortByDatesPayload) {
  try {
    store.dispatch(setLoader(true));
    const sortByDatesResponse: Array<any> = await sortByDatesService(payload);
    store.dispatch(
      setVacations({ array: sortByDatesResponse, stateName: "vacations" })
    );
    store.dispatch(setLoader(false));
  } catch (err: any) {
    console.log(err?.message);
    store.dispatch(setLoader(false));
    store.dispatch(serverError(err));
  }
}
export async function deleteVactionAction(id: number) {
  try {
    await deleteVactionService(id);
  } catch (err: any) {
    console.log(err?.message);
    store.dispatch(serverError(err));
  }
}

export async function handleFollowersAction(payload: Partial<IVacations>) {
  try {
    await handleFollowersService(payload);
  } catch (err: any) {
    console.log(err?.message);
    store.dispatch(serverError(err));
  }
}

export async function editVacationAction(payload: Partial<IVacations>) {
  try {
    await editVacationService(payload);
  } catch (err: any) {
    console.log(err?.message);
    store.dispatch(serverError(err));
  }
}
