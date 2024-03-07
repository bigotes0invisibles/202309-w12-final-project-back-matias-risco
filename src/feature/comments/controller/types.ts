import { type Response, type Request } from "express";
import {
  type CommentApiStructure,
  type CommentDatabaseStructure,
  type CommentWithOutId,
} from "../types";

export type CommentBodyRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  {
    comment: CommentWithOutId;
  }
>;

export type CommentBodyResponse = Response<{
  comment: CommentApiStructure;
}>;
