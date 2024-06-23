import express from "express";
import { schemaValidator } from "../../middleware/validator";
import { createUserSchema, loginSchema } from "./users.validator";
import { register, login, getMe, logout } from "./users.controller";
import passport from "passport";

const router = express.Router();

router.post("/login", schemaValidator(loginSchema), login);
router.post("/register", schemaValidator(createUserSchema), register);
router.get("/me", passport.authenticate("jwt", { session: false }), getMe);
router.post(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  logout
);

export default router;
