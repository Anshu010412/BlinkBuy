import React, { useEffect, useState } from 'react'
import TextValidator from '../../Validators/TextValidator'

export default function UpdateProfile({ setSearchParams }) {
  let [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
  })
  let [errorMessage, setErrorMessage] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
  })
  let [show, setShow] = useState(false)

  function getInputData(e) {
    let { name, value } = e.target;
    setData({ ...data, [name]: value })
    setErrorMessage({ ...errorMessage, [name]: TextValidator(e) })
  }

  async function postData(e) {
    e.preventDefault()
    let error = Object.values(errorMessage).find(x => x !== "")
    if (error) {
      setShow(true)
      return;
    }
    else {
      var response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user`)
      response = await response.json()
      let item = response.find(x => x.id !== data.id && (x.username.toLocaleLowerCase() === data.username.toLocaleLowerCase() ||
        x.email.toLocaleLowerCase() === data.email.toLocaleLowerCase()))
      if (item) {
        setShow(true)
        setErrorMessage({
          ...errorMessage,
          username: item.username.toLocaleLowerCase() === data.username.toLocaleLowerCase() ? "Username Already Taken" : "",
          email: item.email.toLocaleLowerCase() === data.email.toLocaleLowerCase() ? "Email Already Exists" : " "
        })
        return

      }
      //Make Sure Remove Above Line In case of Real Backend.

      var response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${data.id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ ...data })
      })
      response = await response.json()   //use the below line in future real backend. 
      setSearchParams({ option: "Profile" })
    }
  }

  useEffect(() => {
    (async () => {
      let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${localStorage.getItem("userid")}`, {
        method: "GET",
        headers: {
          "content-type": "application/json"
        }
      })
      response = await response.json()
      if (response) {
        setData({ ...data, ...response })
      }
      else {
        alert("Something Went Wrong")
      }
    })()
  }, [])

  return (
    <>
      <form onSubmit={postData} autoComplete="off">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Name*</label>
            <input type="text" name='name' value={data.name} onChange={getInputData} placeholder='FullName' className={`form-control ${show && errorMessage.name ? "border-danger" : "border-primary"}`} />
            {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
          </div>
          <div className="col-md-6 mb-3">
            <label>UserName</label>
            <input type="text" autoComplete="off" value={data.username} name='username' onChange={getInputData} placeholder='Username' className={`form-control ${show && errorMessage.username ? "border-danger" : "border-primary"}`} />
            {show && errorMessage.username ? <p className='text-danger'>{errorMessage.username}</p> : null}
          </div>
          <div className="col-md-6 mb-3">
            <label>Email*</label>
            <input type="email" name='email' value={data.email} onChange={getInputData} placeholder='Email' className={`form-control ${show && errorMessage.email ? "border-danger" : "border-primary"}`} />
            {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : null}
          </div>
          <div className="col-md-6 mb-3">
            <label>Phone*</label>
            <input type="number" name='phone' value={data.phone} onChange={getInputData} placeholder='Phone No.' className={`form-control ${show && errorMessage.phone ? "border-danger" : "border-primary"}`} />
            {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}
          </div>
        </div>
        <div className="col-12 mt-2">
          <button type='submit' className='btn btn-primary w-100 p-1'>Update Profile</button>
        </div>
      </form>
    </>
  )
}
