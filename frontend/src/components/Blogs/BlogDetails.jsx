import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllBlogs } from "../../redux/actions/blog";
import { backend_url, server } from "../../server";
import styles from "../../styles/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import axios from "axios";
import Meta from "../Meta";
import { MdOutlineArrowBack } from "react-icons/md";

const BlogDetails = ({ data }) => {
  const formattedDate = new Date(data && data.createdAt).toLocaleDateString(
    "en-GB"
  );
  const { blogs } = useSelector((state) => state.blogs);
  const [click, setClick] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBlogs(data && data?.slug));
    setClick(false);
  }, [data]);
  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[98%] 800px:w-[95%]`}>
          <Meta title={data.name} description={data.metadescription} />
          <>
            <section class="">
              <div class="">
                <img
                  src={`${backend_url}${data.images && data.images[0]}`}
                  alt={data.slug}
                />
              </div>
              <div class="">
                <ul class="list-inline">
                  <li>
                    <i class="fa fa-calendar"></i>
                    <p className="" style={{ color: "orange" }}>
                      {formattedDate}
                    </p>
                  </li>
                  <li>
                    <a>
                      <i class="fa fa-user"></i>by Bắc Giang Eco
                    </a>
                  </li>
                </ul>
              </div>

              <div class="post-description">
                <h3>{data.name}</h3>
              </div>
              <span
                className="content-blog"
                dangerouslySetInnerHTML={{
                  __html: data.description,
                }}
              ></span>
              <Link to="/chuyen-farm-ke" className="back-to-blog"> 
              <MdOutlineArrowBack className="mr-2"/>
              <h3>Quay lại chuyện của farm </h3>
              </Link>
            </section>
          </>
        </div>
      ) : null}
    </div>
  );
};

export default BlogDetails;
