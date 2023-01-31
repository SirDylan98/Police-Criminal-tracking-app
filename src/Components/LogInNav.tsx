
import React from 'react'
import logo from '../Assets/policelogo.png'

function Footer() {
  return (
    <>
    <div className='w-full flex  justify-center items-center  p-2   bg-[#1e293b]'>
      
      <div className='text-gray-300 flex  items-center'>
        <img src={logo} alt="" className='w-10 mr-2 h-10' />
        <h1 className='text-2xl'>ZRP Criminal Tracking System</h1>
      </div>

    </div>
    
    </>
  )
}

export default Footer
