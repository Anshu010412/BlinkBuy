import React from 'react'
import BreadCrum from '../Components/BreadCrum'
import Faq from '../Components/Faq'
import Testimonial from '../Components/Testimonial'
import NewsLetter from '../Components/NewsLetter'
import Service from '../Components/Service'

export default function FaqPage() {
    return (
        <>
            <BreadCrum title="Faq" />
            <Faq />
            <Service />
            <Testimonial />
            <NewsLetter />
        </>
    )
}
