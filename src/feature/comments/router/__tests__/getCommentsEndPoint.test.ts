import {
  type CommentsBaseResponBody,
  type GameIdStructure,
} from "../../controller/types";
import request from "supertest";
import app from "../../../../server/app";
import { commentsMock, idGameArcherMelo } from "../../mock/commentsMock";
import { type CommentApiStructure } from "../../types";
import { gamesDatabase } from "../../../../setUpTest";
import type CustomError from "../../../../server/CustomError/CustomError";
import mongoose from "mongoose";

describe("Given GET /comments/ endpoint", () => {
  describe("When it receives a request with the quary of 'Archer melo' id", () => {
    test("Then it should respond with a status 200 and the comments with the 'Archer Melo' id as a parameter", async () => {
      const expectCode = 200;
      const path = "/comments";
      const requestJson: GameIdStructure = {
        idGame: gamesDatabase[0].id,
      };

      const expectedComments: CommentsBaseResponBody = {
        comments: commentsMock
          .filter(({ _idGame }) => _idGame === idGameArcherMelo)
          .map(({ id, ...comment }) => ({
            ...comment,
            _idGame: gamesDatabase[0].id,
            id: expect.stringContaining("") as string,
          })),
      };

      const response = await request(app)
        .get(path)
        .query(requestJson)
        .expect(expectCode);

      const body = response.body as { comment: CommentApiStructure };

      expect(body).toStrictEqual(expectedComments);
    });
  });

  describe("When it receives a request with the quary of 'Archer melo' id, but there is a error", () => {
    test("Then it should respond with a Error 406 and the message 'Error: the userName: 'megamega' dosen't exist'", async () => {
      await mongoose.disconnect();
      const expectCode = 406;
      const path = "/comments";
      const requestJson: GameIdStructure = {
        idGame: gamesDatabase[0].id,
      };
      const expectedErrorMessage = "Error in getting Comments";

      const response = await request(app)
        .get(path)
        .query(requestJson)
        .expect(expectCode);

      const body = response.body as { message: string };

      expect(body.message).toBe(expectedErrorMessage);
    });
  });
});
