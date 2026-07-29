import React, { useState, useEffect } from 'react'
import AdminSideBar from '../../../Components/Admin/AdminSideBar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ImageValidator from '../../../Validators/ImageValidator'
import TextValidator from '../../../Validators/TextValidator'

import { useDispatch, useSelector } from 'react-redux'
import { getSubCategory, updateSubCategory } from '../../../Redux/ActionCreators/SubCategoryActionCreator'

export default function AdminUpdateSubcategoryPage() {
    let { id } = useParams()
    let [data, setData] = useState({
        name: "",
        image: "",
        status: true
    })


    let SubCategoryStateData = useSelector(state => state.SubCategoryStateData)
    let dispatch = useDispatch()

    let [errorMessage, setErrorMessage] = useState({
        name: "",
        image: "",
    })

    let [show, setShow] = useState(false)
    let navigate = useNavigate()

    function getInputData(e) {
        let name = e.target.name
        let value = name === "image" ? "subcategory/" + e.target.files[0].name : name === "status" ? (e.target.value === "1" ? true : false) : e.target.value
        setData({ ...data, [name]: value })
        setErrorMessage({ ...errorMessage, [name]: name === "image" ? ImageValidator(e) : TextValidator(e) })
    }

    function postData(e) {
        e.preventDefault();
        let error = Object.values(errorMessage).find(x => x != "")
        if (error) {
            setShow(true)
        }
        else {
            let item = SubCategoryStateData.find(x => x.id !== id && x.name.toLowerCase() === data.name.toLowerCase())
            if (item) {
                setErrorMessage({ ...errorMessage, name: "Subcategory with this name is already Exists" })
                setShow(true)
                return
            }
            dispatch(updateSubCategory({ id, ...data }))
            navigate('/admin/subcategory')
        }
    }

    useEffect(() => {
        (() => {
            dispatch(getSubCategory())
            if (SubCategoryStateData.length) {
                let item = SubCategoryStateData.find(x => x.id === id)
                if (item)
                    setData({ ...data, ...item })
                else
                    navigate("/admin/subcategory")
            }
        })();
    }, [SubCategoryStateData.length]);

    return (
        <>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-lg-3">
                        <AdminSideBar />
                    </div>
                    <div className="col-lg-9">
                        <h5 className='p-2 text-light text-center bg-primary'>Update Sub Category
                            <Link to="/admin/subcategory">
                                <i className='bi bi-arrow-left text-light float-end'></i>
                            </Link>
                        </h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <label>Name</label>
                                    <input type="text"
                                        name='name'
                                        value={data.name}
                                        onChange={getInputData}
                                        placeholder='SubCategory Name'
                                        className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                </div>
                                <div className="col-6 mb-3">
                                    <label>image</label>
                                    <input type="file"
                                        name='image'
                                        onChange={getInputData}
                                        className={`form-control ${show && errorMessage.image ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.image ? <p className='text-danger'>{errorMessage.image}</p> : null}
                                </div>
                                <div className="col-6 mb-3">
                                    <label>Status</label>
                                    <select name="status" value={data.status ? "1" : "0"} onChange={getInputData} className='form-select border-primary'>
                                        <option value="1">Active</option>
                                        <option value="0">InActive</option>
                                    </select>
                                </div>
                                <div className="col-12 mb-3">
                                    <button className='btn btn-primary text-light w-100'>Update</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
