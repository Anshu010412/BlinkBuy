import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'

//import swiper styles
import 'swiper/css';

//import required modules
import { Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';

const sliderOption = {
    // onSwiper:setSwiperRef,
    slidesPerView: 3,
    centeredSlides: true,
    spaceBetween: 10,
    loop: true,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
    modules: [Autoplay],
    className: "mySwiper"
}

export default function ProductSlider({ title, data }) {
    return (
        <>
            <div className="container-fluid mt-5">
                <div className="container mt-5">
                    <div className="row g-2">
                        <div className="col-lg-5 wow fadeIn" data-wow-delay="0.1s">
                            <div className="d-flex flex-column justify-content-center bg-primary h-100 p-5">
                                {title === "Other Related Products" ?
                                    <h1 className="text-white mb-5"><span
                                        className="text-uppercase text-primary bg-light px-2">{title}</span></h1> :
                                    <>
                                        <h1 className="text-white mb-5">Our Latest <span
                                            className="text-uppercase text-primary bg-light px-2">Products</span></h1>
                                        <h4 className="text-white mb-0">for {title}</h4>
                                    </>
                                }
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="g-0">
                                <Swiper {...sliderOption}>
                                    {data.map(item => {
                                        return <SwiperSlide key={item.id}>
                                            <div className="wow fadeIn" data-wow-delay="0.2s">
                                                <div className="project-item position-relative overflow-hidden">
                                                    <img className="img-fluid w-100" style={{ height: 300 }} src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.image[0]}`} alt={item.name} />
                                                    <Link target='_blank' className="project-overlay text-decoration-none" to={`/product/${item.id}`}>
                                                        <h4 className="text-white">{item.name}</h4>
                                                        <p className="text-white">{item.brand}</p>
                                                        <p className="text-white">{item.stockQuantity} Left In Stock</p>
                                                        <small className="text-white"><del>&#8377;{item.basePrice}</del> &#8377;{item.finalPrice} <sup>{item.discount}% Off</sup></small>
                                                    </Link>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    })}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
