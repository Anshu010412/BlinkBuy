import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

import { useDispatch, useSelector } from 'react-redux'

import { getWishList, deleteWishList } from '../../Redux/ActionCreators/WishListActionCreator'

export default function Wishlist() {
    let [data, setData] = useState([])

    let WishListStateData = useSelector(state => state.WishListStateData)
    let dispatch = useDispatch()

    useEffect(() => {
        (() => {
            dispatch(getWishList())
            if (WishListStateData.length) {
                setData(WishListStateData.filter(x => x.user === localStorage.getItem("userid")))
            }
        })()
    }, [WishListStateData.length])

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

                dispatch(deleteWishList({ id: id }))

                setData(data = data.filter(x => x.id !== id))
                Swal.fire({
                    title: "Deleted!",
                    text: "Your Product has been deleted.",
                    icon: "success"
                });
            }
        });
    }

    return (
        data.length ?
            <div className='my-3'>
                <div className="table-responsive">
                    <table className='table table-bordered  table-striped'>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Item</th>
                                <th>Color</th>
                                <th>Size</th>
                                <th>Brand</th>
                                <th>Stock</th>
                                <th>Price</th>
                                <th></th>
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
                                            {item.color?.join(", ")}
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ width: 100 }}>
                                            {item.size?.join(", ")}
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ width: 100 }}>
                                            {item.brand}
                                        </div>
                                    </td>
                                    <td>{item.stockQuantity ? `${item.stockQuantity} Left in Stock` : "Out of Stock"}</td>
                                    <td>&#8377;{item.price}</td>
                                    <td><Link to={`/product/${item.product}`} className='btn btn-primary'><i className='bi bi-cart-plus'></i></Link></td>
                                    <td><button onClick={() => deleteRecord(item.id)} className='btn btn-danger'><i className='bi bi-trash'></i></button></td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            :
            <div className='card p-5 m-5'>
                <h4>No Item in Wishlist</h4>
                <Link className='btn btn-primary text-light' to="/shop">Shop Now</Link>
            </div>
    )
}
