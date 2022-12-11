import axios from "axios";
import { API_URLS } from "../../Environment/enviornment";
import {
  IAuthResponse,
  IChangeInfoPayload,
  ILoginPayload,
  IRegisterPayload,
} from "../../Helpers/interfaces";
import axiosInstance from "./axiosInstance";
import { IPaymentPayload } from "../../Helpers/interfaces";

export default async function loginService(
  payload: ILoginPayload
): Promise<IAuthResponse> {
  const { data } = await axios.post(`${API_URLS.AUTH_LOGIN}`, payload);
  return data;
}
export async function changeInfoService(
  payload: IChangeInfoPayload
): Promise<IAuthResponse> {
  const { data } = await axiosInstance.post(
    `${API_URLS.AUTH_CHANGE_INFO}`,
    payload
  );
  return data;
}
export async function registerService(
  payload: IRegisterPayload
): Promise<IAuthResponse> {
  const { data } = await axios.post(`${API_URLS.AUTH_REGISTER}`, payload);
  return data;
}

export async function paymentService(
  payload: Partial<IPaymentPayload>
): Promise<string> {
  const { data } = await axiosInstance.post(`/auth/payment`, payload);
  return data;
}
