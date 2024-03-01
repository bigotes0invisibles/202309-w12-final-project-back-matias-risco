import { type Response, type Request } from "express";
import {
  type CommentsDatabaseStructure,
  type CommentsWithOutId,
} from "../types";

export type CommentBodyRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  {
    comment: CommentsWithOutId;
  }
>;

export type CommentBodyResponse = Response<{
  comment: CommentsDatabaseStructure;
}>;
