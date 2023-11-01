import React, { useState,useRef } from "react";
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
import { AiOutlinePlus } from "react-icons/ai";
import Container from 'react-bootstrap/Container';

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
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BiArrowBack } from "react-icons/bi";
import {Helmet} from "react-helmet";
const ProfileContent = ({ active }) => {
  const { user, error, successMessage } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");
  const [birthDay, setBirthDay] = useState(
    user && user.birthDay ? new Date(user.birthDay) : null
  );
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
    dispatch(updateUserInformation(name, email, phoneNumber, password));
  };



  return (
    <div className="w-full shadow-sm rounded-[10px] p-3 bg-[white] profile ">
       <Helmet>
                <meta charSet="utf-8" />
                <title>Thông tin tài khoản</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
      {/* profile */}
      {active === 1 && (
        <>
        
        <div className="profile-pc"> 
        <h3 className=""> Thông tin tài khoản </h3>
          <div className="w-full px-2 ">
            <form onSubmit={handleSubmit} aria-required={true}>
              <Row className="mt-4">
                <Col xs={12} md={12}>
                <div className="profile">
                  <label className="block pb-2">Họ và tên</label>
                  <input
                    type="text"
                    className={`${styles.input} mb-2`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                </Col>
                <Col xs={12} md={12}>
                <div className="">
                  <label className="block pb-2 ">Địa chỉ Email</label>
                  <input
                    type="text"
                    className={`${styles.input} mb-4 `}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                </Col>
                <Row>
              <Col md={6}>
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
              <Col md={6}>
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
                <Col xs={12} md={12}>
                <input
                className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] cursor-pointer`}
                required
                value="Cập nhật"
                type="submit"
              />
              </Col>
              </Row>
            </form>
          </div>
        </div>
        </>
      )}

      {/* order */}
      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}

      {/* Track order */}
      {active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )}

      {/* Change Password */}
      {active === 6 && (
        <div>
          <ChangePassword />
        </div>
      )}

      {/*  user Address */}
      {active === 7 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  );
};

const AllOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, []);

  const columns = [
    { field: "id", headerName: "ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Trạng thái",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Số lượng",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Tổng",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: item.totalPrice.toLocaleString(navigator.language, {
          minimumFractionDigits: 0,
        }) + "đ",
        status: item.status,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

// 

const TrackOrder = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, []);

  const columns = [
    { field: "id", headerName: "ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Trạng thái",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Số lượng",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Tổng",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/track/order/${params.id}`}>
              <Button>
                <MdTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: item.totalPrice.toLocaleString(navigator.language, {
          minimumFractionDigits: 0,
        }) + "đ",
        status: item.status,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const ChangePassword = () => {
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
    <div className="w-full px-5">
      <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2">
        Change Password
      </h1>
      <div className="w-full">
        <form
          aria-required
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center"
        >
          <div className=" w-[100%] 800px:w-[50%] mt-5">
            <label className="block pb-2">Enter your old password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter your new password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter your confirm password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
              className={`w-[95%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
              required
              value="Update"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

const Address = () => {
  const [open, setOpen] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [wards, setWards] = useState([]);
  const [selectedWard, setSelectedWard] = useState('');
  const [address, setAddress] = useState(''); 
  const [addressType, setAddressType] = useState('Mặc định'); 
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    // Lấy danh sách tỉnh thành
    axios.get('https://vapi.vnappmob.com/api/province').then((response) => {
      setProvinces(response.data.results);
    });
  }, []);


  const handleProvinceChange = (event) => {
    const provinceId = event.target.value;
    setSelectedProvince(provinceId);
    // Reset the selected district and wards
    setSelectedDistrict('');
    setSelectedWard('');
    setDistricts([]);
    setWards([]);
    // Fetch the list of districts based on the selected province
    axios
      .get(`https://vapi.vnappmob.com/api/province/district/${provinceId}`)
      .then((response) => {
        setDistricts(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleDistrictChange = (event) => {
    const districtId = event.target.value;
    setSelectedDistrict(districtId);
    setSelectedWard('');
    setWards([]);

    // Fetch the list of wards based on the selected district
    axios
      .get(`https://vapi.vnappmob.com/api/province/ward/${districtId}`)
      .then((response) => {
        setWards(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedProvinceName = provinces.find((province) => province.province_id === selectedProvince)?.province_name || '';
    const selectedDistrictName = districts.find((district) => district.district_id === selectedDistrict)?.district_name || '';
    const selectedWardName = wards.find((ward) => ward.ward_id === selectedWard)?.ward_name || '';
    const fullAddress = `${address}, ${selectedWardName}, ${selectedDistrictName}, ${selectedProvinceName}`;
    setFullAddress(fullAddress);
    await dispatch(
      updateUserAddress(
        fullAddress,
        addressType,
        fullName,
        phoneNumber
      )
    );

    // Update addressType based on the condition
    if (addressType === 'Mặc định') {
      setAddressType(''); // Set addressType to empty string after the first submit
    } else {
      setAddressType('Mặc định'); // Set addressType to 'Mặc định' for subsequent submits
    }

    // Reset form state variables
    setOpen(false);
    setSelectedProvince('');
    setSelectedDistrict('');
    setSelectedWard('');
    setAddress('');
    setFullAddress('');
    setFullName('');
    setPhoneNumber('');
  };

  const handleDelete = (item) => {
    const id = item._id;
    dispatch(deleteUserAddress(id));
  };
  const resetForm = () => {
    setOpen(false);
    setSelectedProvince('');
    setSelectedDistrict('');
    setSelectedWard('');
    setAddress('');
    setFullName('');
    setPhoneNumber('');
    setFullAddress('');
    setAddressType('');
  };
  return (
    <div className="w-full px-5">
      {open && (
        <div 
        className="fixed w-full top-6 left-0 flex items-center justify-center "
        >
          <div className="w-[35%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={resetForm}
              />
            </div>
            <h1 className="text-center text-[25px] font-Poppins">
              Thêm địa chỉ mới
            </h1>
            <div className="w-full">
              <form key={open ? 'open' : 'closed'} aria-required onSubmit={handleSubmit} className="w-full">
                <div className="w-full block p-4">
                <div className="w-full pb-2">
                    <label className="block pb-2"> Họ tên khách hàng</label>
                    <input
                      type="text"
                      className={`${styles.input}`}
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div className="w-full pb-2">
                    <label className="block pb-2"> Số điện thoại</label>
                    <input
                      type="number"
                      className={`${styles.input}`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className="w-full pb-2">
                    <label className="block pb-2">Tỉnh/Thành phố</label>
                    <select
                      value={selectedProvince} onChange={handleProvinceChange}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        -- Chọn Tỉnh/Thành phố --
                      </option>
                      {provinces && provinces.map((province) => (
                        <option
                          key={province.province_id}
                          value={province.province_id}
                          className="block pb-2"
                        >
                          {province.province_name}
                        </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Quận/Huyện</label>
                    <select
                      name=""
                      id=""
                      value={selectedDistrict} 
                      onChange={handleDistrictChange}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        -- Chọn Quận/Huyện --
                        </option>
                        {districts && districts.map((district) => (
                        <option
                          key={district.district_id}
                          value={district.district_id}
                          className="block pb-2"
                        >
                          {district.district_name}
                        </option>
                        ))}
                    </select>
                  </div>
                  <div className="w-full pb-2">
                    <label className="block pb-2">Xã/Phường/Thị trấn</label>
                    <select
                      name=""
                      id=""
                      value={selectedWard}
                      onChange={(e) => setSelectedWard(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        -- Chọn Xã/Phường/Thị trấn--
                        </option>
                      {wards && wards.map((results) => (
                    <option
                    className="block pb-2"
                     key={results.ward_id}
                    value={results.ward_id}>
                    {results.ward_name}
                    </option>
                        ))}
                    </select>
                  </div>
                  <div className="w-full pb-2">
                    <label className="block pb-2"> Địa chỉ cụ thể (số nhà, ngõ, tên đường...)</label>
                    <input
                      type="address"
                      className={`${styles.input}`}
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <input
  type="text"
  className={`${styles.input} mt-3`}
  readOnly
  disabled
  value={` ${address},
  ${wards.find((ward) => ward.ward_id === selectedWard)?.ward_name || ''},
  ${districts.find((district) => district.district_id === selectedDistrict)?.district_name || ''},
  ${provinces.find((province) => province.province_id === selectedProvince)?.province_name || ''}`}
/>
                  <div className=" w-full pb-2">
                    <input
                      type="submit"
                      className={`${styles.input} mt-5 cursor-pointer`}
                      required
                      readOnly
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
          <Container>
      <Row>
      <Col xs={6} md={4} className="p-3">
        <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba]">
          Sổ địa chỉ
        </h1>

      </div>
        </Col>
      <Col xs={6} md={12} className="d-flex justify-center items-center btn-address">
        <AiOutlinePlus  size={20} />
        <button  
        onClick={() => setOpen(true)} className="">Thêm địa chỉ </button>
        </Col>


      </Row>
    </Container>

      <br />
      {user &&
        user.addresses.map((item, index) => (
          <div
            className="w-full h-full bg-white rounded-[4px] flex items-center px-3 shadow justify-between pr-10 p-3 mb-3"
            key={index}
          >
          <Container>
              <Row className="d-flex justify-content-center align-items-center">
                <Col md={10} className="">
                <div className="items-center address-detail">
                   <div className="d-flex">
                   <h5 className="font-[600]"> 
                     {item.fullName}
                    </h5>
                    <span>{item.addressType} </span>
                   </div>
                    <p>
                      Địa chỉ: {item.fullAddress}
                      <br />
                      Số điện thoại: 0{item.phoneNumber}
                    </p>
                  </div>
                </Col>
                <Col md={2}>
                <div className="">
              <AiOutlineDelete
                size={25}
                className="cursor-pointer"
                onClick={() => handleDelete(item)}
              />
            </div>
                </Col>
              </Row>
            </Container>
          

           

          </div>
        ))}

      {user && user.addresses.length === 0 && (
        <h5 className="text-center pt-8 text-[18px]">
          Bạn chưa có địa chỉ nào
        </h5>
      )}
    </div>
  );
};
export default ProfileContent;
