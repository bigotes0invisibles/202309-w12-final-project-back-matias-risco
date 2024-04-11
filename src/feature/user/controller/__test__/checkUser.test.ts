import { type NextFunction } from "express";
import { mockUsers } from "../../mock/usersMock";
import { type UserWithOutPasswordStructure } from "../../types";
import { type UserNameBodyRequest, type UserCheckResponse } from "../types";
import { type UsersRepositoryStructure } from "../../repository/types";
import UserController from "../UserController";
import type CustomError from "../../../../server/CustomError/CustomError";
import request from "supertest";
import app from "../../../../server/app";
import jwt from "jsonwebtoken";

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

describe("Given the method checkUser in class UserController", () => {
  const res: Partial<UserCheckResponse> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  const next: NextFunction = jest.fn();

  const userRepository: Partial<UsersRepositoryStructure> = {
    userCheck: async (name: string, _id: string): Promise<boolean> =>
      mockUsers.some(
        ({ name: mockName }) => name === mockName && _id === alfredoId,
      ),
  };

  const userController = new UserController(
    userRepository as UsersRepositoryStructure,
  );

  describe("When it is call with a request given a username alfredo", () => {
    test("Then it should call status 200 and mesage with user true", async () => {
      const expectedUser = 200;
      const expectedCheckUser = { user: true };

      const req: Partial<UserNameBodyRequest> = {
        body: {
          user: {
            name: alfredoName,
            token: alfredoToken,
          },
        },
      };

      await userController.checkUser(
        req as UserNameBodyRequest,
        res as UserCheckResponse,
        next,
      );

      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(expectedUser);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining(expectedCheckUser),
      );
    });
  });

  describe("When it is call with a request with a bad body", () => {
    test("Then it should call next with 500 'Error in checking User'", async () => {
      const req: Partial<UserNameBodyRequest> = {};

      const expectedError: Partial<CustomError> = {
        statusCode: 500,
        message: "Error in checking User",
      };

      await userController.checkUser(
        req as UserNameBodyRequest,
        res as UserCheckResponse,
        next,
      );

      expect(next).toHaveBeenCalledWith(expect.objectContaining(expectedError));
    });
  });
});
