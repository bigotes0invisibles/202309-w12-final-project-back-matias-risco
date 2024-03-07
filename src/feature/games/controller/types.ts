import { type Response, type Request } from "express";
import {
  type GameStructureWithOutId,
  type GameStructureApi,
  type GamePartialStructureApi,
  type GameWithOnlyId,
} from "../types";

export interface RequestQuery {
  page?: string;
}

export interface GamesJson {
  games: GameStructureApi[];
}

export type GameIdRequestParams = Request<{
  idGame: string;
}>;

export type GameBodyResponseParams = Response<{ game: GameStructureApi }>;

export type GamesResponseBody = Response<GamesJson>;

export type GameAddRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  {
    game: GameStructureWithOutId;
  }
>;

export type GameEditRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  {
    game: GamePartialStructureApi;
  }
>;

export type GameCheckRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  {
    game: GameWithOnlyId;
  }
>;

export type GameCheckResponseParams = Response<{ game: boolean }>;
