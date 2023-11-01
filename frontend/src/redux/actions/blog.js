import axios from "axios";
import { server } from "../../server";

// create blog
export const createBlog = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "blogCreateRequest",
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      `${server}/blog/create-blog`,
      newForm,
      config
    );
    dispatch({
      type: "blogCreateSuccess",
      payload: data.blog,
    });
  } catch (error) {
    dispatch({
      type: "blogCreateFail",
      payload: error.response.data.message,
    });
  }
};


// delete blog of a shop
export const deleteBlog = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteBlogRequest",
    });

    const { data } = await axios.delete(
      `${server}/blog/delete-blog/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "deleteBlogSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteBlogFailed",
      payload: error.response.data.message,
    });
  }
};

export const getAllBlogs = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllBlogsRequest",
    });

    const { data } = await axios.get(`${server}/blog/get-all-blogs`);
    dispatch({
      type: "getAllBlogsSuccess",
      payload: data.blogs,
    });
  } catch (error) {
    dispatch({
      type: "getAllBlogsFailed",
      payload: error.response.data.message,
    });
  }
};