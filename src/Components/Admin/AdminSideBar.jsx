import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminSideBar() {
    return (
        <>
            <div className="list-group">
                <Link to="/admin" className="list-group-item list-group-item-action active mb-1">
                    <i className='bi bi-house fs-5'></i>
                    <span className='float-end'>Home</span>
                </Link>
                <Link to="/admin/maincategory" className="list-group-item list-group-item-action active mb-1">
                    <i className='bi bi-list fs-5'></i>
                    <span className='float-end'>Maincategory</span>
                </Link>
                <Link to="/admin/subcategory" className="list-group-item list-group-item-action active mb-1">
                    <i className='bi bi-list-ul fs-5'></i>
                    <span className='float-end'>Subcategory</span>
                </Link>
                <Link to="/admin/brand" className="list-group-item list-group-item-action active mb-1">
                    <i className='bi bi-tag fs-5'></i>
                    <span className='float-end'>Brand</span>
                </Link>
                <Link to="/admin/product" className="list-group-item list-group-item-action active mb-1">
                    <i className='bi bi-list-check fs-5'></i>
                    <span className='float-end'>Product</span>
                </Link>
                <Link to="/admin/features" className="list-group-item list-group-item-action active mb-1">
                    <i className='bi bi-check-circle fs-5'></i>
                    <span className='float-end'>Features</span>
                </Link>
                <Link to="/admin/faq" className="list-group-item list-group-item-action active mb-1">
                    <i className='bi bi-question-circle fs-5'></i>
                    <span className='float-end'>Faq</span>
                </Link>
                <Link to="/admin/setting" className="list-group-item list-group-item-action active mb-1">
                    <i className='bi bi-gear fs-5'></i>
                    <span className='float-end'>Setting</span>
                </Link>
                <Link to="/admin/newsletter" className="list-group-item list-group-item-action active mb-1">
                    <i className='bi bi-envelope fs-5'></i>
                    <span className='float-end'>Newsletter</span>
                </Link>
                <Link to="/admin/contact_us" className="list-group-item list-group-item-action active mb-1">
                    <i className='bi bi-telephone fs-5'></i>
                    <span className='float-end'>Contact Us</span>
                </Link>
                <Link to="/admin/checkout" className="list-group-item list-group-item-action active mb-1">
                    <i className='bi bi-cart fs-5'></i>
                    <span className='float-end'>Checkout</span>
                </Link>
                <Link to="/admin/user" className="list-group-item list-group-item-action active mb-1">
                    <i className='bi bi-people fs-5'></i>
                    <span className='float-end'>User</span>
                </Link>
            </div>
        </>
    )
}
