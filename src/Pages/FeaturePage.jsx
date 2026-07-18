import React from 'react'
import Feature from '../Components/Feature'
import BreadCrum from '../Components/BreadCrum'
import NewsLetter from '../Components/NewsLetter'

export default function FeaturePage() {
    return (
        <>
            <BreadCrum title="Feature" />
            <Feature />
            <NewsLetter/>
        </>
    )
}
