const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: [true, "Please enter your name!"],
  },
  email:{
    type: String,
    required: [true, "Please enter your email!"],
  },
  password:{
    type: String,
    required: [true, "Please enter your password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },
  phoneNumber:{
    type: Number,
  },
  birthDay:{
    type: Date,
  },
  addresses:[
    {
      fullAddress:{
        type: String,
      },
      addressType:{
        type: String,
      },
      fullName: {
        type: String,
      },
      phoneNumber:{
        type: Number,
      },
    }
  ],
  role:{
    type: String,
    default: "user",
  },
  avatar:{
    type: String,
    required: true,
 },
 createdAt:{
  type: Date,
  default: Date.now(),
 },
 resetPasswordToken: String,
 resetPasswordTime: Date,
});


//  Hash password
userSchema.pre("save", async function (next){
  if(!this.isModified("password")){
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// jwt token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id}, process.env.JWT_SECRET_KEY,{
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
