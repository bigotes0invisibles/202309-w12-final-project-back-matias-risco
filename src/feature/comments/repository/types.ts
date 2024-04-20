import { type CommentApiStructure, type CommentWithOutId } from "../types";

export interface CommentsRepositoryStructure {
  addComment: (comment: CommentWithOutId) => Promise<CommentApiStructure>;
  getCommentsByIdGame: (idGame: string) => Promise<CommentApiStructure[]>;
}
