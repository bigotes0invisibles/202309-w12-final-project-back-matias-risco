import { type Response, type Request } from "express";
import { type CommentWithToken, type CommentApiStructure } from "../types";

export type CommentBodyRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  {
    comment: CommentWithToken;
  }
>;

export interface GameIdStructure {
  idGame: string;
}

export type CommentsGameRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  Record<string, unknown>,
  { idGame: string }
>;

export type CommentBodyResponse = Response<{
  comment: CommentApiStructure;
}>;

export interface CommentsBaseResponBody {
  comments: CommentApiStructure[];
}

export type CommentsBodyResponse = Response<CommentsBaseResponBody>;
