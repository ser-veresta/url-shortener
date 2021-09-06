import { Users } from "../models/user.js";
import ErrorResponse from "../utils/errorResponse.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = new Users({
      username,
      email,
      password,
    });
    await user.save();

    const activeUrl = `${process.env.CLIENT_URI}/Login/${user._id}`;

    const message = `
    <h1>Hi ${username},</h1>
    <p>Please click the link below to activate your account</p>
    <a href=${activeUrl} clicktracking=off>${activeUrl}</a>
    `;

    try {
      await sendEmail({
        to: email,
        subject: "Account Activation",
        text: message,
      });

      res.status(201).json({
        success: true,
        message: "Activation Email Sent",
      });
    } catch (error) {
      user.activeToken = undefined;

      await user.save();

      return next(new ErrorResponse("Email could not be sent", 500));
    }
  } catch (error) {
    next(error);
  }
};

export const activate = async (req, res, next) => {
  const { activeToken } = req.params;

  try {
    const user = await Users.findById(activeToken);

    if (!user) return next(new ErrorResponse("Invalid Activation Token", 400));

    user.active = true;

    await user.save();

    res.status(201).json({
      success: true,
      message: "Account Active",
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) return next(new ErrorResponse("Provide a email and password", 400));

  try {
    const user = await Users.findOne({ email }).select("+password");

    if (!user) return next(new ErrorResponse("Invalid Credentials", 401));

    if (!user.active) return next(new ErrorResponse("Activate your account to login", 401));

    const isMatch = await user.matchPassword(password);

    if (!isMatch) return next(new ErrorResponse("Invalid Credentials", 401));

    const token = user.generateToken();

    res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  const { user } = req.body;

  res.status(200).json({ success: true, data: user });
};

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await Users.findOne({ email });

    if (!user) return next(new ErrorResponse("Email doesn't exist", 404));

    const resetToken = user.generateResetPasswordToken();

    await user.save();

    const resetUrl = `${process.env.CLIENT_URI}/ResetPassword/${resetToken}`;

    const message = `
    <h1>You have requested a password reset</h1>
    <p>Please click the link below</p>
    <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      });

      res.status(200).json({
        success: true,
        message: "Email Sent",
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return next(new ErrorResponse("Email could not be sent", 500));
    }
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  const { resetToken } = req.params;

  const resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  try {
    const user = await Users.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } });

    if (!user) return next(new ErrorResponse("Invalid Reset Password Link", 400));

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      message: "Password reset success",
    });
  } catch (error) {
    next(error);
  }
};
