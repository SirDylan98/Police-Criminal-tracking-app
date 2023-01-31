import * as React from 'react'
import { useForm } from 'react-hook-form' // importing react hook forms 
import { useNavigate } from 'react-router-dom'
import Footer from './LogInNav'

import {
  getAuth,
  signInWithEmailAndPassword,
  signInAnonymously,
} from 'firebase/auth'
import { useState } from 'react'

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { IoIosLogIn } from 'react-icons/io'

type userAuth = { email: string; password: string } // custom user defined data type

function Login() {
  const [isauthing, setIsauthing] = useState(false)
  let errmsg

  const { register, handleSubmit, formState: { errors },  } = useForm<userAuth>()

  const [autherror, setAutherror] = useState(false)
  const navigate = useNavigate()
  // function to throw a toast popup
  const notifySuccess = () => {
    toast.success('Login In Successful', {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 2000,
    })
  }
  // function to handle Anonymous LogIn
  const onSubmitAnonymous = async () => {
    const auth = getAuth()
    setIsauthing(true)
    await signInAnonymously(auth)
      .then(() => {
        // Signed in..
        navigate('/map')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        setAutherror(true)
        // ...
      })
  }
  const onSubmit = handleSubmit((userCredential: userAuth) => {
    const auth = getAuth()
    setIsauthing(true)
    signInWithEmailAndPassword(
      auth,
      userCredential.email,
      userCredential.password,
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        notifySuccess()
        setIsauthing(false)
        navigate('/map')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        toast.error('Incorrect log In Credentials', {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 2000,
        })
        setIsauthing(false)
        errmsg = errorMessage
        setAutherror(true)
      })
  })

  return (
    <div className="w-full h-full flex flex-col bg-gray-100 ">
      <Footer />
      <br></br>
      <br></br>
      <br></br>
      <br />
      <div className="">
        <h2 className="mb-5 text-center text-4xl text-gray-800 ">LOG IN</h2>
      </div>

      <br></br>
      <br></br>
      <div className="row">
        <div className="col-sm"></div>
        <div className="col-sm">
          <form className="max-w-[500px]" onSubmit={onSubmit}>
            <ToastContainer />
            <div className="flex flex-col  items-center mx-auto w-[350px] justify-center">
              <label
                htmlFor="exampleInputEmail1"
                className="font-bold text-lg text-gray-800"
              >
                Email{' '}
              </label>
              <input
                type="email"
                className="py-2  text-center flex items-center justify-center mx-auto rounded-full border-2 w-full  border-[#1e293b]"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                {...register('email', { required: true })}
              />

              {errors.email && <div className="errors">Email is Required</div>}
            </div>
            <div className="flex flex-col  items-center mt-2 w-full">
              <label
                htmlFor="exampleInputPassword1"
                className="font-bold text-lg text-gray-800"
              >
                Password
              </label>
              <input
                type="password"
                className=" py-2 px-20 text-center rounded-full border-2 border-[#1e293b]"
                id="exampleInputPassword1"
                placeholder="Password"
                {...register('password', { required: true })}
              />
            </div>

            <button
              type="submit"
              className=" hover:bg-green-800 text-lg hover:scale-105 mt-8 duration-500 bg-[#1e293b] flex items-center justify-center text-white px-[132px] py-2 rounded-full mx-auto "
            >
              Login
              <IoIosLogIn className="ml-2 text-gray-300" size={30} />
            </button>
          </form>
          <div>
            <button
              onClick={onSubmitAnonymous}
              type="submit"
              className=" hover:bg-green-800 text-lg hover:scale-105 mt-2 duration-500 bg-[#1e293b] flex items-center justify-center text-white px-[70px] py-2 rounded-full mx-auto "
            >
              SignIn Anonymously{' '}
              <IoIosLogIn className="ml-2 text-gray-300" size={30} />
            </button>
          </div>
          {isauthing && (
            <div className="text-center mt-2">
              <div className="spinner-border" role="status">
                {/* <span className="visually-hidden">Signing In...</span> */}
              </div>
            </div>
          )}
          {autherror && (
            <p className="text-danger">
              <p>Authentication problem due to network issues{errmsg}</p>{' '}
            </p>
          )}
          <p></p>
        </div>
        <div className="col-sm"></div>
      </div>
    </div>

  
  )
}

export default Login
