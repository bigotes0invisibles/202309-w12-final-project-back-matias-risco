import {
  type CommentWithOutId,
  type CommentApiStructure,
  type CommentDatabaseStructure,
} from "../types";

export const commentToApi = ({
  _id: id,
  ...comment
}: CommentDatabaseStructure): CommentApiStructure => ({ id, ...comment });

export const commentsToApi = (
  comments: CommentDatabaseStructure[],
): CommentApiStructure[] => comments.map((comment) => commentToApi(comment));

export const commentToWithOutId = ({
  id,
  ...comment
}: CommentApiStructure): CommentWithOutId => comment;

export const commentsToWithOutId = (
  comments: CommentApiStructure[],
): CommentWithOutId[] => comments.map((comment) => commentToWithOutId(comment));
