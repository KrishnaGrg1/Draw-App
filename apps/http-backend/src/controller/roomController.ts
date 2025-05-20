import { Response } from "express";
import IRequest from "../middlewares/IRequest";
import prismaClient from "@repo/db/prismaClient";

const createRoom = async (req: IRequest, res: Response): Promise<void> => {
  try {
    const { slug } = req.body;
    const userId = Number(req.userId);

    const existingRoom = await prismaClient.room.findFirst({
      where: {
        slug
      }
    });
    if (existingRoom) {
      res.status(400).json({
        message: "Room name already exist"
      });
      return;
    }

    const newRoom = await prismaClient.room.create({
      data: {
        slug,
        adminId: userId
      }
    });
    res.status(200).json({
      message: "Room created successfully",
      newRoom
    });
    return;
  } catch (e: any) {
    if (e instanceof Error) {
      res.status(500).json({
        error: e.message
      });
    } else {
      res.status(500).json({
        error: "Error occurred"
      });
    }
  }
};

const roomController={
    createRoom
}

export default roomController