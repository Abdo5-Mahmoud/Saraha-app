import express from "express";
import * as dotenv from "dotenv";
import bootstrap from "./src/app.controller.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
bootstrap(express, app);
app.listen(port, () => console.log(`Saraha app listening on port ${port}!`));
