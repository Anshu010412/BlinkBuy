import React, { useState } from 'react'

export default function NewsLetter() {
    let [settingData, setSettingData] = useState({
            siteName: import.meta.env.VITE_APP_SITE_NAME,
        })
  return (
    <>
     <div className="container-fluid bg-primary newsletter p-0 mb-3">
        <div className="container p-0">
            <div className="row g-0 align-items-center">
                <div className="col-md-5 ps-lg-0 text-start wow fadeIn" data-wow-delay="0.2s">
                    <img className="img-fluid w-100" src="images/product5.webp" alt=""/>
                </div>
                <div className="col-md-7 py-5 newsletter-text wow fadeIn" data-wow-delay="0.5s">
                    <div className="p-5">
                        <h1 className="mb-5">Subscribe the <span
                                className="text-uppercase text-primary bg-white px-2">Newsletter</span></h1>
                        <div className="position-relative w-100 mb-2">
                            <input className="form-control border-0 w-100 ps-4 pe-5" type="text"
                                placeholder="Enter Your Email" style={{height: "60px"}}/>
                            <button type="button" className="btn shadow-none position-absolute top-0 end-0 mt-2 me-2"><i
                                    className="fa fa-paper-plane text-primary fs-4"></i></button>
                        </div>
                        <p className="mb-0 text-dark">Join the {settingData.siteName} community and enjoy early access to the latest collections, exclusive discounts, and members-only offers. Stay updated with trending products, seasonal sales, and limited-time deals curated just for you. Receive personalized shopping recommendations, exciting launch announcements, and special rewards delivered straight to your inbox, making every shopping experience smarter, easier, and more rewarding.</p>
                    </div>
                </div>
            </div>
        </div>
    </div> 
    </>
  )
}
