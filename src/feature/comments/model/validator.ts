import { Joi } from "express-validation";
import { type CommentWithToken } from "../types";

export const addCommentValidator = {
  body: Joi.object<{ comment: CommentWithToken }>().keys({
    comment: Joi.object<CommentWithToken>().keys({
      _idGame: Joi.string().required().length(24),
      token: Joi.string().required(),
      comment: Joi.string().required(),
      userName: Joi.string().required(),
      response: Joi.array().items(Joi.string()).required(),
    }),
  }),
};
