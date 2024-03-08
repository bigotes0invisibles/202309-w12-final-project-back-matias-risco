import request from "supertest";
import app from "../../../../server/app";
import {
  type GameStructureApi,
  type GamePartialStructureApi,
} from "../../types";

let games: GameStructureApi[];
let sendGame: GamePartialStructureApi;
let expectedGame: GamePartialStructureApi;

beforeAll(async () => {
  const bodyResponse = (await request(app).get("/games")).body as {
    games: GameStructureApi[];
  };
  games = bodyResponse.games;

  const [archerMelo, jenga] = games;
  const { id } = archerMelo;
  const { audience, graphics, languages } = jenga;
  sendGame = { id, audience, graphics, languages };

  expectedGame = { ...archerMelo, ...sendGame };
});

describe("Given PATCH /games/edit/ endpoint", () => {
  describe("When it receives a request with the info updated with the id of 'Archer melo'", () => {
    test("Then it should respond with a status 200 and the information updated of 'Archer melo'", async () => {
      const expectCode = 200;
      const path = "/games/edit";

      const response = await request(app)
        .patch(path)
        .send({ game: sendGame })
        .expect(expectCode);

      const { game } = response.body as {
        game: GamePartialStructureApi;
      };

      expect(game).toEqual(expect.objectContaining(expectedGame));
    });
  });

  describe("When it receives a request with the info with the Worng format", () => {
    test("Then it should respond with a status 400 and 'Validation Failed'", async () => {
      const expectCode = 400;
      const path = "/games/edit";

      const response = await request(app)
        .patch(path)
        .send({ game: {} })
        .expect(expectCode);

      expect(response.body).toStrictEqual({
        message: expect.stringContaining("Validation Failed") as string,
      });
    });
  });

  describe("When it receives a request with  the info updated with the id of 'Archer melo' but there is a problem with the database", () => {
    test("Then it should respond with a status 409 and the message 'Game not found or edited'", async () => {
      const message = "Game not found or edited";
      const expectCode = 409;
      const path = "/games/edit";
      sendGame.id = "656cf0f9d92a000000000000";

      const response = await request(app)
        .patch(path)
        .send({ game: sendGame })
        .expect(expectCode);

      expect(response.body).toEqual(
        expect.objectContaining({
          message: expect.stringContaining(message) as string,
        }),
      );
    });
  });
});
