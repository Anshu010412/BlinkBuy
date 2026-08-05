import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import AdminSideBar from '../../../Components/Admin/AdminSideBar'
import { Link } from 'react-router-dom'

import { getProduct, deleteProduct } from '../../../Redux/ActionCreators/ProductActionCreator'
import { useDispatch, useSelector } from 'react-redux'

import DataTable from 'datatables.net-dt';
import "datatables.net-dt/css/dataTables.dataTables.min.css"

export default function AdminProductPage() {
  let [data, setData] = useState([])

  let ProductStateData = useSelector(state => state.ProductStateData)
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

        dispatch(deleteProduct({ id: id }))

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
      dispatch(getProduct())
      if (ProductStateData.length) {
        setData(ProductStateData);
        let time = setTimeout(() => {
          new DataTable('#myTable')
        }, 500);
        return time
      }
    })();
    return () => clearTimeout(time)
  }, [ProductStateData.length]);

  return (
    <>
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-lg-3">
            <AdminSideBar />
          </div>
          <div className="col-lg-9">
            <h5 className='p-2 text-light text-center bg-primary'>Product
              <Link to="/admin/product/create">
                <i className='bi bi-plus text-light float-end'></i>
              </Link>
            </h5>
            <div className="table-responsive">
              <table className='table table-bordered text-center' id='myTable'>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>MainCategory</th>
                    <th>SubCategory</th>
                    <th>Brand</th>
                    <th>Color</th>
                    <th>Size</th>
                    <th>Base Price</th>
                    <th>Discount</th>
                    <th>Final Price</th>
                    <th>Stock</th>
                    <th>Stock Quantity</th>
                    <th>Image</th>
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
                      <td>{item.maincategory}</td>
                      <td>{item.subcategory}</td>
                      <td>{item.brand}</td>
                      <td>{item.color?.join(",")}</td>
                      <td>{item.size?.join(",")}</td>
                      <td>&#8377;{item.basePrice}</td>
                      <td>{item.discount}% OFF</td>
                      <td>&#8377;{item.finalPrice}</td>
                      <td>{item.stock ? "In Stock" : "Out of Stock"}</td>
                      <td>{item.stockQuantity}</td>
                      <td>
                        <div style={{ width: "350px" }}>
                          {item.image?.map((image, index) => {
                            return <Link to={`${import.meta.env.VITE_APP_IMAGE_SERVER}${image}`} target='_blank' key={index}>
                              <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${image}`} className="img-contain-fluid m-1" height={60} width={60} alt="Product Image" />
                            </Link>
                          })}
                        </div>
                      </td>
                      <td>{item.status ? "Active" : "InActive"}</td>
                      <td><Link to={`/admin/product/update/${item.id}`} className='btn btn-primary'><i className='bi bi-pencil-square'></i></Link></td>
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
