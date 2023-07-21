"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_1 = __importDefault(require("./routes/auth"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
const cookieParser = require("cookie-parser");
const cors = require("cors");
dotenv_1.default.config({ path: "./config.env" });
app.use(body_parser_1.default.json());
app.use(cookieParser());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Origin");
    cors({
        origin: "http://localhost:3001",
        credentials: true,
    });
    next();
});
app.use("/auth", auth_1.default);
app.use((error, req, res, next) => {
    const message = error.message;
    const status = error.statusCode || 500;
    const data = error.data || "";
    res.status(status).json({
        message: message,
        data: data,
    });
});
mongoose_1.default
    .connect(`mongodb+srv://mati:${process.env.DATABASE_PASSWORD}@cluster0.pd16stu.mongodb.net/gmark?retryWrites=true`)
    .then((result) => {
    console.log("connected");
    app.listen(process.env.PORT);
})
    .catch((err) => console.log(err));
