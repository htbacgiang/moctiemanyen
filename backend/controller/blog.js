const express = require("express");
const {isAuthenticated, isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Blog = require("../model/blog");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const slugify = require('slugify');
const fs = require("fs");

// create blog
router.post(
  "/create-blog",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      if (req.body.name) {
        req.body.slug = slugify(req.body.name)
     }
        const files = req.files;
        const imageUrls = files.map((file) => `${file.filename}`);

        const blogData = req.body;
        blogData.images = imageUrls;

        const blog = await Blog.create(blogData);

        res.status(201).json({
          success: true,
          blog,
        });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all products of a shop
router.get(
  "/get-all-blogs/",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const blogs = await Blog.find().sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        blogs,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);


// delete product of a shop
router.delete(
  "/delete-blog/:id",
  isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const blogId = req.params.id;

      const blogData = await Blog.findById(blogId);

      blogData.images.forEach((imageUrl) => {
        const filename = imageUrl;
        const filePath = `uploads/${filename}`;

        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
          }
        });
      });

      const blog = await Blog.findByIdAndDelete(productId);

      if (!blog) {
        return next(new ErrorHandler("Không tìm thấy id", 500));
      }

      res.status(201).json({
        success: true,
        message: "Product Deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);



module.exports = router;
