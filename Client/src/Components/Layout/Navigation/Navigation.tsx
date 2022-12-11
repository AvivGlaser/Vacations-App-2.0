import React from "react";
import "./Navigation.css";
import {
  DarkMode,
  LightMode,
  ConnectingAirports,
  AppRegistration,
  Logout,
  VpnKey,
  Info,
  Houseboat,
  Payment,
  QueryStats,
  Public,
  ListAlt,
  Casino,
  Settings,
} from "@mui/icons-material";
import { Route, Link, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../Redux/Store/hooks";
import { Badge, ToggleButton } from "@mui/material";
import { Vacations } from "../../Pages/Vacations/Vacations";
import Homepage from "../../Pages/Home/HomePage";
import Register from "../../Pages/Register/Register";
import PaymentPage from "../../Pages/Payment/Payment";
import SettingsPage from "../../Pages/Settings/Settings";
import Login from "../../Pages/Login/Login";
import About from "../../Pages/About/About";
import Reports from "../../Pages/Reports/Reports";
import logoutAction from "../../../Helpers/logoutAction";
import Games from "../../Pages/Games/Games";
import AddNewVacation from "../../Pages/Vacations/AddNewVacation/AddNewVacation";
import VacationDetails from "../../Pages/Vacations/VacationsDetails/VacationDetails";
import FollowedVacation from "../../Pages/FollowedVacation/FollowedVacation";
import { StickyButton } from "../../ui-components/StickyButton/StickyButton";
import { setTheme } from "../../../Redux/Reducers/authReducer";
import NotFound from "../../Pages/NotFound/NotFound";
import Orders from "../../Pages/Orders/Orders";
import { IRoute } from "../../../Helpers/interfaces";
import UserClockDisplay from "../../ui-components/UserClockDisplay/UserClockDisplay"
import { ImageComponent } from "../../ui-components/ImageComponent/ImageComponent";

import logoImg from "../../../Assets/Images/vacation-logo-img.png";

export default function Navigation() {
  const token = useAppSelector((state) => state.auth.token);
  const followedVacationsLength = useAppSelector(
    (state) => state?.vacations?.followed?.length
  );
  const orderedVacationsLength = useAppSelector(
    (state) => state?.vacations?.ordered?.length
  );
  const userInfo = useAppSelector((state) => state?.auth?.userInfo);
  const isAdmin = userInfo?.is_admin;
  const userTheme = useAppSelector((state) => state?.auth?.theme);
  const dispatch = useAppDispatch();
  const routes: Array<IRoute> = [
    {
      path: "/",
      element: <Homepage />,
      linkText: "Home‌",
      visibility: true,
      icon: <ConnectingAirports />,
    },
    {
      path: "/login",
      element: <Login />,
      linkText: "Login",
      visibility: token ? false : true,
      icon: <VpnKey />,
    },

    {
      path: "/about",
      element: <About />,
      linkText: "About",
      visibility: true,
      icon: <Info />,
    },
    {
      path: "/register",
      element: <Register />,
      linkText: "Register",
      visibility: true,
      icon: <AppRegistration />,
    },
    {
      path: "*",
      element: <NotFound />,
      linkText: "Not-Found",
      visibility: false,
    },
  ];
  // if user logged in- add online routes
  if (token) {
    routes.push(
      {
        path: "/games",
        element: <Games />,
        linkText: "Games",
        visibility: true,
        icon: <Casino />,
      },
      {
        path: "/payment",
        element: <PaymentPage />,
        linkText: "Payment",
        visibility: true,
        icon: <Payment />,
      },
      {
        path: "/vacations",
        element: <Vacations />,
        linkText: "Vacations",
        visibility: true,
        icon: <Houseboat />,
      },
      {
        path: "/orders",
        element: <Orders />,
        linkText: (
          <Badge
            showZero={true}
            badgeContent={orderedVacationsLength}
            color="secondary"
            children={"Orderd"}
          />
        ),
        visibility: true,
        icon: <ListAlt />,
      },
      {
        path: "/followed-vacation",
        element: <FollowedVacation />,
        linkText: (
          <Badge
            showZero={true}
            badgeContent={followedVacationsLength}
            color="secondary"
            children={"Followed"}
          />
        ),
        visibility: true,
        icon: <Public />,
      },
      {
        path: "/settings",
        element: <SettingsPage />,
        linkText: "Settings",
        visibility: true,
        icon: <Settings />,
      },
      {
        path: "/reports",
        element: <Reports />,
        linkText: "Reports",
        visibility: isAdmin ? true : false,
        icon: <QueryStats color="error" />,
      },
      {
        path: "/vacations/new",
        element: <AddNewVacation />,
        linkText: "Add-Vacation",
        visibility: false,
      },
      {
        path: "/vacations/details/:vacationID",
        element: <VacationDetails />,
        linkText: "Vacations-details",
        visibility: false,
      }
    );
  }

  return (
    <Router>
      <>
        <ul className="nav-bar">
          <div className="nav-logo">
      <ImageComponent src={logoImg} height={60} width={75} />
          </div>
          {routes
            .filter((route: IRoute) => route.visibility)
            .map((route: IRoute) => {
              const { path, linkText, icon } = route;
              return (
                <li key={path}>
                  <Link to={path}>
                    <i>
                      <div className="circle">{icon}</div>
                    </i>
                    <div className="nav-title">{linkText}</div>
                  </Link>
                </li>
              );
            })}
          <ToggleButton
            value={""}
            children={
              userTheme === "light" ? (
                <span>
                  <DarkMode /> Dark{" "}
                </span>
              ) : (
                <span>
                  <LightMode /> Light{" "}
                </span>
              )
            }
            className="theme-toggle-btn"
            onChange={() => {
              dispatch(setTheme(userTheme));
            }}
          />
          <UserClockDisplay />
          {token ? (
            <StickyButton
              className="logout-btn"
              event={() => logoutAction()}
              icon={<Logout />}
              tooltip={"Logout"}
            />
          ) : null}
        </ul>
      </>

      <Routes>
        {routes.map((route: IRoute) => {
          const { path, element, linkText } = route;
          return <Route path={path} element={element} key={linkText} />;
        })}
      </Routes>
    </Router>
  );
}
