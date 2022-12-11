import React, {
  MouseEventHandler,
  ReactComponentElement,
  ReactNode,
} from "react";
import { AlertColor } from "@mui/material";
import { SweetAlertIcon } from "sweetalert2";

export interface IRoute {
  path?: string | any;
  element: ReactComponentElement<any> | any;
  linkText: string | any;
  visibility?: boolean;
  icon?: ReactNode;
  key?: string | any;
}

export interface IStickyButton {
  event: MouseEventHandler<HTMLDivElement>;
  icon: ReactNode;
  className?: string;
  tooltip: string;
  placement?: string | undefined | any;
  badgeContent?: string;
}

export interface IFooterAnchor {
  tooltip: string;
  href: string;
  icon?: ReactNode;
}
export interface ICardIcons {
  tooltip: string;
  icon: ReactNode;
  event?: Function | any;
}

export interface IVacations {
  id: number;
  description: string;
  destination: string;
  image: any;
  departDate: string | any;
  returnDate: string | any;
  price: number;
  airport?: string;
  stops?: boolean;
  isFollowing?: number | boolean | any;
  followers?: number;
  category?: string;
  event?: Function;
  key?: any;
  createdAt?: string;
  amount?: number | any;
  operator?: string;
  moreInfo?: Boolean;
  index?: number;
}

export interface IVacationState {
  vacations: Array<IVacations>;
  followed: Array<any>;
  ordered: Array<any>;
  orderedTotalPrice: number;
  categories: Array<string>;
  followersData: Array<string>;
}

export interface IGetVacation {
  state: Array<any>;
}
export interface setVacationPayload {
  array: Array<any>;
  stateName: string;
}

export interface IOnDelete {
  array: Array<any>;
  id: number;
  stateName: string;
}

export interface IPopUpModal {
  header: string;
  message?: string | any;
  description?: string;
  image?: any;
  btnColor?: string | any;
  severity?: AlertColor;
  btnText?: string;
  btnAction?: Function | any;
  secondBtnAction?: Function | any;
  secondBtnText?: string;
  isLoading?: boolean;
  secondBtnColor?: string | any;
}

export interface IImage {
  src: string;
  defaultImage?: string;
  height?: number | string;
  width?: number | string;
  alt?: string;
}

export interface IHeader {
  header: string;
  subHeader?: string | null;
  text?: string;
  btnText?: string | null;
  btnPath?: string | null;
  btnIcon?: React.ReactNode;
  btnColor?: string | any;
}

export interface IAlert {
  icon: SweetAlertIcon;
  title: string;
}

export interface ILoader {
  isLoading: boolean;
  children?: any;
}

export interface IAddOrRemove {
  array: Array<any>;
  id: number;
  operator: boolean;
}

export interface ISortByDatesPayload {
  departDate: string | Date;
  returnDate: string | Date;
  stops: boolean;
}

export interface IAuthState {
  token: string | any;
  serverMessage: string;
  serverStatus: number;
  userInfo: object | any;
  isLoading: boolean;
  theme: string;
}

export interface ILoginPayload {
  userName: string;
  password: string;
}
export interface IAuthResponse {
  message: string;
  status: number;
  token?: string;
}

export interface IChangeInfoPayload {
  password?: string;
  newPassword?: string;
  passwordConfirm?: string;
  firstName?: string;
  lastName?: string;
}

export interface IRegisterPayload {
  firstName: string;
  lastName?: string;
  userName: string;
  password: string;
  passwordConfirm: string;
}

export interface IPaymentPayload {
  name: string;
  number: string;
  fullExpiry: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;
}
