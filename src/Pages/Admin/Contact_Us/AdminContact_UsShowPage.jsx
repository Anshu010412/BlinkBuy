import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Swal from 'sweetalert2'

import AdminSidebar from '../../../Components/Admin/AdminSideBar'

import { getContact_Us, deleteContact_Us, updateContact_Us } from "../../../Redux/ActionCreators/ContactUsActionCreator"

export default function AdminContactUsShowPage() {

  let { id } = useParams()
  let [data, setData] = useState({})

  let Contact_UsStateData = useSelector(state => state.Contact_UsStateData)
  let dispatch = useDispatch()
  let navigate = useNavigate()

  function deleteRecord() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteContact_Us({ id: id }))

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        navigate("/admin/contact_us")
      }
    });
  }

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
        let updatedData = {
          ...data,
          status: !data.status
        }

        setData(updatedData)

        dispatch(updateContact_Us({ ...data }))

        Swal.fire({
          title: "Updated!",
          text: "Your record has been updated.",
          icon: "success"
        });
      }
    });
  }

  useEffect(() => {
    dispatch(getContact_Us())
  }, [dispatch])

  useEffect(() => {
    if (Contact_UsStateData?.length > 0) {
      let item = Contact_UsStateData.find(x => x.id === id)

      if (item) {
        setData({ ...item })
      } else {
        navigate("/admin/contact_us")
      }
    }
  }, [Contact_UsStateData, id, navigate])

  return (
    <>
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-lg-3">
            <AdminSidebar />
          </div>
          <div className="col-lg-9">
            <h5 className='bg-primary p-2 text-light text-center'>ContactUs Query
              <Link to="/admin/contact_us">
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
                    <th>Name</th>
                    <td>{data.name}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{data.email}</td>
                  </tr>
                  <tr>
                    <th>Phone</th>
                    <td>{data.phone}</td>
                  </tr>
                  <tr>
                    <th>Subject</th>
                    <td>{data.subject}</td>
                  </tr>
                  <tr>
                    <th>Message</th>
                    <td>{data.message}</td>
                  </tr>
                  <tr>
                    <th>Date</th>
                    <td>{data.date
                      ? new Date(data.date).toLocaleDateString("en-IN") : ""}</td>
                  </tr>
                  <tr>
                    <th>Status</th>
                    <td>{data.status ? "Active" : "Inactive"}</td>
                  </tr>
                  <tr>
                    <td colSpan={2}>{data.status ?
                      <button onClick={updateRecord} className='btn btn-primary w-100'>Update</button> :
                      <button onClick={deleteRecord} className='btn btn-danger w-100'>Delete</button>
                    }</td>
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