import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import BlogCard from "../BlogCard/BlogCard";
import { getAllBlogs } from "../../../redux/actions/blog";
import styles from "../../../styles/styles";

const BlogsPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const blogcategoryData = searchParams.get("blogcategory");
  const { allBlogs, isLoading, error } = useSelector((state) => state.blogs);
  const [data, setData] = useState([]);

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

  useEffect(() => {
    if (allBlogs && allBlogs.length > 0) {
      const sortedBlogs = allBlogs
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);
      setData(sortedBlogs);
    }
  }, [allBlogs]);

  return (
    <>
      <div>
        <br />
        <br />
        <div className={`${styles.section} container`}>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-4 xl:gap-[30px] mb-12">
            {data && data.map((blog, index) => <BlogCard data={blog} key={index} />)}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogsPage;
