import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Service() {
    let [settingData, setSettingData] = useState({
        siteName: import.meta.env.VITE_APP_SITE_NAME,
        phone: import.meta.env.VITE_APP_PHONE,
    })
    return (
        <>
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <div className="row g-5 align-items-center">
                        <div className="col-lg-5 wow fadeIn" data-wow-delay="0.1s">
                            <h1 className="mb-5">Our <span
                                className="text-uppercase text-primary bg-light px-2">Services</span></h1>
                            <p>At {settingData.siteName}, we make online shopping simple, convenient, and reliable. Explore a wide range of quality products, enjoy an easy shopping experience, and discover everything you need in one place. Our platform is designed to help customers shop confidently with smooth navigation, secure payments, and dependable service.</p>
                            <p className="mb-5">We focus on delivering a complete shopping experience from product discovery to final delivery. With customer-friendly features, secure transactions, fast order processing, and helpful support, {settingData.siteName} aims to make every purchase easy and enjoyable. Your satisfaction is our priority, and we continuously work to improve your online shopping journey.</p>
                            <div className="d-flex align-items-center bg-light">
                                <div className="btn-square flex-shrink-0 bg-primary" style={{ width: "100px", height: "100px" }}>
                                    <i className="bi bi-telephone fa-2x text-white"></i>
                                </div>
                                <div className="px-5">
                                    <Link className='d-block text-dark fs-4' to={`tel:${settingData.phone}`} target='_blank'>{settingData.phone}</Link>
                                    <span>Call us direct 24/7 for get a free consultation</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="row g-0">
                                <div className="col-md-6 wow fadeIn" data-wow-delay="0.2s">
                                    <div className="service-item h-100 d-flex flex-column justify-content-center bg-primary">
                                        <a href="#!" className="service-img position-relative mb-4">
                                            <img className="img-fluid w-100" src="/images/product1.webp" alt="" />
                                            <h3>Fast & Reliable Delivery</h3>
                                        </a>
                                        <p className="mb-0">Get your orders delivered quickly and safely right to your doorstep.</p>
                                    </div>
                                </div>
                                <div className="col-md-6 wow fadeIn" data-wow-delay="0.4s">
                                    <div className="service-item h-100 d-flex flex-column justify-content-center bg-light">
                                        <a href="#!" className="service-img position-relative mb-4">
                                            <img className="img-fluid w-100" src="/images/product2.webp" alt="" />
                                            <h3>Secure Online Payment</h3>
                                        </a>
                                        <p className="mb-0">Enjoy safe and convenient payment options designed to protect every transaction.</p>
                                    </div>
                                </div>
                                <div className="col-md-6 wow fadeIn" data-wow-delay="0.6s">
                                    <div className="service-item h-100 d-flex flex-column justify-content-center bg-light">
                                        <a href="#!" className="service-img position-relative mb-4">
                                            <img className="img-fluid w-100" src="/images/product3.webp" alt="" />
                                            <h3>Quality Products</h3>
                                        </a>
                                        <p className="mb-0">Shop confidently with carefully selected products offering quality, value, and reliability.</p>
                                    </div>
                                </div>
                                <div className="col-md-6 wow fadeIn" data-wow-delay="0.8s">
                                    <div className="service-item h-100 d-flex flex-column justify-content-center bg-primary">
                                        <a href="#!" className="service-img position-relative mb-4">
                                            <img className="img-fluid w-100" src="/images/product10.webp" alt="" />
                                            <h3>Customer Support</h3>
                                        </a>
                                        <p className="mb-0">Our support team is always ready to assist with your questions and concerns.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
