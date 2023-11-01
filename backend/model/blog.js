const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");

const blogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nhập tiêu đề bài viết!"],
  },
  slug: {
    type: String,
    slug: "name",
    unique: true,
    lowercase: true,
  },
  metadescription: {
    type: String,
    required: [true, "Nhập meta description!"],
  },
  blogcategory: {
    type: String,
    required: [true, "Please enter your blog category!"],
  },
  description: {
    type: String,
    required: [true, " Viết chuẩn SEO nhé!"],
  },

  images: [
    {
      type: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Blog", blogSchema);
