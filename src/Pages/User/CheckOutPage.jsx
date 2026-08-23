import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import BreadCrum from '../../Components/BreadCrum'

import { getCart, deleteCart } from '../../Redux/ActionCreators/CartActionCreator'
import { createCheckOut } from '../../Redux/ActionCreators/CheckOutActionCreator'
import { getProduct, updateProduct } from '../../Redux/ActionCreators/ProductActionCreator'
import { Link } from 'react-router-dom'

export default function CheckOutPage() {
    let [address, setAddress] = useState([])
    let [data, setData] = useState([])
    let [total, setTotal] = useState(0)
    let [shipping, setShipping] = useState(0)
    let [subtotal, setSubTotal] = useState(0)

    let CartStateData = useSelector(state => state.CartStateData)
    let ProductStateData = useSelector(state => state.ProductStateData)
    let dispatch = useDispatch()

    function calculate(cart) {
        let total = 0
        cart.forEach(x => total += x.total)
        if (total > 0 && total < 1000) {
            setShipping(100)
            setTotal(total + 100)
        }
        else {
            setShipping(0)
            setTotal(total)
        }
        setSubTotal(total)
    }

    useEffect(() => {
        (() => {
            dispatch(getCart())
            if (CartStateData.length) {
                let cart = CartStateData.filter(x => x.user === localStorage.getItem("userid"))
                setData(cart)
                calculate(cart)
            }
        })()
    }, [CartStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getProduct())
        })()
    }, [ProductStateData.length])

    useEffect(() => {
        (async () => {
            let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user${localStorage.getItem("userid")}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            })
            response = await response.json()
            setAddress(response.address ?? [])
        })()
    }, [ProductStateData.length])

    return (
        <>
            <BreadCrum title="Place Order" />

            <div className="container my-3">
                <div className="row">
                    <div className="col-md-6">
                        <h5 className='border border-1 text-light bg-primary text-center p-2'>Delivery Address</h5>
                        {address.length ?
                            <>

                            </> :
                            <div className='card p-5'>
                                <h4 className='text-primary text-center'>No Address Found</h4>
                                <Link className='btn btn-primary' to="/profile?option=Address">Add Address</Link>
                            </div>
                        }
                    </div>
                    <div className="col-md-6">
                        <h5 className='border border-1 text-light bg-primary text-center p-2'>Products In Cart</h5>
                        <div className="table-responsive">
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Brand</th>
                                        <th>Color</th>
                                        <th>Size</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, index) => {
                                        return <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>{item.brand}</td>
                                            <td>{item.color}</td>
                                            <td>{item.size}</td>
                                            <td>&#8377;{item.price}</td>
                                            <td>{item.quantity}</td>
                                            <td>&#8377;{item.total}</td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>

                            <table className='table table-bordered mt-2'>
                                <tbody>
                                    <tr>
                                        <th>Subtotal</th>
                                        <td>&#8377;{subtotal}</td>
                                    </tr>
                                    <tr>
                                        <th>Shipping</th>
                                        <td>&#8377;{shipping}</td>
                                    </tr>
                                    <tr>
                                        <th>Total</th>
                                        <td>&#8377;{total}</td>
                                    </tr>
                                    <tr>
                                        {address.length ? <td colSpan={2}>
                                            <button className='w-100 btn btn-primary'>Place Order</button>
                                        </td> : null}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
