import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import styles from "../styles/styles";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const [data, setData] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [checkboxs, setCheckboxs] = useState([
    {
      id: 1,
      name: "Giá dưới 50.000đ",
      check: false,
      minPrice: 0,
      maxPrice: 50000,
    },
    {
      id: 2,
      name: "Từ 50.000đ - 100.000đ",
      check: false,
      minPrice: 50000,
      maxPrice: 100000,
    },
    {
      id: 3,
      name: "Trên 100.000đ",
      check: false,
      minPrice: 100000,
      maxPrice: Infinity,
    },
  ]);

  useEffect(() => {
    if (categoryData === null) {
      const d = allProducts;
      setData(d);
    } else {
      const d =
        allProducts && allProducts.filter((i) => i.category === categoryData);
      setData(d);
    }
  }, [allProducts]);

  useEffect(() => {
    applyFilters();
  }, [checkboxs, categoryData, sortOption]);

  const handleChangeCheckboxs = (id) => {
    setCheckboxs((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return { ...item, check: !item.check };
        } else {
          return item;
        }
      });
    });
  };

  const applyFilters = () => {
    let filteredData = categoryData === null ? [...allProducts] : allProducts.filter((product) => product.category === categoryData);
  
    const selectedRanges = checkboxs.filter((item) => item.check);
  
    if (selectedRanges.length > 0) {
      filteredData = filteredData.filter((product) => {
        return selectedRanges.some(
          (range) =>
            product.discountPrice >= range.minPrice &&
            product.discountPrice <= range.maxPrice
        );
      });
    }
  
    if (sortOption !== "") {
      switch (sortOption) {
        case "A-Z":
          filteredData.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "Z-A":
          filteredData.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case "price_high_to_low":
          filteredData.sort((a, b) => b.discountPrice - a.discountPrice);
          break;
        case "price_low_to_high":
          filteredData.sort((a, b) => a.discountPrice - b.discountPrice);
          break;
        case "newest":
          filteredData.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          break;
        default:
          break;
      }
    }
  
    setData(filteredData);
  };
  

  const renderCheckboxs = () => {
    return checkboxs.map((item) => (
      <div className="sort-product d-flex gap-2 mb-2" key={item.id}>
        <div
          className="productInput"
          onClick={() => handleChangeCheckboxs(item.id)}
        >
          <input type="checkbox" id={item.id} />
          {item.check && (
            <>
              <div className="productInputBefore"></div>
              <div className="productInputAfter">
                {" "}
                <BsCheckLg />
              </div>
            </>
          )}
        </div>
        <label htmlFor={item.id} className="">
          {" "}
          {item.name}
        </label>
      </div>
    ));
  };

  const renderFilter = () => {
    return checkboxs.map((item) => {
      if (item.check) {
        return (
          <span
            onClick={() => handleChangeCheckboxs(item.id)}
            className="option"
            key={item.id}
          >
            {item.name}{" "}
            <AiOutlineClose
              className="close"
            />
          </span>
        );
      } else {
        return null;
      }
    });
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header />
          <br />
          <br />
          <Container>
            <Row>
              <Col md={3} className="d-none d-md-block">
                <div className="">
                  <div className="filter-card mb-3">
                    <h3 className="filter-title"> MỨC GIÁ </h3>
                    <div>{renderCheckboxs()}</div>
                    <h3 className="filter-title"> PHÂN LOẠI THEO</h3>
                  </div>
                  {/* ... */}
                </div>
              </Col>
              <Col md={9}>
                <div className="filter-sort-grid">
                 <Col md={12} className="">
                 <div className='d-flex align-items-center'>
                            <h3>Sắp xếp theo: </h3>
                            <div className="sort-pc d-flex">
  <div
    className="sort-by"
    onClick={() => setSortOption("A-Z")}
  >
    <span>Từ A-Z</span>
  </div>
  <div
    className="sort-by"
    onClick={() => setSortOption("Z-A")}
  >
    <span>Từ Z-A</span>
  </div>
  <div
    className="sort-by"
    onClick={() => setSortOption("price_high_to_low")}
  >
    <span>Giá giảm dần</span>
  </div>
  <div
    className="sort-by"
    onClick={() => setSortOption("price_low_to_high")}
  >
    <span>Giá tăng dần</span>
  </div>
  <div
    className="sort-by"
    onClick={() => setSortOption("newest")}
  >
    <span>Mới nhất</span>
  </div>
</div>
                                   <div className="sort-moblie">
                                   <Box sx={{ minWidth: 150 }} >
                                  <FormControl fullWidth>
                                    <NativeSelect
                                      defaultValue={10}
                                      inputProps={{
                                        name: 'sort',
                                        id: 'uncontrolled-native',
                                        className:"p-2" 
                                      }}
                                      value={sortOption} // Add this line to set the selected value
                                      onChange={(e) => setSortOption(e.target.value)} // Update the sortOption state
                                    >
                                      <option value={10}>Mặc định</option>
                                      <option value={"A-Z"}>Từ A-Z</option>
                                      <option value={"Z-A"}>Từ Z-A</option>
                                      <option value={"price_high_to_low"}>Giá giảm dần</option>
                                      <option value={"price_low_to_high"}>Giá tăng dần</option>
                                      <option value={"newest"}>Mới nhất</option>

                                    </NativeSelect>
                                  </FormControl>
                                </Box>
                                   </div>
                  </div>
                  </Col>
                  <div className="filter">{renderFilter()}</div>
                  
                </div>
                <div className="list-product d-flex">
                  <div className={`${styles.section}`}>
                    <div className="grid grid-cols-2 gap-[20px] md:grid-cols-4 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
                      {data && data.length > 0 ? (
                        data.map((i, index) => (
                          <ProductCard data={i} key={index} />
                        ))
                      ) : (
                        <h1 className="text-center w-full pb-[100px] text-[20px]">
                          No products Found!
                        </h1>
                      )}
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
          <Footer />
        </div>
      )}
    </>
  );
};

export default ProductsPage;
