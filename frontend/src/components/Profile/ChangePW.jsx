import React, { useState } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import styles from "../../styles/styles";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { MdTrackChanges } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import {
  deleteUserAddress,
  loadUser,
  updatUserAddress,
  updateUserInformation,
} from "../../redux/actions/user";
import { Country, State } from "country-state-city";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Banner from '../../Assests/Baner.jpg'
import Header from "../Layout/Header";
import { BiArrowBack } from "react-icons/bi";

  const ChangePW = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const passwordChangeHandler = async (e) => {
      e.preventDefault();
  
      await axios
        .put(
          `${server}/user/update-user-password`,
          { oldPassword, newPassword, confirmPassword },
          { withCredentials: true }
        )
        .then((res) => {
          toast.success(res.data.success);
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    };
  return (
    <>
          <Header />
      <section className="mb-3 banner-profile">
      <button type="button" className="list-group-item list-group-item-action">
  <Link to="/account
  " className="single_item flex items-center cursor-pointer w-full">
    <BiArrowBack size={20} className="" />
    <div className="text-center fw-bold " style={{ margin: 'auto' }}>Thay đổi mật khẩu</div>
    <BiArrowBack size={20} className="text-white opacity-0" />
  </Link>
</button>
      </section>
      <div className="w-full px-5 banner-profile">
      <div className="w-full">
        <form
          aria-required
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center"
        >
          <div className=" w-[100%] mt-5">
            <label className="block pb-2 fw-bold">Nhập mật khẩu cũ</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%]`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%]  mt-2">
            <label className="block pb-2 fw-bold">Nhập mật khẩu mới</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%]`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] mt-2">
            <label className="block pb-2 fw-bold">Nhập lại mật khẩu mới</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
              className={`w-[95%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-4 cursor-pointer`}
              required
              value="Thay đổi"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
    </>

  );
};


export default ChangePW;
