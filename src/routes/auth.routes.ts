import { Router} from "express";
import {register, login, logout, verifyToken} from "../controllers/auth.controller"
import {validateSchema} from "../middlewares/inputDataValidator"
import {registerValidationSchema, loginValidationSchema} from "../schemas/auth.schema"

const router = Router()

router.post('/register', validateSchema(registerValidationSchema), register)
router.post('/login', validateSchema(loginValidationSchema),login)
router.post('/logout', logout)
router.get('/verify', verifyToken)

export default router