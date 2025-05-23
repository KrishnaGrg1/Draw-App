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

const getChat=async(req:IRequest,res:Response):Promise<void>=>{
  try{
    const roomId=Number(req.params.roomId);
    if(!roomId){
      res.status(400).json({
        message:"Room Id required"
      })
      return
    }
    const message=await prismaClient.chat.findMany({
      where:{
        roomId:roomId
      },
      orderBy:{
        id:"desc"
      },
      take:50
    })
    res.status(200).json({
      message
    })
  }catch(e:any){
    if(e instanceof Error){
      res.status(500).json({
        message:e.message
      })
    }else{
      res.status(500).json({
        message:"Unexpected error occurred"
      })
    }
  }
}
const roomController={
    createRoom,getChat
}

export default roomController