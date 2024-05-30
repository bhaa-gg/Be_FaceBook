import { Router } from "express";
import { signUp, login, logout } from "./user.controler.js";
import { hashPass } from "../../Middlewaers/passwordHashing.js";

const route = Router();

route.post("/signUp", hashPass, signUp)
route.post("/login", login)
route.post("/logout", logout)


export default route