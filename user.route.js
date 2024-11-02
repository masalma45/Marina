import { Router } from "express";
import { UserController } from "../controllers/user.controllers.js";
import { verifyToken } from "../middlwares/jwt.middlwares.js";

const router = Router()

router.post('/signup', UserController.signup)
router.post('/login', UserController.login)


export default router;
