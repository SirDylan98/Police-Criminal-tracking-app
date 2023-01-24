import * as React from 'react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { addadmin, suspectcollection } from '../Libs/controller'
import NavbarBs from './navbar'
import { collection, getDocs, query, where } from 'firebase/firestore'

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { susp } from './mapagents'
import {
  GoogleMap,
  Marker,
  MarkerClusterer,
  Circle,
} from '@react-google-maps/api'
import { Nav } from 'react-bootstrap'
import { date } from 'yup'

type Suspects = {
  name?: string
  address?: string //the question mark is used to indicate that the field is optional
  lat?: number
  id?: string
  imagesource?: any
  imgurl?: any
  lng?: number
  recentlocation?: [
    { lat?: number; long?: number; address?: string; datetime?: string },
  ]
  dangerousLevel?: string
  crimeCom?: string
  suspectdescription?: string
}
type suspectdetails = {
  lat?: number
  long?: number
  address?: string
  datetime?: string
}
const defaultOptions = {
  strokeOpacity: 0.9,
  clickable: false,
  strokeWeight: 2,
  draggable: false,
  editable: false,
  visible: true,
}

const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.09,
  strokeColor: '#FF5252',
  fillcolor: '#FF5252',
}
function Report() {
  const [suspdoc, setSuspdoc] = useState<Suspects[] | undefined>()
  const [suspdetails, setSuspDetails] = useState<suspectdetails>()
  const [randomnumber, setRandomnumber] = useState<string>()
  const [sidepanel, setSidepanel] = useState<any[] | undefined>()
  function generateRandom(maxLimit = 100) {
    let rand = Math.random() * maxLimit
    console.log('the random number is ', rand) // say 99.81321410836433.

    //rand = Math.floor(rand) // 99.

    return rand.toString()
  }
  useEffect(() => {
    setRandomnumber(generateRandom())
    console.log('the random number is', randomnumber)
  }, [])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Suspects>()
  const auth = getAuth()

  const onSubmit = handleSubmit(async (data1: Suspects) => {
    console.log(data1.name)
    const q = query(suspectcollection, where('name', '==', data1.name))
    const querySnapshot = await getDocs(q)
    console.log(querySnapshot)
    await setSuspdoc(
      querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() }
      }),
    )
    console.log('the details am looking for', suspdoc?.length)
    await suspdoc?.map((suspectdata) => {
      suspectdata.recentlocation?.map((data) => {
        console.log('this is my array data', data.address)
      })
    })
  })
  const center = { lat: -17.849517, lng: 31.094452 }
  return (
    <div>
      
      <NavbarBs />
      <div className="containerr flex flex-col md:flex-row bg-[#1e293b]">
        <GoogleMap zoom={8} center={center} mapContainerClassName="w-[100%] md:w-[80%] rounded-xl h-screen">
          <>
            {suspdoc?.map((suspectdata) =>
              suspectdata.recentlocation?.map((data) => (
                <>
                  <Marker
                    key={data.lat}
                    position={{
                      lat: Number(data?.lat!),
                      lng: Number(data?.long!),
                    }}
                    onClick={() => {
                      //  console.log(data)
                      console.log(data.address)
                      setSuspDetails(data)
                    }}
                  />
                  <Circle
                    center={{
                      lat: Number(data?.lat!),
                      lng: Number(data?.long!),
                    }}
                    radius={5000}
                    options={closeOptions}
                  />
                  // console.log("this is my array data",data);
                </>
              )),
            )}
          </>
        </GoogleMap>

        <div className="w-[100%] md:w-[20%] bg-[#1e293b]">
        <form className=" w-full my-2 my-lg-0" onSubmit={onSubmit}>
              <input
                className="w-full py-2 rounded-xl px-3"
                type="search"
                placeholder="Search by Name"
                aria-label="Search"
                {...register('name', { required: true })}
              />
              <button
                className="px-4 text-center py-2 w-full bg-gray-300 rounded-full my-2 font-semibold hover:translate-x-2 duration-500"
                type="submit"
              >
                Search
              </button>
            </form>
          <div className="card bg-[#1e293b]" style={{ width: '100%' }}>
            <div className="card-body">
              <p className="card-body">
                <strong>Located at:</strong> {suspdetails?.address}
              </p>
              <p className="card-text">Time:{suspdetails?.datetime}</p>
            </div>
          </div>
          <div>
           
            <div className="card bg-[#1e293b]" style={{ width: '100%' }}>
              <div className="card-header  bg-success">Recent Locations</div>
              <ul className="list-group bg-[#1e293b] list-group-flush">
                {suspdoc?.map((suspectdata) =>
                  suspectdata.recentlocation?.map((data) => (
                    <li className=" text-gray-300 flex flex-col border-b mx-2 my-2 bg-[#1e293b]">
                      <div>

                      <strong className=' text-orange-300'>At :</strong>
                      {data.address?.slice(0, -25)} 
                      </div>
                      <div>

                      <strong className=' text-orange-300'>Time:</strong>
                      {data.datetime}
                      </div>
                    </li>
                  )),
                )}
              </ul>
            </div>
          </div>

          {/* <Bar suspects={suspects} setSuspects={setSuspects} /> */}
        </div>
      </div>
    </div>
  )
}

export default Report
