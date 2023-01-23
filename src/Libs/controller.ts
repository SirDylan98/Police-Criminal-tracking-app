import { getFirestore, collection, addDoc, doc, deleteDoc, setDoc } from "firebase/firestore";
import { merge } from "rxjs";
import { app, GeoFirestore } from "./firebase";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const firestore = getFirestore(app);
export const spottedsuspectCollection = collection(firestore, "spottedsuspects"); // set to located suspects collection reference to firestore collecting
export const agentCollection = collection(firestore, "agents");
export const suspectcollection = collection(firestore, "suspects");
export const admincollection = collection(firestore, "admins");
const geocollection = GeoFirestore.collection("agents");

/////////////////////////////////////////// Crud functions
export const addAgents = async (agentData: any) => {
  // receiving and object
  const newAgent = await addDoc(agentCollection, { ...agentData }); //adding the document to firestore collection agents
  //                                                                                                                                                                     const newAgent1= await setDoc(doc(firestore,"agents","dylandzvene"),agentData)
  console.log("the new agent was created at ", { newAgent });
};

export const addSuspect = async (suspectData: any) => {
  const newSuspect = await addDoc(suspectcollection, { ...suspectData });
  console.log("the new agent was created at ", { newSuspect });
};
export const addadmin = async (adminData: any) => {
  const newAdmin = await addDoc(admincollection, { ...adminData });
  //toast.success('New Admin Successful',{position:toast.POSITION.BOTTOM_CENTER, autoClose:2000})
};
export const deleteSuspect = async (id: string) => {
  const document = doc(firestore,`suspects/${id}`);
  await deleteDoc(document);
  toast.success('Deleted Successfully',{position:toast.POSITION.BOTTOM_CENTER, autoClose:2000})
 // console.log("the new agent was created at ", { newSuspect });
};
export  const updateSuspect=async(id:string,docdata:any)=>{
    const getdoc = doc(firestore,`suspects/${id}`);
   await setDoc(getdoc,docdata,{merge:true})
   alert("document Updated successfully")
}

export const addGeoAgents = async (agentgeodata: any) => {
  const newAgent = geocollection.add({ ...agentgeodata });
  console.log("The agent has been succesfully added");
};
