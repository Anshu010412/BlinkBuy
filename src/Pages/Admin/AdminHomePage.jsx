import React from 'react'
import AdminSideBar from '../../Components/Admin/AdminSideBar'
import Profile from '../../Components/User/Profile'

export default function AdminHomePage() {
  return (
    <>
      <div className="container-fluid my-3">
        <div className="row">
            <div className="col-lg-3">
                <AdminSideBar/>
            </div>
            <div className="col-lg-9">
                <h5 className='p-2 text-light text-center bg-primary'>Admin</h5>
                <Profile/>
            </div>
        </div>
      </div>
    </>
  )
}
