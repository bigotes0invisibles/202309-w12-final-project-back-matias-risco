import { type NextFunction } from "express";
import { type CommentsRepositoryStructure } from "../repository/types";
import { type CommentBodyRequest, type CommentBodyResponse } from "./types";
import { type Error } from "mongoose";
import CustomError from "../../../server/CustomError/CustomError";

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
      const newComment = await this.commentsRepository.addComment(comment);

      res.status(200).json({ comment: newComment });
    } catch (error) {
      const newError = new CustomError(406, (error as Error).message);

      next(newError);
    }
  };
}

export default CommentsController;
