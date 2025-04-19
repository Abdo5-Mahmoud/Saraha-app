import jwt from "jsonwebtoken";
import userModel from "../DB/models/User.model.js";
import { asyncHandler } from "../utils/error/error.js";
export const authenticationMiddleware = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers;

  // check if the authorization exist or not and if it is valid or not
  if (!authorization || authorization?.split(" ").length > 2) {
    // return res.status(400).json({ message: "authorization is required" });
    return next(new Error("authorization is required", { cause: 400 }));
  }
  const [barrer, token] = authorization.split(" ") || [];
  // console.log(barrer, token);
  //check the barrer signature
  let signature = "";
  switch (barrer) {
    case "admin":
      signature = process.env.TOKEN_SIGNATURE_ADMIN;
      break;
    case "user":
      signature = process.env.TOKEN_SIGNATURE_USER;
      break;
    default:
      return next(new Error("Invalid Token parts"));
  }

  //decode the token
  // console.log(signature);
  const decoded = jwt.verify(token, signature);

  if (!decoded.userId) {
    // return res.status(401).json({ message: "invalid token" });
    return next(new Error("invalid token", { cause: 400 }));
  }
  const user = await userModel.findById(decoded.userId);
  // check if the user is deleted or not , and if the password changed before the token initiated or not
  if (!user || user.isDeleted || user.confirmEmail === false) {
    return next(new Error("Unauthorized", { cause: 404 }));
  }
  if (parseInt((user.passwordChangedAt.getTime() || 0) / 1000) > decoded.iat) {
    return next(new Error("Expired credential", { cause: 400 }));
  }
  req.user = user;
  return next();
  //   return res.json({ message: "Hello from authentication middle ware!" });
});

export const authorizationMiddleware = (roles) => {
  return (req, res, next) => {
    const { user } = req;
    if (!user) {
      return next(new Error("Unauthorized", { cause: 401 }));
    }
    if (!roles.includes(user.role)) {
      return next(new Error("Forbidden", { cause: 403 }));
    }
    return next();
    // return res.json({ message: "Hello from authorization middle ware!" });
  };
};

export const userRoles = {
  user: "user",
  Admin: "Admin",
};
