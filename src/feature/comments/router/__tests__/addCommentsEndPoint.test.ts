import request from "supertest";
import app from "../../../../server/app";
import { type GameStructureApi } from "../../../games/types";
import { mockUsers } from "../../../user/mock/usersMock";
import { type CommentApiStructure, type CommentWithOutId } from "../../types";
import { type UserStructure } from "../../../user/types";

let archerMeloGame: GameStructureApi;
let alfredoUser: UserStructure;

beforeAll(async () => {
  const { games } = (await request(app).get("/games").expect(200)).body as {
    games: GameStructureApi[];
  };

  archerMeloGame = games.find(({ name }) => name === "Archer melo")!;

  alfredoUser = mockUsers[0];
});

describe("Given POST /comments/add/ endpoint", () => {
  describe("When it receives a request with the info of 'new comment' with out id", () => {
    test("Then it should respond with a status 200 and the information of 'new comment' with id", async () => {
      const expectCode = 200;
      const path = "/comments/add";
      const newComment: CommentWithOutId = {
        _idGame: archerMeloGame.id,
        userName: alfredoUser.name,
        comment: "beta alfa cargium",
        response: [],
      };

      const response = await request(app)
        .post(path)
        .send({ comment: newComment })
        .expect(expectCode);

      const body = response.body as { comment: CommentApiStructure };

      expect(body).toEqual(
        expect.objectContaining({
          comment: {
            id: expect.stringContaining("") as string,
            ...newComment,
          },
        }),
      );
    });
  });

  describe("When it receives a request with the info of 'new comment' with out id, but the userName do not exist", () => {
    test("Then it should respond with a Error 406 and the message 'Error: the userName: 'megamega' dosen't exist'", async () => {
      const expectCode = 406;
      const path = "/comments/add";
      const userName = "megamega";
      const newComment: CommentWithOutId = {
        _idGame: archerMeloGame.id,
        userName,
        comment: "beta alfa cargium",
        response: [],
      };

      const response = await request(app)
        .post(path)
        .send({ comment: newComment })
        .expect(expectCode);

      const body = response.body as {
        message: string;
      };

      expect(body).toEqual(
        expect.objectContaining({
          message: `Error: the userName: ${userName} dosen't exist`,
        }),
      );
    });
  });

  describe("When it receives a request with the info of 'new comment' with out id, but the _idGame do not exist", () => {
    test("Then it should respond with a Error 406 and the message 'Error: the game Id: '00000000000047076017dc1a' dosen't exist'", async () => {
      const expectCode = 406;
      const path = "/comments/add";
      const idGame = "00000000000047076017dc1a";

      const newComment: CommentWithOutId = {
        _idGame: idGame,
        userName: alfredoUser.name,
        comment: "beta alfa cargium",
        response: [],
      };

      const response = await request(app)
        .post(path)
        .send({ comment: newComment })
        .expect(expectCode);

      const body = response.body as {
        message: string;
      };

      expect(body).toEqual(
        expect.objectContaining({
          message: `Error: the game Id: ${idGame} dosen't exist`,
        }),
      );
    });
  });
});
