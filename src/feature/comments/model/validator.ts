import { Joi } from "express-validation";
import { type CommentWithOutId } from "../types";

export const addCommentValidator = {
  body: Joi.object<{ comment: CommentWithOutId }>().keys({
    comment: Joi.object<CommentWithOutId>().keys({
      _idGame: Joi.string().required().length(24),
      comment: Joi.string().required(),
      userName: Joi.string().required(),
      response: Joi.array().items(Joi.string()).required(),
    }),
  }),
};
