import * as React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AddAdmin from "./addAdmin";
import Footer from "./footer";
import NavbarBs from "./navbar";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type userAuth = { email: string; password: string };
function Login() {
  const [isauthing, setIsauthing] = useState(false);
  let errmsg;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userAuth>();
  const [autherror, setAutherror] = useState(false);
  const navigate = useNavigate();
  const notifySuccess = ()=>{
    toast.success('Login In Successful',{position:toast.POSITION.BOTTOM_CENTER, autoClose:2000})}
  
  const onSubmit = handleSubmit((userCredential: userAuth) => {
    const auth = getAuth();
    setIsauthing(true);
    signInWithEmailAndPassword(
      auth,
      userCredential.email,
      userCredential.password
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        notifySuccess();
        setIsauthing(false);
        navigate("/map");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error('Incorrect log In Credentials',{position:toast.POSITION.BOTTOM_CENTER, autoClose:2000})
        setIsauthing(false);
        errmsg=errorMessage;
        setAutherror(true);
      });
  });

  return (
    <div >
      <Footer />
      <br></br>
      <br></br>
      <br></br>
      <br />     
      <h2 className="mb-5 text-center">Log In</h2>
      <br></br>
      <br></br>
      <div className="row">
        <div className="col-sm"></div>
        <div className="col-sm">
          <form className="container" onSubmit={onSubmit}>
            <ToastContainer/>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                {...register("email", { required: true })}
              />
              
              {errors.email && <div className="errors">Email is Required</div>}
              
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                {...register("password", { required: true })}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-lg btn-block" style={{ backgroundColor: '#24522e' }}>
              Login
            </button>
          </form>
          {isauthing && (
            <div className="text-center">
              <div className="spinner-border" role="status">
                {/* <span className="visually-hidden">Signing In...</span> */}
              </div>
            </div>
          )}
          {autherror && (
            <p className="text-danger">
              <p>Authentication problem due to network issues{errmsg}</p>{" "}
            </p>
          )}
          <p></p>
        </div>
        <div className="col-sm"></div>
      </div>
    </div>

    // <form onSubmit={onSubmit}>
    //     <div>
    //         <label htmlFor='Email'>Email</label>
    //         <input {...register("email")} id='email' name='email'  type="email"/>
    //     </div>
    //  <div>
    //      <label htmlFor='Password'>Password</label>
    //     <input {...register("password")} id='password' name='password'  type="text"/>
    // </div>
    // <div>
    //     <button type='submit' >Login</button>
    // </div>
    // </form>
  );
}

export default Login;
