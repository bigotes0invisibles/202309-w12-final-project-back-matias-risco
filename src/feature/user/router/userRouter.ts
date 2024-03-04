import { Router } from "express";
import { validate } from "express-validation";
import UsersRepository from "../repository/UsersRepository.js";
import UserController from "../controller/UserController.js";
import { userCheckValidator, userValidator } from "../model/validator.js";

const usersRepository = new UsersRepository();
const usersController = new UserController(usersRepository);
const userRouter = Router();

userRouter.post("/add", validate(userValidator), usersController.createUser);
userRouter.post("/login", validate(userValidator), usersController.loginUser);
userRouter.post(
  "/check",
  validate(userCheckValidator),
  usersController.checkUser,
);

export default userRouter;
