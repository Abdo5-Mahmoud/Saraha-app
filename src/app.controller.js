import connectDB from "./DB/connection.js";
import authRouter from "./Modules/auth/auth.controller.js";
import messageRouter from "./Modules/messages/message.controller.js";
import userRouter from "./Modules/users/users.controller.js";
import { globalErrorHandler } from "./utils/error/error.js";
import cors from "cors";
const bootstrap = (express, app) => {
  app.use(cors());
  // middlewares
  app.use(express.json()); // for parsing application/json || buffer data into json

  app.get("/", (req, res, next) => {
    return res.status(200).json({ message: "Welcome to Saraha APP" });
  });
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/message", messageRouter);

  app.use(globalErrorHandler);
  app.use("*", (req, res) => {
    res.status(404).json({ message: "Rounting Not Found" });
  });

  connectDB();
};
export default bootstrap;
