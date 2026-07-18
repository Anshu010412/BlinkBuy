import React from 'react'

export default function About() {
  return (
    <>
     <div className="container-fluid py-5">
        <div className="container">
            <div className="row g-5">
                <div className="col-lg-6">
                    <div className="row">
                        <div className="col-6 wow fadeIn" data-wow-delay="0.1s">
                            <img className="img-fluid" src="img/about-1.jpg" alt=""/>
                        </div>
                        <div className="col-6 wow fadeIn" data-wow-delay="0.3s">
                            <img className="img-fluid h-75" src="img/about-2.jpg" alt=""/>
                            <div className="h-25 d-flex align-items-center text-center bg-primary px-4">
                                <h4 className="text-white lh-base mb-0">Award Winning Studio Since 1990</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                    <h1 className="mb-5"><span className="text-uppercase text-primary bg-light px-2">History</span> of Our
                        Creation</h1>
                    <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum et tempor sit. Aliqu diam
                        amet diam et eos labore. Clita erat ipsum et lorem et sit, sed stet no labore lorem sit. Sanctus
                        clita duo justo et tempor eirmod magna dolore erat amet</p>
                    <p className="mb-5">Aliqu diam amet diam et eos labore. Clita erat ipsum et lorem et sit, sed stet no
                        labore lorem sit. Sanctus clita duo justo et tempor.</p>
                    <div className="row g-3">
                        <div className="col-sm-6">
                            <h6 className="mb-3"><i className="fa fa-check text-primary me-2"></i>Award Winning</h6>
                            <h6 className="mb-0"><i className="fa fa-check text-primary me-2"></i>Professional Staff</h6>
                        </div>
                        <div className="col-sm-6">
                            <h6 className="mb-3"><i className="fa fa-check text-primary me-2"></i>24/7 Support</h6>
                            <h6 className="mb-0"><i className="fa fa-check text-primary me-2"></i>Fair Prices</h6>
                        </div>
                    </div>
                    <div className="d-flex align-items-center mt-5">
                        <a className="btn btn-primary px-4 me-2" href="#!">Read More</a>
                        <a className="btn btn-outline-primary btn-square border-2 me-2" href="#!"><i
                                className="fab fa-facebook-f"></i></a>
                        <a className="btn btn-outline-primary btn-square border-2 me-2" href="#!"><i
                                className="fab fa-twitter"></i></a>
                        <a className="btn btn-outline-primary btn-square border-2 me-2" href="#!"><i
                                className="fab fa-instagram"></i></a>
                        <a className="btn btn-outline-primary btn-square border-2" href="#!"><i
                                className="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
