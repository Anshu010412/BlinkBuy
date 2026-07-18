import React from 'react'

export default function Footer() {
  return (
    <>
      <div className="container-fluid bg-dark text-white-50 footer pt-5">
      <div className="container py-5">
        <div className="row g-5">
          <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.1s">
            <a href="index.html" className="d-inline-block mb-3">
              <h1 className="text-white">BlinkBuy</h1>
            </a>
            <p className="mb-0">Welcome to our BlinkBuy store, where quality meets convenience. Explore a wide range of products at affordable prices, enjoy secure payments, fast delivery, and a seamless shopping experience. Whether you're shopping for everyday essentials or the latest trends.</p>
          </div>
          <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.3s">
            <h5 className="text-white mb-4">Get In Touch</h5>
            <p><i className="fa fa-map-marker-alt me-3"></i>{import.meta.env.VITE_APP_ADDRESS}</p>
            <p><i className="fa fa-phone-alt me-3"></i>{import.meta.env.VITE_APP_PHONE}</p>
            <p><i className="fa fa-envelope me-3"></i>{import.meta.env.VITE_APP_EMAIL}</p>
            <div className="d-flex pt-2">
              <a className="btn btn-outline-primary btn-square border-2 me-2" href="#!"><i
                className="fab fa-twitter"></i></a>
              <a className="btn btn-outline-primary btn-square border-2 me-2" href="#!"><i
                className="fab fa-facebook-f"></i></a>
              <a className="btn btn-outline-primary btn-square border-2 me-2" href="#!"><i
                className="fab fa-youtube"></i></a>
              <a className="btn btn-outline-primary btn-square border-2 me-2" href="#!"><i
                className="fab fa-instagram"></i></a>
              <a className="btn btn-outline-primary btn-square border-2 me-2" href="#!"><i
                className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
          <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.5s">
            <h5 className="text-white mb-4">Popular Link</h5>
            <a className="btn btn-link" href="#!">About Us</a>
            <a className="btn btn-link" href="#!">Contact Us</a>
            <a className="btn btn-link" href="#!">Privacy Policy</a>
            <a className="btn btn-link" href="#!">Terms & Condition</a>
            <a className="btn btn-link" href="#!">Career</a>
          </div>
          <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.7s">
            <h5 className="text-white mb-4">Our Services</h5>
            <a className="btn btn-link" href="#!">Interior Design</a>
            <a className="btn btn-link" href="#!">Project Planning</a>
            <a className="btn btn-link" href="#!">Renovation</a>
            <a className="btn btn-link" href="#!">Implement</a>
            <a className="btn btn-link" href="#!">Landscape Design</a>
          </div>
        </div>
      </div>
      <div className="container wow fadeIn" data-wow-delay="0.1s">
        <div className="copyright">
          <div className="row">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              &copy; <a className="border-bottom" href="#!">Your Site Name</a>, All Right Reserved.
              Designed By <a className="border-bottom" href="https://htmlcodex.com">HTML Codex</a>. Distributed by
              <a className="border-bottom" href="https://themewagon.com" target="_blank">ThemeWagon</a>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <div className="footer-menu">
                <a href="#!">Home</a>
                <a href="#!">Cookies</a>
                <a href="#!">Help</a>
                <a href="#!">FAQs</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
