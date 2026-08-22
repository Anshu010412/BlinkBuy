import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';

// import required modules
import { Autoplay,Pagination } from 'swiper/modules';


export default function Testimonial() {
    const sliderOption = {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay:{
          delay: 2500,
          disableOnInteraction: false,
        },
        modules: [Autoplay,Pagination],
        className: "mySwiper",
    }

    return (
        <div className="container-xxl py-5">
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-12 col-lg-9">
                        <div className="testimonial-carousel wow fadeIn" data-wow-delay="0.2s">
                            <Swiper {...sliderOption}>
                                <SwiperSlide>
                                    <div className="testimonial-item">
                                        <div className="row g-5 align-items-center">
                                            <div className="col-md-6">
                                                <div className="testimonial-img">
                                                    <img className="img-fluid" src="/images/testimonial1.jpg" alt="" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="testimonial-text pb-5 pb-md-0">
                                                    <h3>Excellent Product Quality</h3>
                                                    <p>I was genuinely impressed with the quality of the products I received. The materials felt premium, and everything matched the images and descriptions perfectly. It's rare to find an online store that delivers exactly what it promises. I've already placed my second order and recommended this website to several friends and family members. Definitely one of the best online shopping experiences I've had.</p>
                                                    <h5 className="mb-0">Ananya Gupta</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="testimonial-item">
                                        <div className="row g-5 align-items-center">
                                            <div className="col-md-6">
                                                <div className="testimonial-img">
                                                    <img className="img-fluid" src="/images/testimonial2.jpg" alt="" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="testimonial-text pb-5 pb-md-0">
                                                    <h3>Super Fast Delivery</h3>
                                                    <p>My package arrived much earlier than the estimated delivery date, and it was packed securely without any damage. The real-time order tracking kept me updated throughout the shipping process, which made me feel confident about my purchase. Fast shipping combined with excellent packaging has made me a loyal customer. I'll definitely shop here again</p>
                                                    <h5 className="mb-0">Aditi Singh</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="testimonial-item">
                                        <div className="row g-5 align-items-center">
                                            <div className="col-md-6">
                                                <div className="testimonial-img">
                                                    <img className="img-fluid" src="/images/testimonial3.jpg" alt="" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="testimonial-text pb-5 pb-md-0">
                                                    <h3>Outstanding Customer Support</h3>
                                                    <p>I had a small issue with selecting the correct size, and the customer support team responded within minutes. They were polite, knowledgeable, and helped me exchange the product without any hassle. It's refreshing to see a company that genuinely cares about its customers even after the purchase is complete</p>
                                                    <h5 className="mb-0">Karan Malhotra</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="testimonial-item">
                                        <div className="row g-5 align-items-center">
                                            <div className="col-md-6">
                                                <div className="testimonial-img">
                                                    <img className="img-fluid" src="/images/testimonial4.jpg" alt="" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="testimonial-text pb-5 pb-md-0">
                                                    <h3>Great Value for Money</h3>
                                                    <p>The prices are very competitive, and the discounts make shopping even more enjoyable. I compared several websites before purchasing, and this store offered the best value without compromising on quality. Every item I received exceeded my expectations. It's now my preferred destination whenever I need to shop online.</p>
                                                    <h5 className="mb-0">Ishita Kapoor</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="testimonial-item">
                                        <div className="row g-5 align-items-center">
                                            <div className="col-md-6">
                                                <div className="testimonial-img">
                                                    <img className="img-fluid" src="/images/testimonial5.jpg" alt="" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="testimonial-text pb-5 pb-md-0">
                                                    <h3>Easy Shopping Experience</h3>
                                                    <p>The website is clean, fast, and incredibly easy to navigate. Finding products, comparing options, adding items to the cart, and completing the checkout took only a few minutes. Even as someone who doesn't shop online often, I found the entire process simple and stress-free. Everything worked exactly as expected</p>
                                                    <h5 className="mb-0">Arjun Mehta</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="testimonial-item">
                                        <div className="row g-5 align-items-center">
                                            <div className="col-md-6">
                                                <div className="testimonial-img">
                                                    <img className="img-fluid" src="/images/testimonial6.jpg" alt="" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="testimonial-text pb-5 pb-md-0">
                                                    <h3>Secure Payment & Checkout</h3>
                                                    <p>I really appreciated how smooth and secure the payment process was. There were multiple payment options available, and the checkout was completed in just a few clicks. I received instant confirmation and updates about my order. Knowing my payment information was handled securely gave me complete confidence while shopping.</p>
                                                    <h5 className="mb-0">Aditya Singh</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="testimonial-item">
                                        <div className="row g-5 align-items-center">
                                            <div className="col-md-6">
                                                <div className="testimonial-img">
                                                    <img className="img-fluid" src="/images/testimonial7.jpg" alt="" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="testimonial-text pb-5 pb-md-0">
                                                    <h3>Stylish Collection & Variety</h3>
                                                    <p>This store has an amazing collection of products with plenty of styles, colors, and options to choose from. I found exactly what I was looking for without spending hours searching different websites. The products looked even better in person, and the quality exceeded my expectations. I can't wait to shop again.</p>
                                                    <h5 className="mb-0">Kavya Nair</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="testimonial-item">
                                        <div className="row g-5 align-items-center">
                                            <div className="col-md-6">
                                                <div className="testimonial-img">
                                                    <img className="img-fluid" src="/images/testimonial8.jpg" alt="" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="testimonial-text pb-5 pb-md-0">
                                                    <h3>Trusted Online Store</h3>
                                                    <p>After several successful purchases, I can confidently say this is one of the most reliable eCommerce websites I've used. Every order has arrived on time, the products have always matched their descriptions, and customer service has been consistently excellent. Shopping here gives me peace of mind because I know I'll receive quality products every time.</p>
                                                    <h5 className="mb-0">Aarav Sharma</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>


                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
