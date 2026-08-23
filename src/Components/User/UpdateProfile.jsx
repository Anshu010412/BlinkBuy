import React, { useEffect, useState } from 'react'
import TextValidator from '../../Validators/TextValidator'
import { toast } from 'react-toastify';


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
    e.preventDefault();

    let error = Object.values(errorMessage).find((x) => x !== "");

    // Validation error
    if (error) {
      setShow(true);
      return;
    }

    try {
      // Check existing users
      let response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_SERVER}/user`
      );

      response = await response.json();

      let item = response.find(
        (x) =>
          x.id !== data.id &&
          (x.username.toLowerCase() === data.username.toLowerCase() ||
            x.email.toLowerCase() === data.email.toLowerCase())
      );

      // Username/email already exists
      if (item) {
        setShow(true);

        setErrorMessage({
          ...errorMessage,
          username:
            item.username.toLowerCase() ===
              data.username.toLowerCase()
              ? "Username Already Taken"
              : "",
          email:
            item.email.toLowerCase() === data.email.toLowerCase()
              ? "Email Already Exists"
              : "",
        });

        return;
      }

      // Update user
      response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${data.id}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            ...data,
          }),
        }
      );

      response = await response.json();

      // SUCCESS TOAST
      toast.success("Profile Updated Successfully!", {
        className: "custom-success-toast"
      });

      // Navigate after showing toast
      setSearchParams({ option: "Profile" });
    } catch (error) {
      console.error(error);

      toast.error("Something Went Wrong!", {
        className: "custom-error-toast",
      });
    }
  }

  useEffect(() => {
    (async () => {
      try {
        let response = await fetch(
          `${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${localStorage.getItem(
            "userid"
          )}`,
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
            },
          }
        );

        response = await response.json();

        if (response) {
          setData({
            ...data, ...response,
          });
        } else {
          toast.error("Something Went Wrong!", {
            className: "custom-error-toast",
          });
        }
      } catch (error) {
        console.error(error);
        toast.error("Something Went Wrong!", {
          className: "custom-error-toast",
        });
      }
    })();
  }, []);

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
