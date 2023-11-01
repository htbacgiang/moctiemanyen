import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const blogReducer = createReducer(initialState, {
  blogCreateRequest: (state) => {
    state.isLoading = true;
  },
  blogCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.blog = action.payload;
    state.success = true;
  },
  blogCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  // delete blog of a shop
  deleteBlogRequest: (state) => {
    state.isLoading = true;
  },
  deleteBlogSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  deleteBlogFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // get all products
  getAllBlogsRequest: (state) => {
    state.isLoading = true;
  },
  getAllBlogsSuccess: (state, action) => {
    state.isLoading = false;
    state.allBlogs = action.payload;
  },
  getAllBlogsFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  
  clearErrors: (state) => {
    state.error = null;
  },
});
