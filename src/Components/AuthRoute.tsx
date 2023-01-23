import React, { useEffect, useState } from "react";
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { auth } from "../Libs/firebase";
function AuthRoute() {
    //const auth = getAuth()
    const navigate = useNavigate();
    const [isloading, setIsloading] = useState(false);
    useEffect(()=>{
        AuthCheck();
    },[auth]);
    const AuthCheck=onAuthStateChanged(auth,(user)=>{
        if (user)
        {
            setIsloading(false);
        }else{
            console.log("Unauthorized");
            navigate("/");// this is the login page
        }
        if (isloading)
        {
            return<p>We are loading here</p>
        }
    })
    return ( <div>sdfsfs</div> );
}

export default AuthRoute;