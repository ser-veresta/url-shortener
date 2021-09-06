import jwt from "jsonwebtoken";
import { Users } from "../models/user.js";
import ErrorResponse from "../utils/errorResponse.js";

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization) {
    token = req.headers.authorization;
  }

  if (!token) return next(new ErrorResponse("Not Authorized", 401));

  try {
    const { id } = jwt.verify(token, "123123123");

    const user = await Users.findById(id);

    if (!user) return next(new ErrorResponse("User Not Found", 404));

    req.body.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
