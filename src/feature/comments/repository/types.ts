import {
  type CommentsDatabaseStructure,
  type CommentsWithOutId,
} from "../types";

export interface CommentsRepositoryStructure {
  addComment: (
    comment: CommentsWithOutId,
  ) => Promise<CommentsDatabaseStructure>;
}
