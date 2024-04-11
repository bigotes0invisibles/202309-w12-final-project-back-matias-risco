import { type Response, type Request } from "express";
import {
  type UserWithOutPasswordStructure,
  type UserWithOutIdStructure,
  type UserWithOnlyNameAndToken,
} from "../types";

export type UserBodyRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  { user: UserWithOutIdStructure }
>;

export type UserNameBodyRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  { user: UserWithOnlyNameAndToken }
>;

export type UserCreateResponse = Response<{
  user: UserWithOutPasswordStructure;
}>;

export type UserTokenResponse = Response<{
  token: string;
}>;

export type UserCheckResponse = Response<{
  user: boolean;
}>;
