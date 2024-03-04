import { Joi } from "express-validation";
import { type UserWithOutIdStructure } from "../types";

export const userValidator = {
  body: Joi.object<{ user: UserWithOutIdStructure }>().keys({
    user: Joi.object<UserWithOutIdStructure>().keys({
      name: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
};

export const userCheckValidator = {
  body: Joi.object<{ user: UserWithOutIdStructure }>().keys({
    user: Joi.object<UserWithOutIdStructure>().keys({
      name: Joi.string().required(),
    }),
  }),
};
