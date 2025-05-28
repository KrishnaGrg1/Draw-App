import { Request, Response } from "express";
import {prismaClient}  from "@repo/db/prismaClient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name, photo } = req.body;

    const existingUser = await prismaClient.user.findFirst({
      where: {
        email
      }
    });
    if (existingUser) {
      res.status(400).json({
        message: "Email already exist."
      });
      return;
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await prismaClient.user.create({
      data: {
        email,
        password: hashPassword,
        name,
         ...(photo && { photo })
      }
    });

    res.status(200).json({
      message: "User created successfully",
      newUser
    });
    return;
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

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const existingUser = await prismaClient.user.findFirst({
      where: {
        email
      }
    });
    if (!existingUser) {
      res.status(400).json({
        message: "User not found"
      });
      return;
    }
    const comparePassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!comparePassword) {
      res.status(400).json({
        message: "Password is incorrect"
      });
      return;
    }
    const userId = existingUser.id;

    const token = await jwt.sign(
      {
        userId
      },
      JWT_SECRET
    );

    res.status(200).json({
      message: "Login Successfully",
      token
    });
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

const authController = {
  register,
  login
};
export default authController;
