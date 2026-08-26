import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Swal from 'sweetalert2'

import AdminSidebar from '../../../Components/Admin/AdminSideBar'

import { getCheckOut, updateCheckOut } from "../../../Redux/ActionCreators/CheckOutActionCreator"

export default function AdminCheckOutShowPage() {

  let { id } = useParams()
  let [data, setData] = useState({})

  let [orderStatus, setOrderStatus] = useState('')
  let [paymentStatus, setPaymentStatus] = useState('')

  let CheckOutStateData = useSelector(state => state.CheckOutStateData || [])
  let dispatch = useDispatch()
  let navigate = useNavigate()

  function updateRecord() {
    Swal.fire({
      title: "Are you sure?",
      text: "You Can revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!"
    }).then((result) => {
      if (result.isConfirmed) {
        data.orderStatus = orderStatus
        data.paymentStatus = paymentStatus
        dispatch(updateCheckOut({ ...data }))
        setData({ ...data })

        Swal.fire({
          title: "Updated!",
          text: "Your record has been updated.",
          icon: "success"
        });
      }
    });
  }

  useEffect(() => {
    dispatch(getCheckOut())
  }, [dispatch])

  useEffect(() => {
    if (CheckOutStateData.length > 0) {
      let item = CheckOutStateData.find(x => String(x.id) === String(id))

      if (item) {
        setData(item)
        setOrderStatus(item.orderStatus || "")
        setPaymentStatus(item.paymentStatus || "")
      }
    }
  }, [CheckOutStateData, id])

  return (
    <>
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-lg-3">
            <AdminSidebar />
          </div>
          <div className="col-lg-9">
            <h5 className='bg-primary p-2 text-light text-center'>CheckOut
              <Link to="/admin/checkout">
                <i className='bi bi-arrow-left text-light float-end'></i>
              </Link>
            </h5>
            <div className="table-responsive">
              <table className='table table-bordered'>
                <tbody>
                  <tr>
                    <th>Id</th>
                    <td>{data.id}</td>
                  </tr>
                  <tr>
                    <th>Buyer & Address</th>
                    <td>
                      <div className="card p-3">
                        <h6>{data.deliveryAddress?.name}</h6>
                        <p>{data.deliveryAddress?.phone}, {data.deliveryAddress?.email}</p>
                        <p>{data.deliveryAddress?.address}</p>
                        <p>{data.deliveryAddress?.pin},{data.deliveryAddress?.city},{data.deliveryAddress?.state}</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>Order Status</th>
                    <td>{data.orderStatus}
                      {data.orderStatus !== "Delivered" ?
                        <select className='form-select mt-3' onChange={(e) => setOrderStatus(e.target.value)} value={orderStatus}>
                          <option>Order Has Been Placed</option>
                          <option>Order Has Been Packed</option>
                          <option>Order is Ready to Ship</option>
                          <option>Order Has Been Shipped</option>
                          <option>Order Is In Transit</option>
                          <option>Order Has Been Reached At The Final Delivery Station</option>
                          <option>Order is Out For Delivery!</option>
                          <option>Delivered</option>
                        </select> : null}
                    </td>
                  </tr>
                  <tr>
                    <th>Payment Mode</th>
                    <td>{data.paymentMode}</td>
                  </tr>
                  <tr>
                    <th>Payment Status</th>
                    <td>{data.paymentStatus}

                      {data.paymentStatus !== "Done" ?
                        <select className='form-select mt-3' onChange={(e) => setPaymentStatus(e.target.value)} value={paymentStatus}>
                          <option>Pending</option>
                          <option>Done</option>
                        </select> : null}
                    </td>
                  </tr>
                  <tr>
                    <th>Subtotal</th>
                    <td>&#8377;{data.subtotal}</td>
                  </tr>
                  <tr>
                    <th>Shipping Charge</th>
                    <td>&#8377;{data.shipping}</td>
                  </tr>
                  <tr>
                    <th>Total Amount</th>
                    <td>&#8377;{data.total}</td>
                  </tr>
                  <tr>
                    <th>Date</th>
                    <td>{new Date(data.date).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <th>Rppid</th>
                    <td>{data.rppid || "N/A"}</td>
                  </tr>
                  <tr>
                    <td colSpan={2}>{data.orderStatus !== "Delivered" || data.paymentStatus !== "Done" ?
                      <button onClick={updateRecord} className='btn btn-primary w-100'>Update</button> :
                      null
                    }</td>
                  </tr>
                </tbody>
              </table>

              <div className="table-responsive">
                <h5>Products In This Order</h5>
                {data.product ?
                  <table className='table table-bordered'>
                    <thead>
                      <tr>
                        <th></th>
                        <th>Item</th>
                        <th>Color</th>
                        <th>Size</th>
                        <th>Brand</th>
                        <th>stock</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.product?.map(x => {
                        return <tr key={x.id}>
                          <td>
                            <Link to={`${import.meta.env.VITE_APP_IMAGE_SERVER}${x.image}`} target='_blank'>
                              <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${x.image}`} height={70} width={100} alt="" />
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
                          <td>{x.stockQuantity ? `${x.stockQuantity} Left in Stock` : "Out Of Stock"}</td>
                          <td>&#8377;{x.price}</td>
                          <td>{x.quantity}</td>
                          <td>&#8377;{x.total}</td>
                        </tr>
                      })}
                    </tbody>
                  </table>
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}