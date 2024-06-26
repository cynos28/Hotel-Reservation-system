const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const bcrypt = require("bcryptjs");
const { generateToken, hashToken } = require("../utils");
var parser = require("ua-parser-js");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const Cryptr = require("cryptr");
const { OAuth2Client } = require("google-auth-library");

const cryptr = new Cryptr(process.env.CRYPT_KEY);
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//Register User
const registerUser = asyncHandler(async (req, res) => {
  // res.send("Register User");
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    res.status(400);
    return res.json({ error: "Please fill in the required fields." });
  }

  if (password.length < 6) {
    res.status(400);
    return res.json({ error: "Password must be at least 8 characters." });
  }

  // check user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Email already in use.");
  }

  // Create new user
  const user = await User.create({
    name,
    email,
    password,
    userAgent: [parser(req.headers["user-agent"]).ua],
  });

  // GenerateToken
  const token = generateToken(user._id);

  // Send HTTP Only cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: "none",
    secure: true,
  });

  if (user) {
    const { _id, name, email, phone, bio, photo, role, isVerified } = user;

    res.status(201).json({
      _id,
      name,
      email,
      phone,
      bio,
      photo,
      role,
      isVerified,
      token,
    });
  } else {
    res.status(400);
    return res.json({ error: "Invalid user data." });
  }
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //   Validation
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add email and password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User not found, please signup");
  }

  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  if (!passwordIsCorrect) {
    res.status(400);
    throw new Error("Invalid email or password");
  }

  // GenerateToken
  const token = generateToken(user._id);

  if (user && passwordIsCorrect) {
    // Send HTTP Only cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: "none",
      secure: true,
    });

    const { _id, name, email, phone, bio, photo, role, isVerified } = user;

    res.status(200).json({
      _id,
      name,
      email,
      phone,
      bio,
      photo,
      role,
      isVerified,
      token,
    });
  } else {
    res.status(500);
    return res.json({ error: "Something went wrong, try again." });
  }
});


// Send login code to user's email
const sendLoginCode = asyncHandler(async (req, res) => {
  const { email: userEmail } = req.params;
  const user = await User.findOne({ email: userEmail });

  if (!user) {
    return res.status(404).json({ error: "User not found. Please sign up." });
  }

  // Generate a 6-digit login code
  const loginCode = Math.floor(100000 + Math.random() * 900000).toString();
  console.log("Generated login code:", loginCode);

  // Encrypt login code before saving to DB
  const encryptedLoginCode = cryptr.encrypt(loginCode);

  // Store login token in the database
  await Token.findOneAndUpdate(
    { userId: user._id },
    { loginToken: encryptedLoginCode, expiredAt: Date.now() + 3600 * 60 }, // Set token expiry
    { upsert: true } // Create new token if not found
  );

  // Send login code to user's email
  const subject = "Login Access Code - The Heritage";
  const sendTo = userEmail;
  const sentFrom = process.env.EMAIL_USER;
  const replyTo = "noreply@heritage.com";
  const template = "loginCode";
  const name = user.name;

  try {
    await sendEmail(
      subject,
      sendTo,
      sentFrom,
      replyTo,
      template,
      name,
      loginCode
    );
    res.status(200).json({ message: "Access code sent to your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Email not sent. Please try again." });
  }
});

// Login with code
const loginWithCode = asyncHandler(async (req, res) => {
  const { email: userEmail } = req.params;
  const { loginCode } = req.body;

  const user = await User.findOne({ email: userEmail });
  if (!user) {
    return res.status(404).json({ error: "User not found. Please sign up." });
  }

  // Find the user's login token
  const userToken = await Token.findOne({
    userId: user._id,
    expiredAt: { $gt: Date.now() },
  });

  if (!userToken) {
    return res
      .status(404)
      .json({ error: "Invalid or expired token. Please login again." });
  }

  // Decrypt the login code from the token
  const decryptedLoginCode = cryptr.decrypt(userToken.loginToken);

  if (loginCode !== decryptedLoginCode) {
    return res
      .status(404)
      .json({ error: "Incorrect login code. Please try again." });
  }

  res.status(200).json({ message: "Login successful" });

  // Register user agent
  const ua = parser(req.headers["user-agent"]);
  const thisUserAgent = ua.ua;

  user.userAgent.push(thisUserAgent);
  await user.save();

  // Generate Token
  const token = generateToken(user._id);

  // Send HTTP Only cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: "none",
    secure: true,
  });

  const { _id, name, email, phone, bio, photo, role, isVerified } = user;

  res.status(201).json({
    _id,
    name,
    email,
    phone,
    bio,
    photo,
    role,
    isVerified,
    token,
  });
});

