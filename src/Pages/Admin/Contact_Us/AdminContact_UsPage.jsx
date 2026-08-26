import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import AdminSideBar from '../../../Components/Admin/AdminSideBar'
import { Link } from 'react-router-dom'

import { getContact_Us, deleteContact_Us, updateContact_Us } from '../../../Redux/ActionCreators/ContactUsActionCreator'

import { useDispatch, useSelector } from 'react-redux'

import DataTable from 'datatables.net-dt';
import "datatables.net-dt/css/dataTables.dataTables.min.css"
import { toast } from 'react-toastify'

export default function AdminContact_UsPage() {
  let [data, setData] = useState([])
  let [flag, setFlag] = useState(false)

  let Contact_UsStateData = useSelector(state => state.Contact_UsStateData)
  let dispatch = useDispatch()

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

        dispatch(deleteContact_Us({ id: id }))

        setData(data = data.filter(x => x.id !== id))
        Swal.fire({
          title: "Deleted!",
          text: "Your Product has been deleted.",
          icon: "success"
        });
      }
    });
  }

  function updateRecord(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You can be revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update it!"
    }).then((result) => {
      if (result.isConfirmed) {
        let item = data.find(x => x.id === id)
        let index = data.findIndex(x => x.id === id)

        dispatch(updateContact_Us({ ...item, status: !item.status }))
        data[index] = { ...item, status: !item.status }

        setData(data)
        setFlag(!flag)

        Swal.fire({
          title: "Updated!",
          text: "Your Product has been Updated.",
          icon: "success",
        });
        toast.success("Status Has Been Updated!")
      }
    });
  }

  useEffect(() => {
    let time = (() => {
      dispatch(getContact_Us())
      if (Contact_UsStateData.length) {
        setData(Contact_UsStateData)
        let time = setTimeout(() => {
          new DataTable('#myTable');
        }, 500)
        return time
      }
    })()
    return () => clearTimeout(time)
  }, [Contact_UsStateData.length])

  return (
    <>
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-lg-3">
            <AdminSideBar />
          </div>
          <div className="col-lg-9">
            <h5 className='p-2 text-light text-center bg-primary'>Contact Us</h5>
            <div className="table-responsive">
              <table className='table table-bordered text-center' id='myTable'>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>subject</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(item => {
                    return <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.subject}</td>
                      <td>{new Date(item.date).toLocaleDateString()}</td>
                      <td onClick={() => updateRecord(item.id)}>{item.status ? "Active" : "InActive"}</td>
                      <td><Link to={`/admin/contact_us/show/${item.id}`} className='btn btn-primary'><i className='bi bi-eye'></i></Link></td>
                      <td>{item.status ? null : <button onClick={() => deleteRecord(item.id)} className='btn btn-danger'><i className='bi bi-trash'></i></button>}</td>
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
