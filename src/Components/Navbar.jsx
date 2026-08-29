import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { getSetting } from '../Redux/ActionCreators/SettingActionCreator'
import { toast } from 'react-toastify'

export default function Navbar() {
    let [settingData, setSettingData] = useState({
        siteName: import.meta.env.VITE_APP_SITE_NAME,
        map1: import.meta.env.VITE_APP_MAP1,
        address: import.meta.env.VITE_APP_ADDRESS,
        email: import.meta.env.VITE_APP_EMAIL,
        phone: import.meta.env.VITE_APP_PHONE,
        whatsapp: import.meta.env.VITE_APP_WHATSAPP,
        instagram: import.meta.env.VITE_APP_INSTAGRAM,
        facebook: import.meta.env.VITE_APP_FACEBOOK,
        linkedln: import.meta.env.VITE_APP_LINKEDLN,
        twitter: import.meta.env.VITE_APP_TWITTER,
        youtube: import.meta.env.VITE_APP_YOUTUBE,
    })

    let SettingStateData = useSelector(state => state.SettingStateData)         //for retrieve data from redux store.
    let dispatch = useDispatch();

    let navigate = useNavigate();

    function logout() {
        localStorage.clear()
        navigate("/login")
        toast.success("Logout Successfully")
    }

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
            <div className="bg-dark">
                <div className="container-fluid">
                    <div className="row p-2">
                        <div className="col-lg-9">
                            <Link to={settingData.map1} target='_blank' className='btn'><i className='bi bi-geo-alt text-light me-1'></i><span className='d-none d-xl-inline-block text-light'>{settingData.address}</span></Link>
                            <Link to={`mailto:${settingData.email}`} target='_blank' className='btn'><i className='bi bi-envelope text-light me-1'></i><span className='d-none d-xl-inline-block text-light'>{settingData.email}</span></Link>
                            <Link to={`tel:${settingData.phone}`} target='_blank' className='btn'><i className='bi bi-telephone text-light me-1'></i><span className='d-none d-xl-inline-block text-light'>{settingData.phone}</span></Link>
                            <Link to={`https://wa.me/${settingData.whatsapp}`} target='_blank' className='btn'><i className='bi bi-whatsapp text-light me-1'></i><span className='d-none d-xl-inline-block text-light'>{settingData.whatsapp}</span></Link>
                        </div>
                        <div className="col-lg-3 col-6">
                            <Link to={settingData.instagram} target='_blank' className='btn'><i className='bi bi-instagram text-light'></i></Link>
                            <Link to={settingData.facebook} target='_blank' className='btn'><i className='bi bi-facebook text-light'></i></Link>
                            <Link to={settingData.linkedln} target='_blank' className='btn'><i className='bi bi-linkedin text-light'></i></Link>
                            <Link to={settingData.twitter} target='_blank' className='btn'><i className='bi bi-twitter text-light'></i></Link>
                            <Link to={settingData.youtube} target='_blank' className='btn'><i className='bi bi-youtube text-light'></i></Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid sticky-top">
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light border-bottom border-2 border-white">
                        <Link to="/" className="navbar-brand">
                            <h1>{settingData.siteName}</h1>
                        </Link>
                        <button type="button" className="navbar-toggler ms-auto me-0" data-bs-toggle="collapse"
                            data-bs-target="#navbarCollapse">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <div className="navbar-nav ms-auto">
                                <NavLink to="/" className="nav-item nav-link">Home</NavLink>
                                <NavLink to="/about" className="nav-item nav-link">About</NavLink>
                                <NavLink to="/shop" className="nav-item nav-link">Shop</NavLink>
                                <NavLink to="/feature" className="nav-item nav-link">Features</NavLink>
                                <NavLink to="/faq" className="nav-item nav-link">Faq</NavLink>
                                <NavLink to="/testimonial" className="nav-item nav-link">Testimonial</NavLink>
                                <NavLink to="/contact" className="nav-item nav-link">Contact-Us</NavLink>

                                {localStorage.getItem("login") ?
                                    <div className="nav-item dropdown">
                                        <a href="#!" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">{localStorage.getItem("name")}</a>
                                        <div className="dropdown-menu bg-light mt-2">
                                            <Link to="/profile?option=Profile" className="dropdown-item"><i className='bi bi-person float-end'></i>Profile</Link>
                                            {localStorage.getItem("role") !== "Buyer" ? <Link to="/admin" className="dropdown-item">Admin Dashboard</Link> : null}
                                            <Link to="/profile?option=WishList" className="dropdown-item">WishList <i className='bi bi-heart float-end'></i></Link>
                                            <Link to="/profile?option=Orders" className="dropdown-item">Orders<i className='bi bi-bag-check float-end'></i></Link>
                                            <Link to="/profile?option=Address" className="dropdown-item">Address <i className='bi bi-geo-alt float-end'></i></Link>
                                            <Link to="/cart" className="dropdown-item">Cart <i className='bi bi-cart float-end'></i></Link>
                                            <Link to="/checkout" className="dropdown-item">Checkout <i className='bi bi-cart-check float-end'></i></Link>
                                            <button className="dropdown-item" onClick={logout}>LogOut <i className='bi bi-box-arrow-right float-end'></i></button>
                                        </div>
                                    </div> :
                                    <NavLink to="/login" className="nav-item nav-link">Login</NavLink>
                                }
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}
