import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ienv from "../env";
const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({
        message: "User already found"
      });
      return;
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashPassword
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
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
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
    const userId = existingUser._id;
    const JWT_SECRET = ienv.JWT_SECRET as string;
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


const authController={
  register,
  login
}
export default authController