import { Router } from "express";
import { loginController, signUpController } from "./controllers";

const router = Router();

router.get("/login", loginController)
router.post("/signup", signUpController)

export default router;