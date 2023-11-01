import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Box, Pagination } from "@mui/material";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import BlogCard from "../components/Route/BlogCard/BlogCard";
import { getAllBlogs } from "../redux/actions/blog";
import styles from "../styles/styles";

const BlogsPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const blogcategoryData = searchParams.get("blogcategory");
  const { allBlogs, isLoading, error } = useSelector((state) => state.blogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const itemsPerPage = 3; // Number of items to display per page

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  useEffect(() => {
    if (allBlogs) {
      if (blogcategoryData === null) {
        setData(allBlogs);
      } else {
        const filteredData = allBlogs.filter(
          (blog) => blog.blogcategory === blogcategoryData
        );
        setData(filteredData);
      }
    }
  }, [allBlogs, blogcategoryData]);

  // Calculate total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // Get current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={3} />
          <br />
          <br />
          <div className={`${styles.section} container`}>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-4 xl:gap-[30px] ">
              {currentItems.map((blog, index) => (
                <BlogCard data={blog} key={index} />
              ))}
            </div>
            {currentItems.length === 0 ? (
              <h1 className="text-center w-full pb-[100px] text-[20px]">
                Chưa có bài viết nào!
              </h1>
            ) : null}
            <Box display="flex" justifyContent="center" my={2}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                variant="outlined"
                color="primary"
                size="large" 
              />
            </Box>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default BlogsPage;
