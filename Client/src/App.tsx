import React from "react";
import "./App.css";
import Layout from "../src/Components/Layout/Layout";
import { TimeProvider } from "./Context/TimeContext";
function App() {

  return (
      <TimeProvider>
        <Layout />
      </TimeProvider>
  );
}

export default App;
