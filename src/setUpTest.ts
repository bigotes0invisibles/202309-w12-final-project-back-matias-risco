import "dotenv/config";
import "./server/index";
import MongoMemoryServer from "mongodb-memory-server-core";
import { connectToDatabase } from "./database";
import mongoose from "mongoose";
import Games from "./feature/games/model/Games";
import gamesMock from "./feature/games/mock/gamesMock";
import { gamesWithOutId } from "./feature/games/utils/gamesTransformation";

export let server: MongoMemoryServer;
process.env.JWT_SECRET_KEY ??= "Alfarius";
process.env.SALT ??= "saltoruim";

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
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
  jest.clearAllMocks();
});
