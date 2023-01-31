import firebase from "firebase/compat/app";// we have to use the / app if you use auto import
import { GeoPoint } from "firebase/firestore";
import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { addAgents, addGeoAgents } from "../Libs/controller";
import NavbarBs from "./navbar";


import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type addAgent = {
  fullname: string;
  lat: number;
  lng: number;
  available:boolean
};
interface addAgentGeo {
  latitude: number;
  longitude: number;
  fno?:string;
  g?: {
  geohash?: string;
  geopoint?: GeoPoint;
  };
  fullname?: string;
  available?:boolean
  }
 
  //toast.configure()
function AddAgents() {
  const notify = ()=>{
    // inbuilt-notification
    toast.success('Agent Add Sucessfully',{position:toast.POSITION.BOTTOM_CENTER,autoClose:2000})
    // inbuilt-notification
   // toast.success('successful', {autoClose:false})
  
      
}
  const [isloading,setIsloading]= useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<addAgentGeo>();// linking the inteface and values for the required field in form

  const onSubmit = handleSubmit(async(data: addAgentGeo) => {
   console.log(Number(data.latitude)) ;
   setIsloading(true);
    await addGeoAgents({
      name:data.fullname,
      coordinates:new firebase.firestore.GeoPoint(Number(data.latitude!),Number( data.longitude!)),
      available:data.available,
      phoneNumber:data.fno
    });
    setIsloading(false);
    notify();
   // alert("new agent added sucsessfuly");
  });
  return (
    <div  className="bg-gray-100">
       <div >
          <NavbarBs/>
        </div>
      <div className="row">
        <div className="col-sm"></div>
        <div className="col-sm">

          
          <h2 className="md-5 text-center mt-10" > Agents</h2>
          
          <p className="font-bold ml-3 text-center mt-10 text-[#1e293b]">Add New Agent</p>
          <form className="container " onSubmit={onSubmit}>
          <ToastContainer />
            <div className="form-group ">
              <label htmlFor="exampleInputEmail1" className="font-bold text-[#1e293b]">Full Name</label>
              <input
                type="text"
                className="form-control "
                id="exampleInput"
                aria-describedby="emailHelp"
                placeholder="Enter Full Name"
                {...register("fullname", { required: true })}
              />
              {errors.fullname && (
                <div className="errors">Name is Required</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1" className="font-bold text-[#1e293b]">Phone Number</label>
              <input
                type="text"
                className="form-control"
                id="exampleInput"
                aria-describedby="emailHelp"
                placeholder="+263 "
                {...register("fno", { required: true })}
              />
              {errors.fno && (
                <div className="errors text-danger">Name is Required</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">
                <strong> Location</strong>
              </label>
              <br></br>
              <label htmlFor="exampleInputEmail1" className="font-bold text-[#1e293b]">Latitude</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter Latitude"
                {...register("latitude", { required: true })}
              />
              {errors.latitude && (
                <div className="errors text-danger">This field is required</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1" className="font-bold text-[#1e293b]">Longitude</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Longitude"
                {...register("longitude", { required: true })}
              />
              {errors.longitude && (
                <div className="errors text-danger">This field is required</div>
              )}
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
                {...register("available")}
              />
              <label className="form-check-label text-[#1e293b] font-bold" htmlFor="exampleCheck1">
                Available?
              </label>
            </div>

            <button type="submit" className="text-gray-300  py-2 text-xl  btn-block rounded-lg  bg-[#1e293b]" >
              Add Agent 
            </button>
          </form>
          {isloading&&<div className="text-center">
              <div className="spinner-border" role="status">
                {/* <span className="visually-hidden">Signing In...</span> */}
              </div>
            </div>}
        </div>
        <div className="col-sm"></div>
      </div>
    </div>
  );
}

export default AddAgents;
