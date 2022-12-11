import React from "react";
import  Footer from "./Footer/Footer"
import  Header from "./Header/Header"
import { useAppSelector } from "../../Redux/Store/hooks";

export default function Layout() {
  const userTheme = useAppSelector((state) => state?.auth?.theme);
  return (
    <div className={userTheme}>
      <Header />
      <Footer />
    </div>
  );
}
