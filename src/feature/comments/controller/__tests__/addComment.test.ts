import { type NextFunction } from "express";
import { newComment } from "../../mock/commentsMock";
import { type CommentsRepositoryStructure } from "../../repository/types";
import {
  type CommentWithOutId,
  type CommentDatabaseStructure,
  type CommentApiStructure,
} from "../../types";
import CommentsController from "../CommentsController";
import { type CommentBodyResponse, type CommentBodyRequest } from "../types";
import type CustomError from "../../../../server/CustomError/CustomError";

afterEach(() => {
  jest.clearAllMocks();
});

describe("Given the function addComment in CommentsController", () => {
  const id = "656aa0000000000000000006";

  const req: Partial<CommentBodyRequest> = {
    body: {
      comment: newComment,
    },
  };

  const res: Partial<CommentBodyResponse> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  const next: NextFunction = jest.fn();

  describe("When it is call with a Response  and a Request with the information of Ana Comment with out id", () => {
    test("then it should call status with Code 200 and  the information of Ana comment with a new id", async () => {
      const expectCode = 200;
      const expectInformation: CommentApiStructure = {
        id,
        ...newComment,
      };

      const commentsRepository: Partial<CommentsRepositoryStructure> = {
        addComment: async (
          comment: CommentWithOutId,
        ): Promise<CommentApiStructure> => ({
          id,
          ...comment,
        }),
      };

      const commentsController = new CommentsController(
        commentsRepository as CommentsRepositoryStructure,
      );

      await commentsController.addComment(
        req as CommentBodyRequest,
        res as CommentBodyResponse,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectCode);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ comment: expectInformation }),
      );
    });
  });

  describe("When it is call with a Response  and a Request with the information of Ana Comment with out id, but there is a Error", () => {
    test("then it should call next with Error 409 'Error in adding new comment'", async () => {
      const expectError: Partial<CustomError> = {
        statusCode: 409,
        message: "Error in adding new comment",
      };

      const commentsRepository: Partial<CommentsRepositoryStructure> = {
        async addComment() {
          throw new Error("baka");
        },
      };

      const commentsController = new CommentsController(
        commentsRepository as CommentsRepositoryStructure,
      );

      await commentsController.addComment(
        req as CommentBodyRequest,
        res as CommentBodyResponse,
        next,
      );

      expect(next).toHaveBeenCalledWith(expect.objectContaining(expectError));
    });
  });
});
