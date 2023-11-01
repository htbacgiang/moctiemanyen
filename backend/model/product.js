const mongoose = require("mongoose");
const slug = require('mongoose-slug-generator');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nhập tên sản phẩm!"],
  },
  slug: {
    type: String,
    slug: "name",
    unique: true,
    lowercase: true
},
unit: {
  type: String
},
  metadescription: {
  type: String,
  required: [true, "Please enter your product meta description!"],

},
  description: {
    type: String,
    required: [true, "Nhập miêu tả sản phẩm!"],
  },
  category: {
    type: String,
    required: [true, "Please enter your product category!"],
  },

  originalPrice: {
    type: Number,
  },
  discountPrice: {
    type: Number,
    required: [true, "Please enter your product price!"],
  },

  images: [
    {
      type: String,
    },
  ],
  reviews: [
    {
      user: {
        type: Object,
      },
      rating: {
        type: Number,
      },
      comment: {
        type: String,
      },
      productId: {
        type: String,
      },
      createdAt:{
        type: Date,
        default: Date.now(),
      }
    },
  ],
  ratings: {
    type: Number,
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", productSchema);
