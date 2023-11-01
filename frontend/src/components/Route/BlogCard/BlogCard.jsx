import React, { useState } from "react";
import { Link } from "react-router-dom";
import { backend_url } from "../../../server";
import styles from "../../../styles/styles";


const BlogCard = ({ data,isEvent }) => {
  const formattedDate = new Date(data.createdAt).toLocaleDateString("en-GB");

  return (
    <>
    <div className=''>
      <div className='blog-card'>
        <div className='card-img'>
          <img src={`${backend_url}${data.images && data.images[0]}`}/>
        </div>
        <div className='blog-content'>
        <Link 
          className='links'
          onClick={() => {
              window.scroll({ top: 0, left: 0, behavior: 'smooth' });
            }}
          to={`${isEvent === true ? `/chuyen-cua-tra/${data.slug}?isEvent=true` : `/chuyen-cua-tra/${data.slug}`}`}>
            <h4 className='title'>{data.name}</h4>
            <p className='' style={ {color : 'orange' }}>{formattedDate}</p>

          </Link>
          <p className='desc'>
          {data.metadescription.length > 120 ? data.metadescription.slice(0, 120) + "..." : data.metadescription}

              <Link 
              className='links'
              onClick={() => {
                  window.scroll({ top: 0, left: 0, behavior: 'smooth' });
                }}
              to={`${isEvent === true ? `/chuyen-cua-tra/${data.slug}?isEvent=true` : `/chuyen-cua-tra/${data.slug}`}`}>
                Xem thêm
              </Link>
          </p>
        </div>
      </div>
    </div>

    </>
  );
};

export default BlogCard;
