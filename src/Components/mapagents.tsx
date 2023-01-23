import * as React from 'react'
import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import Bar from './sideBar'
import { Component } from 'react'
import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from '@react-google-maps/api'
import {
  DocumentData,
  GeoPoint,
  onSnapshot,
  QuerySnapshot,
} from 'firebase/firestore'
import { spottedsuspectCollection } from '../Libs/controller'
import firebase from 'firebase/compat/app'
import { app, GeoFirestore, storage } from '../Libs/firebase'
import { GeoQuerySnapshot } from 'geofirestore-core'
import { selectedsuspectvar, selectedSsuspectvarexpo } from './map'
import NavbarBs from './navbar'

type LatLngLiteral = google.maps.LatLngLiteral // creating datatype of lat long
type DirectionsResult = google.maps.DirectionsResult // creating  a datatype that can handle direction results
type MapOptions = google.maps.MapOptions
const defaultOptions={
  strokeOpacity:0.9,
  clickable:false,
  strokeWeight:1,
  draggable:false,
  editable:false,
  visible:true,
}

const closeOptions={
  ...defaultOptions,
  zIndex:3,
  fillOpacity:0.09,
  strokeColor: "#FF5252",
  fillcolor:"#ffbb00",
}
const edgeOptions={
  ...defaultOptions,
  zIndex:4,
  fillOpacity:0.09,
  strokeColor: "#FBC02D",
  fillcolor:"#FBC02D",
}
export interface IState {
  suspects: {
    lat: number
    lng: number
  }[]
}
export interface susp {
  //interface need for receiving data from firestore
  name?: string
  imgurl?: string
  homeaddress?: string
  id: string
  recentloc?: [{ lat?: number; long?: number }]
  lat?: number
  long?: number
  dangerousLevel?: string
  crimecom?: string
}
interface GeoDocumentData {
  id?: string
  name?: string
  address?: string
  coordinates?: GeoPoint
  phoneNumber?: string
  score?: number
  g: {
    geohash?: string
    //geopoint?: GeoPoint;
  }
}

export default function Mapagents() {
  const suspaddress = selectedsuspectvar?.address
  const [directions, setDirections] = useState<DirectionsResult>()
  const [selectedAgent, setSelectedAgent] = useState<GeoDocumentData>()
  const geocollection = GeoFirestore.collection('agents')
  console.log("THIS IS MY TESTING LAT",selectedsuspectvar?.lat!)
  console.log("THIS IS MY TESTING LONG",Number(selectedsuspectvar?.long!))
  const query = geocollection.near({
    center: new firebase.firestore.GeoPoint(
      Number(selectedsuspectvar?.lat),
      Number(selectedsuspectvar?.long),
    ),
    radius: 10000,
  })
  ////////////////////////////// getting the markers
  const [myagents, setMyagents] = useState<GeoDocumentData[]>([]) // state to store the objects and 1st [] is to indicate that its an array of obj type susp
  //const suspectslocateds:any=[] ;
  useEffect(() => {
    if (myagents) {
      query.get().then((value) => {
        // All GeoDocument returned by GeoQuery, like the GeoDocument added above

        setMyagents(
          value.docs.map((doc) => {
            return { id: doc.id, ...doc.data() }
          }),
        )
      })
    }
  }, [])
  console.log(myagents, 'These are my agents ')
  //console.log(suspectslocated, "Suspects located");

  //////////////////////////////////////////////////////
  const fetchDirections = (_position: LatLngLiteral) => {
    if (!selectedAgent) return
    const service = new google.maps.DirectionsService()
    service.route(
      {
        origin: suspaddress!,
        destination: selectedAgent.address!,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === 'OK' && result) {
          setDirections(result)
        }
      },
    )
  }
  ////////////////////////////////////////////////////////////////////

  const center = {
    lat: selectedsuspectvar?.lat!,
    lng: selectedsuspectvar?.long!,
  }
  const center2 = {
    lat: -18.788,
    lng: 29.45,
  }

  const [suspects, setSuspects] = useState<IState['suspects']>([
    { lat: 43, lng: -80 },
  ])

  return (
    <div className="contianer">
      <NavbarBs />

      <div className="containerr">
        <GoogleMap zoom={8} center={center} mapContainerClassName="container1">
          {directions && <DirectionsRenderer directions={directions} />}
          <React.Fragment>
            {myagents.map((suspectsss) => (
              <Marker
                icon={
                  'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
                }
                key={suspectsss.id}
                onClick={() => {
                  setSelectedAgent(suspectsss)
                  fetchDirections(center)
                  console.log(
                    'the marker got clicked',
                    suspectsss.coordinates?.latitude,
                  )
                }}
                position={{
                  lat: suspectsss.coordinates?.latitude!,
                  lng: suspectsss.coordinates?.longitude!,
                }}
              />
            ))}

            <Marker position={center} />
            <Circle center={center} radius={5000} options={closeOptions}/>
            <Circle center={center} radius={10000} options={edgeOptions}/>
          </React.Fragment>
        </GoogleMap>

        <div className="container2">
          <div className="card" style={{ width: '18rem' }}>
            <img
              className="card-img-top"
              style={{ width: '100%' }}
              src={selectedSsuspectvarexpo?.imgurl}
              alt="Card image cap"
            />
            <div className="card-body">
              <h5 className="card-title">{selectedSsuspectvarexpo?.name}</h5>
              <p className="card-text">
                <strong>Alleged Chargies:</strong>{' '}
                {selectedSsuspectvarexpo?.crimecom}
              </p>
              <p className="card-text">
                <strong>Wanted Level:</strong>{' '}
                {selectedSsuspectvarexpo?.dangerousLevel}
              </p>
            </div>
          </div>
          <br />
          <br />

          <div>
            <h5>Response Agent</h5>
            <p>
              <strong>Name:</strong> {selectedAgent?.name}
            </p>
            <p>
              <strong>Phone Number:</strong> {selectedAgent?.phoneNumber}
            </p>
            <button type="submit" className="btn btn-primary btn-lg btn-block" style={{ backgroundColor: '#24522e' }}>
                  Notify Security
                </button>
          </div>
          {/* <Bar suspects={suspects} setSuspects={setSuspects} /> */}
        </div>
      </div>
    </div>
  )
}
