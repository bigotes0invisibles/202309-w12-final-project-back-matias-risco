import request from "supertest";
import app from "../../../../server/app";
import { type GameStructureApi } from "../../../games/types";
import { mockUsers } from "../../../user/mock/usersMock";
import { type CommentWithToken, type CommentApiStructure } from "../../types";
import jwt from "jsonwebtoken";
import { type UserWithOutPasswordStructure } from "../../../user/types";
import { gamesDatabase } from "../../../../setUpTest";
let alfredoId: string;
let alfredoToken: string;
let alfredoName: string;
let archerMeloGame: GameStructureApi;

beforeAll(async () => {
  const path = "/users/login/";
  const expectCode = 200;
  const { id, ...alfredo } = mockUsers[0];

  const response = await request(app)
    .post(path)
    .send({ user: alfredo })
    .expect(expectCode);

  const { token } = response.body as { token: string };

  alfredoToken = token;

  const user = jwt.verify(
    token,
    process.env.JWT_SECRET_KEY!,
  ) as UserWithOutPasswordStructure;

  alfredoId = user.id;
  alfredoName = user.name;

  archerMeloGame = gamesDatabase.find(({ name }) => name === "Archer melo")!;
});

describe("Given POST /comments/add/ endpoint", () => {
  const comment = "beta alfa cargium";
  describe("When it receives a request with the info of 'new comment' with out id", () => {
    test("Then it should respond with a status 200 and the information of 'new comment' with id", async () => {
      const expectCode = 200;
      const path = "/comments/add";
      const newComment: CommentWithToken = {
        idGame: archerMeloGame.id,
        userName: alfredoName,
        token: alfredoToken,
        comment,
        response: [],
      };

      console.log(`ArcherMeloId: ${newComment.idGame}`);

      const expectComment: CommentApiStructure = {
        comment,
        id: expect.stringContaining("") as string,
        response: [],
        userName: alfredoName,
      };

      const response = await request(app)
        .post(path)
        .send({ comment: newComment })
        .expect(expectCode);

      const body = response.body as { comment: CommentApiStructure };

      expect(body).toEqual(
        expect.objectContaining({
          comment: expectComment,
        }),
      );
    });
  });

  describe("When it receives a request with the info of 'new comment' with out id, but the userName do not exist", () => {
    test("Then it should respond with a Error 406 and the message 'Error: the userName: 'megamega' dosen't exist'", async () => {
      const expectCode = 406;
      const path = "/comments/add";
      const userName = "megamega";
      const newComment: CommentWithToken = {
        idGame: archerMeloGame.id,
        userName,
        token: alfredoToken,
        comment,
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
      const idGame = "000000002bf16a105be9c989";

      const newComment: CommentWithToken = {
        idGame,
        userName: alfredoName,
        token: alfredoToken,
        comment,
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
