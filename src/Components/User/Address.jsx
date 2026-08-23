import React, { useEffect, useState } from 'react'

import { toast } from 'react-toastify';
import Swal from 'sweetalert2'

const DataOptions = {
  name: "",
  email: "",
  phone: "",
  address: "",
  pin: "",
  city: "",
  state: ""
}
export default function Address() {
  let [data, setData] = useState({ ...DataOptions })

  let [user, setUser] = useState()
  let [option, setOption] = useState({})

  function create() {
    setOption({
      type: "Create",
      showModals: true
    })
  }

  function close() {
    setOption({
      type: "",
      showModals: false
    })
  }

  function getInputData(e) {
    let { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  function update(index) {
    setOption({
      type: "Update",
      showModals: true,
      index: index
    })
    setData({ ...user.address[index] })
  }

  function deleteRecord(index) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        let address = user.address
        address.splice(index, 1)
        user.address = address
        let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${localStorage.getItem("userid")}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({ ...user, address: address })
        })
        setUser({ ...user })
        toast("Address Has Been Deleted!!!");

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }

  async function postData(e) {
    e.preventDefault()
    let address = user.address ?? []
    if (option.type === "Create")
      address.push({ ...data })
    else {
      address[option.index] = { ...data }
    }
    let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${localStorage.getItem("userid")}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ ...user, address: address })
    })
    setUser({ ...user, address: address })
    setOption({ ...option, showModals: false })
    setData({ ...DataOptions })

    // SUCCESS TOAST
    toast.success("Address has been Updated!", {
      className: "custom-success-toast"
    });
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
      setUser(response)
    })()
  }, [])

  return (
    <>
      <div className='my-3'>
        <div className='float-end mb-2'>
          <button className='btn btn-primary' onClick={() => create()}><i className='bi bi-plus'></i> Add New Address</button>
        </div>
      </div>

      <div className="mt-2" style={{ clear: "both" }}>
        {user?.address?.map((item, index) => {
          return <div className="card px-3 py-2 mb-1" key={index}>
            <h5>{item.name}</h5>
            <p>{item.email},  {item.phone}</p>
            <p>{item.address}</p>
            <p>{item.pin},{item.city},{item.state}</p>
            <div className="btn-group position-absolute end-0 gap-1">
              <button className='btn btn-primary' onClick={() => update(index)}><i className='bi bi-pencil-square'></i></button>
              <button className='btn btn-danger' onClick={() => deleteRecord(index)}><i className='bi bi-trash'></i></button>
            </div>
          </div>
        })}
      </div>

      <div className={`modal fade ${option.showModals ? "show d-block" : "d-none"}`} id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">{option.type}</h1>
              <button type="button" onClick={() => close()} className="btn-close"></button>
            </div>
            <form onSubmit={postData}>
              <div className="modal-body">
                <div className="row">
                  <div className="col-12 mb-3">
                    <label>Name*</label>
                    <input type="text" name="name" className='form-control' required placeholder='FullName' value={data.name} onChange={getInputData} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Email Address</label>
                    <input type="email" name="email" className='form-control' required placeholder='Email' value={data.email} onChange={getInputData} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Phone Number</label>
                    <input type="number" name="phone" className='form-control' required placeholder='Phone' value={data.phone} onChange={getInputData} />
                  </div>
                  <div className="col-12 mb-3">
                    <label>Address</label>
                    <textarea type="text" name="address" className='form-control' required placeholder='Address' value={data.address} onChange={getInputData} ></textarea>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label>PinCode</label>
                    <input type="number" name="pin" className='form-control' required placeholder='PinCode' value={data.pin} onChange={getInputData} />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label>City</label>
                    <input type="text" name="city" className='form-control' required placeholder='City' value={data.city} onChange={getInputData} />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label>State</label>
                    <input type="text" name="state" className='form-control' required placeholder='State' value={data.state} onChange={getInputData} />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary w-100">{option.type}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
