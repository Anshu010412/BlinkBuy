import React, { useEffect, useState } from 'react'
import { getCheckOut } from '../../Redux/ActionCreators/CheckOutActionCreator'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Swal from 'sweetalert2'
import { toast } from 'react-toastify'

export default function Orders() {
  let [data, setData] = useState([])

  let CheckOutStateData = useSelector(state => state.CheckOutStateData)
  let dispatch = useDispatch()

  useEffect(() => {
    (() => {
      dispatch(getCheckOut())
      if (CheckOutStateData.length) {
        setData(CheckOutStateData.filter(x => x.user === localStorage.getItem("userid")))
      }
    })()
  }, [CheckOutStateData.length])

  function deleteOrder(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      let response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_SERVER}/checkout/${id}`,
        {
          method: "DELETE"
        }
      )

      if (response.ok) {
        setData(prevData => prevData.filter(x => x.id !== id))
      }
      toast.success("Order Has Been Deleted!!!");

      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    })
  }

  return (
    <>
      {data.length ?
        <div className='my-3'>
          <div className='d-flex justify-content-end mb-3'>
            <h5 className='mb-0'>
              Total Orders: <span className='badge bg-primary'>{data.length}</span>
            </h5>
          </div>
          {data.map((item, index) => {
            return <div className="card px-3 py-2 mb-3 border-secondary" key={index}>
              <div className='d-flex justify-content-between mb-2 align-items-center'>
                <h5>Order Details</h5>
                <button className='btn btn-danger' onClick={() => deleteOrder(item.id)}><i className='bi bi-trash'></i></button>
              </div>
              <div className='table-responsive'>
                <table className='table table-bordered mb-0'>
                  <thead>
                    <tr>
                      <th>Order Id</th>
                      <th>Order Status</th>
                      <th>Payment Mode</th>
                      <th>Payment Status</th>
                      <th>Subtotal</th>
                      <th>Shipping</th>
                      <th>Total</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.orderStatus}</td>
                      <td>{item.paymentMode}</td>
                      <td>{item.paymentStatus}</td>
                      <td>&#8377;{item.subtotal}</td>
                      <td>&#8377;{item.shipping}</td>
                      <td>&#8377;{item.total}</td>
                      <td>{new Date(item.date)?.toLocaleDateString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h5 className='mt-3'>Product In this Order</h5>
              {item.product ?
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
                        <th></th>
                      </tr>
                    </thead>

                    <tbody>
                      {item.product?.map((x, index) => {
                        return <tr key={index}>
                          <td><Link target='_blank' to={`${import.meta.env.VITE_APP_IMAGE_SERVER}${x.image}`}>
                            <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${x.image}`} height={70} width={70} alt={x.name} />
                          </Link>
                          </td>
                          <td>{x.name}</td>
                          <td>
                            <div style={{ width: 100 }}>
                              {x.color}
                            </div>
                          </td>
                          <td>
                            <div style={{ width: 100 }}>
                              {x.size}
                            </div>
                          </td>
                          <td>{x.brand}</td>
                          <td>{x.stockQuantity - x.quantity > 0
                            ? `${x.stockQuantity - x.quantity} Left in Stock`
                            : "Out Of Stock"
                          }</td>
                          <td>&#8377;{x.price}</td>
                          <td>{x.quantity}</td>
                          <td>&#8377;{x.total}</td>
                          <td><Link className='btn btn-primary' to={`/product/${x.product}`}>Buy Again</Link></td>
                          <td>{item.orderStatus === "Delivered" ? <button className='btn btn-primary'>Give Review</button> : null}</td>
                        </tr>
                      })}
                    </tbody>
                  </table>
                </div>
                : null}
            </div>
          })}
        </div>
        :
        <div className='card p-5 m-5 text-center'>
          <h4>No Order History</h4>
          <Link className='btn btn-primary text-light' to="/shop">Shop Now</Link>
        </div>}
    </>
  )
}
