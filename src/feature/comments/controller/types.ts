import { type Response, type Request } from "express";
import { type CommentWithToken, type CommentApiStructure } from "../types";

export type CommentBodyRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  {
    comment: CommentWithToken;
  }
>;

export type CommentBodyResponse = Response<{
  comment: CommentApiStructure;
}>;
