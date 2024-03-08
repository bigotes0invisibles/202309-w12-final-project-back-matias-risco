import { Router } from "express";
import CommentsController from "../controller/CommentsController";
import CommentsRepository from "../repository/CommentsRepository";
import { validate } from "express-validation";
import { addCommentValidator } from "../model/validator";

const commentsRepository = new CommentsRepository();
const commentsController = new CommentsController(commentsRepository);
const commentsRouter = Router();

commentsRouter.post(
  "/add",
  validate(addCommentValidator),
  commentsController.addComment,
);

export default commentsRouter;
