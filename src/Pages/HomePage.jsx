import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';

// import required modules
import { Autoplay,EffectCube } from 'swiper/modules';

import About from '../Components/About'
import Feature from '../Components/Feature'
import ProductSlider from '../Components/ProductSlider'
import Service from '../Components/Service'
import Products from '../Components/Products'
import Testimonial from '../Components/Testimonial'
import NewsLetter from '../Components/NewsLetter'

export default function HomePage() {
    const sliderOption = {
        effect: 'cube',
        grabCursor: true,
        loop:true,
        cubeEffect: {
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
        },
        autoplay:{
          delay: 2500,
          disableOnInteraction: false,
        },
        modules: [Autoplay,EffectCube],
        className: "mySwiper"
    }
    return (
        <>
            <div className="container-fluid pb-5 hero-header bg-light mb-5">
                <div className="container py-5">
                    <div className="row g-5 align-items-center mb-5">
                        <div className="col-lg-6">
                            <h1 className="display-1 mb-4 animated slideInRight">Where Great <span className='text-primary'>Deals</span> Meet Great Style</h1>
                            <h5 className="d-inline-block border border-2 border-white py-3 px-5 mb-0 animated slideInRight">
                                Fast Shopping. Better <span className='text-primary'>Living</span></h5>
                        </div>
                        <div className="col-lg-6">
                            <div className="header-carousel animated fadeIn">
                                <Swiper {...sliderOption}>
                                    <SwiperSlide>
                                        <img className="img-fluid" src="/images/product10.jpg" alt="" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img className="img-fluid" src="/images/product2.jpg" alt="" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img className="img-fluid" src="/images/product3.jpg" alt="" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img className="img-fluid" src="/images/product1.jpg" alt="" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img className="img-fluid" src="/images/product9.jpg" alt="" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img className="img-fluid" src="/images/product6.jpg" alt="" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img className="img-fluid" src="/images/product7.jpg" alt="" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img className="img-fluid" src="/images/product8.jpg" alt="" />
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                        </div>
                    </div>
                    <div className="row g-5 animated fadeIn">
                        <div className="col-md-6 col-lg-3">
                            <div className="d-flex align-items-center">
                                <div className="flex-shrink-0 btn-square border border-2 border-dark me-3">
                                    <i className="bi bi-arrow-clockwise text-primary"></i>
                                </div>
                                <h5 className="lh-base mb-0">Easy Return</h5>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="d-flex align-items-center">
                                <div className="flex-shrink-0 btn-square border border-2 border-dark me-3">
                                    <i className="bi bi-tag text-primary"></i>
                                </div>
                                <h5 className="lh-base mb-0">Upto 50% OFF</h5>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="d-flex align-items-center">
                                <div className="flex-shrink-0 btn-square border border-2 border-dark me-3">
                                    <i className="bi bi-telephone text-primary"></i>
                                </div>
                                <h5 className="lh-base mb-0">24/7 Customer Support</h5>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="d-flex align-items-center">
                                <div className="flex-shrink-0 btn-square border border-2 border-dark me-3">
                                    <i className="bi bi-truck text-primary"></i>
                                </div>
                                <h5 className="lh-base mb-0">Free Shipping</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <About />
            <Feature />
            <ProductSlider />
            <Service />
            <Products />
            <Testimonial />
            <NewsLetter />
        </>
    )
}
