import mongoose from "mongoose";
import app from "../../../../server/app";
import { mockUsers } from "../../mock/usersMock";
import request from "supertest";

let alfredoToken: string;

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
});

describe("Given POST /users/check/ endpoint", () => {
  describe("When it receives a request with the name of alfredo with out id", () => {
    test("Then it should respond with a status 200 and user with true", async () => {
      const path = "/users/check/";
      const expectCode = 200;
      const expectCheckUser = {
        user: true,
      };
      const alfredo = mockUsers[0];

      const response = await request(app)
        .post(path)
        .send({ user: { name: alfredo.name, token: alfredoToken } })
        .expect(expectCode);

      expect(response.body).toEqual(expect.objectContaining(expectCheckUser));
    });
  });

  describe("When it receives a request with the name of alfredo with out id, but there is a ERROR", () => {
    test("Then it should respond with a status 500 and message error", async () => {
      await mongoose.disconnect();
      const path = "/users/check/";
      const expectCode = 500;
      const expectmessageError = {
        message: "Error in checking User",
      };
      const alfredo = mockUsers[0];

      const response = await request(app)
        .post(path)
        .send({ user: { name: alfredo.name, token: alfredoToken } })
        .expect(expectCode);

      expect(response.body).toEqual(
        expect.objectContaining(expectmessageError),
      );
    });
  });
});
