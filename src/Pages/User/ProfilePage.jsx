import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import BreadCrum from '../../Components/BreadCrum'

import Profile from '../../Components/User/Profile'
import Wishlist from '../../Components/User/Wishlist'
import UpdateProfile from '../../Components/User/UpdateProfile'
import Orders from '../../Components/User/Orders'
import Address from '../../Components/User/Address'

export default function ProfilePage() {
    let [option, setOption] = useState("profile")
    let [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        (() => {
            setOption(searchParams.get("option") || "profile")
        })()
    }, [searchParams])

    return (
        <>
            <BreadCrum title="Your Profile" />

            <div className="container my-3">
                <div className="row">
                    <div className="col-md-3">
                        <ul className="list-group">
                            <li className={`list-group-item ${option === "Profile" ? "active" : ''}`} onClick={() => setSearchParams({ option: "Profile" })}>Profile <i className='bi bi-person float-end'></i></li>
                            <li className={`list-group-item ${option === "Update Profile" ? "active" : ''}`} onClick={() => setSearchParams({ option: "Update Profile" })}>Update Profile <i className='bi bi-pencil float-end'></i></li>
                            <li className={`list-group-item ${option === "WishList" ? "active" : ''}`} onClick={() => setSearchParams({ option: "WishList" })}>WishList <i className='bi bi-heart float-end'></i></li>
                            <li className={`list-group-item ${option === "Orders" ? "active" : ''}`} onClick={() => setSearchParams({ option: "Orders" })}>Order <i className="bi bi-bag-check float-end"></i></li>
                            <li className={`list-group-item ${option === "Address" ? "active" : ''}`} onClick={() => setSearchParams({ option: "Address" })}>Address <i className="bi bi-house float-end"></i></li>
                        </ul>
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-light text-center p-2'>{option}</h5>
                        {option === "Profile" && <Profile />}
                        {option === "Update Profile" && <UpdateProfile setSearchParams={setSearchParams} />}
                        {option === "WishList" && <Wishlist />}
                        {option === "Orders" && <Orders />}
                        {option === "Address" && <Address />}
                    </div>
                </div>
            </div >
        </>
    )
}
