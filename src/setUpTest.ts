import "dotenv/config";
import "./server/index";
import MongoMemoryServer from "mongodb-memory-server-core";
import { connectToDatabase } from "./database";
import mongoose from "mongoose";
import Games from "./feature/games/model/Games";
import gamesMock from "./feature/games/mock/gamesMock";
import { gamesWithOutId } from "./feature/games/utils/gamesTransformation";
import Users from "./feature/user/model/Users";
import { mockUsers } from "./feature/user/mock/usersMock";
import {
  usersHashPassword,
  usersToWithOutId,
} from "./feature/user/utils/usersFunction";

export let server: MongoMemoryServer;

const serverConection = async () => {
  try {
    server = await MongoMemoryServer.create();
  } catch {
    await serverConection();
  }
};

beforeAll(async () => {
  await serverConection();
  const mongoDbUrl = server.getUri();
  await connectToDatabase(mongoDbUrl);
  await Games.create(gamesWithOutId(gamesMock));
  await Users.create(await usersHashPassword(usersToWithOutId(mockUsers)));
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
  jest.clearAllMocks();
});
