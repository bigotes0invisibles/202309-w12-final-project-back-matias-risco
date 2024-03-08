import {
  type CommentApiStructure,
  type CommentDatabaseStructure,
} from "../types";

export const commentToApi = ({
  _id: id,
  ...comment
}: CommentDatabaseStructure): CommentApiStructure => ({ id, ...comment });
