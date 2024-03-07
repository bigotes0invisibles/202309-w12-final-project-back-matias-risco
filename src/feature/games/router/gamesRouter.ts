import { Router } from "express";
import GamesController from "../controller/GamesController.js";
import GamesRepository from "../repository/GamesRepository.js";
import {
  addGameValidator,
  checkGameValidator,
  editGameValidator,
} from "../model/validator.js";
import { validate } from "express-validation";

const gamesRepository = new GamesRepository();
const gamesController = new GamesController(gamesRepository);
const gamesRouter = Router();

gamesRouter.get("/", gamesController.getGames);
gamesRouter.delete("/delete/:idGame", gamesController.deleteGame);
gamesRouter.post("/add", validate(addGameValidator), gamesController.addGame);
gamesRouter.get("/info/:idGame", gamesController.infoGame);
gamesRouter.patch(
  "/edit",
  validate(editGameValidator),
  gamesController.editGame,
);
gamesRouter.get("/count", gamesController.countGame);
gamesRouter.post(
  "/check",
  validate(checkGameValidator),
  gamesController.checkGame,
);

export default gamesRouter;
