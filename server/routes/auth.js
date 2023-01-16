import { Router } from "express";
import { register, login, getme } from "../controllers/auth.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = new Router();

//Register
//http://localhost:3002/api/auth/register
router.post("/register", register);

//Login
//http://localhost:3002/api/auth/Login
router.post("/login", login);

//Get me
//http://localhost:3002/api/auth/me
router.get("/me", checkAuth, getme);

export default router;
