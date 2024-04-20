import "dotenv/config";
import "./server/index";
import request from "supertest";
import app from "./server/app";
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
import Comments from "./feature/comments/model/Comments";
import { commentsToWithOutId } from "./feature/comments/utils/commentTransformation";
import { commentsMock } from "./feature/comments/mock/commentsMock";
import { type GameStructureApi } from "./feature/games/types";
import { type GamesJson } from "./feature/games/controller/types";

export let server: MongoMemoryServer;
export let gamesDatabase: GameStructureApi[];

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
  const response = await request(app)
    .get("/games")
    .set("Accept", "application/json");

  const { games } = response.body as GamesJson;

  gamesDatabase = games;
  const newGamesId = gamesMock.map(({ name, _id }) => {
    const gameIdDatabase = games.find(
      ({ name: databaseName }) => databaseName === name,
    )?.id;
    return { _id, gameIdDatabase };
  });

  const commentsForCreate = commentsMock.map((comment) => {
    const { _idGame } = comment;
    const newComment = {
      ...comment,
      _idGame:
        newGamesId.find(({ _id }) => _idGame === _id)?.gameIdDatabase ?? "",
    };

    return newComment;
  });

  await Comments.create(commentsToWithOutId(commentsForCreate));
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
  jest.clearAllMocks();
});
