import React, { useState } from "react";
import { AiOutlineLogin, AiOutlineMessage,AiOutlineCamera } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import {
  MdOutlineAdminPanelSettings,
} from "react-icons/md";
import { MdPlace } from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { BsHeadphones,BsCalendarCheck, BsChevronRight} from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server,backend_url } from "../../../server";
import { toast } from "react-toastify";
import { useSelector,useDispatch } from "react-redux";
import {loadUser,} from "../../../redux/actions/user";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Banner from '../../../Assests/Baner.jpg'

const ProfileSidebar = ({ setActive, active }) => {
  const navigate = useNavigate();
 const {user} = useSelector((state) => state.user);
 const [avatar, setAvatar] = useState(null);
 const dispatch = useDispatch();

  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
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
         toast.success("Cập nhập ảnh đại diện thành công!");
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  return (
    <>
    <section className="banner-profile">
    <div className="relative">
        <img src={Banner}/>
      <Container className="absolute banner-infor">
      <Row className="d-flex align-items-center" >
        <Col xs={12} className="d-flex">
        <div className="">
            <div className="relative">
              <img
                src={`${backend_url}${user?.avatar}`}
                className="w-[50px] h-[50px]  rounded-full object-cover border-[2px] border-[white]"
                alt=""
                style={{maxWidth:"revert"}}
              />
              <div className="w-[15px] h-[15px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[2px] right-[2px]">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImage}
                />
                <label htmlFor="image">
                  <AiOutlineCamera />
                </label>
              </div>
            </div>
          </div>
          <div className="slidebar-acount">
          <h4>{user?.name}</h4>
          <div className="flex items-center cursor-pointer w-full">
            <Link to='/profile'>
      <span className="text-[white] fw-bold "
      >
          Thông tin tài khoản
        </span>
        </Link>

      </div>
        </div>
        </Col>
      </Row>
    </Container>
      </div>
    </section>

    <section className="banner-profile">
    <div class="list-group">
  <button type="button" class="list-group-item list-group-item-action">
  <Link to="/account/quan-ly-don-hang" className="single_item flex items-center cursor-pointer w-full">
        <HiOutlineShoppingBag size={20} className=""/> <div className="pl-3"> Quản lý đơn hàng</div>
  </Link>
    </button>
  <button type="button" class="list-group-item list-group-item-action">
  <Link to="/account/so-dia-chi" className="single_item flex items-center cursor-pointer w-full">
        <TbAddressBook size={20} className=""/> <div className="pl-3"> Sổ địa chỉ</div> 
  </Link>
    </button>
    <button type="button" class="list-group-item list-group-item-action">
  <Link to="/account/doi-mat-khau" className="single_item flex items-center cursor-pointer w-full">
        <RiLockPasswordLine size={20} className=""/> <div className="pl-3"> Thay đổi mật khẩu </div> 
  </Link>
  </button>
  <button type="button" class="list-group-item list-group-item-action">
  <Link to="/account/so-dia-chi" className="single_item flex items-center cursor-pointer w-full">
        <BsCalendarCheck size={20} className=""/> <div className="pl-3"> Chính sách và điều khoản </div> 
  </Link>
  </button>
  <button type="button" class="list-group-item list-group-item-action contact-menu">
  <div className="single_item flex items-center cursor-pointer w-full">
        <BsHeadphones size={20} className=""/> <div className="pl-3"> Liên hệ đặt hàng </div> <span className="pl-2"> 0979 84 2701</span>
      </div>
  </button>
  <button type="button" class="list-group-item list-group-item-action">
  <div
        className="single_item flex items-center cursor-pointer w-full"
        onClick={logoutHandler}
      >
        <AiOutlineLogin size={20} color={active === 8 ? "red" : ""} />
        <span
          className={`pl-3 text-black ${
            active === 8 ? "text-[red]" : ""
          }`}
        >
          Đăng xuất
        </span>
      </div>

  </button>
</div>
    </section>


    </>
  );
};

export default ProfileSidebar;
