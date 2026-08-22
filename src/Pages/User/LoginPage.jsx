import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Breadcrum from '../../Components/Breadcrum'

export default function LoginPage() {
  let [data, setData] = useState({
    username: "",
    password: "",
  })
  let [errorMessage, setErrorMessage] = useState("")

  let navigate = useNavigate()

  function getInputData(e) {
    let { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  async function postData(e) {
    e.preventDefault()
    let error = Object.values(errorMessage).find(x => x !== "")
    if (error)
      setShow(true)
    else {
      var response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user`)
      response = await response.json()
      let item = response.find(x => x.username?.toLocaleLowerCase() === data.username?.toLocaleLowerCase() || x.email.toLocaleLowerCase() === data.username.toLocaleLowerCase())
      if (item) {
        if (item.status === false) {
          setErrorMessage("Your Account Has Been Blocked Due to Some unauthorized Activity, Please Contact Us to Unblock Your Account")
        }
        else {
          localStorage.setItem("login", true)
          localStorage.setItem("name", item.name)
          localStorage.setItem("userid", item.id)
          localStorage.setItem("role", item.role)

          if (item.role === "Buyer")
            navigate("/profile")
          else
            navigate("/admin")
        }
      }
      else {
        setErrorMessage("Invalid Username Or Password")
      }

    }
  }
  return (
    <>
      <Breadcrum title="Login-To Your Account" />

      <div className="container my-4">
        <div className="row">
          <div className="col-xl-9 col-md-10 col-sm-11 m-auto">
            <h5 className='bg-primary text-center text-light p-2'>Login To Your Account</h5>
            <form onSubmit={postData}>
              <div className="row">

                <div className="col-12 mb-3">
                  <label>Username*</label>
                  <input type="text" name="username" autoComplete="off" onChange={getInputData} placeholder='Username or Email Address' className={`form-control ${errorMessage ? 'border-danger' : 'border-primary'}`} />
                  {errorMessage ? <p className='text-danger'>{errorMessage}</p> : null}
                </div>

                <div className="col-12 mb-3">
                  <label>Password*</label>
                  <input type="password" name="password" autoComplete="new-password" onChange={getInputData} placeholder='Password' className={`form-control ${errorMessage ? 'border-danger' : 'border-primary'}`} />
                </div>

                <div className="col-12">
                  <button type="submit" className='btn btn-primary w-100'>Login</button>
                </div>
              </div>
            </form>
            <div className='d-flex justify-content-between'>
              <Link to="#">Forget Password</Link>
              <Link to="/signup">Doesn't Have an Account?Register</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}