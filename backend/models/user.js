import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt  from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
{
  name:{
    type: String,
    required: [true, "Please enter your name"],
    maxLength: [30, "Your name cannot exceed 30 characters"],
  },
  email:{
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
},
  password:{
    type: String,
    required: [true, "Please enter your password"],
    minLength: [6, "Your password must be longer than 6 characters"],
    select: false,
},
avatar:{
    public_id: String,
    url: String,
},
role:{
    type: String,
    default: "user",
},
isVerified:{
 type: Boolean,
 default: false
},

verifyToken: {
  type: String,
},
verifyTokenExpire: {
  type: Date,
},

appointmentSlots: [
  {
    date: Date,
    isBooked: {
      type: Boolean,
      default: false,
    },
  },
],

resetPasswordToken: String,
resetPasswordExpire: Date,

},{ timestamps: true });

//generate email verification token
userSchema.methods.getVerificationToken = function(){
  //generate token
  const verificationToken = crypto.randomBytes(20).toString("hex");

  // Hash the token
  this.verifyToken = verificationToken
    //  crypto
    // .createHash("sha256")
    // .update(verificationToken)
    // .digest("hex");

    this.verifyTokenExpire = new Date(Date.now() + 30 * 60 * 1000);

  return verificationToken
}

//encription of pass
userSchema.pre('save', async function(next){
  if(!this.isModified("password")){
    next();
  }
  this.password = await bcrypt.hash(this.password, 10)
})

//return jwt token
userSchema.methods.getJwtToken = function(){
 return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME
  })
}

//compare password
userSchema.methods.comparePassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password)
}

//generate password reset token
userSchema.methods.getResetPasswordToken = function(){
  //generate token
  const resetToken = crypto.randomBytes(20).toString('hex')

  //hash and set to resetpasstoken field
  this.resetPasswordToken = crypto
  .createHash("sha256")
  .update(resetToken)
  .digest('hex');
   
  //token expire time
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000

  return resetToken;
}

export default mongoose.model("User", userSchema);