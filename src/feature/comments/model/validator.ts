import { Joi } from "express-validation";
import { type CommentWithToken } from "../types";
import { query } from "express";
import { type GameIdStructure } from "../controller/types";

export const addCommentValidator = {
  body: Joi.object<{ comment: CommentWithToken }>().keys({
    comment: Joi.object<CommentWithToken>().keys({
      idGame: Joi.string().required().length(24),
      token: Joi.string().required(),
      comment: Joi.string().required(),
      userName: Joi.string().required(),
      response: Joi.array().items(Joi.string()).required(),
    }),
  }),
};

export const getCommentsValidator = {
  query: Joi.object<GameIdStructure>({
    idGame: Joi.string().required().length(24),
  }),
};
