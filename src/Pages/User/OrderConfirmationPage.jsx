import React from 'react'
import BreadCrum from '../../Components/BreadCrum'
import { Link } from 'react-router-dom'

export default function OrderConfirmationPage() {
    return (
        <>
            <BreadCrum title="Order Page" />

            <div className="container-fluid py-1 wow fadeIn" data-wow-delay="0.1s">
                <div className="container text-center py-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <i className="bi bi-bag-check display-2 text-primary"></i>
                            <h1 className="display-4">Order Has Been Placed</h1>
                            <h1 className="mb-3 fs-3">Thanks For Shopping From Us.</h1>
                            <p className="mb-4 fs-5">Visit Again!</p>
                            <div className='d-flex gap-2 justify-content-center'>
                                <Link className="btn btn-primary py-3 px-4" to="/shop">Shop More.</Link>
                                <Link className="btn btn-primary py-3 px-4" to="/profile?option=Orders">Profile.</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
