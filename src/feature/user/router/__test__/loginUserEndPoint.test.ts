import request from "supertest";
import app from "../../../../server/app";
import { mockUsers } from "../../mock/usersMock";
import { type UserWithOutIdStructure } from "../../types";

describe("Given GET /users/login/ endpoint", () => {
  describe("When it receives a request with the info of alfredo with out id", () => {
    test("Then it should respond with a status 200 and new token", async () => {
      const path = "/users/login/";
      const expectCode = 200;
      const { id, ...alfredo } = mockUsers[0];

      const response = await request(app)
        .post(path)
        .send({ user: alfredo })
        .expect(expectCode);

      expect(response.body).toEqual(
        expect.objectContaining({
          token: expect.stringContaining("") as string,
        }),
      );
    });
  });

  describe("When it receives a request with the username that is not in the database", () => {
    test("Then it should respond with a status 500 and message error", async () => {
      const path = "/users/login/";
      const expectCode = 500;
      const userNotFound: UserWithOutIdStructure = {
        name: "asdawf",
        password: "pass",
      };
      const expectedError = "User Not Found";

      const response = await request(app)
        .post(path)
        .send({ user: userNotFound })
        .expect(expectCode);

      expect(response.body).toEqual(
        expect.objectContaining({
          message: expect.stringContaining(expectedError) as string,
        }),
      );
    });
  });

  describe("When it receives a request with the info of alfredo but with bad password", () => {
    test("Then it should respond with a status 500 and message error", async () => {
      const path = "/users/login/";
      const expectCode = 500;
      const { id, ...alfredo } = mockUsers[0];
      alfredo.password = "pa";
      const expectedError = "Incorrect Password";

      const response = await request(app)
        .post(path)
        .send({ user: alfredo })
        .expect(expectCode);

      expect(response.body).toEqual(
        expect.objectContaining({
          message: expect.stringContaining(expectedError) as string,
        }),
      );
    });
  });
});
