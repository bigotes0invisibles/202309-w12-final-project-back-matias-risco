import { type NextFunction } from "express";
import { mockUsers } from "../../mock/usersMock";
import {
  type UserWithOutIdStructure,
  type UserStructure,
  type UserWithOutPasswordStructure,
} from "../../types";
import { type UserTokenResponse, type UserBodyRequest } from "../types";
import { type UsersRepositoryStructure } from "../../repository/types";
import UserController from "../UserController";
import type CustomError from "../../../../server/CustomError/CustomError";
import {
  userCredentialComprovation,
  userHashPassword,
} from "../../utils/usersFunction";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given the method loginUser in class UserController", () => {
  const userAlfredo: UserStructure = mockUsers[0];

  const res: Partial<UserTokenResponse> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  const next: NextFunction = jest.fn();

  const userRepository: Partial<UsersRepositoryStructure> = {
    async userLogin(
      user: UserWithOutIdStructure,
    ): Promise<UserWithOutPasswordStructure> {
      const hashedUsers = await Promise.all(
        mockUsers.map(
          async (user): Promise<UserStructure> =>
            userHashPassword(user) as Promise<UserStructure>,
        ),
      );

      const newUser = hashedUsers.find(({ name }) => user.name === name);

      if (!newUser) {
        throw new Error("Error test no agarrado weon");
      }

      if (
        !(await userCredentialComprovation(
          user.name,
          user.password,
          newUser.password,
        ))
      ) {
        throw new Error("Error en login user");
      }

      return { id: newUser.id, name: newUser.name };
    },
  };

  const userController = new UserController(
    userRepository as UsersRepositoryStructure,
  );

  describe("When it is call with a request given a username and password of alfredo", () => {
    const req: Partial<UserBodyRequest> = {
      body: {
        user: {
          name: userAlfredo.name,
          password: userAlfredo.password,
        },
      },
    };

    test("Then it should call status with 200", async () => {
      const expectedUser = 200;

      await userController.loginUser(
        req as UserBodyRequest,
        res as UserTokenResponse,
        next,
      );

      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(expectedUser);
    });

    test("Then it should call json with token", async () => {
      const expectedToken = { token: expect.stringContaining("") as string };

      await userController.loginUser(
        req as UserBodyRequest,
        res as UserTokenResponse,
        next,
      );

      expect(next).not.toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(expectedToken);
    });
  });

  describe("When it is call with a request given a username of alfredo but incorret password", () => {
    test("Then it should call next with 500 'Error en login user'", async () => {
      const req: Partial<UserBodyRequest> = {
        body: {
          user: {
            name: userAlfredo.name,
            password: "",
          },
        },
      };

      const expectedError: Partial<CustomError> = {
        statusCode: 500,
        message: "Error en login user",
      };

      await userController.loginUser(
        req as UserBodyRequest,
        res as UserTokenResponse,
        next,
      );

      expect(next).toHaveBeenCalledWith(expect.objectContaining(expectedError));
    });
  });
});
