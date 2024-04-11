import { type NextFunction } from "express";
import jwt from "jsonwebtoken";
import { type UsersRepositoryStructure } from "../repository/types";
import {
  type UserCreateResponse,
  type UserBodyRequest,
  type UserTokenResponse,
  type UserNameBodyRequest,
  type UserCheckResponse,
} from "./types";
import CustomError from "../../../server/CustomError/CustomError.js";
import { userHashPassword } from "../utils/usersFunction.js";
import { type UserWithOutPasswordStructure } from "../types";

class UserController {
  constructor(private readonly userRepository: UsersRepositoryStructure) {}

  createUser = async (
    req: UserBodyRequest,
    res: UserCreateResponse,
    next: NextFunction,
  ) => {
    try {
      const { user } = req.body;

      const newUser = await this.userRepository.userCreate(
        await userHashPassword(user),
      );

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
      const newError = new CustomError(500, (error as Error).message);

      next(newError);
    }
  };

  checkUser = async (
    req: UserNameBodyRequest,
    res: UserCheckResponse,
    next: NextFunction,
  ) => {
    try {
      const {
        user: { name, token },
      } = req.body;
      const user = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY!,
      ) as UserWithOutPasswordStructure;

      const userCheck = await this.userRepository.userCheck(name, user.id);

      res.status(200).json({ user: userCheck });
    } catch (error) {
      const newError = new CustomError(
        500,
        "Error in checking User",
        (error as Error).message,
      );

      next(newError);
    }
  };
}

export default UserController;
