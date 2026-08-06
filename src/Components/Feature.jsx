import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getFeatures } from '../Redux/ActionCreators/FeaturesActionCreator'

export default function Feature() {
    let FeaturesStateData = useSelector(state => state.FeaturesStateData)
    let dispatch = useDispatch();

    useEffect(() => {
        (() => {
            dispatch(getFeatures())
        })()
    }, [FeaturesStateData.length])
    return (
        <>
            <div className="container-fluid py-5">
                <div className="container">
                    <div className="text-center wow fadeIn" data-wow-delay="0.1s">
                        <h1 className="mb-5">Why People <span className="text-uppercase text-primary bg-light px-2">Choose Us</span>
                        </h1>
                    </div>
                    <div className="row g-5 align-items-center text-center">
                        {FeaturesStateData.filter(x => x.status).map((item, index) => {
                            return <div className="col-md-6 col-lg-4 wow fadeIn" data-wow-delay="0.1s" key={index}>
                                <span className="display-5 text-primary mb-5" dangerouslySetInnerHTML={{ __html: item.icon }} />
                                <h4>{item.name}</h4>
                                <p className="mb-0">{item.shortDescription}</p>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}
