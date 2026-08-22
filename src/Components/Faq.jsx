import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getFaq } from '../Redux/ActionCreators/FaqActionCreator'

export default function Faq() {
    let FaqStateData = useSelector(state => state.FaqStateData)
    let dispatch = useDispatch()

    useEffect(() => {
        (() => dispatch(getFaq()))()
    }, [FaqStateData.length])

    return (
        <>
            <div className="container-fluid py-5">
                <div className="container">
                    <div className="text-center wow fadeIn" data-wow-delay="0.1s">
                        <h1 className="mb-5">Frequently Asked <span className="text-uppercase text-primary bg-light px-2">Question</span>
                        </h1>
                    </div>
                    <div className="row g-3 align-items-center text-center">
                        {FaqStateData.filter(x => x.status).map((item, index) => {
                            return <div className="accordion" id="accordionExample" key={index}>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id={`heading${index}`}>
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`}>
                                            {item.question}
                                        </button>
                                    </h2>
                                    <div id={`collapse${index}`} className={`accordion-collapse collapse ${index === 0 ? 'show' : ""}`} aria-labelledby={`heading${index}`} data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            {item.answer}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}
