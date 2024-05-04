import {
  type CommentWithOutId,
  type CommentApiStructure,
  type CommentDatabaseStructure,
  type CommentDatabaseWithOutId,
} from "../types";

export const commentToApi = ({
  _id: id,
  _idGame,
  _idUser,
  ...comment
}: CommentDatabaseStructure): CommentApiStructure => ({ id, ...comment });

export const commentsToApi = (
  comments: CommentDatabaseStructure[],
): CommentApiStructure[] => comments.map((comment) => commentToApi(comment));

export const commentDatabaseToWithOutId = ({
  _id,
  ...comment
}: CommentDatabaseStructure): CommentDatabaseWithOutId => comment;

export const commentsDatabaseToWithOutId = (
  comments: CommentDatabaseStructure[],
): CommentDatabaseWithOutId[] =>
  comments.map((comment) => commentDatabaseToWithOutId(comment));
