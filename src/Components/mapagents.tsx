import * as React from 'react'
import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import { FiFlag } from 'react-icons/fi'
import { ImLocation } from 'react-icons/im'

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
import { GiHumanTarget } from 'react-icons/gi'

import pinIcon from '../Assets/pinicon.png'

type LatLngLiteral = google.maps.LatLngLiteral // creating datatype of lat long
type DirectionsResult = google.maps.DirectionsResult // creating  a datatype that can handle direction results
type MapOptions = google.maps.MapOptions
const defaultOptions = {
  strokeOpacity: 0.9,
  clickable: false,
  strokeWeight: 1,
  draggable: false,
  editable: false,
  visible: true,
}

const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.09,
  strokeColor: '#FF5252',
  fillcolor: '#ffbb00',
}
const edgeOptions = {
  ...defaultOptions,
  zIndex: 4,
  fillOpacity: 0.09,
  strokeColor: '#FBC02D',
  fillcolor: '#FBC02D',
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
  console.log('THIS IS MY TESTING LAT', selectedsuspectvar?.lat!)
  console.log('THIS IS MY TESTING LONG', Number(selectedsuspectvar?.long!))
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
    <div className="w-full h-full">
      <div className="w-full">
        <NavbarBs />

        <div className="w-full rounded-xl bg-[#1e293b] flex flex-col md:flex-row">
          <GoogleMap
            zoom={8}
            center={center}
            mapContainerClassName="w-[100%] md:w-[80%] rounded-xl h-screen"
          >
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
              <Circle center={center} radius={5000} options={closeOptions} />
              <Circle center={center} radius={10000} options={edgeOptions} />
            </React.Fragment>
          </GoogleMap>
          {/* sidebar */}
          <div className="w-[100%] md:w-[20%] mt-2 md:mt-0 bg-[#1e293b] pr-1 text-gray-300">
            {/* Start of Card */}
            <div className="card w-full mx-1  mt-0">
              <img
                className="card-img-top rounded-md w-full"
                style={{ width: '100%', height:'200px' }}
                src={selectedSsuspectvarexpo?.imgurl}
                alt="Card image cap"
              />
              <div className="mt-4 ml-1 text-[#1e293b]">
                <ul className="w-full flex flex-col">
                  <li className=" border-b mt-2">
                    <h5 className="card-title">
                      Name: {selectedSsuspectvarexpo?.name?.toUpperCase()}
                    </h5>
                  </li>
                  <li className=" border-b mt-2">
                    <p className="text-lg">
                      <strong className="text-red-500">
                        Alleged Chargies:
                      </strong>{' '}
                      {selectedSsuspectvarexpo?.crimecom}
                    </p>
                  </li>
                  <li className=" border-b mt-2">
                    <p
                      className={
                        selectedSsuspectvarexpo?.dangerousLevel?.toLowerCase() ==
                        'high'
                          ? 'text-red-500 font-bold'
                          : 'text-orange-400 font-bold'
                      }
                    >
                      <strong className="text-[#1e293b]">Wanted Level: </strong>
                      {selectedSsuspectvarexpo?.dangerousLevel}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            {/* instruction  */}
            <div className=" flex flex-col mt-2 items-center">
              <p className='p-1 text-orange-600'> Double Click on the Nearest Agent's Flag Marker</p>
              <div className="flex">
                <ImLocation size={30} className="text-red-600" />{' '}
                <p className="text-lg font-semibold">= Suspect </p>
              </div>
              <div className="flex">
                <FiFlag size={30} className="text-orange-400" />{' '}
                <p className="text-lg font-semibold">= CID Agent</p>
              </div>
            </div>
            <div className="ml-1 mt-2 ">
              <h5 className="underline">Response Agent</h5>
              <p>
                <strong>Name:</strong> {selectedAgent?.name}
              </p>
              <p>
                <strong>Phone Number:</strong> {selectedAgent?.phoneNumber}
              </p>
              <button
                type="submit"
                className=" bg-gray-300 w-full  py-2 text-lg hover:translate-x-3 duration-500 mx-auto text-[#1e293b] rounded-full"
              >
                Notify Security
              </button>
            </div>
            {/* <Bar suspects={suspects} setSuspects={setSuspects} /> */}
          </div>
        </div>
      </div>
    </div>
  )
}
