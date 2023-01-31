import React from "react";
import { render } from "react-dom";
//import ReactDOM from 'react-dom/client';
import "./index.css";

import reportWebVitals from "./reportWebVitals";

import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";
import RoutingofSystem from "./Components/routing";
import 'react-toastify/dist/ReactToastify.css';
const root = document.getElementById("root");

render(
  <React.StrictMode>
    <BrowserRouter>
    {/* <div className="contianer">
          <NavbarBs/>
        </div> */}
      
      <div className="w-screen h-screen">
      <RoutingofSystem/>
        </div>
    </BrowserRouter>
  </React.StrictMode>,
  root
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
