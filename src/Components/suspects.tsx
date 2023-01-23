import { DocumentData, onSnapshot, QuerySnapshot } from "firebase/firestore";
import * as React from "react";
import { useState, useEffect } from "react";

import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useForm } from "react-hook-form";
import {
  addAgents,
  addSuspect,
  suspectcollection,
  spottedsuspectCollection,
} from "../Libs/controller";
import { app, GeoFirestore, storage } from "../Libs/firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import firebase from "firebase/compat/app";
import SuspectsCard from "./card";
import { susp } from "./mapagents";
import NavbarBs from "./navbar";
const prgvalue = 50;
type addSuspects = {
  fullname?: string;
  address?: string; //the question mark is used to indicate that the field is optional
  lat?: number;
  imagesource: any;
  imgurl?: any;
  lng?: number;
  recentloc?: [{ lat?: number; long?: number }];
  dangerousLevel?: string;
  crimeCom?: string;
  suspectdescription?:string;
};
function Suspects() {
  const [loadSuspects, setLoadSuspects] = useState<susp[]>([]); /// to set all the suspects
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<addSuspects>(); // react hook form functions
  const [imgFile, setImagefile] = useState<File>();
  const [downImgUrl, setDownImgUrl] = useState<string | undefined>();
  const [prgvalue, setPrgvalue] = useState<number>();
  const [isloadingsusp,setisloadingsusp]=useState(false);

  useEffect(
    //use to listen to real time events, used to rerender wen change are detected
    () =>
      onSnapshot(
        suspectcollection,
        (snapshot: QuerySnapshot<DocumentData>) => {
          //key not on specifing data type of snapshot
          setLoadSuspects(
            snapshot.docs.map((doc) => {
              return { id: doc.id, ...doc.data() };
            })
          );
          
          console.log(loadSuspects);
          if(loadSuspects.length===0)
          {
             setisloadingsusp(false);
             
          } else {
            setisloadingsusp(false);
          }
        }
      ),
    []
  );
  const onSubmit = handleSubmit(async (data: addSuspects) => {
    const geocollection = GeoFirestore.collection("restaurants");

    await addSuspect({
      name: data.fullname,
      lat: 44, //converting the string from input to number
      long: 55,
      imgurl: downImgUrl,
      homeaddress: data.address,
      recentlocation:[{lat:44,long:55}],
      dangerousLevel: data.dangerousLevel,
      crimecom: data.crimeCom,
      suspectdescription:data.suspectdescription
    });
    toast.success('Suspect added Successfully',{position:toast.POSITION.BOTTOM_CENTER, autoClose:2000})
  });

  //////////////////////////////////////////////////////
  const onFilechange = (file: any) => {
    if (file && file[0].size < 10000000) {
      //checking the file size and file comes a an array
      setImagefile(file[0]);
      console.log(file[0]);
      const name = file[0].name; // referencing the selected file name
      const storage = getStorage(); // getting the firebase storage functionality
      const storageRef = ref(storage, `suspects/${name}`); // referencing the bucket
      const uploadTask = uploadBytesResumable(storageRef, file[0]); // function to upload a file

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100; //calculating the percentage
          setPrgvalue(progress); // setting the progress bar value
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setDownImgUrl(downloadURL);
          });
        }
      );
    } else {
      alert("image to large");
    }
  };

  return (
    <div>
      <NavbarBs />
      <ToastContainer/>

      {/* <div className="container" > */}
        <div className="container">
          <div className="row">
            <div className="col-sm"></div>
            <div className="col-sm">
              <br></br>
              <br></br>
              <h2 className="md-5 text-center" > Suspects</h2>
              <br></br>
              <br></br>
              <br></br>
              <p>
                <strong>Add New Suspect</strong>
              </p>
              <form className="container" onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInput"
                    aria-describedby="emailHelp"
                    placeholder="Enter Full Name"
                    {...register("fullname", { required: true })} // use the register useForm to get the value of the text input
                  />
                  {errors.fullname && (
                    <div className="errors"><p className="text-danger">Name is Required</p></div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInput">Home Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInput"
                    aria-describedby="emailHelp"
                    placeholder="Enter Home address"
                    {...register("address", { required: true })}
                  />
                  {errors.address && (
                    <div className="errors"><p className="text-danger">Home Address is Required</p></div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInput">Upload Suspect Image</label>
                  <input
                    type="file"
                    {...register("imagesource", { required: true })}
                    onChange={(files) => onFilechange(files.target.files)}
                  />
                  {
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        //style={{ backgroundColor: '#24522e' }}
                        style={{ width: `${prgvalue}%`, backgroundColor: '#24522e'}}
                        aria-valuenow={10}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        {prgvalue}%
                      </div>
                    </div>
                  }
                  {/* {<h2>the name of the image is {imgFile?.name}</h2>} */}
                  {errors.imagesource && (
                    <div className="errors"><p className="text-danger">Suspect Image is Required</p></div>
                  )}
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    <strong>Alleged Chargies</strong>
                  </label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    {...register("crimeCom", { required: true })}
                    rows={2}
                  ></textarea>
                  {errors.crimeCom && (
                    <div className="errors"><p className="text-danger">This field is required</p> </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Wanted Level</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInput"
                    aria-describedby="emailHelp"
                    placeholder=" Enter High or Low"
                    {...register("dangerousLevel", { required: true })}
                  />
                  {errors.dangerousLevel && (
                    <div className="errors"> This field is required</div>
                  )}
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    <strong>Description</strong>
                  </label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    {...register("suspectdescription", { required: true })}
                    rows={5}
                  ></textarea>
                  {errors.suspectdescription && (
                    <div className="errors"><p className="text-danger">This field is required</p> </div>
                  )}
                </div>
               
               

                <button type="submit" className="btn btn-primary btn-lg btn-block" style={{ backgroundColor: '#24522e' }}>
                  Add Suspect
                </button>
              </form>
            </div>
            <div className="col-sm"></div>
          </div>
        </div>
        <br></br>
        <br />
        <>
          <h2 className="text-center">
            <strong>Suspects List</strong>
          </h2>
         
          {isloadingsusp&&<div className="text-center">
              <div className="spinner-border" role="status">
                
                {/* <span className="visually-hidden">Signing In...</span> */}
              </div>
            </div>}
          {loadSuspects.map((suspects) => {
            return (
              // passing the current suspect via props using the ... function
              <div key={suspects.id}>
                <SuspectsCard key={suspects.id} {...suspects} />
                <br />
              </div>
            );
          })}
        </>
      
    </div>
  );
}

export default Suspects;
