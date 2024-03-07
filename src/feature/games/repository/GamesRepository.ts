import {
  type GameStructureWithOutId,
  type GameStructureApi,
  type GamePartialStructureApi,
  type GameWithOnlyId,
} from "../types";
import { type GamesRepositoryStructure } from "./types";
import { gameToApi, gamesToApi } from "../utils/gamesTransformation.js";
import Games from "../model/Games.js";

class GamesRepository implements GamesRepositoryStructure {
  async getGames(page = ""): Promise<GameStructureApi[]> {
    const numPage = 10 * parseInt(page, 10) || 0;
    const games = await Games.find().skip(numPage).limit(10).lean();

    return gamesToApi(games);
  }

  async deleteGame(id: string): Promise<GameStructureApi> {
    try {
      const game = await Games.findByIdAndDelete(id).lean();

      if (!game) {
        throw new Error("document not found");
      }

      return gameToApi(game);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async createGame(game: GameStructureWithOutId): Promise<GameStructureApi> {
    try {
      const newGame = (await Games.create(game)).toJSON();
      return gameToApi(newGame);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async infoGame(id: string): Promise<GameStructureApi> {
    try {
      const game = await Games.findById(id).lean();

      if (!game) {
        throw new Error("document not found");
      }

      return gameToApi(game);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async editGame({
    id,
    ...game
  }: GamePartialStructureApi): Promise<GameStructureApi> {
    try {
      const editedGame = await Games.findByIdAndUpdate(id, game, {
        returnDocument: "after",
      }).lean();

      if (!editedGame) {
        throw new Error("document not found");
      }

      return gameToApi(editedGame);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async countGame(): Promise<number> {
    try {
      const number = await Games.countDocuments().lean();

      return number;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async checkGame(_id: string): Promise<boolean> {
    try {
      const checkGame = await Games.findOne({ _id }).lean();
      return !!checkGame;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}

export default GamesRepository;
