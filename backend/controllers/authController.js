"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logOut = exports.gets = exports.login = exports.signup = void 0;
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
function signup(req, res, next) {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        const err = new Error("Validation error");
        err.statusCode = 422;
        err.data = error.mapped();
        throw err;
    }
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
        const user = new User({
            email: email,
            name: name,
            password: hashedPassword,
        });
        return user.save();
    })
        .then((result) => {
        res.status(201).json({
            message: "User created",
            userID: result._id,
        });
    })
        .catch((err) => {
        throw err;
    });
}
exports.signup = signup;
function login(req, res, next) {
    const login = req.body.email;
    const password = req.body.password;
    let currentUser;
    User.findOne({ email: login })
        .then((user) => {
        if (!user) {
            const error = new Error("Incorrect login or password.");
            error.statusCode = 401;
            throw error;
        }
        currentUser = user;
        return bcrypt.compare(password, user.password);
    })
        .then((result) => {
        if (!result) {
            const error = new Error("Incorrect login or password.");
            error.statusCode = 401;
            throw error;
        }
        if (req.cookies.Authorization) {
            res.status(200).json({
                message: "You are already logged in",
                token: req.cookies.Authorization,
            });
        }
        const token = jwt.sign({ email: currentUser.email, userId: currentUser._id.toString() }, process.env.PRIVATE_KEY, { expiresIn: "1h" });
        res
            .cookie("Authorization", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60,
        })
            .status(200)
            .json({
            message: "success",
            token: token,
        });
    })
        .catch((err) => {
        next(err);
    });
}
exports.login = login;
function gets(req, res, next) {
    User.find().then((user) => {
        res.status(200).json({
            status: "success",
            message: "success fetch",
            user: user,
        });
    });
}
exports.gets = gets;
function logOut(req, res, next) {
    res
        .cookie("Authorization", "", {
        httpOnly: true,
        maxAge: 1000,
    })
        .status(200)
        .json({
        status: "success",
        message: "Logged out",
    });
}
exports.logOut = logOut;
