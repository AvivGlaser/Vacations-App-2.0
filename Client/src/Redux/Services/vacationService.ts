import {
  IAuthResponse,
  ISortByDatesPayload,
  IVacations,
} from "../../Helpers/interfaces";
import axiosInstance from "./axiosInstance";

export default async function getVacationsService(): Promise<any> {
  const response = await axiosInstance.get(`/vacations`);
  const result = response?.data;
  return result;
}
export async function sortByCategoryService(category: string): Promise<any> {
  const response = await axiosInstance.post(`/vacations/sort-by/${category}`);
  const result = response?.data;
  return result;
}
export async function sortByDatesService(
  payload: ISortByDatesPayload
): Promise<any> {
  const response = await axiosInstance.post(`/vacations/dates`, payload);
  const result = response?.data;
  return result;
}

export async function addVacationService(
  payload: IVacations
): Promise<IAuthResponse> {
  const data = await axiosInstance.post(`/vacations/add`, payload);
  return data;
}

export async function deleteVactionService(id: number): Promise<IAuthResponse> {
  const data = await axiosInstance.delete(`/vacations/delete/${id}`);
  return data;
}
export async function editVacationService(
  payload: Partial<IVacations>
): Promise<IAuthResponse> {
  const data = await axiosInstance.put(`/vacations/edit`, payload);
  return data;
}

export async function getCategoriesService(): Promise<any> {
  const data = await axiosInstance.get(`/vacations/categories`);
  return data;
}
export async function getFollowersService(): Promise<any> {
  const data = await axiosInstance.get(`/vacations/data`);
  return data;
}
export async function handleFollowersService(payload): Promise<IAuthResponse> {
  const data = await axiosInstance.post(`/vacations/follow`, payload);
  return data;
}
