import React, { useState, useEffect, useRef } from 'react'
import AdminSideBar from '../../../Components/Admin/AdminSideBar'
import { Link, useNavigate } from 'react-router-dom'
import ImageValidator from '../../../Validators/ImageValidator'
import TextValidator from '../../../Validators/TextValidator'

import { useDispatch, useSelector } from 'react-redux'
import { createProduct, getProduct } from '../../../Redux/ActionCreators/ProductActionCreator'
import { getMainCategory } from '../../../Redux/ActionCreators/MainCategoryActionCreator'
import { getSubCategory } from '../../../Redux/ActionCreators/SubCategoryActionCreator'
import { getBrand } from '../../../Redux/ActionCreators/BrandActionCreator'

import RichTextEditor from '../../../Rte/RichTextEditor';   //these line is for rich text editor
import { createStructuredContent } from '../../../Rte/richTextEditorBridge';   //these line is for rich text editor

const colors = ["Black", "White", "Blue", "Red", "Orange", "Gray", "Green", "Pink", "Yellow", "Purple", "Magenta", "N/A"]
const sizes = ["XXXL", "XXL", "XL", "L", "M", "S", "XS", "NB", "26", "28", "30", "32", "34", "36", "38", "40", "42", "N/A"]

export default function AdminCreateProductPage() {
  let [data, setData] = useState({
    name: "",
    maincategory: "",
    subcategory: "",
    brand: "",
    color: [],
    size: [],
    basePrice: "",
    discount: "",
    finalPrice: "",
    stock: true,
    stockQuantity: "",
    image: [],
    status: true
  })

  let [errorMessage, setErrorMessage] = useState({
    name: "Name field is Mandatory*",
    basePrice: "Base Price field is Mandatory*",
    discount: "Discount field is Mandatory*",
    stockQuantity: "Stock Quantity field is Mandatory*",
    color: "please select atleast one color",
    size: "please select atleast one Size",
    image: "Image field is Mandatory*",
  })

  //these line is for rich text editor
  let editorRef = useRef(null)
  let [description, setDescription] = useState("")

  function syncDocument(documentModel, nextHtml) {
    const resolvedHtml = nextHtml !== undefined ? nextHtml : renderHTML(documentModel);
    setDescription(resolvedHtml)
  }

  let [show, setShow] = useState(false)

  let MainCategoryStateData = useSelector(state => state.MainCategoryStateData)
  let SubCategoryStateData = useSelector(state => state.SubCategoryStateData)
  let BrandStateData = useSelector(state => state.BrandStateData)

  let navigate = useNavigate()
  let dispatch = useDispatch()

  function getInputData(e) {
    let name = e.target.name
    let value = name === "image" ? Array.from(e.target.files).map(x => "product/" + x.name) : name === "status" ? (e.target.value === "1" ? true : false) : e.target.value    //for dummy backend
    // let value = name === "image" ? e.target.files : name === "status" ? (e.target.value === "1" ? true : false) : e.target.value                     //for Real Backend
    setData({ ...data, [name]: value })
    setErrorMessage({ ...errorMessage, [name]: name === "image" ? ImageValidator(e) : TextValidator(e) })
  }

  function getInputCheckbox(key, value) {
    let arr = data[key]
    if (arr.includes(value)) {
      arr = arr.filter(x => x !== value)
    }
    else {
      arr.push(value)
    }
    setData({ ...data, [key]: arr })
    setErrorMessage({ ...errorMessage, [key]: arr.length === 0 ? `please select atleast one ${key}` : "" })
  }

  function postData(e) {
    e.preventDefault();
    let error = Object.values(errorMessage).find(x => x != "")
    if (error) {
      setShow(true)
    }
    else {
      let bp = parseInt(data.basePrice)
      let d = parseInt(data.discount)
      let fp = parseInt(bp - bp * d / 100)
      let stockQuantity = parseInt(data.stockQuantity)

      dispatch(createProduct({
        ...data,
        maincategory: data.maincategory || MainCategoryStateData[0].name,
        subcategory: data.subcategory || SubCategoryStateData[0].name,
        brand: data.brand || BrandStateData[0].name,
        basePrice: bp,
        discount: d,
        finalPrice: fp,
        stockQuantity: stockQuantity,
        description: description,
      }))                                                  //for Dummy Backend
    }

    // let formData = new FormData()                       //for real backend
    // formData.append("name", data.name)               
    // formData.append("maincategory", data.maincategory || MainCategoryStateData[0].name)
    // formData.append("subcategory",data.subcategory||SubCategoryStateData[0].name)
    // formData.append("brand",data.brand||BrandStateData[0].name)
    // data.color.forEach(item => {
    //     formData.append("color", item)
    // })
    // data.size.forEach(item => {
    //     formData.append("size", item)
    // })
    // data.pic.forEach(item => {
    //     formData.append("pic", item)
    // })
    // formData.append("basePrice",bp)
    // formData.append("discount",d)
    // formData.append("finalPrice",fp)
    // formData.append("stock",data.stock)
    // formData.append("stockQuantity",stockQuantity)
    // formData.append("description",description)
    // formData.append("status", data.status)           
    // dispatch(createProduct(formData))                

    navigate('/admin/product')
  }

  useEffect(() => {
    (() => {
      dispatch(getMainCategory())
    })();
  }, [MainCategoryStateData.length]);

  useEffect(() => {
    (() => {
      dispatch(getSubCategory())
    })();
  }, [SubCategoryStateData.length]);

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
            <h5 className='p-2 text-light text-center bg-primary'>Create Product
              <Link to="/admin/product">
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
                    placeholder='Product Name'
                    className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`} />
                  {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                </div>

                <div className="col-lg-3 col-md-6 mb-3">
                  <label>Maincategory*</label>
                  <select name="maincategory" className='form-select border-primary'>
                    {MainCategoryStateData.filter(x => x.status).map((item, index) => {
                      return <option key={index}>{item.name}</option>
                      // return <option key={index} value={item.id}>{item.name}</option>    //for real backend
                    })}
                  </select>
                </div>

                <div className="col-lg-3 col-md-6 mb-3">
                  <label>Subcategory*</label>
                  <select name="subcategory" className='form-select border-primary'>
                    {SubCategoryStateData.filter(x => x.status).map((item, index) => {
                      return <option key={index}>{item.name}</option>
                      // return <option key={index} value={item.id}>{item.name}</option>     //for real backend
                    })}
                  </select>
                </div>

                <div className="col-lg-3 col-md-6 mb-3">
                  <label>Brand*</label>
                  <select name="brand" className='form-select border-primary'>
                    {BrandStateData.filter(x => x.status).map((item, index) => {
                      return <option key={index}>{item.name}</option>
                      // return <option key={index} value={item.id}>{item.name}</option>       //for real backend
                    })}
                  </select>
                </div>

                <div className="col-lg-3 col-md-6 mb-3">
                  <label>Stock*</label>
                  <select name="stock" className='form-select border-primary'>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                </div>

                <div className="col-lg-4 col-md-6 mb-3">
                  <label>Base Price*</label>
                  <input type="text"
                    name="basePrice"
                    onChange={getInputData}
                    placeholder='Product Base Price'
                    className={`form-control ${show && errorMessage.basePrice ? 'border-danger' : 'border-primary'}`}
                  />
                  {show && errorMessage.basePrice ? <p className='text-danger'>{errorMessage.basePrice}</p> : null}
                </div>

                <div className="col-lg-4 col-md-6 mb-3">
                  <label>Discount*</label>
                  <input type="text"
                    name="discount"
                    onChange={getInputData}
                    placeholder='Product Discount'
                    className={`form-control ${show && errorMessage.discount ? 'border-danger' : 'border-primary'}`}
                  />
                  {show && errorMessage.discount ? <p className='text-danger'>{errorMessage.discount}</p> : null}
                </div>

                <div className="col-lg-4 col-md-6 mb-3">
                  <label>Stock Quantity*</label>
                  <input type="text"
                    name="stockQuantity"
                    onChange={getInputData}
                    placeholder='Product Stock Quantity'
                    className={`form-control ${show && errorMessage.stockQuantity ? 'border-danger' : 'border-primary'}`}
                  />
                  {show && errorMessage.stockQuantity ? <p className='text-danger'>{errorMessage.stockQuantity}</p> : null}
                </div>

                <div className="col-12 mb-3">
                  <label>Color*</label>
                  <div className='row border border-1 border-primary m-1 p-2'>
                    {colors.map((item, index) => {
                      return <div className="col-xl-2 col-md-3 col-4" key={index}>
                        <input
                          type="checkbox"
                          name={item}
                          value={item}
                          id={item}
                          onChange={() => getInputCheckbox('color', item)}
                          checked={data.color?.includes(item)} />
                        <label className='ms-2' htmlFor={item}>{item}</label>
                      </div>
                    })}
                  </div>
                  {show && errorMessage.color ? <p className='text-danger'>{errorMessage.color}</p> : null}
                </div>

                <div className="col-12 mb-3">
                  <label>Size*</label>
                  <div className='row border border-1 border-primary m-1 p-2'>
                    {sizes.map((item, index) => {
                      return <div className="col-xl-2 col-md-3 col-4" key={index}>
                        <input
                          type="checkbox"
                          name={item}
                          value={item}
                          id={item}
                          onChange={() => getInputCheckbox('size', item)}
                          checked={data.size?.includes(item)} />
                        <label className='ms-2' htmlFor={item}>{item}</label>
                      </div>
                    })}
                  </div>
                  {show && errorMessage.size ? <p className='text-danger'>{errorMessage.size}</p> : null}
                </div>

                <div className='col-12 mb-3'>
                  <label>Description</label>
                  <RichTextEditor
                    ref={editorRef}
                    className="editor-host border border-primary"
                    value={description}
                    onChange={(nextHtml, editor) => syncDocument(editor.getJSON(), nextHtml)}
                    style={{ minHeight: 380 }}
                  />
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

