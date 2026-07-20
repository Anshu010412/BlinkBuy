import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Footer() {
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
    youtube: import.meta.env.VITE_APP_YOUTUBE,
    twitter: import.meta.env.VITE_APP_TWITTER,
  })
  return (
    <>
      <div className="container-fluid bg-dark text-white-50 footer pt-5">
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.1s">
              <Link to="/" className="d-inline-block mb-3">
                <h1 className="text-white">{settingData.siteName}</h1>
              </Link>
              <p className="mb-0 text-light">{settingData.siteName} is your one-stop online shopping destination, offering quality products, affordable prices, secure payments, and fast delivery. We are committed to making every shopping experience simple, reliable, and enjoyable for every customer.</p>
            </div>
            <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.3s">
              <h5 className="text-white mb-4">Get In Touch</h5>
              <Link to={settingData.map1} className='d-block mb-4 text-light'><i className="bi bi-geo-alt me-3"></i>{settingData.address}</Link>
              <Link to={`tel:${settingData.phone}`} target='_blank' className='d-block mb-4 text-light'><i className="bi bi-telephone me-3"></i>{settingData.phone}</Link>
              <Link to={`mailto:${settingData.email}`} target='_blank' className='d-block mb-4 text-light'><i className="bi bi-envelope me-3"></i>{settingData.email}</Link>
              <Link to={`https://wa.me/${settingData.whatsapp}`} target='_blank' className='d-block mb-4 text-light'><i className="bi bi-whatsapp me-3"></i>{settingData.whatsapp}</Link>

              <div className="d-flex pt-2">
                <Link className="btn btn-outline-light btn-square border-2 me-2" to={settingData.twitter}><i
                  className="bi bi-twitter"></i></Link>
                <Link className="btn btn-outline-light btn-square border-2 me-2" to={settingData.facebook}><i
                  className="bi bi-facebook"></i></Link>
                <Link className="btn btn-outline-light btn-square border-2 me-2" to={settingData.youtube}><i
                  className="bi bi-youtube"></i></Link>
                <Link className="btn btn-outline-light btn-square border-2 me-2" to={settingData.instagram}><i
                  className="bi bi-instagram"></i></Link>
                <Link className="btn btn-outline-light btn-square border-2 me-2" to={settingData.linkedln}><i
                  className="bi bi-linkedin"></i></Link>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.5s">
              <h5 className="text-white mb-4">Quick Links</h5>
              <Link className="btn btn-link text-light" to="/about">About Us</Link>
              <Link className="btn btn-link text-light" to="/contact">Contact Us</Link>
              <Link className="btn btn-link text-light" to="/privacy-policy">Privacy Policy</Link>
              <Link className="btn btn-link text-light" to="/data-policy">Terms & Condition</Link>
              <Link className="btn btn-link text-light" to="/refund-policy">Refund Policy</Link>
            </div>
            <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.7s">
              <h5 className="text-white mb-4">Our Services</h5>
              <Link className="btn btn-link text-light" to="/feature">Features</Link>
              <Link className="btn btn-link text-light" to="/testimonial">Testimonials</Link>
              <Link className="btn btn-link text-light" to="/">FAQs</Link>
            </div>
          </div>
        </div>
        <div className="container wow fadeIn" data-wow-delay="0.1s">
          <div className="copyright">
            <div className="row">
              <div className="col-md-6 text-center text-md-start mb-3 mb-md-0 ">
                &copy; <a className="border-bottom" href="#!">{settingData.siteName}</a>, All Right Reserved.
              </div>
              <div className="col-md-6 text-center text-md-end">
                <div className="footer-menu">
                  <Link to="/">Home</Link>
                  <Link to="/shop">Shop</Link>
                  <Link to="/about">About</Link>
                  <Link to="/feature">Features</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
