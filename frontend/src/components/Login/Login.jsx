import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
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

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${server}/user/login-user`,
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Login Success!");
        navigate("/");
        window.location.reload(true);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Đăng nhập tài khoản</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {/* <Header /> */}
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
                  <h3 className="text-3xl font-semiblod mb-2">Đăng nhập</h3>
                  <p className="text-2sm font-normal text-[#060606]">
                    Chào mừng bạn đến với Eco Bắc Giang{" "}
                  </p>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="w-full flex flex-col">
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

                  <div className="w-full flex items-center justify-between mt-2">
                    <div className="w-full flex items-center ">
                      <input
                        type="checkbox"
                        id="remember-me"
                        name="remember-me"
                        className="w-4 h-4 mr-2"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 block text-2sm text-gray-900"
                      >
                        Lưu mật khẩu
                      </label>
                    </div>
                    <Link
                    to="/quen-mat-khau"
                    className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2 ">
                      {" "}
                      Quên mật khẩu?
                    </Link>
                  </div>

                  <div className="w-full flex flex-col mt-3">
                    <button
                      type="submit"
                      className="w-full bg-[green] text-white my-2 rounded-md p-3 text-center flex items-center justify-center"
                    >
                      Đăng nhập
                    </button>
                  </div>

                  <div className="w-full flex items-center justify-center mt-3">
                    <p className="text-2sm font-normal text-[#060606]">
                      Bạn chưa có tài khoản{" "}
                      <Link
                        to="/sign-up"
                        className="font-semibold underline underline-offset-2 cursor-pointer"
                      >
                        {" "}
                        Đăng ký
                      </Link>{" "}
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Col>
        {/* <Col xs={12} md={7}>
        <div className=" flex flex-col justify-center py-5 ">
      <div className="">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Đăng nhập
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className=" appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Mật khẩu
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>
            <div className={`${styles.noramlFlex} justify-between`}>
              <div className={`${styles.noramlFlex}`}>
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Lưu mật khẩu
                </label>
              </div>
              <div className="text-sm">
                <a
                  href=".forgot-password"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Quên mật khẩu
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Đăng nhập
              </button>
            </div>
            <div className={`${styles.noramlFlex} w-full`}>
              <h4>Bạn chưa có tài khoản?</h4>
              <Link to="/sign-up" className="text-blue-600 pl-2">
                Đăng ký
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
        </Col> */}
      </Row>
      {/* <Footer /> */}
    </>
  );
};

export default Login;
