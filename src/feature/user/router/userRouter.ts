import { Router } from "express";
import { validate } from "express-validation";
import UsersRepository from "../repository/UsersRepository.js";
import UserController from "../controller/UserController.js";
import { userValidator } from "../model/validator.js";

const usersRepository = new UsersRepository();
const usersController = new UserController(usersRepository);
const userRouter = Router();

userRouter.post("/add", validate(userValidator), usersController.createUser);
userRouter.get("/login", validate(userValidator), usersController.loginUser);

export default userRouter;
