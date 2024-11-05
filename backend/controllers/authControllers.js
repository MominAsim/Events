import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import User from '../models/user.js'
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/sendToken.js";
import sendEmail from "../utils/sendEmail.js";
import sendVerificationEmail from "../utils/sendVerificationEmail.js";
import {getResetPasswordTemplate} from "../utils/emailTemplates.js";
import crypto from "crypto";
import {delete_file, upload_file} from "../utils/cloudinary.js";
import {verificationEmailTemplate} from "../utils/verificationEmailTemplate.js";

//register  =>  /api/register
export const registerUser = catchAsyncErrors(async (req, res, next) => {
  try {
  // find user in database
        const {name, email, password} = req.body;
        const user = await User.create({
          name, email, password
      })
       
  //get email auth token
  const verificationToken = user.getVerificationToken();
  await user.save()

  //create email authenticaiton url
  const verificationLink = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}/${user?._id}`;
  const message = verificationEmailTemplate(verificationLink);

  //send verification email 
      await sendVerificationEmail({
       email: user.email,
       subject: 'Email Verification',
       message,
     });
 
      res.status(201).json({
        message: "User created successfully",
      })
  }catch (error) {
    console.log(error);
    return next(new ErrorHandler('An account with this email already exists', 500))
  }
});

//login  =>  /api/login
export const loginUser = catchAsyncErrors(async (req, res, next) => {
    const {email, password} = req.body;
 
    if(!email || !password){
      return next(new ErrorHandler('pls enter an email and password',400))
    }

    // find user in database
    const user = await User.findOne({email}).select("+password")
    
    if(!user){
        return next(new ErrorHandler('User with this email dosent exist ',401))
    }

    //check if password is correct
    const isPasswordMatched = await user.comparePassword(password)
    
    if(!isPasswordMatched){
    return next(new ErrorHandler('invalid Email or Password ',401))
    }

    //check if user is verified 
    const userVerified = await User.findOne({isVerified: false}) 

    //send verification email if user not verified
    if(userVerified){
    //get email auth token
    const verificationToken = user.getVerificationToken();
    await user.save()
  
    //create email authenticaiton url
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}/${user?._id}`;
    const message = verificationEmailTemplate(verificationLink);
  
    //send verification email 
        await sendVerificationEmail({
         email: user.email,
         subject: 'Email Verification',
         message,
       });

      return next(new ErrorHandler('THE ENTERED ACCOUNT IS NOT VERIFIED. A verification email is sent to your gmail account, Pls verify your account',403))  
    }
     sendToken(user, 201, res)
});

//verify token  =>  /api/confirm/:token/:id
export const verifyToken = catchAsyncErrors(async (req, res, next) => {

  const {email, password} = req.body;
 
  if(!email || !password){
    return next(new ErrorHandler('pls enter an email and password',400))
  }

  // find user in database
  const user = await User.findOne({email}).select("+password")
  
  if(!user){
      return next(new ErrorHandler('User with this email dosent exist ',401))
  }

  //check if password is correct
  const isPasswordMatched = await user.comparePassword(password)
  
  if(!isPasswordMatched){
  return next(new ErrorHandler('invalid Email or Password ',401))
  }

  // const user = await User.findOne({user: req.params.isVerified});

  await user.updateOne({$set:{ isVerified: true }})
  await user.save();
  console.log(user)

      res.status(200).json({
        verified: true,
      })

      // return next(new ErrorHandler('Error in verifying token',500))  
});

//logout user =>  /api/logout
export const logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
  
    res.status(200).json({
      message: "Logged Out",
    });
  });

// forgot pass  =>  /api/password/forgot
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {

  // find user in database
  const user = await User.findOne({email: req.body.email})
  
  if(!user){
      return next(new ErrorHandler('User with this email dosent exist ',404))
  }

  //get reset password token
  const resetToken = user.getResetPasswordToken()

  await user.save()

  //create reset password url
  const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = getResetPasswordTemplate(user?.name, resetUrl);

  try {
    await sendEmail({
     email: user.email,
     subject: 'Unity Uniforms Password Reset',
     message,
    });
    res.status(200).json({
      message: `Email sent to: ${user.email}`,
    })

  }catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    return next(new ErrorHandler(error?.message, 500))
  }

});

//reset password => /api/password/reset/:token
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  // Hash the URL Token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Password reset token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords does not match", 400));
  }

  // Set the new password
  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});


//reset getUserprofile => /api/me
export const getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req?.user?._id);
    
    res.status(200).json({
      user,
    })
});

// update password => /api/password/update
export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req?.user?._id).select("+password");

  // Check the previous user password
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old Password is incorrect", 400));
  }

  user.password = req.body.password;
  user.save();

  res.status(200).json({
    success: true,
  });
});

// update user profile => /api/me/update
export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  
 const newUserData = {
  name: req.body.name,
  // email: req.body.email,
 }

 const user = await User.findByIdAndUpdate(req.user._id, newUserData, {new: true});

  res.status(200).json({
    user,
  });
});


// get all users -ADMIN => /api/admin/users
export const allUsers = catchAsyncErrors(async (req, res, next) => {
 const users = await User.find()

  res.status(200).json({
    users,
  });
});

// get all users -ADMIN => /api/users
export const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find()
 
   res.status(200).json({
     users,
   });
 });




 // update user details and add appointments => /api/users/:id
export const updateUserAppointments = catchAsyncErrors(async (req, res, next) => {
  const { appointmentSlots } = req.body;
  
  const newUserData = {
 
  };

  // Only add appointmentSlots if provided in the request body
  if (appointmentSlots && Array.isArray(appointmentSlots)) {
    newUserData.appointmentSlots = appointmentSlots.map(slot => ({
      date: new Date(slot.date), // Ensure date is stored correctly
      isBooked: slot.isBooked || false, // Default to false if not specified
    }));
  }

  // Find and update the user by ID with new data, including appointments
  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "User updated and appointment slots added successfully.",
    user,
  });
});


 // update user details --ADMIN => /api/users/:id
 export const updateUserNotAdmin = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {

  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
  });

  res.status(200).json({
    user,
  });
}); 

//get user details - ADMIN => /api/admin/users/:id
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const userDetail = await User.findById(req.params.id)
 
  if(!userDetail){
    return next(new ErrorHandler(`User not found with the id ${req.params.id}`, 404))
  }

   res.status(200).json({
    userDetail,
   });
 });

 // update user details --ADMIN => /api/admin/users/:id
 export const updateUser = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    // name: req.body.name,
    // email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
  });

  res.status(200).json({
    user,
  });
});

 //delete user - ADMIN => /api/admin/users/:id
export const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User not found with id: ${req.params.id}`, 404)
    );
  }

  // Remove user avatar from cloudinary
  if (user?.avatar?.public_id) {
    await delete_file(user?.avatar?.public_id);
  }

  await user.deleteOne();

  res.status(200).json({
    success: true,
  });
});

// Upload user avatar   =>  /api/me/upload_avatar
export const uploadAvatar = catchAsyncErrors(async (req, res, next) => {
  const avatarResponse = await upload_file(req.body.avatar, "Unity Uniforms/avatars");

  // Remove previous avatar
  if (req?.user?.avatar?.url) {
     delete_file(req?.user?.avatar?.public_id);
  }

  const user = await User.findByIdAndUpdate(req?.user?._id, {
    avatar: avatarResponse,
  });

  res.status(200).json({
    user,
  });
});