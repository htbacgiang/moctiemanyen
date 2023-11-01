import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/styles";
import BlogNew from "../Route/BlogCard/BlogNew";

const SuggestedBlog = ({ data }) => {
  const {allBlogs} = useSelector((state) => state.blogs);
  const [blogData,setBlogData] = useState();

  useEffect(() => {
    const d =
    allBlogs &&
    allBlogs
        .filter((i) => i.category === data.category)
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);
        setBlogData(d);
  }, []);
  return (
    <div>
      {data ? (
        <div className={` ${styles.section}`}>
          <div className="">
             {
                blogData && blogData.map((i,index) => (
                    <BlogNew data={i} key={index} />
                ))
             }
      </div>
        </div>
      ) : null}
    </div>
  );
};

export default SuggestedBlog;
