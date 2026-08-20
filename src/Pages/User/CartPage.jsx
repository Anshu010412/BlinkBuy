import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Swal from 'sweetalert2'

import { useDispatch, useSelector } from 'react-redux'
import { getCart, updateCart, deleteCart } from '../../Redux/ActionCreators/CartActionCreator'

import BreadCrum from '../../Components/BreadCrum'


export default function CartPage() {
    let [data, setData] = useState([])
    let [total, setTotal] = useState(0)
    let [shipping, setShipping] = useState(0)
    let [subTotal, setSubTotal] = useState(0)

    let CartStateData = useSelector(state => state.CartStateData)
    let dispatch = useDispatch()

    useEffect(() => {
        (() => {
            dispatch(getCart())
            if (CartStateData.length) {
                setData(CartStateData.filter(x => x.user === localStorage.getItem("userid")))
            }
        })()
    }, [CartStateData.length])

    function deleteRecord(id) {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteCart({ id: id }))
                let item = data.filter(x => x.id !== id)
                setData(item)
                calculate(item)
                Swal.fire({
                    title: "Deleted!",
                    text: "Your Product has been deleted.",
                    icon: "success"
                });
            }
        });
    }

    function updateRecord(id, option) {
        let item = data.find(x => x.id === id)
        if ((option === "Dec" && item.quantity === 1) || (option === "Inc" && item.stockQuantity === item.quantity))
            return
        if (option === "Dec") {
            item.quantity = item.quantity - 1
            item.total = item.total - item.price
        }
        else {
            item.quantity = item.quantity + 1
            item.total = item.total + item.price
        }
        let index = data.findIndex(x => x.id === id)
        dispatch(updateCart({ ...item }))
        data[index] = { ...item }
        calculate(data)
    }

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


    return (
        <>
            <BreadCrum title="Manage Your Cart" />

            <div className="container mb-3">
                {data.length ?
                    <div className='my-3'>
                        <div className="table-responsive">
                            <table className='table table-striped table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Item</th>
                                        <th>Color</th>
                                        <th>Size</th>
                                        <th>Brand</th>
                                        <th>Stock</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {data.map((item, index) => {
                                        return <tr key={index}>
                                            <td><Link target='_blank' to={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.image}`}>
                                                <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.image}`} height={70} width={70} alt={item.name} />
                                            </Link></td>
                                            <td>{item.name}</td>
                                            <td>
                                                <div style={{ width: 100 }}>
                                                    {item.color}
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ width: 100 }}>
                                                    {item.size}
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ width: 100 }}>
                                                    {item.brand}
                                                </div>
                                            </td>
                                            <td>{item.stockQuantity ? `${item.stockQuantity} Left in Stock` : "Out Of Stock"}</td>
                                            <td>&#8377;{item.price}</td>
                                            <td>
                                                <div style={{ width: 130 }}>
                                                    <div className="btn-group w-100">
                                                        <button className='btn btn-primary' onClick={() => updateRecord(item.id, "Dec")}><i className='bi bi-dash'></i></button>
                                                        <h4 className='w-50 text-center fs-5'>{item.quantity}</h4>
                                                        <button className='btn btn-primary' onClick={() => updateRecord(item.id, "Inc")}><i className='bi bi-plus'></i></button>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>&#8377;{item.total}</td>
                                            <td><button onClick={() => deleteRecord(item.id)} className='btn btn-danger'><i className='bi bi-trash'></i></button></td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="row">
                            <div className="col-md-6"></div>
                            <div className="col-md-6">
                                <table className='table table-bordered'>
                                    <tbody>
                                        <tr>
                                            <th>Subtotal</th>
                                            <td>&#8377;{subTotal}</td>
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
                                            <td colSpan={2}>
                                                <Link to="/checkout" className='btn btn-primary w-100'>Proceed to Checkout</Link>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    :
                    <div className='card p-5 m-5'>
                        <h4 className='text-center'>No Item in Cart</h4>
                        <Link className='btn btn-primary text-light' to="/shop">Shop Now</Link>
                    </div>}
            </div>
        </>
    )
}
