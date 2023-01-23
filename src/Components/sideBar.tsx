import * as React from 'react';
import { useState } from 'react';
import { Component } from 'react';
import {IState as IProps} from './map';
type LatLngLiteral = google.maps.
LatLngLiteral;// creating datatype of lat long 

interface Props{
    lat?:number;
    lng?:number;
}
interface Propss {
    suspects:IProps['suspects']
    setSuspects:React.Dispatch<React.SetStateAction<IProps['suspects']>>
    
}
const Bar:React.FC<Propss>=({suspects,setSuspects}) =>{
  const [inputs, setInputs]=useState({lat:"",lng:""});
    const handleChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setInputs({
            ...inputs,
            [event.target.name]:event.target.value
        });
     }

     const handleClick =():void=>{
        if(!inputs.lat||!inputs.lng)
        {
            return
        }
        setSuspects([
            ...suspects,{
                lat:parseInt(inputs.lat) ,
                lng:parseInt(inputs.lng) 
            }
        ]
          
        )
     } 




    return (  
    <div>
        <input type={"number"} name="lat" placeholder='latitude' onChange={handleChange} value={inputs.lat} />
        <br></br>
        <br></br>
        <input type={"number"} name='lng' placeholder='longitude' onChange={handleChange} value={inputs.lng} ></input>
        <br></br>
        <br></br>
        <button className='btn btn-secondary btn-sm' onClick={handleClick} >Add Marker</button>
        <br></br>
        <p>this is the lat {inputs.lat}</p>
        <p>this is the lng {inputs.lng}</p>
    </div> 
    );
}

export default Bar;
