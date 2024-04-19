import { Send, type NextFunction } from "express";
import gamesMock from "../../../games/mock/gamesMock";
import {
  type CommentsBaseResponBody,
  type CommentsBodyResponse,
  type CommentsGameRequest,
} from "../types";
import { type CommentsRepositoryStructure } from "../../repository/types";
import { type CommentApiStructure } from "../../types";
import { commentsMock } from "../../mock/commentsMock";
import CommentsController from "../CommentsController";
import type CustomError from "../../../../server/CustomError/CustomError";

describe("Given the function getComments in CommentsController", () => {
  const [idGameJenga, archerMeloId] = gamesMock.map(({ _id }) => _id);

  const req: Partial<CommentsGameRequest> = {
    query: {
      idGame: archerMeloId,
    },
  };

  const res: Partial<CommentsBodyResponse> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  const next: NextFunction = jest.fn();

  describe("When it is call with a Response  and a Request with the information of 'Archer Melo' id", () => {
    test("then it should call status with Code 200 and the comments with the 'Archer Melo' id as a parameter", async () => {
      const expectCode = 200;

      const expectedJson: Partial<CommentsBaseResponBody> = {
        comments: expect.arrayContaining([
          expect.objectContaining<Partial<CommentApiStructure>>({
            _idGame: archerMeloId,
          }),
        ]) as CommentApiStructure[],
      };
      const notExpectedJson: Partial<CommentsBaseResponBody> = {
        comments: expect.arrayContaining([
          expect.objectContaining<Partial<CommentApiStructure>>({
            _idGame: idGameJenga,
          }),
        ]) as CommentApiStructure[],
      };

      const commentsRepository: Partial<CommentsRepositoryStructure> = {
        getCommentsByIdGame: async (
          idGame: string,
        ): Promise<CommentApiStructure[]> =>
          commentsMock.filter(({ _idGame }) => idGame === _idGame),
      };

      const commentsController = new CommentsController(
        commentsRepository as CommentsRepositoryStructure,
      );

      await commentsController.getComments(
        req as CommentsGameRequest,
        res as CommentsBodyResponse,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectCode);
      expect(res.json).toHaveBeenCalledWith(expectedJson);
      expect(res.json).not.toHaveBeenCalledWith(notExpectedJson);
    });
  });

  describe("When it is call with a Response  and a Request with the information of 'Archer Melo' id, but there is a error", () => {
    test("then it should call next with Error 406 'Error in getting Comments' ", async () => {
      const expectedError: Partial<CustomError> = {
        statusCode: 406,
        message: "Error in getting Comments",
      };

      const commentsRepository: Partial<CommentsRepositoryStructure> = {
        async getCommentsByIdGame() {
          throw new Error("Error in getting Comments");
        },
      };

      const commentsController = new CommentsController(
        commentsRepository as CommentsRepositoryStructure,
      );

      await commentsController.getComments(
        req as CommentsGameRequest,
        res as CommentsBodyResponse,
        next,
      );

      expect(next).toHaveBeenCalledWith(expect.objectContaining(expectedError));
    });
  });
});
