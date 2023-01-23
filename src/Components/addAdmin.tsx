import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { addadmin } from "../Libs/controller";
import NavbarBs from "./navbar";
               
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type addAdmin = {
  fullname: string;
  idno: string;
  email: string;
  password: string;
  password1:string;
};
function AddAdmin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordNoMatch,setPasswordNoMatch]= useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<addAdmin>();
  const auth = getAuth();

  const onSubmit = handleSubmit(async (data: addAdmin) => {
    if (data.password===data.password1)
    {
      setEmail(data.email);
      setPassword(data.password);
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          toast.success('New Admin Created',{position:toast.POSITION.BOTTOM_CENTER, autoClose:3000})
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(error.message,{position:toast.POSITION.BOTTOM_CENTER, autoClose:3000})
          
        });
        addadmin({
          name: data.fullname,
          idno: data.idno,
          email: data.email,
        });

    }else{
      setPasswordNoMatch(true);
    }
   
 
  });
  return (
    <div >
      <NavbarBs />

      <div className="container-fluid" style={{ width: "100%" }}>
        <div className="row">
          <div className="col-sm"></div>
          <div className="col-sm">
            <br></br>
            <br></br>
            <h2 className="md-5 text-center" > Admins</h2>
            <br></br>
            <br></br>
            <br></br>
            <p>
              <strong>Add New Admin</strong>
            </p>
            <form className="container" onSubmit={onSubmit}>
              <ToastContainer/>
              <div className="form-group">
                <label htmlFor="exampleInput">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInput"
                  placeholder="Enter Full Name"
                  {...register("fullname", { required: true })}
                />
                {errors.fullname && (
                  <div className="errors">Name is Required</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="national ID">National ID </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInput"
                  placeholder="Enter ID number"
                  {...register("idno", { required: true })}
                />
                {errors.idno && (
                  <div className="errors">ID number is Required</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <div className="errors">Email is Required</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  {...register("password", { required: true, minLength: 6 })}
                />
                {errors.password && errors.password.type === "required" && (
                  <span>This is required</span>
                )}
                {errors.password && errors.password.type === "minLength" && (
                  <span className="text-danger" >Password has to be more that 6 characters</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Re-Enter Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Re-Enter Password"
                  {...register("password1", { required: true, minLength: 8 })}
                />
                {errors.password1 && errors.password1.type === "required" && (
                  <span>This is required</span>
                )}
                {errors.password1 && errors.password1.type === "minLength" && (
                  <span className="text-danger" >Password has to be more that 8 characters</span>

                )}
                {passwordNoMatch&&<span className="text-danger" >Passwords not Matching</span>}
              </div>
          
              <button type="submit" className="btn btn-primary btn-lg btn-block" style={{ backgroundColor: '#24522e' }}>
                Add New Admin
              </button>
            </form>
          </div>
          <div className="col-sm"></div>
        </div>
      </div>
    </div>
  );
}

export default AddAdmin;
