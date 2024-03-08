import { gamesRepository } from "../../games/router/gamesRouter";
import { usersRepository } from "../../user/router/userRouter";
import Comments from "../model/Comments";
import { type CommentWithOutId, type CommentApiStructure } from "../types";
import { commentToApi } from "../utils/commentTransformation";
import { type CommentsRepositoryStructure } from "./types";

class CommentsRepository implements CommentsRepositoryStructure {
  async addComment(comment: CommentWithOutId): Promise<CommentApiStructure> {
    try {
      const { _idGame, userName } = comment;
      if (!(await usersRepository.userCheck(userName))) {
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
}

export default CommentsRepository;
