import { type Response, type Request } from "express";
import {
  type UserWithOutPasswordStructure,
  type UserWithOutIdStructure,
  type UserWithOnlyName,
} from "../types";

export type UserBodyRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  { user: UserWithOutIdStructure }
>;

export type UserNameBodyRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  { user: UserWithOnlyName }
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
