import { store } from "../Store/Store";
import {
  serverError,
  resetServerStatus,
  setLoader,
  authSuccess,
} from "../Reducers/authReducer";
import {
  IChangeInfoPayload,
  ILoginPayload,
  IPaymentPayload,
  IRegisterPayload,
} from "../../Helpers/interfaces";
import loginService, {
  changeInfoService,
  paymentService,
  registerService,
} from "../Services/authService";

export default async function loginAction(payload: ILoginPayload) {
  try {
    store.dispatch(setLoader(true));
    const loginResponse: any = await loginService(payload);
    store.dispatch(authSuccess(loginResponse));
    setTimeout(() => {
      store.dispatch(resetServerStatus());
    }, 5000);
    store.dispatch(setLoader(false));
  } catch (err: any) {
    console.log(err?.message);
    store.dispatch(setLoader(false));
    store.dispatch(serverError(err));
  }
}
export async function changeInfoAction(payload: Partial<IChangeInfoPayload>) {
  try {
    store.dispatch(setLoader(true));
    const changeInfoResponse: any = await changeInfoService(payload);
    store.dispatch(authSuccess(changeInfoResponse));
    store.dispatch(setLoader(false));
  } catch (err: any) {
    console.log(err?.message);
    store.dispatch(setLoader(false));
    store.dispatch(serverError(err));
  }
}
export async function registerAction(payload: IRegisterPayload) {
  try {
    store.dispatch(setLoader(true));
    const registerResponse: any = await registerService(payload);
    store.dispatch(authSuccess(registerResponse));
    store.dispatch(setLoader(false));
  } catch (err: any) {
    store.dispatch(setLoader(false));
    console.log(err?.message);
    store.dispatch(serverError(err));
  }
}

export async function payAction(payload: Partial<IPaymentPayload>) {
  try {
    store.dispatch(setLoader(true));
    const payResponse: any = await paymentService(payload);
    store.dispatch(authSuccess(payResponse));
    store.dispatch(setLoader(false));
  } catch (err: any) {
    store.dispatch(setLoader(false));
    console.log(err?.message);
    store.dispatch(serverError(err));
  }
}
