import React, { useState } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
  AiOutlinePlus
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
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
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Banner from '../../Assests/Baner.jpg'
import Header from "../Layout/Header";
import { BiArrowBack } from "react-icons/bi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
    <>
          <Header />
      <section className="mb-3 banner-profile">
      <button type="button" className="list-group-item list-group-item-action">
  <Link to="/account" className="single_item flex items-center cursor-pointer w-full">
    <BiArrowBack size={20} className="" />
    <div className="text-center fw-bold " style={{ margin: 'auto' }}>Sổ địa chỉ</div>
    <BiArrowBack size={20} className="text-white opacity-0" />
  
  </Link>
</button>
      </section>
      <Container>
      <Row>
      <Col xs={12} md={12} className="d-flex justify-center items-center btn-address">
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
                <Col xs={10} className="">
                <div className="items-center address-detail">
                   <div className="d-flex">
                   <h5 className="font-[600]"> 
                     {item.fullName}
                    </h5>
                    <span>{item.addressType} </span>
                   </div>
                    <p>
                      {item.fullAddress}
                      <br />
                       0{item.phoneNumber}
                    </p>
                  </div>
                </Col>
                <Col sx={2}>
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
    </>

  );
};


export default Address;
