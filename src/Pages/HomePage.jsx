import React from 'react'
import About from '../Components/About'
import Feature from '../Components/Feature'
import ProductSlider from '../Components/ProductSlider'
import Service from '../Components/Service'
import Products from '../Components/Products'
import Testimonial from '../Components/Testimonial'
import NewsLetter from '../Components/NewsLetter'

export default function HomePage() {
  return (
    <>
     <div className="container-fluid pb-5 hero-header bg-light mb-5">
        <div className="container py-5">
            <div className="row g-5 align-items-center mb-5">
                <div className="col-lg-6">
                    <h1 className="display-1 mb-4 animated slideInRight">We Make Your <span className="text-primary">Home</span>
                        Better</h1>
                    <h5 className="d-inline-block border border-2 border-white py-3 px-5 mb-0 animated slideInRight">
                        An Award Winning Studio Since 1990</h5>
                </div>
                <div className="col-lg-6">
                    <div className="owl-carousel header-carousel animated fadeIn">
                        <img className="img-fluid" src="/img/hero-slider-1.jpg" alt=""/>
                        <img className="img-fluid" src="/img/hero-slider-2.jpg" alt=""/>
                        <img className="img-fluid" src="/img/hero-slider-3.jpg" alt=""/>
                    </div>
                </div>
            </div>
            <div className="row g-5 animated fadeIn">
                <div className="col-md-6 col-lg-3">
                    <div className="d-flex align-items-center">
                        <div className="flex-shrink-0 btn-square border border-2 border-white me-3">
                            <i className="fa fa-robot text-primary"></i>
                        </div>
                        <h5 className="lh-base mb-0">Crafted Furniture</h5>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3">
                    <div className="d-flex align-items-center">
                        <div className="flex-shrink-0 btn-square border border-2 border-white me-3">
                            <i className="fa fa-robot text-primary"></i>
                        </div>
                        <h5 className="lh-base mb-0">Sustainable Material</h5>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3">
                    <div className="d-flex align-items-center">
                        <div className="flex-shrink-0 btn-square border border-2 border-white me-3">
                            <i className="fa fa-robot text-primary"></i>
                        </div>
                        <h5 className="lh-base mb-0">Innovative Architects</h5>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3">
                    <div className="d-flex align-items-center">
                        <div className="flex-shrink-0 btn-square border border-2 border-white me-3">
                            <i className="fa fa-robot text-primary"></i>
                        </div>
                        <h5 className="lh-base mb-0">Budget Friendly</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <About/>
    <Feature/>
    <ProductSlider/>
    <Service/>
    <Products/>
    <Testimonial/>
    <NewsLetter/>
    </>
  )
}
