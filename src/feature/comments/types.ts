export interface CommentsDatabaseStructure {
  _id: string;
  _idUser: string;
  _idGame: string;
  userName: string;
  comment: string;
  response: CommentsDatabaseStructure[];
}

export type CommentsWithOutId = Omit<CommentsDatabaseStructure, "_id">;
