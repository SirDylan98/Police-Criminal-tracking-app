import { onSnapshot } from "firebase/firestore";
import * as React from "react";
import { useState , useEffect } from "react";
import { useForm } from "react-hook-form";
import { addSuspect, spottedsuspectCollection } from "../Libs/controller";
import NavbarBs from "./navbar";
type addSuspects = {
  fullname: string;
  address: string;
  lat: number;
  imgurl:string,
  lng: number;
};
function AddSuspects() {
 // useEffect(()=> onSnapshot(suspectCollection,(snapshot)=>{console.log(snapshot,"snapshot")}));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<addSuspects>();

  const onSubmit = handleSubmit((data: addSuspects) => {
    alert(JSON.stringify(data));
    addSuspect(data);
    alert("new suspect has been successfully added");
  });
  return (
    <div className="container">
       <div className="contianer">
          <NavbarBs/>
        </div>
      <h1>Add suspect Page</h1>
      <div className="row">
        <div className="col-sm"></div>
        <div className="col-sm">
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>

          <form className="container" onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Full Name</label>
              <input
                type="text"
                className="form-control"
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
              <label htmlFor="national ID">Home address </label>
              <input
                type="text"
                className="form-control"
                id="exampleInput"
                placeholder="Enter suspects home address"
                {...register("address", { required: true })}
              />
              {errors.address && (
                <div className="errors">ID number is Required</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">
                <strong>Recent location</strong>
              </label>
              <br></br>
              <label htmlFor="exampleInputEmail1">Latitude</label>
              <input
                type="number"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter Latitude"
                {...register("lat", { required: true })}
              />
              {errors.lat && <div className="errors"></div>}
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Longitude</label>
              <input
                type="number"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Longitude"
                {...register("lng", { required: true })}
              />
              {errors.lng && <div className="errors">Email is Required</div>}
            </div>
            
              <div className="form-group">
                <label htmlFor="exampleFormControlFile1">
                  Suspect Image
                </label>
                <input
                  type="file"
                  className="form-control-file"
                  id="exampleFormControlFile1"
                />
              </div>
            </form>

            <button type="submit" className="btn btn-primary">
              Add Suspect
            </button>
          
        </div>
        <div className="col-sm"></div>
      </div>
    </div>
  );
}

export default AddSuspects;
