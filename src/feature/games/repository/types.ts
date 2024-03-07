import {
  type GameStructureWithOutId,
  type GameStructureApi,
  type GamePartialStructureApi,
  type GameWithOnlyId,
} from "../types";

export interface GamesRepositoryStructure {
  getGames: (page?: string) => Promise<GameStructureApi[]>;
  deleteGame: (id: string) => Promise<GameStructureApi>;
  createGame: (game: GameStructureWithOutId) => Promise<GameStructureApi>;
  infoGame: (id: string) => Promise<GameStructureApi>;
  editGame: (game: GamePartialStructureApi) => Promise<GameStructureApi>;
  countGame: () => Promise<number>;
  checkGame: (id: string) => Promise<boolean>;
}
