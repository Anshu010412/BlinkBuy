import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Breadcrum from '../Components/Breadcrum'

import { getSetting } from "../Redux/ActionCreators/SettingActionCreator"
export default function ContactUsPage() {
    let [settingData, setSettingData] = useState({
        siteName: import.meta.env.VITE_APP_SITE_NAME,
        map1: import.meta.env.VITE_APP_MAP1,
        map2: import.meta.env.VITE_APP_MAP2,
        address: import.meta.env.VITE_APP_ADDRESS,
        email: import.meta.env.VITE_APP_EMAIL,
        phone: import.meta.env.VITE_APP_PHONE,
        whatsapp: import.meta.env.VITE_APP_WHATS_APP,
        facebook: import.meta.env.VITE_APP_FACEBOOK,
        twitter: import.meta.env.VITE_APP_TWITTER,
        linkedin: import.meta.env.VITE_APP_LINKEDIN,
        youtube: import.meta.env.VITE_APP_YOUTUBE,
        instagram: import.meta.env.VITE_APP_INSTAGRAM
    })

    let SettingStateData = useSelector(state => state.SettingStateData)
    let dispatch = useDispatch()

    useEffect(() => {
        (() => {
            dispatch(getSetting())
            if (SettingStateData.length) {
                let item = {}
                Object.keys(settingData).forEach(key => {
                    item[key] = SettingStateData[0][key] ? SettingStateData[0][key] : settingData[key]
                })
                setSettingData({ ...item })
            }
        })()
    }, [SettingStateData.length])
    return (
        <>
            <Breadcrum title="Contact Us" />
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="card p-4 mb-4 border-secondary ">
                                <div className='d-flex'>
                                    <div className='me-4'>
                                        <i className='bi bi-geo-alt fs-1'></i>
                                    </div>
                                    <div>
                                        <h4>Address</h4>
                                        <a href={settingData.map1} target='_blank'>{settingData.address}</a>
                                    </div>
                                </div>
                            </div>
                            <div className="card p-4 mb-4 border-secondary">
                                <div className='d-flex'>
                                    <div className='me-4'>
                                        <i className='bi bi-envelope fs-1'></i>
                                    </div>
                                    <div>
                                        <h4>Email</h4>
                                        <a href={`mailto:${settingData.map1}`} target='_blank'>{settingData.email}</a>
                                    </div>
                                </div>
                            </div>
                            <div className="card p-4 mb-4 border-secondary">
                                <div className='d-flex'>
                                    <div className='me-4'>
                                        <i className='bi bi-telephone fs-1'></i>
                                    </div>
                                    <div>
                                        <h4>Phone</h4>
                                        <a href={`tel:${settingData.phone}`} target='_blank'>+91 {settingData.phone}</a>
                                    </div>
                                </div>
                            </div>
                            <div className="card p-4 mb-4 border-secondary">
                                <div className='d-flex'>
                                    <div className='me-4'>
                                        <i className='bi bi-whatsapp fs-1'></i>
                                    </div>
                                    <div>
                                        <h4>Whatsapp</h4>
                                        <a href={`https://wa.me/${settingData.whatsapp}`} target='_blank'>+91 {settingData.whatsapp}</a>
                                    </div>
                                </div>
                            </div>

                            <div className="card p-4 mb-4 border-secondary">
                                <div className='d-flex gap-4 align-items-center'>
                                    <div>
                                        <i className='bi bi-globe fs-1'></i>
                                    </div>
                                    <div className="d-flex pt-2">
                                        <a className="btn btn-outline-dark rounded-circle border-2 me-2" href={settingData.facebook} target='_blank'>
                                            <i className="fab fa-facebook-f"></i>
                                        </a>
                                        <a className="btn btn-outline-dark rounded-circle border-2 me-2" href={settingData.twitter} target='_blank'>
                                            <i className="fab fa-twitter"></i>
                                        </a>
                                        <a className="btn btn-outline-dark rounded-circle border-2 me-2" href={settingData.youtube} target='_blank'>
                                            <i className="fab fa-youtube"></i>
                                        </a>
                                        <a className="btn btn-outline-dark rounded-circle border-2 me-2" href={settingData.instagram} target='_blank'>
                                            <i className="fab fa-instagram"></i>
                                        </a>
                                        <a className="btn btn-outline-dark rounded-circle border-2 me-2" href={settingData.linkedin} target='_blank'>
                                            <i className="fab fa-linkedin-in"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="text-center wow fadeIn" data-wow-delay="0.1s">
                                <h1 className="mb-5">Have Any Query? <span className="text-uppercase text-primary bg-light px-2">Contact
                                    Us</span></h1>
                            </div>
                            <p className="text-center mb-4">The contact form is currently inactive. Get a functional and working
                                contact form with Ajax & PHP in a few minutes. Just copy and paste the files, add a little code
                                and you're done. <a href="https://htmlcodex.com/contact-form">Download Now</a>.</p>
                            <div className="wow fadeIn" data-wow-delay="0.3s">
                                <form>
                                    <div className="row g-3">
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="name" placeholder="Your Name" />
                                                <label>Your Name</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input type="email" className="form-control" id="email" placeholder="Your Email" />
                                                <label>Your Email</label>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input type="email" className="form-control" id="email" placeholder="Your Email" />
                                                <label>Your Email</label>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="subject" placeholder="Subject" />
                                                <label>Subject</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <textarea className="form-control" placeholder="Leave a message here" id="message"
                                                    style={{ height: "150px" }}></textarea>
                                                <label>Message</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <button className="btn btn-primary w-100 py-3" type="submit">Send Message</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}