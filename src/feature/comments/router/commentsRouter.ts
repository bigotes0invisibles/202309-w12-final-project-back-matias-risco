import { Router } from "express";
import CommentsController from "../controller/CommentsController.js";
import CommentsRepository from "../repository/CommentsRepository.js";
import { validate } from "express-validation";
import { addCommentValidator } from "../model/validator.js";

const commentsRepository = new CommentsRepository();
const commentsController = new CommentsController(commentsRepository);
const commentsRouter = Router();

commentsRouter.post(
  "/add",
  validate(addCommentValidator),
  commentsController.addComment,
);

export default commentsRouter;
