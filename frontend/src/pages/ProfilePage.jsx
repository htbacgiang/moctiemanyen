import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";
import Loader from "../components/Layout/Loader";
import ProfileSideBarMobile from "../components/Profile/ProfileMoblie/ProfileSidebarMobile";
import ProfileSideBar from "../components/Profile/ProfileSidebar";
import ProfileContent from "../components/Profile/ProfileContent";
import { useSelector } from "react-redux";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ProfilePage = () => {
  const { loading } = useSelector((state) => state.user);
  const [active, setActive] = useState(1);

  return (
    <div>
       
      {loading ? (
        <Loader />
      ) : (
        <>
        
          <Header />
          <Row className={`flex`}>
            <Col xs={12} md={3} className="mb-2">
            <ProfileSideBarMobile active={active} setActive={setActive}  />
            <ProfileSideBar active={active} setActive={setActive} />
            </Col>
            <Col xs={12} md={9} className="mb-10">
             <ProfileContent active={active} />
            </Col>
          
          </Row>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
