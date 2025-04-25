import { Router } from "express";
import * as regestration from "./services/registeration.service.js";
import { validation } from "../../middleware/validation.middleware.js";
import * as validators from "./authvalidation.js";
import * as loginServices from "./services/login.service.js";
const authRouter = Router();

authRouter.post("/signup", validation(validators.signup), regestration.signup);
authRouter.post("/login", validation(validators.login), loginServices.login);
authRouter.patch("/confirmEmail", regestration.confirmEmail);
export default authRouter;
