import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import AdminSideBar from '../../../Components/Admin/AdminSideBar'

import { getCheckOut } from '../../../Redux/ActionCreators/CheckOutActionCreator'

import DataTable from 'datatables.net-dt';
import "datatables.net-dt/css/dataTables.dataTables.min.css"

import Swal from 'sweetalert2'

export default function AdminCheckOutPage() {
  let [data, setData] = useState([])

  let CheckOutStateData = useSelector(state => state.CheckOutStateData)
  let dispatch = useDispatch()

  useEffect(() => {
    let time = (() => {
      dispatch(getCheckOut())
      if (CheckOutStateData.length) {
        setData(CheckOutStateData)
        let time = setTimeout(() => {
          new DataTable('#myTable');
        }, 500)
        return time
      }
    })()
    return () => clearTimeout(time)
  }, [CheckOutStateData.length])

  return (
    <>
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-lg-3">
            <AdminSideBar />
          </div>
          <div className="col-lg-9">
            <h5 className='p-2 text-light text-center bg-primary'>CheckOut</h5>
            <div className="table-responsive">
              <table className='table table-bordered text-center' id='myTable'>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name & Add</th>
                    <th>Order Status</th>
                    <th>Payment Mode</th>
                    <th>Payment Status</th>
                    <th>Total</th>
                    <th>Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(item => {
                    return <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.deliveryAddress?.name},{item.deliveryAddress?.city}</td>
                      <td>{item.orderStatus}</td>
                      <td>{item.paymentMode}</td>
                      <td>{item.paymentStatus}</td>
                      <td>&#8377;{item.total}</td>
                      <td>{new Date(item.date).toLocaleDateString()}</td>
                      <td><Link to={`/admin/checkout/show/${item.id}`} className='btn btn-primary'><i className='bi bi-eye'></i></Link></td>
                    </tr>
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