const sendVerificationEmail = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  if (user.isVerified) {
    res.status(400);
    throw new Error("User already verified");
  }

  // Delete token if it exists
  let token = await Token.findOne({ userId: user._id });
  if (token) {
    await token.deleteOne();
  }

  // Create verification token and save
  const verificationToken = crypto.randomBytes(32).toString("hex") + user._id;
  console.log(verificationToken);

  //Hash token and save
  const hashedToken = hashToken(verificationToken);
  await new Token({
    userId: user._id,
    verificationToken: hashedToken,
    createdAt: Date.now(),
    expiredAt: Date.now() + 3600 * 60, //1hr
  }).save();

  //Construct Verification URL
  const verificationUrl = `${process.env.FRONTEND_URL}/verify/${verificationToken}`;

  //Send  Verification email

  const subject = "Verify Your Account - The Heritage";
  const send_to = user.email;
  const sent_from = process.env.EMAIL_USER;
  const reply_to = "noreply@primelodge.com";
  const template = "verifyEmail";
  const name = user.name;
  const link = verificationUrl;

  try {
    await sendEmail(
      subject,
      send_to,
      sent_from,
      reply_to,
      template,
      name,
      link
    );
    res.status(200).json({ message: "Email Sent" });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ error: "Email not sent, please try again" });
  }
});

//Verify User
const verifyUser = asyncHandler(async (req, res) => {
  const { verificationToken } = req.params;

  const hashedToken = hashToken(verificationToken);

  const userToken = await Token.findOne({
    verificationToken: hashedToken,
    expiredAt: { $gt: Date.now() },
  });

  if (!userToken) {
    res.status(404);
    throw new Error("Invalid or Expires Token ");
  }

  //Find USer
  const user = await User.findOne({ _id: userToken.userId });

  if (user.isVerified) {
    res.status(400);
    throw new Error("User is already Verified ");
  }
  //Now Verify User
  user.isVerified = true;
  await user.save();

  res.status(200).json({
    message: "Account Verification Successful",
  });
});

//LogOut user
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0), // 1 day
    sameSite: "none",
    secure: true,
  });
  res.status(200).json({
    message: "Successfully logged out",
  });
});

// Get User
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      const userData = {
        _id: user._id,
        userName: user.name, // Rename 'name' to avoid conflict
        userEmail: user.email, // Rename 'email' to avoid conflict
        userPhone: user.phone,
        userBio: user.bio,
        userPhoto: user.photo,
        userRole: user.role,
        isVerified: user.isVerified,
      };

      res.status(200).json(userData);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(500);
    next(error);
  }
};

// Update user
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    // Destructure user properties
    const { name, email, phone, bio, photo, role, isVerified } = user;

    // Update user properties based on request body
    user.name = req.body.name || name;
    user.phone = req.body.phone || phone;
    user.bio = req.body.bio || bio;
    user.photo = req.body.photo || photo;

    // Save the updated user
    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      bio: updatedUser.bio,
      photo: updatedUser.photo,
      role: updatedUser.role,
      isVerified: updatedUser.isVerified,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Get Login Status
const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json(false);
  }

  // Verify Token
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (verified) {
      return res.json(true);
    }
  } catch (error) {
    // Handle token verification error
    console.error(error);
  }

  return res.json(false);
});

//Send Automated Email
const sendAutomatedEmail = asyncHandler(async (req, res) => {
  const { subject, send_to, reply_to, template, url } = req.body;

  if (!subject || !send_to || !reply_to || !template) {
    res.status(500);
    throw new Error("Missing Email Parameter");
  }

  //Get User
  const user = await User.findOne({ email: send_to });
  if (!user) {
    res.status(404);

    throw new Error("User Not found");
  }
  const sent_from = process.env.EMAIL_USER;
  const name = user.name;
  const link = `${process.env.FRONTEND_URL}${url}`;

  try {
    await sendEmail(
      subject,
      send_to,
      sent_from,
      reply_to,
      template,
      name,
      link
    );
    res.status(200).json({ message: "Verification Email Sent" });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ error: "Email not sent, please try again" });
  }
});

