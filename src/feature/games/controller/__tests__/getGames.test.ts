import { type Request, type Response } from "express";
import GamesController, { type GamesResponseBody } from "../GamesController";
import { gameToApi, gamesToApi } from "../../utils/gamesTransformation";
import gamesMock from "../../mock/gamesMock";
import { type GamesRepositoryStructure } from "../../repository/types";

describe("Given the function getGames in GamesController", () => {
  describe("When it is call with a Response as a parameter", () => {
    const gamesRepository: GamesRepositoryStructure = {
      getGames: async () => gamesToApi(gamesMock),
      async deleteGame(id: string) {
        const game = gamesMock.find(({ _id }) => _id === id);
        if (!game) {
          throw new Error("document not found");
        }

        return gameToApi(game);
      },
    };
    const gamesController = new GamesController(gamesRepository);
    const req = {};
    const res: Pick<GamesResponseBody, "status" | "json"> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    test("then it should call status with Code 200", async () => {
      const expectCode = 200;

      await gamesController.getGames(req as Request, res as GamesResponseBody);

      expect(res.status).toHaveBeenCalledWith(expectCode);
    });

    test("then it should call json with 'Archer melo' and 'Jenga'", async () => {
      const expectedJson = {
        games: gamesToApi(gamesMock),
      };

      await gamesController.getGames(req as Request, res as GamesResponseBody);

      expect(res.json).toHaveBeenCalledWith(expectedJson);
    });
  });
});
