import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Service from '../Components/Service'

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCube, Autoplay } from 'swiper/modules';   // import required modules
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cube';

import BreadCrum from '../Components/BreadCrum'
import ProductSlider from '../Components/ProductSlider'

import { getProduct } from '../Redux/ActionCreators/ProductActionCreator'
import { getCart, createCart } from '../Redux/ActionCreators/CartActionCreator'
import { getWishList, createWishList } from '../Redux/ActionCreators/WishListActionCreator'

export default function ProductPage() {
  let { id } = useParams()
  let [selected, setSelected] = useState({
    color: "",
    size: "",
    quantity: 1
  })
  let [data, setData] = useState({})
  let [relatedData, setRelatedData] = useState([])

  let ProductStateData = useSelector(state => state.ProductStateData)
  let CartStateData = useSelector(state => state.CartStateData)
  let WishListStateData = useSelector(state => state.WishListStateData)

  let dispatch = useDispatch()
  let navigate = useNavigate()

  function addToCart() {
    let item = CartStateData.find(x => x.user === localStorage.getItem("userid") && x.product === id)
    if (!item) {
      item = {
        user: localStorage.getItem("userid"),
        product: id,
        color: selected.color,
        size: selected.size,
        quantity: selected.quantity,
        total: data.finalPrice * selected.quantity,

        //below line of code use only in dummy backend.
        name: data.name,
        brand: data.brand,
        stockQuantity: data.stockQuantity,
        price: data.finalPrice,
        image: data.image[0]
      }
      dispatch(createCart(item))
    }
    navigate("/cart")
  }

  function addToWishList() {
    let item = WishListStateData.find(x => x.user === localStorage.getItem("userid") && x.product === id)
    if (!item) {
      item = {
        user: localStorage.getItem("userid"),
        product: id,

        //below line of code use only in dummy backend.
        name: data.name,
        brand: data.brand,
        color: data.color,
        size: data.size,
        stockQuantity: data.stockQuantity,
        price: data.finalPrice,
        image: data.image[0]
      }
      dispatch(createWishList(item))
    }
    navigate("/profile?option=WishList")
  }

  useEffect(() => {
    (() => {
      dispatch(getProduct())
      if (ProductStateData.length) {
        let item = ProductStateData.find(x => x.id === id)
        if (item) {
          setSelected({ ...selected, color: item.color[0], size: item.size[0] })
          setData({ ...item })
          setRelatedData(ProductStateData.filter(x => x.status && x.maincategory === item.maincategory))
        }
        else {
          window.history.back()
        }
      }
    })()
  }, [ProductStateData.length])

  useEffect(() => {
    (() => dispatch(getCart()))()
  }, [CartStateData.length])

  useEffect(() => {
    (() => dispatch(getWishList()))()
  }, [WishListStateData.length])

  return (

    <>
      <BreadCrum title={data.name ?? 'Products'} />

      <div className="container my-4">
        <div className="row">
          <div className="col-md-6">
            <Swiper
              effect={'cube'}
              grabCursor={true}
              loop='true'
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }} modules={[EffectCube, Autoplay]}
              className="mySwiper">
              {data.image?.map((image, index) => {
                return <SwiperSlide key={index}>
                  <img className='w-100 mt-5 p-2' style={{ height: 500, objectFit: "contain" }} src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${image}`} alt='product Image' />
                </SwiperSlide>
              })}
            </Swiper>
          </div>
          <div className="col-md-6">
            <h5 className='bg-primary text-center text-light p-2'>{data.name}</h5>
            <div className="table-responsive">
              <table className='table table-bordered'>
                <tbody>
                  <tr>
                    <th>MainCategory</th>
                    <td>{data.maincategory}</td>
                  </tr>
                  <tr>
                    <th>SubCategory</th>
                    <td>{data.subcategory}</td>
                  </tr>
                  <tr>
                    <th>Brand</th>
                    <td>{data.brand}</td>
                  </tr>
                  <tr>
                    <th>Price</th>
                    <td><del className='text-danger'>&#8377;{data.basePrice}</del> &#8377;{data.finalPrice} <sup className='font-bold'>{data.discount}%OFF</sup></td>
                  </tr>
                  <tr>
                    <th>Stock</th>
                    <td>{data.stock ? `${data.stockQuantity} Item Left In Stock` : `Out Of Stock`}</td>
                  </tr>
                  <tr>
                    <th>Color</th>
                    <td>
                      <div className='btn-group'>
                        {data.color?.map((item, index) => {
                          return <button key={index}
                            onClick={() => setSelected({ ...selected, color: item })}
                            className={`btn ${selected.color === item ? 'btn-primary' : ''}`}>{item}</button>
                        })}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>Size</th>
                    <td>
                      <div className='btn-group'>
                        {data.size?.map((item, index) => {
                          return <button key={index}
                            onClick={() => setSelected({ ...selected, size: item })}
                            className={`btn ${selected.size === item ? 'btn-primary' : ''}`}>{item}</button>
                        })}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <div className="row">
                        <div className="col-4">
                          {data.stock ? <div className="btn-group w-20">
                            <button
                              className='btn btn-primary'
                              onClick={() => selected.quantity === 1 ? null : setSelected({ ...selected, quantity: selected.quantity - 1 })}>
                              <i className='bi bi-dash'></i>
                            </button>
                            <h4 className='text-center' style={{ width: "25px" }}>{selected.quantity}</h4>
                            <button
                              onClick={() => selected.quantity === data.stockQuantity ? null : setSelected({ ...selected, quantity: selected.quantity + 1 })}
                              className='btn btn-primary'>
                              <i className='bi bi-plus'></i>
                            </button>
                          </div> : null}
                        </div>
                        <div className="col-8">
                          <div className="btn-group w-100 gap-3">
                            {data.stock ? <button onClick={() => addToCart()} className='btn btn-primary'><i className='bi bi-cart-plus me-2'></i>Add To Cart</button> : null}
                            <button onClick={() => addToWishList()} className='btn btn-success'><i className='bi bi-heart me-2'></i>Add To WishList</button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>Description</th>
                    <td>
                      <div dangerouslySetInnerHTML={{ __html: data.description }} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {relatedData ? <ProductSlider title="Related Products" data={relatedData} /> : null}
      </div >
      <Service />
    </>
  )
}
