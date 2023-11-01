import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAProduct, getAllProducts } from "../../redux/actions/product";
import { backend_url, server } from "../../server";
import styles from "../../styles/styles";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";

import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import Meta from "../Meta";
import Button from "react-bootstrap/Button";
import Fresh from "../../Assests/icons/fresh.png";
import Organic from "../../Assests/icons/organic.png";
import HealtCcare from "../../Assests/icons/healthcare.png";
import Check from "../../Assests/icons/check-mark.png";
import Visa from "../../Assests/icons/visa.jpg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Google from "../Google";
const ProductDetails = ({ data }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const weights = [1, 2, 3, 4, 5]; // Weights in kilograms
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts(data && data?.slug));
    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data, wishlist]);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Sản phẩm đã ở trong giỏ hàng!");
    } else {
      if (data.stock < 1) {
        toast.error("sản phẩm đã giới hạn!");
      } else {
        const updatedName = `${data.name} hộp)`;
        const discountPrice = data.discountPrice * selectedWeight; // Calculate total price by multiplying discountPrice with selected weight
        const cartData = {
          ...data,
          qty: count,
          discountPrice,
          name: updatedName,
        }; // Include the totalPrice in the cart data
        dispatch(addTocart(cartData));
        toast.success("Thêm sản phẩm thành công!");
      }
    }
  };
  const [selectedWeight, setSelectedWeight] = useState(1);
  const handleWeightSelection = (weight) => {
    setSelectedWeight(weight);
  };

  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
          <Meta title={data.name} description={data.metadescription} />
          <>

            <Container className="mt-4">
              {/* Stack the columns on mobile by making one full-width and the other half-width */}
              <Row >
                <Col xs={12} md={4} className="h-[100%]">
                  <Swiper
                    style={{
                      "--swiper-navigation-color": "#fff",
                      "--swiper-pagination-color": "#fff",
                    }}
                    loop={true}
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper3"
                  >
                    <SwiperSlide>
                      <img
                        src={`${backend_url}${data && data.images[0]}`}
                        alt={data.slug}
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        src={`${backend_url}${data && data.images[1]}`}
                        alt={data.slug}
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        src={`${backend_url}${data && data.images[2]}`}
                        alt={data.slug}
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        src={`${backend_url}${data && data.images[3]}`}
                        alt={data.slug}
                      />
                    </SwiperSlide>
                  </Swiper>
                  <Swiper
                    onSwiper={setThumbsSwiper}
                    loop={true}
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper4 img-thumb"
                  >
                    <SwiperSlide className="">
                      <img
                        src={`${backend_url}${data && data.images[0]}`}
                        alt={data.slug}
                      />
                    </SwiperSlide>
                    <SwiperSlide className="">
                      <img
                        src={`${backend_url}${data && data.images[1]}`}
                        alt={data.slug}
                      />
                    </SwiperSlide>
                    <SwiperSlide className="">
                      <img
                        src={`${backend_url}${data && data.images[2]}`}
                        alt={data.slug}
                      />
                    </SwiperSlide>
                    <SwiperSlide className="">
                      <img
                        src={`${backend_url}${data && data.images[3]}`}
                        alt={data.slug}
                      />
                    </SwiperSlide>
                  </Swiper>
                </Col>
                <Col xs={12} md={4}>
                  <div className="mo-ta-san-pham">
                    <div className="row">
                      <div className="col-12">
                        <div className="product-desc">
                          <h3>
                            {data.name}
                          </h3>
                          <p className="">
                            {" "}
                            Tình trạng: <span className=""> Còn hàng</span>{" "}
                          </p>
                          <div>
                           
                          </div>
                          <div className="price-box">
                            <div className="special-price">
                              <div className="price-1 product-price">
                                <div className="py-1 flex ">
                                  <div className="price-1">
                                    <h4
                                      className={`${styles.productDiscountPrice} text-xl text-[green]`}
                                    >
                                      {data.originalPrice === 0
                                        ? data.originalPrice
                                        : (
                                            data.discountPrice * selectedWeight
                                          ).toLocaleString(navigator.language, {
                                            minimumFractionDigits: 0,
                                          })}
                                      đ
                                    </h4>
                                    <h5
                                      className={`${styles.price} text-lg pl-0`}
                                    >
                                      {data.originalPrice
                                        ? (
                                            data.originalPrice * selectedWeight
                                          ).toLocaleString(navigator.language, {
                                            minimumFractionDigits: 0,
                                          }) + " đ"
                                        : null}
                                    </h5>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="success"
                            className="button"
                            onClick={() => addToCartHandler(data._id)}
                          >
                            Thêm vào giỏ hàng
                          </Button>
                          <div className="back-index">
                            <div className="gift-list">
                              <label className="h5">
                                THÔNG TIN SẢN PHẨM 
                              </label>
                              <ul className="free-gifts">
                                <li className="mb-3  ">
                                  <span className="align-items-baseline  ">
                                    <span
                                className="content-blog"
                                dangerouslySetInnerHTML={{
                                  __html: data.description,
                                }}
                              ></span>
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                         
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xs={12} md={4}>
                  <div className="">
                    <div className="nguon-goc">
                      <h3 className="text-center text-red"> THÔNG TIN ĐẶT HÀNG</h3>
                   <Google />
                    </div>
                 
                  </div>
                </Col>
              </Row>
            </Container>
          </>
        </div>
        
      ) : null}
      
    </div>
    
  );
};

export default ProductDetails;
