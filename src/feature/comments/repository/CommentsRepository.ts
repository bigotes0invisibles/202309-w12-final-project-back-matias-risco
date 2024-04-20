import { gamesRepository } from "../../games/router/gamesRouter.js";
import { usersRepository } from "../../user/router/userRouter.js";
import Comments from "../model/Comments.js";
import { type CommentWithOutId, type CommentApiStructure } from "../types";
import { commentToApi, commentsToApi } from "../utils/commentTransformation.js";
import { type CommentsRepositoryStructure } from "./types";

class CommentsRepository implements CommentsRepositoryStructure {
  async addComment(comment: CommentWithOutId): Promise<CommentApiStructure> {
    try {
      const { _idGame, userName, _idUser } = comment;
      if (!(await usersRepository.userCheck(userName, _idUser))) {
        throw new Error(`Error: the userName: ${userName} dosen't exist`);
      }

      if (!(await gamesRepository.checkGame(_idGame))) {
        throw new Error(`Error: the game Id: ${_idGame} dosen't exist`);
      }

      const newComment = (await Comments.create(comment)).toJSON();

      return commentToApi(newComment);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async getCommentsByIdGame(_idGame: string): Promise<CommentApiStructure[]> {
    try {
      const comments = await Comments.find({ _idGame }).lean();
      return commentsToApi(comments);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}

export default CommentsRepository;
