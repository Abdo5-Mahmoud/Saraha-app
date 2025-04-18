import { Router } from "express";
import { sendMessage } from "./services/message.service.js";
import { validation } from "../../middleware/validation.middleware.js";
import { message } from "./message.validation.js";

const messageRouter = Router();
messageRouter.post("/message", validation(message), sendMessage);
export default messageRouter;
