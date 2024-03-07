export interface CommentDatabaseStructure {
  _id: string;
  _idGame: string;
  userName: string;
  comment: string;
  response: CommentDatabaseStructure[];
}

export type CommentWithOutId = Omit<CommentDatabaseStructure, "_id">;

export interface CommentApiStructure extends CommentWithOutId {
  id: string;
}