//Forgot password
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("No User with this email");
  }
  // Delete token if it exists
  let token = await Token.findOne({ userId: user._id });
  if (token) {
    await token.deleteOne();
  }

  // Create verification token and save
  const resetToken = crypto.randomBytes(32).toString("hex") + user._id;
  console.log(resetToken);

  //Hash token and save
  
  const hashedToken = hashToken(resetToken);
  await new Token({
    userId: user._id,
    resetToken: hashedToken,
    createdAt: Date.now(),
    expiredAt: Date.now() + 3600 * 60, //1hr
  }).save();

  //Construct Reset URL
  const resetUrl = `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`;

  //Send  Verification email
  const subject = "Password Reset Request - PrimeLodge";
  const send_to = user.email;
  const sent_from = process.env.EMAIL_USER;
  const reply_to = "noreply@primelodge.com";
  const template = "forgotPassword";
  const name = user.name;
  const link = resetUrl;

  try {
    await sendEmail(
      subject,
      send_to,
      sent_from,
      reply_to,
      template,
      name,
      link
    );
    res.status(200).json({ message: "Password Reset Email Sent" });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ error: "Email not sent, please try again" });
  }
});

// Reset password
const resetPassword = asyncHandler(async (req, res) => {
  try {
    const { resetToken } = req.params;
    const { password } = req.body;

    // Hash the reset token
    const hashedToken = hashToken(resetToken);
    // Find user token
    const userToken = await Token.findOne({
      resetToken: hashedToken,
      expiredAt: { $gt: Date.now() },
    });

    if (!userToken) {
      res.status(404).json({ message: "Invalid or expired token" });
      return;
    }

    // Find user
    const user = await User.findOne({ _id: userToken.userId });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Reset password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res
      .status(200)
      .json({ message: "Password reset successful, please login" });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete User
const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
      
      await User.findByIdAndDelete(id);
      return res.status(200).json({status : "User is deleted"});

  } catch (error) {
      
      return res.status(400).json({status : "Error with delete user", message : error});

  }
});



// Get Users
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().sort("-createdAt").select("-password");
  if (!users) {
    res.status(500);
    throw new Error("Something went wrong");
  }
  res.status(200).json(users);
});

//upgradeuser

const upgradeUser = asyncHandler(async (req, res) => {
  const { role, id } = req.body;

  const user = await User.findById(id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.role = role;
  await user.save();

  res.status(200).json({
    message: `User role updated to ${role}`,
  });
});

//Change Password
const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, password } = req.body;
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (!oldPassword || !password) {
    res, status(400);
    throw new error("Please enter old and new password");
  }
  //Check if Old password is correct
  const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

  //Save new Password
  if (user && passwordIsCorrect) {
    user.password = password;
    await user.save();

    res
      .status(200)
      .json({ message: "Password change Successfully, please re-login!" });
  } else {
    res.status(400).json({ message: "Old password is incorrect!" });
  }
});

//Google Login
const loginWithGoogle = asyncHandler(async (req, res) => {
  const { userToken } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: userToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  const { name, email, picture, sub } = payload;
  const password = Date.now() + sub;

  // Get UserAgent
  const ua = parser(req.headers["user-agent"]);
  const userAgent = [ua.ua];

  // Check if user exists
  const user = await User.findOne({ email });

  if (!user) {
    //   Create new user
    const newUser = await User.create({
      name,
      email,
      password,
      photo: picture,
      isVerified: true,
      userAgent,
    });

    if (newUser) {
      // Generate Token
      const token = generateToken(newUser._id);

      // Send HTTP-only cookie
      res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // 1 day
        sameSite: "none",
        secure: true,
      });

      const { _id, name, email, phone, bio, photo, role, isVerified } = newUser;

      res.status(201).json({
        _id,
        name,
        email,
        phone,
        bio,
        photo,
        role,
        isVerified,
        token,
      });
    }
  }

  // User exists, login
  if (user) {
    const token = generateToken(user._id);

    // Send HTTP-only cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: "none",
      secure: true,
    });

    const { _id, name, email, phone, bio, photo, role, isVerified } = user;

    res.status(201).json({
      _id,
      name,
      email,
      phone,
      bio,
      photo,
      role,
      isVerified,
      token,
    });
  }
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
  loginStatus,
  sendAutomatedEmail,
  sendVerificationEmail,
  verifyUser,
  forgotPassword,
  resetPassword,
  changePassword,
  sendLoginCode,
  loginWithCode,
  deleteUser,
  getUsers,
  upgradeUser,
  loginWithGoogle,
};
