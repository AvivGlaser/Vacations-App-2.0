import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import popUpAlert from "../../Helpers/popUpAlert";
import {
  getTokenLS,
  getUserDetails,
  setTokenLS,
} from "../../Helpers/authHelpers";
import { IAuthResponse, IAuthState } from "../../Helpers/interfaces";
import logoutAction from "../../Helpers/logoutAction";

const initialState: IAuthState = {
  token: getTokenLS(),
  serverMessage: "",
  serverStatus: 0,
  userInfo: getUserDetails(getTokenLS()),
  isLoading: false,
  theme: "light",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authSuccess: (state: IAuthState, action: PayloadAction<IAuthResponse>) => {
      if (action?.payload?.token) {
        state.token = action?.payload?.token;
        setTokenLS(state.token);
        state.userInfo = getUserDetails(state.token);
      }
      state.serverStatus = action.payload.status;
    },
    resetServerStatus: (state: IAuthState) => {
      state.serverStatus = 0;
    },
    setLoader: (state: IAuthState, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setTheme: (state: IAuthState, action: PayloadAction<string>) => {
      if (action.payload === "light") {
        state.theme = "dark";
      } else if (action.payload === "dark") {
        state.theme = "light";
      }
    },
    serverError: (state: IAuthState, action: PayloadAction<any>) => {
      // dynamic error setter displaying accurate message according to the status recevied from API.
      if (action?.payload?.response?.status === 0) {
        state.serverMessage = "Server isn't available at the moment...";
      } else if (action?.payload?.response?.status === 400) {
        // if there's a message in payload, store message
        state.serverMessage = action.payload.response.data.message;
      } else if (action?.payload?.response?.status === 401) {
        state.serverMessage = "Unauthorized.";
        setTimeout(() => {
          logoutAction();
        }, 3000);
      } else {
        state.serverMessage = "Something went wrong...";
      }
      popUpAlert({
        icon: "error",
        title: `${state.serverMessage}`,
      });
    },
  },
});

export const {
  serverError,
  setTheme,
  setLoader,
  resetServerStatus,
  authSuccess,
} = authSlice.actions;
export default authSlice.reducer;
