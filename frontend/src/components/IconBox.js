import React from "react";
import "./style.css";
import eco from "../../src/Assests/icon/eco-friendly.png";
import farmer from "../../src/Assests/icon/farmer.png";
import green from "../../src/Assests/icon/green-eco.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const iconBox = () => {
  return (
    <section className="col-inner">
      <Container style={{ maxWidth: "95%" }}>
        <Row>
          <Col xs={12} md={4} className="mt-3">
            <div className="boder-content text-center">
              <div className="d-flex flex-column align-items-center"> 
              <img src={eco} alt="..." className="rounded-circle" />
              <h3 className="boder-content-h3">Quy trình thuận tự nhiên</h3>
              <p>
                Thuận tự nhiên là tôn chỉ của chúng tôi trong quá trình chăn
                nuôi, trồng cấy các sản phẩm để cung cấp đến người tiêu dung tại
                hệ thống chuỗi thực phẩm sạch Eco BacGiang.
              </p>
              </div>
            </div>
          </Col>
          <Col xs={12} md={4} className="mt-3">
            <div className="boder-content text-center">
              <div className="d-flex flex-column align-items-center"> 
              <img src={farmer} alt="..." className="rounded-circle" />
              <h3 className="boder-content-h3"> Chuỗi cung ứng tiêu chuẩn</h3>
              <p>
                Bộ phận kỹ sư thực địa tại Eco BacGiang luôn giám sát nghiêm
                ngặt đối với các nông trại, đối tác tham gia trong chuỗi cung
                ứng tiêu chuẩn của chúng tôi.
              </p>
              </div>
            </div>
          </Col>
          <Col xs={12} md={4} className="mt-3">
            <div className="boder-content text-center">
              <div className="d-flex flex-column align-items-center"> 
              <img src={green} alt="..." className="rounded-circle" />
              <h3 className="boder-content-h3">Nguồn gốc minh bạch</h3>
              <p>
                Sản phẩm thuận tự nhiên phải có thông tin nguồn gốc, quá trình
                nuôi trồng, sản phẩm được công khai minh bạch theo thời gian
                thực trên từng sản phẩm.
              </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default iconBox;
