import React from "react";
import { render } from "react-dom";
//import ReactDOM from 'react-dom/client';
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Map from "./Components/map";
import "bootstrap/dist/css/bootstrap.css";
import Login from "./Components/login";
import AddAdmin from "./Components/addAdmin";
import AddSuspects from "./Components/addSuspects";
import AddAgents from "./Components/addAgents";
import { BrowserRouter } from "react-router-dom";
import RoutingofSystem from "./Components/routing";
import NavbarBs from "./Components/navbar";
import Footer from "./Components/footer";
import 'react-toastify/dist/ReactToastify.css';
const root = document.getElementById("root");

render(
  <React.StrictMode>
    <BrowserRouter>
    {/* <div className="contianer">
          <NavbarBs/>
        </div> */}
      <RoutingofSystem/>
      <div className="contianer">
          
        </div>
    </BrowserRouter>
  </React.StrictMode>,
  root
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
