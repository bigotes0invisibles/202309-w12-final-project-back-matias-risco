import { type NextFunction } from "express";
import gamesMock from "../../mock/gamesMock";
import { type GamesRepositoryStructure } from "../../repository/types";
import GamesController from "../GamesController";
import { type GameCheckRequest, type GameCheckResponseParams } from "../types";
import type CustomError from "../../../../server/CustomError/CustomError";

describe("Given the function infoGame in GamesController", () => {
  const req: Partial<GameCheckRequest> = {
    body: {
      game: {
        id: gamesMock[0]._id,
      },
    },
  };

  const res: Partial<GameCheckResponseParams> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  const next: NextFunction = jest.fn();

  describe("When it is call with a Response  and a Request with id of 'Archer melo'", () => {
    test("then it should call status with Code 200 and game exist", async () => {
      const expectCode = 200;
      const expectedJson = {
        game: true,
      };

      const gamesRepository: Partial<GamesRepositoryStructure> = {
        async checkGame({ id }) {
          const game = gamesMock.find(({ _id }) => _id === id);

          return !!game;
        },
      };

      const gamesController = new GamesController(
        gamesRepository as GamesRepositoryStructure,
      );

      await gamesController.checkGame(
        req as GameCheckRequest,
        res as GameCheckResponseParams,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectCode);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining(expectedJson),
      );
    });
  });

  describe("When it is call with a Response  and a Request with id of 'Archer melo', but there is a error", () => {
    test("then it should call next with Error 400 'Error in checking the game Id'", async () => {
      const expectError: Partial<CustomError> = {
        statusCode: 400,
        message: "Error in checking the game Id",
      };

      const gamesRepository: Partial<GamesRepositoryStructure> = {
        async checkGame() {
          throw new Error(`Error in checking`);
        },
      };

      const gamesController = new GamesController(
        gamesRepository as GamesRepositoryStructure,
      );

      await gamesController.checkGame(
        req as GameCheckRequest,
        res as GameCheckResponseParams,
        next,
      );

      expect(next).toHaveBeenCalledWith(expect.objectContaining(expectError));
    });
  });
});
