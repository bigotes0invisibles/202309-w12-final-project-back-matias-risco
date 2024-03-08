import { type NextFunction } from "express";
import { type GamesRepositoryStructure } from "../../repository/types";
import { type GameStructure } from "../../types";
import {
  type GameBodyResponseParams,
  type GameIdRequestParams,
} from "../types";
import gamesMock from "../../mock/gamesMock";
import { gameToApi } from "../../utils/gamesTransformation";
import type CustomError from "../../../../server/CustomError/CustomError";
import GamesController from "../GamesController";

afterEach(() => {
  jest.clearAllMocks();
});

describe("Given the function infoGame in GamesController", () => {
  const gamesRepository: Partial<GamesRepositoryStructure> = {
    async infoGame(id: string) {
      const game = gamesMock.find(({ _id }) => _id === id);
      if (game === undefined) {
        throw new Error();
      }

      return gameToApi(game);
    },
  };

  const gamesController = new GamesController(
    gamesRepository as GamesRepositoryStructure,
  );

  const res: Partial<GameBodyResponseParams> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  const next: NextFunction = jest.fn();

  describe("When it is call with a Response  and a Request with id of 'Archer melo'", () => {
    test("then it should call status with Code 200", async () => {
      const expectCode = 200;
      const req: Partial<GameIdRequestParams> = {
        params: {
          idGame: gamesMock[0]._id,
        },
      };

      await gamesController.infoGame(
        req as GameIdRequestParams,
        res as GameBodyResponseParams,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectCode);
    });
  });

  describe("When it is call with a Response  and a Request with id of 'Archer melo'", () => {
    test("then it should call json with new game", async () => {
      const { _id, ...expectedJson } = gamesMock[0];
      const req: Partial<GameIdRequestParams> = {
        params: {
          idGame: gamesMock[0]._id,
        },
      };

      await gamesController.infoGame(
        req as GameIdRequestParams,
        res as GameBodyResponseParams,
        next,
      );

      expect(res.json).toHaveBeenCalledWith({
        game: expect.objectContaining(expectedJson) as GameStructure,
      });
    });
  });

  describe("When it is call with a Response  and a Request with wrong id", () => {
    test("then it should call next with 404 'Game not found'", async () => {
      const id = "656aa0000000000000000006";
      const expectedJson: Partial<CustomError> = {
        statusCode: 404,
        message: "Game not found",
      };
      const req: Partial<GameIdRequestParams> = {
        params: {
          idGame: id,
        },
      };

      await gamesController.infoGame(
        req as GameIdRequestParams,
        res as GameBodyResponseParams,
        next,
      );

      expect(next).toHaveBeenCalledWith(expect.objectContaining(expectedJson));
    });
  });
});
