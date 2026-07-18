import React from 'react'
import BreadCrum from '../Components/BreadCrum'
import About from '../Components/About'
import Feature from '../Components/Feature'
import Testimonial from '../Components/Testimonial'
import NewsLetter from '../Components/NewsLetter'

export default function AboutPage() {
  return (
    <>
      <BreadCrum title="About-Us" />
      <About/>
      <Feature/>
      <Testimonial/>
      <NewsLetter/>
    </>
  )
}
