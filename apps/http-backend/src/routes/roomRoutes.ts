import { Router } from "express";
import validate from "../middlewares/validation";
import { roomValidations } from "@repo/common/types";
import roomController from "../controller/roomController";

const roomRoutes: Router = Router();

roomRoutes.post(
  "/",
  validate(roomValidations.createRoom),
  roomController.createRoom
);
roomRoutes.get("/chats/:roomId", roomController.getChat);
export default roomRoutes;
