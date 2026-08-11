import React from 'react'
import { Link } from 'react-router-dom'

export default function SingleProduct({ item }) {
    return (
        <>
            <div className="team-item position-relative overflow-hidden">
                <img className="img-fluid w-100" style={{ height: '350px' }} src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.image[0]}`} alt="" />
                <div className="team-overlay">
                    <div className="d-flex">
                        <small className="mb-2">{item.brand}</small>
                        <small className="mb-2 bg-success">{item.stockQuantity} Left in Stock</small>
                    </div>
                    <h6 className="lh-base text-light">{item.name}</h6>
                    <h5 className='text-light fs-5'><del>&#8377;{item.basePrice}</del>   &#8377;{item.finalPrice} <sup>{item.discount} % OFF</sup></h5>
                    <div className="d-flex justify-content-center">
                        <Link className="btn btn-outline-light btn-sm-square border-2 p-2 w-100" to={`/product/${item.id}`}>
                            <i className="text-black bi bi-cart-plus"></i>
                            <span className='ms-2'>Add To Cart</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
