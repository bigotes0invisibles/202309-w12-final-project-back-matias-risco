import { type NextFunction } from "express";
import { type GamesRepositoryStructure } from "../../repository/types";
import {
  type GamePartialStructureApi,
  type GameStructureApi,
  type GameStructure,
} from "../../types";
import { type GameBodyResponseParams, type GameEditRequest } from "../types";
import gamesMock from "../../mock/gamesMock";
import { copyGameApi } from "../../utils/gamesCopy";
import { gamesToApi } from "../../utils/gamesTransformation";
import type CustomError from "../../../../server/CustomError/CustomError";
import GamesController from "../GamesController";

afterEach(() => {
  jest.clearAllMocks();
});

describe("Given the function editGame in GamesController", () => {
  const gamesRepository: Partial<GamesRepositoryStructure> = {
    async editGame(game: GamePartialStructureApi): Promise<GameStructureApi> {
      const gamefound = gamesMock.find(({ _id }) => _id === game.id);
      if (!gamefound) {
        throw new Error();
      }

      const { _id, ...gameEdited } = { ...gamefound, ...game };

      return copyGameApi(gameEdited);
    },
  };

  const gamesController = new GamesController(
    gamesRepository as GamesRepositoryStructure,
  );

  const [ultrakill, candyCrush] = gamesToApi(gamesMock);
  const { id } = ultrakill;
  const { audience, graphics, languages } = candyCrush;
  const expectedGame = { id, audience, graphics, languages };

  const res: Partial<GameBodyResponseParams> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  const next: NextFunction = jest.fn();

  describe("When it is call with a Response  and a Request with id of utrakill and the updated information", () => {
    const req: Partial<GameEditRequest> = {
      body: {
        game: { ...expectedGame },
      },
    };

    test("then it should call status with Code 200", async () => {
      const expectCode = 200;

      await gamesController.editGame(
        req as GameEditRequest,
        res as GameBodyResponseParams,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectCode);
    });

    test("then it should call json with new game", async () => {
      await gamesController.editGame(
        req as GameEditRequest,
        res as GameBodyResponseParams,
        next,
      );

      expect(res.json).toHaveBeenCalledWith({
        game: expect.objectContaining(expectedGame) as GameStructure,
      });
    });
  });

  describe("When it is call with a Response  and a Request with id of utrakill and the updated information but there is a error", () => {
    test("then it should call new with error 409 'Game not found or edited'", async () => {
      const id = "12989sd9o1jdjfalfj3ldsfk3j";
      const req: Partial<GameEditRequest> = {
        body: {
          game: { ...expectedGame, id },
        },
      };

      const expectError: Partial<CustomError> = {
        statusCode: 409,
        message: "Game not found or edited",
      };

      await gamesController.editGame(
        req as GameEditRequest,
        res as GameBodyResponseParams,
        next,
      );

      expect(next).toHaveBeenCalledWith(expect.objectContaining(expectError));
    });
  });
});
