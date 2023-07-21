import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth";
import dotenv from "dotenv";
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config({ path: "./config.env" });
app.use(bodyParser.json());
app.use(cookieParser());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Origin"
  );
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  });
  next();
});

app.use("/auth", authRoutes);

app.use(
  (
    error: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const message = error.message;
    const status = error.statusCode || 500;
    const data = error.data || "";
    res.status(status).json({
      message: message,
      data: data,
    });
  }
);
mongoose
  .connect(
    `mongodb+srv://mati:${process.env.DATABASE_PASSWORD}@cluster0.pd16stu.mongodb.net/gmark?retryWrites=true`
  )
  .then((result) => {
    console.log("connected");
    app.listen(process.env.PORT);
  })
  .catch((err) => console.log(err));
