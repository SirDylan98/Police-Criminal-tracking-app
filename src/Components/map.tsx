import * as React from 'react'
import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import Bar from './sideBar'
import { Component } from 'react'
import {
  useLoadScript,
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from '@react-google-maps/api'
import {
  collection,
  DocumentData,
  GeoPoint,
  getDocs,
  onSnapshot,
  query,
  QuerySnapshot,
  where,
} from 'firebase/firestore'
import { firestore, spottedsuspectCollection } from '../Libs/controller'
import firebase from 'firebase/compat/app'
import { app, GeoFirestore, storage } from '../Libs/firebase'
import { Navigate, useNavigate } from 'react-router-dom'
import Mapagents from './mapagents'
import NavbarBs from './navbar'
type LatLngLiteral = google.maps.LatLngLiteral // creating datatype of lat long
type DirectionsResult = google.maps.DirectionsResult // creating  a datatype that can handle direction results
type MapOptions = google.maps.MapOptions
export let selectedsuspectvar: susp | undefined
export let selectedSsuspectvarexpo: susp | undefined
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
  address?: string
  id?: string
  recentloc?: LatLngLiteral
  lat?: number
  long?: number
  dangerousLevel?: string
  crimecom?: string
}
interface GeoDocumentData {
  g: {
    geohash: string
    geopoint: GeoPoint
  }
  [field: string]: any
}

export default function Map() {
  const options = useMemo<MapOptions>(
    () => ({
      mapId: '8ca13639bca3d45f',
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    [],
  )
  const navigate = useNavigate()
  const geocollection = GeoFirestore.collection('restaurants')
  const query1 = geocollection.near({
    center: new firebase.firestore.GeoPoint(40.7589, -73.9851),
    radius: 1000,
  })
  ////////////////////////////// getting the markers
  const [suspectslocated, setSuspectslocated] = useState<susp[]>([]) // state to store the objects and 1st [] is to indicate that its an array of obj type susp
  const [suspectsselected, setSuspectsselected] = useState<susp>()
  const [suspectslocatedexpo, setSuspectslocatedexpo] = useState<susp[]>([])
  const [suspectslocatedexpo2, setSuspectslocatedexpo2] = useState<susp>()
  selectedsuspectvar = suspectsselected
  selectedSsuspectvarexpo = suspectslocatedexpo2
  const getDetails = async (s: string) => {
    const getsuspectdocs = query(
      collection(firestore, 'suspects'),
      where('name', '==', s),
    ) // change edmand to variable
    const querySnaps = await getDocs(getsuspectdocs)
    querySnaps.forEach((doc) => {
      console.log('yes sir we are getting the data', doc.data())
      setSuspectslocatedexpo2(doc.data())
      selectedSsuspectvarexpo = doc.data()
      console.log('We are getting the values ', selectedSsuspectvarexpo)
    })

    console.log('this is my selected doc', suspectslocatedexpo)
  }

  useEffect(
    //use to listen to real time events, used to rerender wen change are detected
    () =>
      onSnapshot(
        spottedsuspectCollection,
        (snapshot: QuerySnapshot<DocumentData>) => {
          //key not on specifing data type of snapshot
          setSuspectslocated(
            snapshot.docs.map((doc) => {
              return { id: doc.id, ...doc.data() }
            }),
          )
        },
      ),
    [],
  )
  console.log(suspectslocated, 'Suspects located')
  

  //////////////////////////////////////////////////////

  const center = { lat: -17.849517, lng: 31.094452 }
  const [suspects, setSuspects] = useState<IState['suspects']>([
    { lat: 43, lng: -80 },
  ])

  return (
    <div>
      <NavbarBs />
      <GoogleMap
        zoom={8}
        center={center}
        options={options}
        mapContainerClassName="container3"
      >
        
        {suspectslocated.map((suspectsss) => (
          <Marker
          
            key={suspectsss.id}
            position={{ lat: suspectsss.lat!, lng: suspectsss.long! }}
            onClick={() => {
              setSuspectsselected(suspectsss)

              getDetails(suspectsss.name!)
              navigate('/mapagents')
            }}
          />
        ))}
      </GoogleMap>
    </div>
  )
}
