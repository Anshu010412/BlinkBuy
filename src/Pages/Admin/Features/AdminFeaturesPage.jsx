import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import AdminSideBar from '../../../Components/Admin/AdminSideBar'
import { Link } from 'react-router-dom'

import { getFeatures, deleteFeatures } from '../../../Redux/ActionCreators/FeaturesActionCreator'

import { useDispatch, useSelector } from 'react-redux'

import DataTable from 'datatables.net-dt';
import "datatables.net-dt/css/dataTables.dataTables.min.css"

export default function AdminFeaturesPage() {
  let [data, setData] = useState([])

  let FeaturesStateData = useSelector(state => state.FeaturesStateData)
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

        dispatch(deleteFeatures({ id: id }))

        setData(data = data.filter(x => x.id !== id))
        Swal.fire({
          title: "Deleted!",
          text: "Your Product has been deleted.",
          icon: "success"
        });
      }
    });
  }

  useEffect(() => {
    let time = (() => {
      dispatch(getFeatures())
      if (FeaturesStateData.length) {
        setData(FeaturesStateData);
        let time = setTimeout(() => {
          new DataTable('#myTable')
        }, 500);
        return time
      }
    })();
    return () => clearTimeout(time)
  }, [FeaturesStateData.length]);

  return (
    <>
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-lg-3">
            <AdminSideBar />
          </div>
          <div className="col-lg-9">
            <h5 className='p-2 text-light text-center bg-primary'>Features
              <Link to="/admin/features/create">
                <i className='bi bi-plus text-light float-end'></i>
              </Link>
            </h5>
            <div className="table-responsive">
              <table className='table table-bordered text-center' id='myTable'>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Icons</th>
                    <th>Short Description</th>
                    <th>Status</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(item => {
                    return <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td><span className='fs-1' dangerouslySetInnerHTML={{ __html: item.icon }} /></td>
                      <td>{item.shortDescription}</td>
                      <td>{item.status ? "Active" : "InActive"}</td>
                      <td><Link to={`/admin/features/update/${item.id}`} className='btn btn-primary'><i className='bi bi-pencil-square'></i></Link></td>
                      <td><button onClick={() => deleteRecord(item.id)} className='btn btn-danger'><i className='bi bi-trash'></i></button></td>
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
