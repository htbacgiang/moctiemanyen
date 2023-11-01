import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import {
  AiFillHome,
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiTwotoneShopping,
} from "react-icons/ai";
import { BiMenuAltLeft,BiChevronDown } from "react-icons/bi";
import { BiUserCircle } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { backend_url } from "../../server";
import Cart from "../cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import Logo from '../../Assests/logo.png'
import Facebook from '../../Assests/icon/facebook.png'
import Instagram from '../../Assests/icon/instagram.png'
import Youtube from '../../Assests/icon/youtube.png'
import Tiktok from '../../Assests/icon/tik-tok.png'
import Email from '../../Assests/icon/gmail.png'
import Phone from '../../Assests/icon/phone-call.png'
import Menu from "./Menu";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);

  const searchInputRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
    if (term.trim() === "") {
      setDropDown(false); 
    }
  };

const handleClickOutside = (event) => {
    if (
      searchInputRef.current &&
      !searchInputRef.current.contains(event.target)
    ) {
      setSearchTerm("");
      setSearchData(null);
    }

    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setDropDown(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);


  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <>

      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition items-center hidden 800px:block justify-between w-full bg-[white]`  }
      >
        
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between ` }
          style={{padding : "0 50px"}}
        >
        <div className="hidden 800px:h-[50px] 800px:my-[12px] 800px:flex items-center justify-between">
          <div>
            <Link to="/">
              <img
                src={Logo}
                alt=""
                style={{width: "145px"}}
              />
            </Link>
    

        </div>
      </div>

      {/* search box */}
      <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={handleSearchChange}
              ref={searchInputRef}
              className="h-[40px] w-full px-2 border-[orange] border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {searchData && searchData.length !== 0 && searchTerm.trim() !== "" ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchData &&
                  searchData.map((i, index) => {
                    return (
                      <Link to={`/san-pham/${i.slug}`}>
                        <div className="w-full flex items-start-py-3">
                          <img
                            src={`${backend_url}${i.images[0]}`}
                            alt=""
                            className="w-[40px] h-[40px] mr-[10px]"
                          />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>

          <div className="flex">
          <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px] contact text-[13px] "
              >
                <img src={Phone}/>
                <p> Hỗ trợ khách hàng
                  <br />
                <b>0335.422.333</b>
                </p>
              </div>
            </div>
          <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={30} color="green" />
                <span className="absolute right-0 top-0 rounded-full bg-[orange] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {wishlist && wishlist.length}
                </span>
              </div>
            </div>
        

            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart
                  size={30}
                  color="green"
                />
                <span className="absolute right-0 top-0 rounded-full bg-[orange] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {cart && cart.length}
                </span>
              </div>
            </div>

            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to="/">
                    <img
                      src={`${backend_url}${user?.avatar}`}
                      className="w-[35px] h-[35px] rounded-full"
                      alt=""
                    />
                  </Link>
                ) : (
                  <Link to="/">
                    <CgProfile size={30}
                  color="green"
                   />
                  </Link>
                )}
              </div>
            </div>
            {/* cart popup */}
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

            {/* wishlist popup */}
            {openWishlist ? (
              <Wishlist setOpenWishlist={setOpenWishlist} />
            ) : null}
          </div>
        </div>
        <div className="nav">
            <div>
            <div className="relative h-[50px] w-[350px] hidden 1000px:block d-lfex">
              <Menu />
            </div>
          </div>
          {/* navitems */}
          <div className={`${styles.noramlFlex}`}
                style={{paddingLeft:"30px"}}
          >
            <Navbar active={activeHeading} />
          </div>
        </div>
      </div>
     
      {/* mobile header */}
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        }
      w-full bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full items-center justify-center">
        <Container>
        <Row className=""> 
        <Col  xs={2}> 
        <div>
          <label for="nav-mobile-input" className="icon"> 
        <BiMenuAltLeft size={35} className="mt-1 mr-2"/>
          </label>  
           </div>
        </Col>
        <input hidden type="checkbox" className="nav-input" id="nav-mobile-input"/>
        <label for="nav-mobile-input" className="nav-overlay"></label>
        <div className="menu-mobile">
        <div className="d-flex justify-content-center align-items-center">
        <Link to="/">
              <img
                src={Logo}
                alt=""
                style={{width: "145px", paddingTop :"20px"}}
              />
            </Link>
        </div>
        <label for="nav-mobile-input" className="nav-close-btn"> <i className="fas fa-times"></i></label>    
        <ul>
          <li><a> <Link to={`/`}> Trang chủ </Link> </a></li>
          <li><a> <Link to={`/gioi-thieu`}> Giới thiệu</Link> </a></li>
          <li >
          <div class="d-flex align-items-center">
          <a> <Link to={`/san-pham`}> Sản phẩm </Link> </a>
            <label for="btn-1"> <BiChevronDown size={30} className="ml-2"  /> </label>
          </div>
            <input className='input' type="checkbox" id="btn-1"/>
            <ul>
                       <li><a> <Link to={`/san-pham/tra-hoa-du-du-xa-den`}>Trà hoa đu đủ xạ đen</Link> </a></li>
            </ul>
          </li>
          <li><a> <Link to={`/chuyen-cua-tra`}> Chuyện của Trà </Link> </a></li>
          <li><a> <Link to={`/lien-he`}> Liên hệ </Link> </a></li>
          </ul>


          <div className="px-1 sm:text-start flex flex-col items-center">
          <div className="flex items-center mt-[15px]">
            <Link to="/"> 
            <img src={Facebook} style={{width:"25px",margin: "5px", cursor: "pointer" }} />
            </Link>
            <Link to="/"> 
            <img src={Instagram} style={{width:"25px",margin: "5px", cursor: "pointer" }} />
            </Link>
            <Link to="/"> 
            <img src={Youtube} style={{width:"25px",margin: "5px", cursor: "pointer" }} />
            </Link>
            <Link to="/"> 
            <img src={Tiktok} style={{width:"25px",margin: "5px", cursor: "pointer" }} />
            </Link>
            <Link to="/"> 
            <img src={Email} style={{width:"25px",margin: "5px", cursor: "pointer" }} />
            </Link>
          </div>
        </div>
    </div>
        <Col  xs={8} className="d-flex justify-content-center align-items-center">
        <Link to="/">
              <img
                src={Logo}
                alt=""
                style={{width: "145px", paddingTop :"5px"}}
              />
            </Link>
        </Col>
        <Col  xs={2}></Col>
      </Row>
      <Row>
        <Col xs={12} className="d-flex justify-content-center align-items-center mb-2">
        <div className="w-full relative">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={handleSearchChange}
              ref={searchInputRef}
              className="h-[40px] w-full px-2 border-[grey] border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {searchData && searchData.length !== 0 && searchTerm.trim() !== "" ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchData &&
                  searchData.map((i, index) => {
                    return (
                      <Link to={`/san-pham/${i.slug}`}>
                        <div className="w-full flex items-start-py-3">
                          <img
                            src={`${backend_url}${i.images[0]}`}
                            alt=""
                            className="w-[40px] h-[40px] mr-[10px]"
                          />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>

        </Col>
      </Row>
    </Container>
         
       
          <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
         <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
    
        <button type="button" >
        <Link to="/" className="inline-flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 group">
        <AiFillHome size={30} className="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
        <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Trang Chủ</span>
        </Link>
        </button>
       
        <button type="button" >
        <Link to="/san-pham" className="inline-flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 group">
        <AiTwotoneShopping size={30} className="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
        <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Sản phẩm</span>
        </Link>
        </button>
       
        <button type="button" className="inline-flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 group">
        <div className="relative" onClick={() => setOpenCart(true)}>
              <AiOutlineShoppingCart size={30} className=" text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"  />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                {cart && cart.length}
              </span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Giỏ hàng</span>
        </button>
        
        <button type="button" class="inline-flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 group">
        {isAuthenticated ? (
                  <Link to="/">
                    <img
                      src={`${backend_url}${user?.avatar}`}
                      className="w-[35px] h-[35px] rounded-full"
                      alt=""
                    />
                  </Link>
                ) : (
                  <Link to="/">
                 <BiUserCircle size={30} className="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
                  </Link>
                  
                )}
                  <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Tài khoản</span>
            
        </button>
    </div>
</div>
         
          {/* cart popup */}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

          {/* wishlist popup */}
          {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
        </div>
      </div>
    </>
  );
};

export default Header;
