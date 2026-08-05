import React, { useState, useEffect, useRef } from 'react'
import AdminSideBar from '../../../Components/Admin/AdminSideBar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ImageValidator from '../../../Validators/ImageValidator'
import TextValidator from '../../../Validators/TextValidator'

import { useDispatch, useSelector } from 'react-redux'
import { getProduct, updateProduct } from '../../../Redux/ActionCreators/ProductActionCreator'
import { getMainCategory } from '../../../Redux/ActionCreators/MainCategoryActionCreator'
import { getSubCategory } from '../../../Redux/ActionCreators/SubCategoryActionCreator'
import { getBrand } from '../../../Redux/ActionCreators/BrandActionCreator'

import RichTextEditor from '../../../rte/RichTextEditor';
import { createStructuredContent } from '../../../rte/richTextEditorBridge';

const colors = ["Black", "White", "Blue", "Red", "Orange", "Gray", "Green", "Pink", "Yellow", "Purple", "Magenta", "N/A"]
const sizes = ["XXXL", "XXL", "XL", "L", "M", "S", "XS", "NB", "26", "28", "30", "32", "34", "36", "38", "40", "42", "N/A"]

export default function AdminUpdateProductPage() {
    let { id } = useParams()
    let editorRef = useRef(null)
    let [description, setDescription] = useState("")

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

    let [show, setShow] = useState(false)
    let ProductStateData = useSelector(state => state.ProductStateData)
    let MainCategoryStateData = useSelector(state => state.MainCategoryStateData)
    let SubCategoryStateData = useSelector(state => state.SubCategoryStateData)
    let BrandStateData = useSelector(state => state.BrandStateData)

    let dispatch = useDispatch()
    let navigate = useNavigate()

    let [oldImages, setOldImages] = useState([])
    let [flag, setFlag] = useState(false)

    let [errorMessage, setErrorMessage] = useState({
        name: "",
        basePrice: "",
        discount: "",
        stockQuantity: "",
        color: "",
        size: "",
        image: "",
    })

    function getInputCheckbox(key, value) {
        let arr = data[key]
        if (arr.includes(value))
            arr = arr.filter(x => x !== value)
        else
            arr.push(value)

        setData({ ...data, [key]: arr })
        setErrorMessage({ ...errorMessage, [key]: arr.length === 0 ? `Plase Select Atleast One ${key}` : "" })
    }

    function syncDocument(documentModel, nextHtml) {
        const resolvedHtml = nextHtml !== undefined ? nextHtml : renderHTML(documentModel);
        setDescription(resolvedHtml)
    }

    function getInputData(e) {
        let name = e.target.name
        let value = name === "image" ? Array.from(e.target.files).map(x => "product/" + x.name) : name === "status" ? (e.target.value === "1" ? true : false) : e.target.value    //for Dummy backend
        // let value = name === "image" ? e.target.files : name === "status" ? (e.target.value === "1" ? true : false) : e.target.value                     //for Real Backend
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
            let bp = parseInt(data.basePrice)
            let d = parseInt(data.discount)
            let fp = parseInt(bp - bp * d / 100)
            let stockQuantity = parseInt(data.stockQuantity)

            dispatch(updateProduct({                        //for dummy backend
                ...data,
                maincategory: data.maincategory || MainCategoryStateData[0].name,
                subcategory: data.subcategory || SubCategoryStateData[0].name,
                brand: data.brand || BrandStateData[0].name,
                basePrice: bp,
                discount: d,
                finalPrice: fp,
                stockQuantity: stockQuantity,
                description: description,
                image: oldImages.concat(data.image)
            }))


            // let formData = new FormData()                      //for real backend
            // formData.append("id",data.id)
            // formData.append("name",data.name)
            // formData.append("maincategory",data.maincategory||MainCategoryStateData[0].name)
            // formData.append("subcategory",data.subcategory||SubCategoryStateData[0].name)
            // formData.append("brand",data.brand||BrandStateData[0].name)
            // data.color.forEach(item => {
            //     formData.append("color", item)
            // })
            // data.size.forEach(item => {
            //     formData.append("size", item)
            // })
            // data.image.forEach(item => {
            //     formData.append("image", item)
            // })
            // data.oldImage.forEach(item => {
            //     formData.append("oldImage", item)
            // })
            // formData.append("basePrice",bp)
            // formData.append("discount",d)
            // formData.append("finalPrice",fp)
            // formData.append("stock",data.stock)
            // formData.append("stockQuantity",stockQuantity)
            // formData.append("description",description)
            // formData.append("status",data.status)
            // dispatch(updateMainCategory(formData))


            navigate('/admin/product')
        }
    }

    useEffect(() => {
        (() => {
            dispatch(getProduct())
            if (ProductStateData.length) {
                let item = ProductStateData.find(x => x.id === id)
                if (item) {
                    setData({ ...data, ...item, image: [] })
                    syncDocument(createStructuredContent(""), item?.description ?? "");
                    setOldImages(item.image)
                }
                else
                    navigate("/admin/product")
            }
        })();
    }, [ProductStateData.length]);

    useEffect(() => {
        (() => {
            dispatch(getMainCategory())
        })()
    }, [MainCategoryStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getSubCategory())
        })()
    }, [SubCategoryStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getBrand())
        })()
    }, [BrandStateData.length])

    return (
        <>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-lg-3">
                        <AdminSideBar />
                    </div>
                    <div className="col-lg-9">
                        <h5 className='p-2 text-light text-center bg-primary'>Update Product
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
                                        value={data.name}
                                        onChange={getInputData}
                                        placeholder='Product Name'
                                        className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                </div>

                                <div className="col-lg-3 col-md-6 mb-3">
                                    <label>Maincategory*</label>
                                    <select name="maincategory" onChange={getInputData} value={data.maincategory} className='form-select border-primary'>
                                        {MainCategoryStateData.filter(x => x.status).map((item, index) => {
                                            return <option key={index}>{item.name}</option>
                                            // return <option key={index} value={item.id}>{item.name}</option>
                                        })}
                                    </select>
                                </div>

                                <div className="col-lg-3 col-md-6 mb-3">
                                    <label>Subcategory*</label>
                                    <select name="subcategory" onChange={getInputData} value={data.subcategory} className='form-select border-primary'>
                                        {SubCategoryStateData.filter(x => x.status).map((item, index) => {
                                            return <option key={index}>{item.name}</option>
                                            // return <option key={index} value={item.id}>{item.name}</option>
                                        })}
                                    </select>
                                </div>

                                <div className="col-lg-3 col-md-6 mb-3">
                                    <label>Brand*</label>
                                    <select name="brand" onChange={getInputData} value={data.brand} className='form-select border-primary'>
                                        {BrandStateData.filter(x => x.status).map((item, index) => {
                                            return <option key={index}>{item.name}</option>
                                            // return <option key={index} value={item.id}>{item.name}</option>
                                        })}
                                    </select>
                                </div>

                                <div className="col-lg-3 col-md-6 mb-3">
                                    <label>Stock*</label>
                                    <select name="stock" onChange={getInputData} value={data.stock ? "1" : "0"} className='form-select border-primary'>
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>

                                <div className="col-lg-4 col-md-6 mb-3">
                                    <label>Base Price*</label>
                                    <input type="text"
                                        name="basePrice"
                                        onChange={getInputData}
                                        value={data.basePrice}
                                        placeholder='Product Base Price'
                                        className={`form-control ${show && errorMessage.basePrice ? 'border-danger' : 'border-primary'}`}
                                    />
                                    {show && errorMessage.basePrice ? <p className='text-danger'>{errorMessage.basePrice}</p> : null}
                                </div>

                                <div className="col-lg-4 col-md-6 mb-3">
                                    <label>Discount*</label>
                                    <input type="text"
                                        name="discount"
                                        value={data.discount}
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
                                        value={data.stockQuantity}
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

                                <div className="col-lg-6 mb-3">
                                    <label>Image*</label>
                                    <input type="file"
                                        name="image"
                                        multiple
                                        onChange={getInputData}
                                        className={`form-control ${show && errorMessage.image ? 'border-danger' : 'border-primary'}`}
                                    />
                                    {show && errorMessage.image ? errorMessage.image.split("|").map((error, index) => {
                                        return <p className='text-danger' key={index}>{error}</p>
                                    }) : null}
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label>Old Image(Clik On Pic to Remove)</label>
                                    <div>
                                        {oldImages.map((image, index) => {
                                            return <img key={index}
                                                onClick={() => {
                                                    oldImages.splice(index, 1)
                                                    setOldImages(oldImages)
                                                    setFlag(!flag)
                                                }}
                                                src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${image}`}
                                                height={50}
                                                width={80}
                                                className='m-1' />
                                        })}
                                    </div>
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
