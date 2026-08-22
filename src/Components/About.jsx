import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { getSetting } from '../Redux/ActionCreators/SettingActionCreator'

export default function About() {
    let [settingData, setSettingData] = useState({
        siteName: import.meta.env.VITE_APP_SITE_NAME,
        instagram: import.meta.env.VITE_APP_INSTAGRAM,
        facebook: import.meta.env.VITE_APP_FACEBOOK,
        linkedln: import.meta.env.VITE_APP_LINKEDLN,
        twitter: import.meta.env.VITE_APP_TWITTER,
    })

    let SettingStateData = useSelector(state => state.SettingStateData)         //for retrieve data from redux store.
    let dispatch = useDispatch();

    useEffect(() => {
        (() => {
            dispatch(getSetting())
            let item = {}
            if (SettingStateData.length) {
                Object.keys(settingData).forEach(key => {
                    item[key] = SettingStateData[0][key] ? SettingStateData[0][key] : settingData[key]
                })
                setSettingData({ ...item })
            }
        })()
    }, [SettingStateData.length])

    return (
        <>
            <div className="container-fluid py-5">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-6">
                            <div className="row">
                                <div className="col-6 wow fadeIn" style={{ height: 450 }} data-wow-delay="0.1s">
                                    <img className="img-fluid h-100" src="/images/product1.webp" alt="" />
                                </div>
                                <div className="col-6 wow fadeIn" data-wow-delay="0.3s">
                                    <img className="img-fluid h-75" src="/images/product2.webp" alt="" />
                                    <div className="h-25 d-flex align-items-center text-center bg-primary px-4">
                                        <h3 className="text-white lh-base mb-0">Your Trusted Place to Shop</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                            <h1 className="mb-3"><span className="text-uppercase text-primary bg-light px-2">Our</span> History </h1>
                            <p className="mb-4">{settingData.siteName} was created with a simple vision: to make online shopping faster, easier, and more convenient for everyone. The platform brings a wide range of products together in one place, allowing customers to explore, compare, and purchase products with ease. From fashion and lifestyle products to everyday essentials, {settingData.siteName} focuses on providing a smooth and reliable shopping experience. With a user-friendly interface, secure ordering process, and efficient product management, {settingData.siteName} continues to evolve with modern customer needs. The platform is built around convenience, trust, and accessibility, making online shopping simple, enjoyable, and accessible from anywhere.</p>
                            <div className="row g-3">
                                <div className="col-sm-6">
                                    <h6 className="mb-3"><i className="fa fa-check text-primary me-2"></i>Shop Smart, Live Better</h6>
                                    <h6 className="mb-0"><i className="fa fa-check text-primary me-2"></i>Fast Shopping</h6>
                                </div>
                                <div className="col-sm-6">
                                    <h6 className="mb-3"><i className="fa fa-check text-primary me-2"></i>24/7 Support</h6>
                                    <h6 className="mb-0"><i className="fa fa-check text-primary me-2"></i>Better Choices</h6>
                                </div>
                            </div>
                            <div className="d-flex align-items-center mt-5">
                                <a target="_blank" className="btn btn-outline-primary btn-square border-1 me-4" href={settingData.facebook}><i
                                    className="bi bi-facebook"></i></a>
                                <a target="_blank" className="btn btn-outline-primary btn-square border-1 me-4" href={settingData.twitter}><i
                                    className="bi bi-twitter"></i></a>
                                <a target="_blank" className="btn btn-outline-primary btn-square border-1 me-4" href={settingData.instagram}><i
                                    className="bi bi-instagram"></i></a>
                                <a target="_blank" className="btn btn-outline-primary btn-square border-1" href={settingData.linkedin}><i
                                    className="bi bi-linkedin"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
