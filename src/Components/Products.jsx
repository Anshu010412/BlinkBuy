import React from 'react'
import { Link } from 'react-router-dom'
import SingleProduct from './SingleProduct'

export default function Products({ data }) {
    return (
        <>
            <div className="container-fluid bg-light py-5">
                <div className="container py-5">
                    <h1 className="mb-5">Our Latest <span className="text-uppercase text-primary bg-light px-2">Products</span>
                    </h1>
                    <div className="row g-4">
                        {data.map((item, index) => {
                            return <div className="col-md-6 col-lg-3 wow fadeIn" key={index} data-wow-delay="0.1s">
                                <SingleProduct item={item} />
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}
