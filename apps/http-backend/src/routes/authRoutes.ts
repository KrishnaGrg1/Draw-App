import { Router } from "express";
import authController from "../controller/authControllers";
import validate from "../middlewares/validation";
import authValidation from "../validations/authValidations";


const authRouter:Router=Router()

authRouter.post('/signup',validate(authValidation.register),authController.register);
authRouter.post('/signin',authController.login)

export default authRouter