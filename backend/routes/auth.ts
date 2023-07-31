import { Router } from "express";
const router = Router();
import { body } from "express-validator";
import * as authController from "../controllers/authController";
const User = require("../models/userModel");
const isAuth = require("../authorized");

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .custom((value) => {
        return User.findOne({ email: value }).then(
          (userDoc: Promise<void> | null) => {
            if (userDoc) {
              return Promise.reject("E-Mail address already exists!");
            }
          }
        );
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 8 }),
    body("passwordConfirm")
      .trim()
      .custom((value, { req }) => {
        return value === req.body.password;
      }),
  ],
  authController.signup
);
router.post("/login", authController.login);
router.get("/", isAuth, authController.gets);
router.get("/logout", authController.logOut);
export default router;
