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
  updateUserAddress,
  updateUserInformation,
} from "../../redux/actions/user";
import { Country, State } from "country-state-city";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { getAllOrdersOfUser } from "../../redux/actions/order";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Banner from '../../Assests/Baner.jpg'
import Header from "../../components/Layout/Header";
import { BiArrowBack } from "react-icons/bi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Helmet} from "react-helmet";
const Profile = ({ active }) => {
  const { user, error, successMessage } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [birthDay, setBirthDay] = useState(
    user && user.birthDay ? new Date(user.birthDay) : null
  );
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "clearMessages" });
    }
  }, [error, successMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInformation(name, email, phoneNumber, password, birthDay));
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();

    formData.append("image", e.target.files[0]);

    await axios
      .put(`${server}/user/update-avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((response) => {
         dispatch(loadUser());
         toast.success("avatar updated successfully!");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  
  return (
    <>
             <Helmet>
                <meta charSet="utf-8" />
                <title>Thông tin tài khoản</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
          <Header />
      <section className="mb-3 banner-profile">
      <button type="button" className="list-group-item list-group-item-action">
  <Link to="/account" className="single_item flex items-center cursor-pointer w-full">
    <BiArrowBack size={20} className="" />
    <div className="text-center fw-bold " style={{ margin: 'auto' }}>Thông tin cá nhân</div>
    <BiArrowBack size={20} className="text-white opacity-0" />
      </Link>
    </button>
      </section>
        <div className="w-full banner-profile mb-5">
          <div className="w-full px-3">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full block ">
                <div className=" w-[100%] pb-3">
                  <label className="block pb-2 fw-bold">Họ và tên</label>
                  <input
                    type="text"
                    className={`${styles.input}`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className=" w-[100%] pb-3">
                  <label className="block pb-2 fw-bold">Địa chỉ Email</label>
                  <input
                    type="text"
                    className={`${styles.input}`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <Row>
              <Col xs={6}>
              <div className="block pb-3">
                <div className=" w-[100%]">
                  <label className="block pb-2 fw-bold">Số điện thoại</label>
                  <input
                    type="number"
                    className={`${styles.input}`}
                    required
                    readOnly
                    value={`0${phoneNumber}`} 
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
              </Col>
              <Col xs={6}>
              <div className="w-[100%] block pb-3">
                  <label className="block pb-2 fw-bold">Ngày sinh</label>
                  <DatePicker
                  selected={birthDay}
                  onChange={(date) => setBirthDay(date)}
                  dateFormat="dd/MM/yyyy"
                  className={`${styles.input} `}
                  required
                />
                </div>
              </Col>
            </Row>
              <input
                className={`w-[100%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] cursor-pointer`}
                required
                value="Cập nhật"
                type="submit"
              />
            </form>
          </div>
     </div>
    </>
  );
};


export default Profile;
