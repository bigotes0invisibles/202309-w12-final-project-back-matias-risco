import { type NextFunction } from "express";
import { newComment } from "../../mock/commentsMock";
import { type CommentsRepositoryStructure } from "../../repository/types";
import { type CommentWithOutId, type CommentApiStructure } from "../../types";
import CommentsController from "../CommentsController";
import { type CommentBodyResponse, type CommentBodyRequest } from "../types";
import type CustomError from "../../../../server/CustomError/CustomError";
import { mockUsers } from "../../../user/mock/usersMock";
import request from "supertest";
import app from "../../../../server/app";
import jwt from "jsonwebtoken";
import { type UserWithOutPasswordStructure } from "../../../user/types";

let alfredoId: string;
let alfredoToken: string;
let alfredoName: string;

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
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given the function addComment in CommentsController", () => {
  const id = "656aa0000000000000000006";

  const res: Partial<CommentBodyResponse> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  const next: NextFunction = jest.fn();

  describe("When it is call with a Response  and a Request with the information of Alfredo Comment with out id", () => {
    test("then it should call status with Code 200 and  the information of Alfredo comment with a new id", async () => {
      const req: Partial<CommentBodyRequest> = {
        body: {
          comment: {
            userName: alfredoName,
            token: alfredoToken,
            idGame: newComment.idGame,
            comment: newComment.comment,
            response: [...newComment.response],
          },
        },
      };

      const expectCode = 200;
      const expectInformation: CommentApiStructure = {
        id,
        comment: newComment.comment,
        response: newComment.response,
        userName: alfredoName,
      };

      const commentsRepository: Partial<CommentsRepositoryStructure> = {
        addComment: async ({
          idGame,
          idUser,
          ...comment
        }: CommentWithOutId): Promise<CommentApiStructure> => ({
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
      const req: Partial<CommentBodyRequest> = {
        body: {
          comment: {
            userName: alfredoName,
            token: alfredoToken,
            idGame: newComment.idGame,
            comment: newComment.comment,
            response: [...newComment.response],
          },
        },
      };

      const expectError: Partial<CustomError> = {
        statusCode: 406,
        message: "Error in adding new comment",
      };

      const commentsRepository: Partial<CommentsRepositoryStructure> = {
        async addComment() {
          throw new Error("Error in adding new comment");
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
