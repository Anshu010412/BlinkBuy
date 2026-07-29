import React, { useState, useEffect } from 'react'
import AdminSideBar from '../../../Components/Admin/AdminSideBar'
import { Link, useNavigate } from 'react-router-dom'
import ImageValidator from '../../../Validators/ImageValidator'
import TextValidator from '../../../Validators/TextValidator'

import { useDispatch, useSelector } from 'react-redux'
import { createBrand, getBrand } from '../../../Redux/ActionCreators/BrandActionCreator'


export default function AdminCreateBrandPage() {
  let [data, setData] = useState({
    name: "",
    image: "",
    status: true
  })

  let [errorMessage, setErrorMessage] = useState({
    name: "Name field is Mandatory*",
    image: "Image field is Mandatory*",
  })

  let [show, setShow] = useState(false)
  let navigate = useNavigate()

  let BrandStateData = useSelector(state => state.BrandStateData)
  let dispatch = useDispatch()


  function getInputData(e) {
    let name = e.target.name
    let value = name === "image" ? "brand/" + e.target.files[0].name : name === "status" ? (e.target.value === "1" ? true : false) : e.target.value
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
      let item = BrandStateData.find(x => x.name.toLowerCase() === data.name.toLowerCase())
      if (item) {
        setErrorMessage({ ...errorMessage, name: "Brand with this name is already Exists" })
        setShow(true)
        return
      }
      dispatch(createBrand({ ...data }))
      navigate('/admin/brand')
    }
  }

  useEffect(() => {
    (() => {
      dispatch(getBrand())
    })();
  }, [BrandStateData.length]);

  return (
    <>
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-lg-3">
            <AdminSideBar />
          </div>
          <div className="col-lg-9">
            <h5 className='p-2 text-light text-center bg-primary'>Create Brand
              <Link to="/admin/brand">
                <i className='bi bi-arrow-left text-light float-end'></i>
              </Link>
            </h5>
            <form onSubmit={postData}>
              <div className="row">
                <div className="col-12 mb-3">
                  <label>Name</label>
                  <input type="text"
                    name='name'
                    onChange={getInputData}
                    placeholder='Brand Name'
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
                  <select name="status" onChange={getInputData} className='form-select border-primary'>
                    <option value="1">Active</option>
                    <option value="0">InActive</option>
                  </select>
                </div>
                <div className="col-12 mb-3">
                  <button className='btn btn-primary text-light w-100'>Create</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
