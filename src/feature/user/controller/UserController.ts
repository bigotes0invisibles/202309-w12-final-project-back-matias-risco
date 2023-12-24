import { type NextFunction } from "express";
import jwt from "jsonwebtoken";
import { type UsersRepositoryStructure } from "../repository/types";
import {
  type UserCreateResponse,
  type UserBodyRequest,
  type UserTokenResponse,
} from "./types";
import bcrypt from "bcrypt";
import CustomError from "../../../server/CustomError/CustomError.js";

class UserController {
  constructor(private readonly userRepository: UsersRepositoryStructure) {}

  createUser = async (
    req: UserBodyRequest,
    res: UserCreateResponse,
    next: NextFunction,
  ) => {
    try {
      const { user } = req.body;
      const hashedPasword = await bcrypt.hash(
        user.name + process.env.SALT + user.password,
        11,
      );
      user.password = hashedPasword;

      const newUser = await this.userRepository.userCreate(user);

      res.status(200).json({ user: newUser });
    } catch (error) {
      const newError = new CustomError(
        500,
        "Error in register new User",
        (error as Error).message,
      );

      next(newError);
    }
  };

  loginUser = async (
    req: UserBodyRequest,
    res: UserTokenResponse,
    next: NextFunction,
  ) => {
    try {
      const { user } = req.body;

      const logUser = await this.userRepository.userLogin(user);

      const token = jwt.sign(logUser, process.env.JWT_SECRET_KEY!);

      res.status(200).json({ token });
    } catch (error) {
      const newError = new CustomError(
        500,
        "Error en login user",
        (error as Error).message,
      );

      next(newError);
    }
  };
}

export default UserController;
