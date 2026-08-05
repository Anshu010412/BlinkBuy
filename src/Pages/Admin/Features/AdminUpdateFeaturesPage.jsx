import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import AdminSidebar from '../../../Components/Admin/AdminSidebar'
import TextValidators from '../../../Validators/TextValidator'


import { getFeatures, updateFeatures } from "../../../Redux/ActionCreators/FeaturesActionCreator"

export default function AdminUpdateFeaturesPage() {
    let { id } = useParams()
    let [data, setData] = useState({
        name: "",
        icon: "",
        shortDescription: "",
        status: true
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "",
        icon: "",
        shortDescription: ""
    })
    let [show, setShow] = useState(false)
    let FeaturesStateData = useSelector(state => state.FeaturesStateData)
    let dispatch = useDispatch()
    let navigate = useNavigate()

    function getInputData(e) {
        let { name, value } = e.target
        setData({ ...data, [name]: name == "status" ? value === "1" ? true : false : value })
        setErrorMessage({ ...errorMessage, [name]: TextValidators(e) })
    }

    function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShow(true)
        else {
            let item = FeaturesStateData.find(x => x.id !== id && x.name.toLocaleLowerCase() === data.name.toLocaleLowerCase())
            if (item) {
                setErrorMessage({ ...errorMessage, name: "Features With This Name Already Exist" })
                setShow(true)
                return
            }
            dispatch(updateFeatures({ ...data }))
            navigate("/admin/features")
        }
    }

    useEffect(() => {
        (() => {
            dispatch(getFeatures())
            if (FeaturesStateData.length) {
                let item = FeaturesStateData.find(x => x.id === id)
                if (item)
                    setData({ ...data, ...item })
                else
                    navigate("/admin/features")
            }
        })()
    }, [FeaturesStateData.length])
    return (
        <>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-lg-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-lg-9">
                        <h5 className='bg-primary p-2 text-light text-center'>Update Features
                            <Link to="/admin/features">
                                <i className='bi bi-arrow-left text-light float-end'></i>
                            </Link>
                        </h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <label>Name*</label>
                                    <input type="text"
                                        name="name"
                                        value={data.name}
                                        onChange={getInputData}
                                        placeholder='Features Name'
                                        className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`}
                                    />
                                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                </div>

                                <div className="col-12 mb-3">
                                    <label>Short Description*</label>
                                    <textarea
                                        name="shortDescription"
                                        onChange={getInputData}
                                        value={data.shortDescription}
                                        rows={3}
                                        placeholder='Features Short Description'
                                        className={`form-control ${show && errorMessage.shortDescription ? 'border-danger' : 'border-primary'}`}
                                    ></textarea>
                                    {show && errorMessage.shortDescription ? <p className='text-danger'>{errorMessage.shortDescription}</p> : null}
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label>Icon*</label>
                                    <input type="text"
                                        name="icon"
                                        value={data.icon}
                                        onChange={getInputData}
                                        placeholder="Icon Tag From Bootstrap like <i class='bi bi-list'></i>"
                                        className={`form-control ${show && errorMessage.icon ? 'border-danger' : 'border-primary'}`}
                                    />
                                    {show && errorMessage.icon ? <p className='text-danger'>{errorMessage.icon}</p> : null}
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