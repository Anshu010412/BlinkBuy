import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import AdminSidebar from '../../../Components/Admin/AdminSideBar'
import TextValidators from '../../../Validators/TextValidator'


import { getUser, updateUser } from "../../../Redux/ActionCreators/UserActionCreator"

export default function AdminUpdateUser() {
    let { id } = useParams()
    let [data, setData] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        role: "Admin"
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
    })

    let [show, setShow] = useState(false)
    let UserStateData = useSelector(state => state.UserStateData)
    let dispatch = useDispatch()
    let navigate = useNavigate()

    function getInputData(e) {
        let { name, value } = e.target
        setData({ ...data, [name]: name == "status" ? value === "1" ? true : false : value })
        setErrorMessage({ ...errorMessage, [name]: TextValidators(e) })
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
                let item = UserStateData.find(x => x.id !== id && (x.username.toLocaleLowerCase() === data.username.toLocaleLowerCase() ||
                    x.email.toLocaleLowerCase() === data.email.toLocaleLowerCase()))
                if (item) {
                    setShow(true)
                    setErrorMessage({
                        ...errorMessage, username: item.username.toLocaleLowerCase() === data.username.toLocaleLowerCase() ? "Username Already Taken" : "",
                        ...errorMessage, email: item.email.toLocaleLowerCase() === data.email.toLocaleLowerCase() ? "Email Already Exists" : " "
                    })
                    return
                }
                dispatch(updateUser({ ...data }))
                navigate('/admin/user')
            }
        }
    }

    useEffect(() => {
        (() => {
            dispatch(getUser())
            if (UserStateData.length) {
                let item = UserStateData.find(x => x.id === id)
                if (item)
                    setData({ ...data, ...item })
                else
                    navigate("/admin/user")
            }
        })()
    }, [UserStateData.length])
    return (
        <>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-lg-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-lg-9">
                        <h5 className='bg-primary p-2 text-light text-center'>Update User
                            <Link to="/admin/user">
                                <i className='bi bi-arrow-left text-light float-end'></i>
                            </Link>
                        </h5>
                        <form onSubmit={postData}>
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

                                <div className="col-lg-6 mb-3">
                                    <label>Role</label>
                                    <select name="status"
                                        onChange={getInputData}
                                        className='form-select border-primary'>
                                        <option>Admin</option>
                                        <option>Super Admin</option>
                                    </select>
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label>Status*</label>
                                    <select name="status"
                                        value={data.status ? "1" : "0"}
                                        onChange={getInputData}
                                        className='form-select border-primary'>
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </select>
                                </div>

                                <div className="col-12 mb-3">
                                    <button className='btn btn-primary w-100'>Update</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}