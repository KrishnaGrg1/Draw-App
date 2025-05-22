import { Router } from "express";
import authRouter from "./authRoutes";
import jwtfromUser from "../middlewares/jwtfromUser";
import roomRoutes from "./roomRoutes";


const mainRoutes:Router=Router();


mainRoutes.use('/user',authRouter)

mainRoutes.use('/room',jwtfromUser,roomRoutes);

export default mainRoutes