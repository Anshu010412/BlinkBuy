import React from 'react'
import AdminSideBar from '../../../Components/Admin/AdminSideBar'
import { Link } from 'react-router-dom'

export default function AdminMaincategoryPage() {
  return (
    <>
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-lg-3">
            <AdminSideBar />
          </div>
          <div className="col-lg-9">
            <h5 className='p-2 text-light text-center bg-primary'>Main Category
              <Link to="/admin/maincategory/create">
                <i className='bi bi-plus text-light float-end'></i>
              </Link>
            </h5>
          </div>
        </div>
      </div>
    </>
  )
}
