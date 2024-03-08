export interface CommentDatabaseStructure {
  _id: string;
  _idGame: string;
  userName: string;
  comment: string;
  response: string[];
}

export type CommentWithOutId = Omit<CommentDatabaseStructure, "_id">;

export interface CommentApiStructure extends CommentWithOutId {
  id: string;
}
