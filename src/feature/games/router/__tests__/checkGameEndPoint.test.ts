import request from "supertest";
import app from "../../../../server/app";
import { type GameStructureApi } from "../../types";
import mongoose from "mongoose";

describe("Given POST /games/check/ endpoint", () => {
  describe("When it receives a request with the info  with id of 'Archer melo'", () => {
    test("Then it should respond with a status 200 and the game check exist", async () => {
      const expectCode = 200;
      const path = "/games/check";
      const expectCheckGame = true;

      const { games } = (await request(app).get("/games").expect(expectCode))
        .body as {
        games: GameStructureApi[];
      };

      const archerMelo = games.find(({ name }) => name === "Archer melo");

      const response = await request(app)
        .post(path)
        .send({ game: { id: archerMelo?.id } })
        .expect(expectCode);

      const { game } = response.body as {
        game: boolean;
      };

      expect(game).toBe(expectCheckGame);
    });
  });

  describe("When it receives a request with the info  with id of 'Archer melo', but there is a Error", () => {
    test("Then it should respond with a status 400 and the game check exist", async () => {
      const expectCode = 400;
      const path = "/games/check";
      const expectCheckGame = "Error in checking the game Id";

      const { games } = (await request(app).get("/games").expect(200)).body as {
        games: GameStructureApi[];
      };

      const archerMelo = games.find(({ name }) => name === "Archer melo");

      await mongoose.disconnect();

      const response = await request(app)
        .post(path)
        .send({ game: { id: archerMelo?.id } })
        .expect(expectCode);

      const { message } = response.body as {
        message: string;
      };

      expect(message).toBe(expectCheckGame);
    });
  });
});
