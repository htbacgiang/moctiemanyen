import React from 'react'
import AdminHeader from '../components/Layout/AdminHeader'
import AdminSideBar from '../components/Admin/Layout/AdminSideBar'
import CreateBlog from '../components/Admin/CreateBlog.jsx';

const AdminCreateProduct = () => {
  return (
    <div>
    <AdminHeader />
    <div className="w-full flex">
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={6} />
        </div>
        <CreateBlog />
      </div>
    </div>
  </div>
  )
}

export default AdminCreateProduct