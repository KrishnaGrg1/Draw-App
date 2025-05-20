import { NextFunction, Response } from "express";
import IRequest from "./IRequest";
import ienv from "../env";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
const jwtfromUser = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.header("Authorization");
    const authtoken = authHeader?.replace("Bearer", "");
    if (!authtoken) {
      res.status(400).json({
        message: "Auth token is required"
      });
      return;
    }
    const decode = await jwt.verify(authtoken, JWT_SECRET);
    if (decode) {
      if (typeof decode === "string") {
        res.status(400).json({
          message: "Invalid token"
        });
        return;
      }
      req.userId = decode.userId;
      next();
    } else {
      res.status(400).json({
        message: "You are not authorized"
      });
    }
  } catch (e: any) {
    if (e instanceof Error) {
      console.error(e.message);
      res.status(500).json({
        message: e.message
      });
    } else {
      console.error("Unexpected error has occurred");
      res.status(500).json({
        message: "Unexpected error has occurred"
      });
    }
  }
};

export default jwtfromUser;
