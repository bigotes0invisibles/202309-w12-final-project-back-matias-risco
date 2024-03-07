import { Joi } from "express-validation";
import {
  type GameStructureWithOutId,
  tag,
  audience,
  difficulty,
  gameTime,
  graphics,
  grind,
  languages,
  platforms,
  type GameStructureApi,
  type GameWithOnlyId,
} from "../types.js";

export const addGameValidator = {
  body: Joi.object<{ game: GameStructureWithOutId }>().keys({
    game: Joi.object<GameStructureWithOutId>().keys({
      name: Joi.string().required(),
      tags: Joi.array()
        .items(Joi.string().valid(...tag))
        .required(),
      audience: Joi.array()
        .items(Joi.string().valid(...audience))
        .required(),
      difficulty: Joi.string()
        .valid(...difficulty)
        .required(),
      gameTime: Joi.string()
        .valid(...gameTime)
        .required(),
      graphics: Joi.string()
        .valid(...graphics)
        .required(),
      grind: Joi.string()
        .valid(...grind)
        .required(),
      imageUrl: Joi.string().required(),
      languages: Joi.array()
        .items(Joi.string().valid(...languages))
        .required(),
      platforms: Joi.array()
        .items(Joi.string().valid(...platforms))
        .required(),
    }),
  }),
};

export const editGameValidator = {
  body: Joi.object<{ game: GameStructureApi }>().keys({
    game: Joi.object<GameStructureApi>().keys({
      id: Joi.string().required(),

      name: Joi.string().optional(),

      tags: Joi.array()
        .items(Joi.string().valid(...tag))
        .optional(),

      audience: Joi.array()
        .items(Joi.string().valid(...audience))
        .optional(),

      difficulty: Joi.string()
        .valid(...difficulty)
        .optional(),

      gameTime: Joi.string()
        .valid(...gameTime)
        .optional(),

      graphics: Joi.string()
        .valid(...graphics)
        .optional(),

      grind: Joi.string()
        .valid(...grind)
        .optional(),

      imageUrl: Joi.string().required().optional(),

      languages: Joi.array()
        .items(Joi.string().valid(...languages))
        .optional(),

      platforms: Joi.array()
        .items(Joi.string().valid(...platforms))
        .optional(),
    }),
  }),
};

export const checkGameValidator = {
  body: Joi.object<{ game: GameWithOnlyId }>().keys({
    game: Joi.object<GameWithOnlyId>().keys({
      id: Joi.string().required(),
    }),
  }),
};
