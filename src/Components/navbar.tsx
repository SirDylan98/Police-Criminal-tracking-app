import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import { getAuth, signOut } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../Assets/policelogo.png'
import { BiMenu } from 'react-icons/bi'
import {AiOutlineClose} from 'react-icons/ai'
import { useState } from 'react'
function NavbarBs() {
  const [mobileNav,setMobileNav]=useState(false)
  const handleNav=()=>{
    setMobileNav(!mobileNav)
    console.log(mobileNav)
  }
  const auth = getAuth()
  const navigate = useNavigate()
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        // alert("Log Out Successful");
        navigate('/')
      })
      .catch((error) => {
        // An error happened.
        console.log(error.message)
      })
  }
  return (
    <div>
      <div className="w-full flex  justify-between items-center mb-3 my-auto p-2   bg-[#1e293b]">
        <div className="text-gray-300 flex  items-center">
          <img src={logo} alt="" className="w-10 mr-2 h-10" />
          <h1 className="text-xl">ZRP Criminal Tracking System</h1>
        </div>

        <div className=" items-center  my-auto">
          <ul className=" text-gray-300 hidden md:flex text-md items-center my-auto justify-center mr-2">
            <Link to="/map" className="text-gray-300  hover:no-underline ">
              <li className="px-2 font-semibold  hover:text-green-700">Home</li>
            </Link>
            <Link
              to="/addagents"
              className="text-gray-300  hover:no-underline "
            >
              <li className="px-2 font-semibold hover:text-green-700">
                Agents
              </li>
            </Link>
            <Link to="/suspects" className="text-gray-300  hover:no-underline ">
              <li className="px-2 font-semibold hover:text-green-700">
                Suspects
              </li>
            </Link>
            <Link to="/report" className="text-gray-300  hover:no-underline ">
              <li className="px-2 font-semibold hover:text-green-700">
                Report
              </li>
            </Link>
            <Link to="/addadmin" className="text-gray-300  hover:no-underline ">
              <li className="px-2 font-semibold hover:text-green-700">
                Admins
              </li>
            </Link>
            <button
              onClick={handleLogOut}
              className=" rounded-full bg-gray-300 text-[#1e293b] my-auto hover:scale-105 duration-500 py-1 ml-2 px-4 font-semibold "
            >
              LogOut
            </button>
          </ul>
          <div onClick={handleNav} className="text-gray-300">
            {mobileNav==true?<AiOutlineClose size={30}/>:<BiMenu size={30} className="md:hidden" />}
            {/* <BiMenu size={30} className="md:hidden" /> */}
          </div>
        </div>
      </div>
      {/* mobile menu */}
      <div className={mobileNav===true?'w-full h-screen bg-[#1e293b] top-0 left-0 duration-500':'w-full h-screen bg-[#1e293b] hidden top-0 left-[-100%] duration-500'}>
      <ul className=" text-gray-300  flex-col  mx-auto text-md items-center my-auto justify-center mr-2">
          <Link to="/map" className="text-gray-300  hover:no-underline ">
            <li className="px-2  font-semibold items-center flex justify-center hover:text-green-700">Home</li>
          </Link>
          <Link to="/addagents" className="text-gray-300  hover:no-underline ">
            <li className="px-2 my-5 font-semibold items-center flex justify-center hover:text-green-700">Agents</li>
          </Link>
          <Link to="/suspects" className="text-gray-300  hover:no-underline ">
            <li className="px-2 my-5 font-semibold items-center flex justify-center hover:text-green-700">
              Suspects
            </li>
          </Link>
          <Link to="/report" className="text-gray-300  hover:no-underline ">
            <li className="px-2 my-5 font-semibold items-center flex justify-center hover:text-green-700">Report</li>
          </Link>
          <Link to="/addadmin" className="text-gray-300  hover:no-underline ">
            <li className="px-2 my-5 font-semibold items-center flex justify-center hover:text-green-700">Admins</li>
          </Link>
          <button
            onClick={handleLogOut}
            className=" rounded-full bg-gray-300 items-center mx-auto flex justify-center text-[#1e293b] my-auto hover:scale-105 duration-500 py-1 ml-2 px-12 font-semibold "
          >
            LogOut
          </button>
        </ul>

      </div>
    </div>
  )
}

export default NavbarBs
