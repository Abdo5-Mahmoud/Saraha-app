import { Router } from "express";
import {
  authenticationMiddleware,
  authorizationMiddleware,
} from "../../middleware/authentication.middleware.js";
import * as services from "./services/user.service.js";
import { endpoint } from "./user.endpoint.js";
import { validation } from "../../middleware/validation.middleware.js";
import {
  emailValidation,
  passwordValidation,
  updateProfileValidation,
} from "./userValidation.js";

const userRouter = Router();
userRouter.get(
  "/profile",
  authenticationMiddleware,
  authorizationMiddleware(endpoint.profile),
  services.profile
);
userRouter.patch(
  "/profile",
  validation(updateProfileValidation),
  authenticationMiddleware,
  services.updateProfile
);
userRouter.patch(
  "/changepassword",
  validation(passwordValidation),
  authenticationMiddleware,
  services.changePassword
);
userRouter.patch(
  "/changeEmail",
  validation(emailValidation),
  authenticationMiddleware,
  services.changeEmail
);
userRouter.delete("/delete", authenticationMiddleware, services.deleteUser);

export default userRouter;
