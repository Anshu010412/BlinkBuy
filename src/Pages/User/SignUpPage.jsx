import React, { useState } from 'react'
import TextValidator from '../../Validators/TextValidator';
import { Link, useNavigate } from 'react-router-dom';
import BreadCrum from '../../Components/BreadCrum';

export default function SignUpPage() {
    let [data, setData] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        cpassword: "",
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "Name Field is Mandatory*",
        username: "UserName Field is Mandatory*",
        email: "Email field is Mandatory*",
        phone: "Phone field is Mandatory*",
        password: "Password field is Mandatory*",
    })
    let [show, setShow] = useState(false)
    let navigate = useNavigate()

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
            if (data.password !== data.cpassword) {
                setErrorMessage({ ...errorMessage, password: "Password and Confirm Password don't Match" })
                setShow(true)
                return;
            }
            else {
                var response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user`)
                response = await response.json()
                let item = response.find(x => x.username.toLocaleLowerCase() === data.username.toLocaleLowerCase() ||
                    x.email.toLocaleLowerCase() === data.email.toLocaleLowerCase())
                if (item) {
                    setShow(true)
                    setErrorMessage({
                        ...errorMessage, username: item.username.toLocaleLowerCase() === data.username.toLocaleLowerCase() ? "Username Already Taken" : "",
                        ...errorMessage, email: item.email.toLocaleLowerCase() === data.email.toLocaleLowerCase() ? "Email Already Exists" : " "
                    })
                    return
                }
                //Make Sure Remove Above Line In case of Real Backend.

                var response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        name: data.name,
                        username: data.username,
                        email: data.email,
                        phone: data.phone,
                        password: data.password,
                        role: "Buyer",
                        status: true
                    })
                })
                response = await response.json()   //use the below line in future real backend. 
                // if (response.result === "Fail") {
                //     setErrorMessage({ ...errorMessage, ...response.reason })
                //     setShow(true)
                //     return
                // }
                navigate("/login")
            }
        }
    }

    return (
        <>
            <BreadCrum title="Create New Account" />
            <div className="container my-3">
                <div className="row">
                    <div className="col-xl-9 col-md-10 col-sm-11 m-auto">
                        <h5 className='bg-primary text-light p-2 text-center'>Create New Account</h5>
                        <form onSubmit={postData} autoComplete="off">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Name*</label>
                                    <input type="text" name='name' onChange={getInputData} placeholder='FullName' className={`form-control ${show && errorMessage.name ? "border-danger" : "border-primary"}`} />
                                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>UserName</label>
                                    <input type="text" autoComplete="off" name='username' onChange={getInputData} placeholder='Username' className={`form-control ${show && errorMessage.username ? "border-danger" : "border-primary"}`} />
                                    {show && errorMessage.username ? <p className='text-danger'>{errorMessage.username}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Email*</label>
                                    <input type="email" name='email' onChange={getInputData} placeholder='Email' className={`form-control ${show && errorMessage.email ? "border-danger" : "border-primary"}`} />
                                    {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Phone*</label>
                                    <input type="number" name='phone' onChange={getInputData} placeholder='Phone No.' className={`form-control ${show && errorMessage.phone ? "border-danger" : "border-primary"}`} />
                                    {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Password</label>
                                    <input type="password" autoComplete="new-password" name='password' onChange={getInputData} placeholder='Password' className={`form-control ${show && errorMessage.password ? "border-danger" : "border-primary"}`} />
                                    {show && errorMessage.password ? <p className='text-danger'>{errorMessage.password}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Confirm Password</label>
                                    <input type="password" name='cpassword' onChange={getInputData} placeholder='Confirm Password' className={`form-control ${show && errorMessage.cpassword ? "border-danger" : "border-primary"}`} />
                                </div>
                            </div>
                            <div className="col-12 mt-2">
                                <button type='submit' className='btn btn-primary w-100 p-1'>SignUp</button>
                            </div>
                        </form>
                        <div className="text-center mt-2">
                            <Link to='/login'>Already Have An Account ? Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
