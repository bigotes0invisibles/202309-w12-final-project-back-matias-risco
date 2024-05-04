import { type NextFunction } from "express";
import { type CommentsRepositoryStructure } from "../repository/types";
import {
  type CommentsGameRequest,
  type CommentBodyRequest,
  type CommentBodyResponse,
  type CommentsBodyResponse,
} from "./types";
import { type Error } from "mongoose";
import CustomError from "../../../server/CustomError/CustomError.js";
import jwt from "jsonwebtoken";
import { type UserWithOutPasswordStructure } from "../../user/types";

class CommentsController {
  constructor(
    private readonly commentsRepository: CommentsRepositoryStructure,
  ) {}

  addComment = async (
    req: CommentBodyRequest,
    res: CommentBodyResponse,
    next: NextFunction,
  ) => {
    try {
      const { comment } = req.body;
      const { token, userName, ...reqComment } = comment;

      const user = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY!,
      ) as UserWithOutPasswordStructure;

      const newComment = await this.commentsRepository.addComment({
        ...reqComment,
        idUser: user.id,
        userName,
      });

      res.status(200).json({ comment: newComment });
    } catch (error) {
      const newError = new CustomError(406, (error as Error).message);

      next(newError);
    }
  };

  getComments = async (
    req: CommentsGameRequest,
    res: CommentsBodyResponse,
    next: NextFunction,
  ) => {
    try {
      const { idGame } = req.query;
      const comments =
        await this.commentsRepository.getCommentsByIdGame(idGame);

      res.status(200).json({ comments });
    } catch (error) {
      const newError = new CustomError(
        406,
        "Error in getting Comments",
        (error as Error).message,
      );
      next(newError);
    }
  };
}

export default CommentsController;
