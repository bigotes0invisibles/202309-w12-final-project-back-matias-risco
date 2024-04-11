export interface CommentDatabaseStructure {
  _id: string;
  _idGame: string;
  _idUser: string;
  userName: string;
  comment: string;
  response: string[];
}

export type CommentWithOutId = Omit<CommentDatabaseStructure, "_id">;

export interface CommentWithToken extends Omit<CommentWithOutId, "_idUser"> {
  token: string;
}

export interface CommentApiStructure extends CommentWithOutId {
  id: string;
}
