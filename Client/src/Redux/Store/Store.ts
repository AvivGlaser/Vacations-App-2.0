import {configureStore } from "@reduxjs/toolkit"
import authReducer from "../Reducers/authReducer";
import vacationReducer from "../Reducers/vacationReducer";

export const store = configureStore({
   reducer: {
      vacations: vacationReducer,
      auth: authReducer,
   },
   middleware: (getDefaultMiddleware) =>
   getDefaultMiddleware({
     serializableCheck: false,
   })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

