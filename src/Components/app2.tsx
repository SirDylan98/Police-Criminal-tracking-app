import React, { useEffect, useState } from "react";

import { useLoadScript } from "@react-google-maps/api";

import Mapagents from "./mapagents";
import { GeoPoint } from "firebase/firestore";
import firebase from "firebase/compat/app";
import { selectedsuspectvar } from "./map";
import { GeoFirestore } from "../Libs/firebase";

export default function App2() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAlFkElS2AMnkaZ3aox6g0r5l7SLadMFSk",
    // libraries:["places"]
  });

  if (!isLoaded)
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  return <Mapagents />;
}
