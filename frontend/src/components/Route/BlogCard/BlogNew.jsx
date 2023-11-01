import React, { useState } from "react";
import { Link } from "react-router-dom";
import { backend_url } from "../../../server";
import styles from "../../../styles/styles";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const BlogNew = ({ data,isEvent }) => {
  const formattedDate = new Date(data.createdAt).toLocaleDateString("en-GB");


  return (
    <>
      <Container className='newest-suggest'>
      <Row xs={2} md={2} lg={2} xl={2}>
        <Col  xs={5}><div class="recent-post-thumb">
        <img src={`${backend_url}${data.images && data.images[0]}`}/>
         </div></Col>
        <Col xs={7}>
        <Link 
          className='links'
          onClick={() => {
              window.scroll({ top: 0, left: 0, behavior: 'smooth' });
            }}
          to={`${isEvent === true ? `/chuyen-farm-ke/${data.slug}?isEvent=true` : `/chuyen-farm-ke/${data.slug}`}`}>
            <h5 className=''>{data.name}</h5>
            <p className="" style={{ color: "orange" }}>
                      {formattedDate}
                    </p>
          </Link>
        
        </Col>
      </Row>
    </Container>

      <p class="border-bottom"></p>
    </>
  );
};

export default BlogNew;
