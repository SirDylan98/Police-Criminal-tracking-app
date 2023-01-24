import { useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { deleteSuspect, updateSuspect } from "../Libs/controller";
import { susp } from "./mapagents";
import { useForm } from "react-hook-form";

type UpdateSuspect = {
  fullname?: string;
  address?: string; //the question mark is used to indicate that the field is optional
};
function SuspectsCard(suspect: susp) {
  //
  const [editOn, setEditOn] = useState<boolean>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateSuspect>();
  const onSubmit = handleSubmit(async (data: UpdateSuspect) =>{
    await updateSuspect(suspect.id,{name:data.fullname,address:data.address})
  });

  return (
    <div className="card flex-row rounded-xl mx-auto" style={{ width: "40rem" }}>
      <img src={suspect.imgurl} className=" rounded-xl card-img-left" alt="..." />

      <div className=" rounded-xl card-body">
        <h5 className="card-title">Name: {suspect.name}</h5>
        <p className="card-text">
          <strong>Alleged Chargies:</strong>
          {suspect.crimecom}
        </p>
        <p className="card-text">
          <strong>Wanted Level:</strong>
          {suspect.dangerousLevel}
        </p>
        <p className="card-text">
          <strong>Address:</strong> {suspect.homeaddress}
        </p>
        <a
          href="#"
          className="btn m-1 btn-danger"
          onClick={() => deleteSuspect(suspect.id)}
        >
          Delete
        </a>
        <a
          href="#"
          className="btn btn-primary"
          onClick={() => {
            if (!editOn) {
              setEditOn(true);
            } else {
             // updateSuspect(suspect.id,UpdateSuspect.)
              setEditOn(false);
            }
          }}
        >
          Update
        </a>
        {editOn && (
          <form>
            <div className="form-group" onSubmit={onSubmit}>
              <label htmlFor="exampleInput">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Update Name"
                {...register("fullname", { required: true })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Address</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Put Updated Address"
                {...register("address", { required: true })}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              UpDate
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default SuspectsCard;
