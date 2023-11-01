import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Banner from "../../Assests/350.jpg";
import logo from "../../Assests/logo.png";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import { Helmet } from "react-helmet";
import * as yup from "yup";
import { useFormik } from "formik";
const Singup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const newForm = new FormData();

    newForm.append("file", avatar);
    newForm.append("name", name);
    newForm.append("email", email);
    newForm.append("password", password);

    axios
      .post(`${server}/user/create-user`, newForm, config)
      .then((res) => {
        toast.success(res.data.message);
        setName("");
        setEmail("");
        setPassword("");
        setAvatar();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <> 
    <Helmet>
    <meta charSet="utf-8" />
    <title>Đăng ký tài khoản</title>
    <link rel="canonical" href="http://mysite.com/example" />
  </Helmet>
  <Row>
    <Col xs={12} md={12}>
      <div className="w-full h-screen flex items-start">
        <div className="relative w-1/2 h-full flex flex-col">
          <div className="absolute top-[10%] left-[10%] pr-5 flex flex-col">
            {/* <h1 className="text-4xl text-black font-bold my-4">
      Welcome to Eco Bắc Giang
      </h1> */}
            {/* <p className="text-base text-black font-semibold">
      Thuận tự nhiên là tôn chỉ của chúng tôi trong quá trình chăn nuôi, trồng cấy các sản phẩm để cung cấp đến người tiêu dung tại hệ thống chuỗi thực phẩm sạch Eco BacGiang.
      </p> */}
          </div>
          <img src={Banner} className="w-full h-full object-cover" />
        </div>

        <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col p-[6rem] justify-between items-center">
          <img src={logo} style={{ width: "30%" }} />
          <div className="w-full flex flex-col max-w-[400px]">
            <div className="w-full flex flex-col mb-2">
              <h3 className="text-3xl font-semiblod mb-2">Đăng ký tài khoản</h3>
              <p className="text-2sm font-normal text-[#060606]">
                Chào mừng bạn đến với Eco Bắc Giang{" "}
              </p>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="w-full flex flex-col">
              <input
                   type="text"
                   name="text"
                   autoComplete="name"
                   required
                   value={name}
                   onChange={(e) => setName(e.target.value)}
                  placeholder="Họ và tên"
                  className="w-full pl-3 py-4 my-2 text-black bg-transparent border-b border-black outline-none focus:outline-none"
                />
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập địa chỉ email"
                  className="w-full pl-3 py-4 my-2 text-black bg-transparent border-b border-black outline-none focus:outline-none"
                />
                <div className="relative flex items-center justify-between ">
                  <input
                    type={visible ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu"
                    className="w-full pl-3 py-4 my-2 text-black bg-transparent border-b border-black outline-none focus:outline-none"
                  />
                  {visible ? (
                    <AiOutlineEye
                      className="absolute right-4 cursor-pointer"
                      size={25}
                      onClick={() => setVisible(false)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className="absolute right-4 cursor-pointer"
                      size={25}
                      onClick={() => setVisible(true)}
                    />
                  )}
                </div>
              </div>
              <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700"
              ></label>
              <div className="mt-2 flex items-center">
                <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                  {avatar ? (
                    <img
                      src={URL.createObjectURL(avatar)}
                      alt="avatar"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <RxAvatar className="h-8 w-8" />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <span>Upload ảnh đại diện</span>
                  <input
                    type="file"
                    name="avatar"
                    id="file-input"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileInputChange}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
              <div className="w-full flex flex-col mt-3">
                <button
                  type="submit"
                  className="w-full bg-[green] text-white my-2 rounded-md p-3 text-center flex items-center justify-center"
                >
                  Đăng ký
                </button>
              </div>

              <div className="w-full flex items-center justify-center mt-3">
                <p className="text-2sm font-normal text-[#060606]">
                  Bạn đã có tài khoản{" "}
                  <Link
                    to="/login"
                    className="font-semibold underline underline-offset-2 cursor-pointer"
                  >
                    {" "}
                    Đăng nhập
                  </Link>{" "}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      </Col>

      </Row>
    </>
  );
};

export default Singup;
