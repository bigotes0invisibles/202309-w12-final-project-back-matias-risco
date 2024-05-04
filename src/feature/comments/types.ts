export interface CommentBase {
  userName: string;
  comment: string;
  response: string[];
}

export interface CommentDatabaseStructure extends CommentBase {
  _id: string;
  _idGame: string;
  _idUser: string;
}

export type CommentDatabaseWithOutId = Omit<CommentDatabaseStructure, "_id">;

export interface CommentWithOutId extends CommentBase {
  idGame: string;
  idUser: string;
}

export interface CommentWithToken extends Omit<CommentWithOutId, "idUser"> {
  token: string;
}

export interface CommentApiStructure extends CommentBase {
  id: string;
}
