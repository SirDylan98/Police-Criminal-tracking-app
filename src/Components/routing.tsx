import React from "react";
import {Routes,Route} from "react-router-dom";
import App from "../App";
import AddAdmin from "./addAdmin";
import AddAgents from "./addAgents";
import AddSuspects from "./addSuspects";
import App2 from "./app2";
import App3 from "./app3";
import AuthRoute from "./AuthRoute";
import Login from "./login";
import Map from './map';
import Mapagents from "./mapagents";
import NavbarBs from "./navbar";
import Report from "./reports";
import RouteMap from "./routemap";
import Suspects from "./suspects";


function RoutingofSystem() {
    return ( 
       
        <Routes>
            <>
            {/* <NavbarBs/> */}
            <Route path="/" element={<Login/>}/>
            <Route path="/addadmin" element={<AddAdmin/>}/>
            <Route path="/addagents" element={<AddAgents/>}/>
            <Route path="/map" element={<App/>}/>
            <Route path="/suspects" element={<Suspects/>}/>
            <Route path="/map/:id" element={<RouteMap/>}/>
            <Route path="/report" element={<App3/>}/>
            <Route path="/mapagents" element={<App2/>}/>
            <Route path="/addsuspects" element={<AddSuspects/>}/>
            <Route path="/" element={<Login/>}/>
            </>
        </Routes>
        
     );
}

export default RoutingofSystem;
