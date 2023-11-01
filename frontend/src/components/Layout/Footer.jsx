import React from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
  AiOutlineMail
} from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  footercompanyLinks,
  footerProductLinks,
  footerSupportLinks,
} from "../../static/data";
import Logo from '../../Assests/logo.png'
import Image from '../../Assests/da-dang-ky.png'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Footer = () => {
  return (
    <div className="footer text-white">
      
      <div className="md:flex md:justify-center md:items-center sm:px-12 px-4 bg-[orange] py-7">
        <h2 className="lg:text-2xl text-2xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5">
          <span className="text-[red]">Đăng ký </span> nhận thông tin từ Mộc tiệm An Yên
        </h2>

        <div className="d-flex">
          <input
            type="text"
            required
            placeholder="Nhập địa chỉ email..."
            className="text-gray-800
                sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 py-2.5 rounded px-2 focus:outline-none"
          />
          <button className="bg-[#56d879] hover:bg-teal-500 duration-300 px-5 py-2.5 rounded-md text-whie md:w-auto">
            Gửi
          </button>
        </div>

      </div>
      <div className="grid grid-cols-1 sm:gird-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-4 sm:text-center">
        <ul className="px-5 sm:text-start flex sm:block flex-col items-center">
          <img
            src={Logo}
            alt=""
            style={{ filter: "brightness(0) invert(1)", width: "145px"}}
          />
          <br />
          <p>Theo dõi chúng tôi tại</p>
          <div className="flex items-center mt-[15px]">
            <AiFillFacebook size={25} className="cursor-pointer" />
            <AiOutlineTwitter
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
            <AiFillInstagram
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
            <AiFillYoutube
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
             <AiOutlineMail
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
          </div>
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Về Mộc tiệm An Yên</h1>
          {footerProductLinks.map((link,index) => (
            <li key={index}>
              <Link
                className=" hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Hỗ trợ khách hàng</h1>
          {footercompanyLinks.map((link,index) => (
            <li key={index}>
              <Link
                className=" hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Tin tức</h1>
          {footerSupportLinks.map((link,index) => (
            <li key={index}>
              <Link
                className=" hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div
      >
 <footer className='py-2 pb-5'>
 <Container>

<Row>
  <Col xs={12} md={4}>
  <div className='justify-content-center align-items-center'>
              <h5 className='footer-name'>CÔNG TY CỔ PHẦN DƯỢC PHẨM HEALTH KEY VIỆT NAM</h5>
              <p className='footer-p'>Mã số doanh nghiệp: 0110326974 do Sở Kế hoạch và Đầu Tư Thành phố Hà Nội cấp ngày 19/04/2023 </p>
              {/* <p className='text-center mb-0 text-black'> &copy; {new Date().getFullYear()}: Desgin by TruongNQ.vn </p> */}
            </div>
  </Col>
  <Col xs={12} md={4}>
  <div className='d-block justify-content-center align-items-center'>
    <h5 className='footer-name'>ĐỊA CHỈ: </h5>
    <address className='footer-p'>Số nhà 03NV1 Khu nhà ở cán bộ 103, đường Nguyễn Khuyến, Phường Phúc La, Quận Hà Đông, Thành phố Hà Nội, Việt Nam</address>
  </div>
  </Col>
  <Col xs={12} md={4} className='mb-4'>

  </Col>
</Row>

</Container>
      </footer>
      </div>
    </div>
  );
};

export default Footer;
