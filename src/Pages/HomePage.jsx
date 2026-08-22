import React, { useEffect } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';   // Import Swiper styles


import { Autoplay } from 'swiper/modules';       // import required modules

import About from '../Components/About'
import Feature from '../Components/Feature'
import ProductSlider from '../Components/ProductSlider'
import Service from '../Components/Service'
import Products from '../Components/Products'
import Testimonial from '../Components/Testimonial'
import NewsLetter from '../Components/NewsLetter'
import Faq from '../Components/Faq'

import { getProduct } from '../Redux/ActionCreators/ProductActionCreator'
import { getMainCategory } from '../Redux/ActionCreators/MainCategoryActionCreator'
import { useDispatch, useSelector } from 'react-redux';

export default function HomePage() {
    let ProductStateData = useSelector(state => state.ProductStateData)
    let MainCategoryStateData = useSelector(state => state.MainCategoryStateData)

    let dispatch = useDispatch()

    useEffect(() => {
        (() => dispatch(getProduct()))()
    }, [])

    useEffect(() => {
        (() => dispatch(getMainCategory()))()
    }, [])

    const sliderOption = {
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        modules: [Autoplay],
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
                                        <img className="img-fluid" src="/images/product10.webp" alt="" draggable="false"
                                        />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img className="img-fluid" src="/images/product2.webp" alt="" draggable="false"
                                        />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img className="img-fluid" src="/images/product3.webp" alt="" draggable="false"
                                        />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img className="img-fluid" src="/images/product1.webp" alt="" draggable="false"
                                        />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img className="img-fluid" src="/images/product9.webp" alt="" draggable="false"
                                        />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img className="img-fluid" src="/images/product6.webp" alt="" draggable="false"
                                        />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img className="img-fluid" src="/images/product7.webp" alt="" draggable="false"
                                        />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img className="img-fluid" src="/images/product8.webp" alt="" draggable="false"
                                        />
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
            {MainCategoryStateData.filter(x => x.status && ProductStateData.filter(p => p.maincategory === x.name).length !== 0).map(item => {
                return <ProductSlider key={item.id} title={item.name} data={ProductStateData.filter(x => x.maincategory === item.name)} />
            })}
            <Feature />
            <Faq />
            <Service />
            <Products data={ProductStateData.filter(x => x.status).slice(0, 20)} />
            <Testimonial />
            <NewsLetter />
        </>
    )
}
